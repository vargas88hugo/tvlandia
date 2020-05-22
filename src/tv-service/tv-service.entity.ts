import {
  BaseEntity,
  PrimaryGeneratedColumn,
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

import { TvServiceType } from './helpers/tv-service-type.enum';
import { TvServiceStatus } from './helpers/tv-service-status.enum';

@Entity()
export class TvService extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  description: string;

  @Column({ nullable: true })
  observations: string;

  @Column()
  serviceType: TvServiceType;

  @Column()
  status: TvServiceStatus;

  @Column({ nullable: true })
  clientId: number;

  @Column({ nullable: true })
  technicianId: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
