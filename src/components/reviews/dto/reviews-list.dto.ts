import {
  IsNotEmpty,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export default class ReviewsListDto {
  @ApiProperty({ type: Number })
  @IsNotEmpty()
  readonly limit: string = '20';

  @ApiProperty({ type: Number })
  @IsNotEmpty()
  readonly page: string = '0';

  @ApiProperty({ type: String })
  readonly sortField: string = 'updatedAt';

  @ApiProperty({ type: String })
  readonly sortDirection: string = 'desc';

  @ApiProperty({ type: String })
  readonly search?: string;
}
