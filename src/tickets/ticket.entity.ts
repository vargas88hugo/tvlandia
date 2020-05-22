import {
  BaseEntity,
  PrimaryGeneratedColumn,
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';

import { TicketType } from './helpers/ticket-type.enum';
import { TicketStatus } from './helpers/ticket-status.enum';
import { Client } from 'src/users/clients/client.entity';
import { Technician } from 'src/users/technicians/technician.entity';

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

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(
    type => Client,
    client => client.tickets,
    { eager: false },
  )
  client: Client;

  @ManyToOne(
    type => Technician,
    technician => technician.tickets,
    { eager: false },
  )
  technician: Technician;

  @Column({ nullable: true })
  technicianId: number;

  @Column()
  clientId: number;
}
