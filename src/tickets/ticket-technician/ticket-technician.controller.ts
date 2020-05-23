import {
  Controller,
  UseGuards,
  ValidationPipe,
  Post,
  Body,
  Get,
} from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';

import { TechnicianAuthGuard } from 'src/users/technicians/helpers/technician-auth.guard';
import { TicketTechnicianService } from './ticket-technician.service';
import { FinishTicketDto } from '../dto/finish-ticket.dto';
import { GetTechnician } from 'src/users/technicians/helpers/get-technician.decorator';
import { Technician } from 'src/users/technicians/technician.entity';

@Controller('ticket-technician')
@UseGuards(TechnicianAuthGuard)
@ApiBearerAuth('Authorization')
export class TicketTechnicianController {
  constructor(private ticketTechnicianService: TicketTechnicianService) {}

  @Post('/finish')
  async finishTicket(
    @Body(ValidationPipe) finishTicketDto: FinishTicketDto,
    @GetTechnician() technician: Technician,
  ): Promise<string> {
    return await this.ticketTechnicianService.finishTicket(
      finishTicketDto,
      technician,
    );
  }

  @Get()
  async getPendingTickets(@GetTechnician() technician: Technician) {
    return this.ticketTechnicianService.getPendingTickets(technician);
  }
}
