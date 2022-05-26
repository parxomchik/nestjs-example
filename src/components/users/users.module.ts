import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import UserEntity from '@components/users/user.entity';
import UsersController from './users.controller';
import UsersService from './users.service';
import UsersRepository from './users.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
  ],
  controllers: [UsersController],
  providers: [UsersService, UsersRepository],
  exports: [UsersService, UsersRepository],
})
export default class UsersModule {}
