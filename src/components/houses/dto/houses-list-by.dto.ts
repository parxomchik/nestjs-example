import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty, IsOptional, IsString, MinLength,
} from 'class-validator';

import HousesListDto from '@components/houses/dto/houses-list.dto';

export default class HousesListByDto extends HousesListDto {
  @ApiProperty({ type: String })
  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  readonly street: string = '';

  @ApiProperty({ type: String })
  @IsString()
  @IsOptional()
  readonly number?: string;
}
