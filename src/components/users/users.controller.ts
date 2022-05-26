import {
  Controller,
  Get,
  NotFoundException,
  Param,
  UseGuards, UseInterceptors,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOkResponse,
  ApiNotFoundResponse,
  ApiBearerAuth,
  ApiUnauthorizedResponse,
  ApiParam,
} from '@nestjs/swagger';

import WrapResponseInterceptor from '@interceptors/wrap-response.interceptor';
import UnauthorizedResponse from '@responses/unauthorized.response';
import NotFoundResponse from '@responses/not-found.response';
import SuccessResponse from '@responses/success.response';
import JwtAccessGuard from '@guards/jwt-access.guard';
import AppUtils from '@components/app/app.utils';

import UsersService from './users.service';
import UserEntity from './user.entity';

@ApiTags('Users')
@ApiBearerAuth()
@UseInterceptors(WrapResponseInterceptor)
@Controller('users')
export default class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOkResponse({
    type: AppUtils.DtoFactory.wrap(UserEntity),
    description: '200. Success. Returns a user',
  })
  @ApiNotFoundResponse({
    type: NotFoundResponse,
    description: '404. NotFoundException. User was not found',
  })
  @ApiUnauthorizedResponse({
    type: UnauthorizedResponse,
    description: '401. UnauthorizedException.',
  })
  @ApiParam({ name: 'id', type: String })
  @Get(':id')
  @UseGuards(JwtAccessGuard)
  async getById(
    @Param('id') id: number,
  ): Promise<SuccessResponse | never> {
    const foundUser = await this.usersService.getById(id);

    if (!foundUser) {
      throw new NotFoundException('The user does not exist');
    }

    return new SuccessResponse(null, foundUser);
  }

  @ApiOkResponse({
    description: '200. Success. Returns all users',
    type: AppUtils.DtoFactory.wrap([UserEntity]),
  })
  @ApiUnauthorizedResponse({
    type: UnauthorizedResponse,
    description: '401. UnauthorizedException.',
  })
  @Get()
  @UseGuards(JwtAccessGuard)
  async getAllVerifiedUsers(): Promise<SuccessResponse | []> {
    const foundUsers = await this.usersService.getAll(true);

    return new SuccessResponse(null, foundUsers);
  }
}
