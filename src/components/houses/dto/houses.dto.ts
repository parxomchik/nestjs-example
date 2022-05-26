import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayMinSize, IsNumber,
} from 'class-validator';

export default class HousesDto {
  @ApiProperty({ type: Array })
  @IsNumber({ allowNaN: false, allowInfinity: false }, { each: true })
  @ArrayMinSize(1)
  readonly houses: number[] = [];
}
