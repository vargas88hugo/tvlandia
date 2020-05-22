import { BaseEntity, PrimaryGeneratedColumn, Column, Entity } from 'typeorm';

import { ClientStatus } from './helpers/client-status.enum';
import { UserInterface } from '../user.interface';

@Entity()
export class Client extends BaseEntity implements UserInterface {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  phone: string;

  @Column()
  email: string;

  @Column()
  status: ClientStatus;
}
