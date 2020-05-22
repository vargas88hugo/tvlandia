import {
  Controller,
  UseGuards,
  Get,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';

import { TechnicianAuthGuard } from 'src/users/technicians/helpers/technician-auth.guard';
import { TechniciansRepository } from 'src/users/technicians/technicians.repository';
import { Technician } from 'src/users/technicians/technician.entity';

@Controller('ticket-technician')
@UseGuards(TechnicianAuthGuard)
export class TicketTechnicianController {
  constructor(private technicianRepository: TechniciansRepository) {}

  @Get()
  @UsePipes(ValidationPipe)
  async getAllTechnicians(): Promise<Technician[]> {
    return await this.technicianRepository.find({});
  }
}
