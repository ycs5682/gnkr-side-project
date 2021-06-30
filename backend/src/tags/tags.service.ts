import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Tag } from './tag.entity';
import { TagDto } from 'src/dto/tag';

@Injectable()
export class TagsService {
  constructor(
    @InjectRepository(Tag)
    private readonly tagRepository: Repository<Tag>,
  ) {}

  readTags() {
    return this.tagRepository.find();
  }

  createTag(data: TagDto) {
    const tag = new Tag();
    tag.name = data.name;
    tag.body = data.body;

    return this.tagRepository.insert(tag);
  }

  async updateTag(id: number, data: TagDto) {
    const tag = await this.tagRepository.findOne({ id });
    const updated = Object.assign(tag, data);

    return this.tagRepository.save(updated);
  }

  deleteTag(id: number) {
    return this.tagRepository.delete({ id });
  }
}
