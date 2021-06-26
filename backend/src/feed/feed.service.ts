import { Injectable } from '@nestjs/common';
import { Repository, Connection } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Feed } from 'src/feed/feed.entity';
import { Tag } from 'src/tags/tag.entity';
import { PaginationDto, FeedPaginated } from 'src/dto/pagenation';
import { FeedDto } from 'src/dto/feed';

@Injectable()
export class FeedService {
  constructor(
    @InjectRepository(Feed)
    private readonly feedRepository: Repository<Feed>,
    @InjectRepository(Tag)
    private readonly tagRepository: Repository<Tag>,
  ) {}

  async readFeedList(paginationDto: PaginationDto): Promise<FeedPaginated> {
    const skippedItems = (paginationDto.page - 1) * paginationDto.limit;
    const totalCount = await this.feedRepository.count();
    const feed = await this.feedRepository
      .createQueryBuilder('feed')
      .orderBy('feed.id', 'DESC')
      .offset(skippedItems)
      .limit(paginationDto.limit)
      .leftJoinAndSelect('feed.tags', 'tag')
      .getMany();

    return {
      totalCount,
      page: paginationDto.page,
      limit: paginationDto.limit,
      data: feed,
    };
  }

  readFeed(id: number) {
    return this.feedRepository.findOne({ id });
  }

  async createFeed(data: FeedDto) {
    const { title, body, userId } = data;
    const tags = await this.tagRepository.findByIds(data.tagIds);
    const feed = new Feed();

    feed.title = title;
    feed.body = body;
    feed.userId = userId;
    feed.tags = tags;

    return this.feedRepository.save(feed);
  }

  async updateFeed(id: number, data: FeedDto) {
    const { title, body, userId } = data;
    const tags = await this.tagRepository.findByIds(data.tagIds);
    const feed = await this.feedRepository.findOne(id);
    feed.tags = tags;

    const updated = Object.assign(feed, data);

    return this.feedRepository.save(updated);
  }

  deleteFeed(id: number) {
    return this.feedRepository.delete({ id });
  }
}
