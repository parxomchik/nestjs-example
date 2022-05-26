import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

import SignUpDto from '@components/auth/dto/sign-up.dto';
import UserEntity from '@components/users/user.entity';

import UpdateUserDto from './dto/update-user.dto';

@Injectable()
export default class UsersRepository {
  constructor(
    @InjectRepository(UserEntity) private usersRepository: Repository<UserEntity>,
  ) {
  }

  public create(user: SignUpDto): Promise<UserEntity> {
    return this.usersRepository.save(user);
  }

  public getByEmail(email: string, verified: boolean = true): Promise<UserEntity | undefined> {
    return this.usersRepository.findOne({ where: { email, verified } });
  }

  public getById(id: number, verified: boolean = true): Promise<UserEntity | undefined> {
    return this.usersRepository.findOne({ where: { id, verified } });
  }

  public async updateById(id: number, user: UpdateUserDto): Promise<UserEntity | undefined> {
    await this.usersRepository.update(id, user);
    return this.usersRepository.findOne({ where: { id } });
  }

  public getAll(verified: boolean): Promise<UserEntity[] | []> {
    return this.usersRepository.find({ verified });
  }
}
