import {
  Controller,
  Get,
  Delete,
  Post,
  Put,
  Query,
  Param,
  Body,
} from '@nestjs/common';
import { FeedService } from './feed.service';
import { PaginationDto, FeedPaginated } from 'src/dto/pagenation';
import { FeedDto } from 'src/dto/feed';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('feed')
@Controller('feed')
export class FeedController {
  constructor(private readonly service: FeedService) {}

  @Get()
  readFeedList(@Query() paginationDto: PaginationDto): Promise<FeedPaginated> {
    paginationDto.page = Number(paginationDto.page);
    paginationDto.limit = Number(paginationDto.limit);

    return this.service.readFeedList({
      ...paginationDto,
      limit: paginationDto.limit > 10 ? 10 : paginationDto.limit,
    });

    return;
  }

  @Get(':id')
  readFeed(@Param('id') id) {
    return this.service.readFeed(id);
  }

  @Post()
  createFeed(@Body() data: FeedDto) {
    return this.service.createFeed(data);
  }

  @Put(':id')
  updateFeed(@Param('id') id: number, @Body() data: FeedDto) {
    return this.service.updateFeed(id, data);
  }

  @Delete(':id')
  deleteFeed(@Param('id') id) {
    return this.service.deleteFeed(id);
  }
}
