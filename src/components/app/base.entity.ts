import {
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

export default abstract class BaseEntity {
  @ApiProperty({ type: Number })
  @PrimaryGeneratedColumn('uuid')
  id!: number;

  @ApiProperty({ type: Date })
  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createAt!: Date;

  @ApiProperty({ type: Date })
  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt!: Date;
}
