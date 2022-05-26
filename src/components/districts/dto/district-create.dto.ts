import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export default class DistrictCreateDto {
  @ApiProperty({ type: String })
  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  readonly number!: string;

  @ApiProperty({ type: String })
  readonly address?: string;

  @ApiProperty({ type: String })
  readonly workingHours?: string;

  @ApiProperty({ type: String })
  readonly headManager?: string;

  @ApiProperty({ type: String })
  readonly manager?: string;

  @ApiProperty({ type: [String] })
  readonly phones?: string[];

  @ApiProperty({ type: [Number] })
  readonly houses?: number[];
}
