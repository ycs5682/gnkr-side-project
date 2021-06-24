import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Feed } from 'src/feed/feed.entity';
import { PaginationDto, FeedPaginated } from 'src/dto/pagenation';
import { feedDto } from 'src/dto/feed';

@Injectable()
export class FeedService {
  constructor(
    @InjectRepository(Feed)
    private readonly feedRepository: Repository<Feed>,
  ) {}

  async readFeedList(paginationDto: PaginationDto): Promise<FeedPaginated> {
    console.log('paginationDto');
    console.log(paginationDto);
    const skippedItems = (paginationDto.page - 1) * paginationDto.limit;
    console.log('skippedItems');
    console.log(skippedItems);

    const totalCount = await this.feedRepository.count();
    const feed = await this.feedRepository
      .createQueryBuilder()
      .orderBy('id', 'DESC')
      .offset(skippedItems)
      .limit(paginationDto.limit)
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

  createFeed(data: feedDto) {
    const feed = new Feed();
    feed.title = data.title;
    feed.body = data.body;

    return this.feedRepository.insert(feed);
  }

  async updateFeed(id: number, data: feedDto) {
    const { title, body } = data;

    const feed = await this.feedRepository.findOne({ id });
    feed.title = title;
    feed.body = body;

    return this.feedRepository.save(feed);
  }

  deleteFeed(id: number) {
    return this.feedRepository.delete({ id });
  }
}
