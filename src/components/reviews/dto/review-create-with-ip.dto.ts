import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty, IsString,
} from 'class-validator';
import ReviewCreateDto from '@components/reviews/dto/review-create.dto';

export default class ReviewCreateWithIpDto extends ReviewCreateDto {
  @ApiProperty({ type: String })
  @IsNotEmpty()
  @IsString()
  readonly ip: string = '';
}
