import {
  Entity, Column,
  ManyToOne, JoinTable,
} from 'typeorm';

import HouseEntity from '@components/houses/house.entity';
import BaseEntity from '@components/app/base.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'Review' })
export default class ReviewEntity extends BaseEntity {
  @ApiProperty({ type: Number })
  @Column({ type: 'integer', default: 5 })
  readonly review: number = 1;

  @ApiProperty({ type: String })
  @Column({ type: 'varchar', length: 200 })
  readonly name: string = '';

  @ApiProperty({ type: String })
  @Column({ type: 'text' })
  readonly comment: string = '';

  @ApiProperty({ type: String })
  @Column({ type: 'varchar', length: 50 })
  readonly ip: string = '';

  @ApiProperty({ type: Boolean })
  @Column({ type: 'boolean', default: false })
  readonly verified: boolean = false;

  @ApiProperty({ type: Number })
  @ManyToOne(() => HouseEntity, (house: HouseEntity) => house.reviews, { onDelete: 'CASCADE' })
  @JoinTable()
  readonly house!: number;
}
