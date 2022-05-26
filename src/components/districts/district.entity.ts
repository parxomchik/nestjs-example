import { Entity, Column, OneToMany } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

import HouseEntity from '@components/houses/house.entity';
import BaseEntity from '@components/app/base.entity';

@Entity({ name: 'District' })
export default class DistrictEntity extends BaseEntity {
  @ApiProperty({ type: String })
  @Column({ type: 'varchar', length: 50 })
  readonly number: string = '';

  @ApiProperty({ type: String })
  @Column({ type: 'varchar', length: 100 })
  readonly address: string = '';

  @ApiProperty({ type: String })
  @Column({ type: 'varchar', length: 100 })
  readonly workingHours: string = '';

  @ApiProperty({ type: String })
  @Column({ type: 'varchar', length: 200 })
  readonly headManager: string = '';

  @ApiProperty({ type: String })
  @Column({ type: 'varchar', length: 200 })
  readonly manager: string = '';

  @ApiProperty({ type: [String] })
  @Column({ type: 'text', array: true })
  readonly phones: string[] = [];

  @ApiProperty({ type: [Number] })
  @OneToMany(() => HouseEntity, (house: HouseEntity) => house.district)
  readonly houses?: number[];
}
