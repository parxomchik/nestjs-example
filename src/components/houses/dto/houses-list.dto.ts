import {
  IsNotEmpty,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export default class HousesListDto {
  @ApiProperty({ type: Number })
  @IsNotEmpty()
  readonly limit: string = '20';

  @ApiProperty({ type: Number })
  @IsNotEmpty()
  readonly page: string = '0';
}
