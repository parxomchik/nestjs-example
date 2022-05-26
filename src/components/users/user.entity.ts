import { Entity, Column } from 'typeorm';

import BaseEntity from '@components/app/base.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'User' })
export default class UserEntity extends BaseEntity {
  @ApiProperty({ type: String })
  @Column({ type: 'varchar', length: 100 })
  readonly email: string = '';

  @ApiProperty({ type: String })
  @Column({ type: 'varchar', length: 100 })
  readonly password: string = '';

  @Column({ type: 'boolean', default: false })
  readonly verified: boolean = false;
}
