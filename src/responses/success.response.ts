import { ApiProperty } from '@nestjs/swagger';
import Data from './types/data.type';

export default class SuccessResponse {
  @ApiProperty({ type: Data })
  readonly data: Data | object | null = null;

  readonly message: string | null = null;

  constructor(message: string | null = null, data: Data | object | null = null) {
    if (data) {
      this.data = data;
    }

    if (message) {
      this.message = message;
    }
  }
}
