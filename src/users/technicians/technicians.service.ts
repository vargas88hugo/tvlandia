import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';

import { TechnicianRepository } from './technician.repository';
import { Technician } from './technician.entity';
import { TechnicianStatus } from './helpers/technician-status.enum';
import { AuthCredentialsDto } from '../clients/dto/auth-client-credentials.dto';
import { hashPassword } from 'src/common/hash-password';

@Injectable()
export class TechniciansService {
  constructor(
    @InjectRepository(TechnicianRepository)
    private technicianRepository: TechnicianRepository,
  ) {}

  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<string> {
    const { name, phone, email, password } = authCredentialsDto;
    const salt = await bcrypt.genSalt();
    const technician = new Technician();

    technician.name = name;
    technician.phone = phone;
    technician.email = email;
    technician.status = TechnicianStatus.IDLE;
    technician.password = await hashPassword(password, salt);
    technician.salt = salt;

    if (await this.technicianRepository.findOne({ email })) {
      throw new ConflictException(
        `Technician with email ${email} already exists.`,
      );
    }
    await this.technicianRepository.saveTechnician(technician);

    return `New technician with email ${email} has been created.`;
  }

  async getAllTechnicians(): Promise<Technician[]> {
    return await this.technicianRepository.getAllTechnicians();
  }

  async getTechnicianById(id: number) {
    const found = await this.technicianRepository.findTechnician(id);

    if (!found) {
      throw new NotFoundException(`User with id ${id} not found.`);
    }

    return found;
  }

  async deleteTechnicianById(id: number): Promise<string> {
    const result = await this.technicianRepository.deleteTechnician(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Technician with id ${id} not found.`);
    }

    return `Technician with id ${id} has been deleted.`;
  }
}
