import {
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  Entity,
  Unique,
  OneToMany,
} from 'typeorm';
import * as bcrypt from 'bcrypt';

import { ClientStatus } from './helpers/client-status.enum';
import { UserInterface } from '../user.interface';
import { Ticket } from 'src/tickets/ticket.entity';

@Entity()
@Unique(['email'])
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

  @Column()
  password: string;

  @Column()
  salt: string;

  @OneToMany(
    type => Ticket,
    ticket => ticket.client,
    { eager: true },
  )
  tickets: Ticket[];

  async validatePassword(password: string): Promise<boolean> {
    const hash = await bcrypt.hash(password, this.salt);
    return hash === this.password;
  }
}
