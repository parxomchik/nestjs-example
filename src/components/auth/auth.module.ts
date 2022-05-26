import { PassportModule } from '@nestjs/passport';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import AuthRepository from '@components/auth/auth.repository';
import UsersModule from '@components/users/users.module';

import JwtRefreshStrategy from './strategies/jwt-refresh.strategy';
import JwtAccessStrategy from './strategies/jwt-access.strategy';
import LocalStrategy from './strategies/local.strategy';

import authConstants from './auth-constants';

import AuthController from './auth.controller';
import AuthService from './auth.service';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: authConstants.jwt.secret,
    }),
  ],
  providers: [
    AuthService,
    LocalStrategy,
    JwtAccessStrategy,
    JwtRefreshStrategy,
    AuthRepository,
  ],
  controllers: [AuthController],
  exports: [AuthService],
})
export default class AuthModule {
}
