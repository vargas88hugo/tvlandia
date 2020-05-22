import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { TechnicianRepository } from './technician.repository';
import { Technician } from './technician.entity';
import { CreateTechnicianDto } from './dto/create-technician.dto';
import { TechnicianStatus } from './helpers/technician-status.enum';

@Injectable()
export class TechniciansService {
  constructor(
    @InjectRepository(TechnicianRepository)
    private technicianRepository: TechnicianRepository,
  ) {}

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

  async createTechnician(
    createTechnicianDto: CreateTechnicianDto,
  ): Promise<Technician> {
    const { name, phone, email } = createTechnicianDto;
    const technician = new Technician();

    technician.name = name;
    technician.phone = phone;
    technician.email = email;
    technician.status = TechnicianStatus.IDLE;

    this.technicianRepository.saveTechnician(technician);

    return technician;
  }

  async deleteTechnicianById(id: number): Promise<string> {
    const result = await this.technicianRepository.deleteTechnician(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Technician with id ${id} not found.`);
    }

    return `Technician with id ${id} has been deleted.`;
  }
}
