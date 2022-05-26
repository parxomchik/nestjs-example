import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty, IsNumber, IsString, Max, Min, MinLength,
} from 'class-validator';

export default class ReviewCreateDto {
  @ApiProperty({ type: Number })
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  @Max(5)
  readonly review: number = 1;

  @ApiProperty({ type: String })
  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  readonly name: string = '';

  @ApiProperty({ type: String })
  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  readonly comment: string = '';

  @ApiProperty({ type: Number })
  @IsNotEmpty()
  readonly house!: number;
}
