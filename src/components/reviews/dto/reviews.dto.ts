import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayMinSize, IsNumber,
} from 'class-validator';

export default class ReviewsDto {
  @ApiProperty({ type: Array })
  @IsNumber({ allowNaN: false, allowInfinity: false }, { each: true })
  @ArrayMinSize(1)
  readonly reviews: number[] = [];
}
