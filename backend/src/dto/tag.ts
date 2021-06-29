import { ApiProperty } from '@nestjs/swagger';

export class TagDto {
  @ApiProperty()
  readonly name: string;
  @ApiProperty()
  readonly body: string;
}
