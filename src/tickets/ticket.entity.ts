import {
  BaseEntity,
  PrimaryGeneratedColumn,
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

import { TicketType } from './helpers/ticket-type.enum';
import { TicketStatus } from './helpers/ticket-status.enum';

@Entity()
export class Ticket extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  description: string;

  @Column({ nullable: true })
  observations: string;

  @Column()
  serviceType: TicketType;

  @Column()
  status: TicketStatus;

  @Column({ nullable: true })
  clientId: number;

  @Column({ nullable: true })
  technicianId: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
