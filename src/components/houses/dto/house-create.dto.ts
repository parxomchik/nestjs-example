import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty, IsObject, IsString, MinLength,
} from 'class-validator';

export default class HouseCreateDto {
  @ApiProperty({ type: String })
  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  readonly street!: string;

  @ApiProperty({ type: String })
  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  readonly number!: string;

  @ApiProperty({ type: Object })
  @IsObject()
  readonly location: object = {}

  @ApiProperty({ type: Number })
  readonly district?: number;

  @ApiProperty({ type: Object })
  readonly documents?: { label: string, url: string }[];
}
