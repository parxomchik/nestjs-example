import {
  Entity, Column, OneToMany,
} from 'typeorm';

import BaseEntity from '@components/app/base.entity';
import { ApiProperty } from '@nestjs/swagger';
import LocationEntity from './location.entity';

@Entity({ name: 'Region' })
export default class RegionEntity extends BaseEntity {
    @ApiProperty({ type: String })
    @Column({ type: 'varchar', length: 200 })
    readonly name: string = '';

    @ApiProperty({ type: [String] })
    @OneToMany(() => LocationEntity, (location: LocationEntity) => location.region)
    readonly locations!: string[];
}
