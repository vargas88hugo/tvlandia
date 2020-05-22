import {
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  Entity,
  Unique,
} from 'typeorm';
import * as bcrypt from 'bcrypt';

import { ClientStatus } from './helpers/client-status.enum';
import { UserInterface } from '../user.interface';

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

  async validatePassword(password: string): Promise<boolean> {
    const hash = await bcrypt.hash(password, this.salt);
    return hash === this.password;
  }
}
