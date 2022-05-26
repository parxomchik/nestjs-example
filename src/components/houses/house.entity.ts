import { ApiProperty } from '@nestjs/swagger';
import {
  Entity, Column, OneToMany, ManyToOne, Index,
} from 'typeorm';

import ReviewEntity from '@components/reviews/review.entity';
import BaseEntity from '@components/app/base.entity';
import DistrictEntity from '@components/districts/district.entity';

@Entity({ name: 'House' })
export default class HouseEntity extends BaseEntity {
  @ApiProperty({ type: String })
  @Index({ fulltext: true })
  @Column({ type: 'varchar', length: 150 })
  readonly street: string = '';

  @ApiProperty({ type: String })
  @Index({ fulltext: true })
  @Column({ type: 'varchar', length: 50 })
  readonly number: string = '';

  @ApiProperty({ type: Object })
  @Column({ type: 'json' })
  readonly location: object = {
    lat: '',
    lon: '',
  };

  @ApiProperty({ type: [String] })
  @OneToMany(() => ReviewEntity, (review: ReviewEntity) => review.house)
  readonly reviews!: string[];

  @ApiProperty({ type: Number })
  @ManyToOne(() => DistrictEntity, (district: DistrictEntity) => district.houses)
  readonly district?: number;

  @ApiProperty({ type: Object })
  @Column({ type: 'json' })
  readonly documents?: { label: string, url: string }[] = [];
}
