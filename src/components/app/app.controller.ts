import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';

import SuccessResponse from '@responses/success.response';

@Controller()
export default class AppController {
  constructor() {
  }

  @ApiOkResponse({ description: 'Returns you success true!' })
  @Get('ping')
  async ping() {
    return new SuccessResponse(null, { success: true });
  }
}
