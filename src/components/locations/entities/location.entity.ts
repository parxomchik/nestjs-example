import {
  Entity, Column,
  ManyToOne, JoinTable,
} from 'typeorm';

import BaseEntity from '@components/app/base.entity';
import { ApiProperty } from '@nestjs/swagger';
import { LocationType } from '../enums/location-type.enum';
import RegionEntity from './region.entity';

@Entity({ name: 'Location' })
export default class LocationEntity extends BaseEntity {
    @ApiProperty({ type: Number })
    @Column({ type: 'integer', default: 0 })
    readonly code: number = 0;

    @ApiProperty({ type: String })
    @Column({ type: 'varchar', length: 200 })
    readonly name: string = '';

    @ApiProperty({ type: LocationType })
    @Column({ type: 'text' })
    readonly type: LocationType = LocationType.Street;

    @ApiProperty({ type: Number })
    @ManyToOne(() => RegionEntity, (region: RegionEntity) => region.locations, { onDelete: 'CASCADE' })
    @JoinTable()
    readonly region!: number;

    @ApiProperty({ type: String })
    @Column({ type: 'varchar', length: 200 })
    readonly oldName: string = '';

    @ApiProperty({ type: LocationType })
    @Column({ type: 'text' })
    readonly oldType: LocationType = LocationType.Street;

    @ApiProperty({ type: Boolean })
    @Column({ type: 'boolean', default: false })
    readonly isDeleted: boolean = false;
}
