import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty, IsString, MinLength,
} from 'class-validator';

export default class RegionCreateDto {
  @ApiProperty({ type: String })
  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  readonly name: string = '';
}
