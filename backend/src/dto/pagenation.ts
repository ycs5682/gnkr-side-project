import { ApiProperty } from '@nestjs/swagger';
import { Feed } from 'src/feed/feed.entity';

export class PaginationDto {
  @ApiProperty()
  page: number;
  @ApiProperty()
  limit: number;
}

export class PaginatedResultDto {
  readonly page: number;
  readonly limit: number;
  readonly totalCount: number;
}

export class FeedPaginated extends PaginatedResultDto {
  data: Feed[];
}
