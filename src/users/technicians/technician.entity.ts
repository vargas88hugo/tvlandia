import { BaseEntity, PrimaryGeneratedColumn, Column, Entity } from 'typeorm';
import * as bcrypt from 'bcrypt';

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

  @Column()
  password: string;

  @Column()
  salt: string;

  async validatePassword(password: string): Promise<boolean> {
    const hash = await bcrypt.hash(password, this.salt);
    return hash === this.password;
  }
}
