import { ApiProperty } from '@nestjs/swagger';

import ReviewsDto from '@components/reviews/dto/reviews.dto';
import { IsBoolean, IsNotEmpty } from 'class-validator';

export default class ReviewsUpdateDto extends ReviewsDto {
  @ApiProperty({ type: Boolean })
  @IsBoolean()
  @IsNotEmpty()
  readonly verified?: boolean;
}
