import { BaseEntity, PrimaryGeneratedColumn, Column, Entity } from 'typeorm';

import { TechnicianStatus } from './helpers/technician-status.enum';
import { UserInterface } from '../user.interface';

@Entity()
export class Technician extends BaseEntity implements UserInterface {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  phone: string;

  @Column()
  email: string;

  @Column()
  status: TechnicianStatus;
}
