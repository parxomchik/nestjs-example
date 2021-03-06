import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

import UserEntity from '@components/users/user.entity';

import { JwtStrategyValidate } from '../interfaces/jwt-strategy-validate.interface';
import authConstants from '../auth-constants';

@Injectable()
export default class JwtRefreshStrategy extends PassportStrategy(Strategy, 'refreshToken') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: authConstants.jwt.secrets.refreshToken,
    });
  }

  async validate(payload: UserEntity): Promise<JwtStrategyValidate> {
    return {
      id: payload.id,
      email: payload.email,
    };
  }
}
