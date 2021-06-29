import { Module } from '@nestjs/common';
import { FeedController } from './feed.controller';
import { FeedService } from './feed.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Feed } from './feed.entity';
import { Tag } from 'src/tags/tag.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Feed, Tag])],
  controllers: [FeedController],
  providers: [FeedService],
})
export class FeedModule {}
