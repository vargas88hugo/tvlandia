import {
  Controller,
  UseGuards,
  ValidationPipe,
  Post,
  Body,
  Get,
  UsePipes,
} from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse, ApiBody } from '@nestjs/swagger';

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
  @UsePipes(ValidationPipe)
  @ApiCreatedResponse({
    description:
      'Finaliza un ticket pendiente por medio de un id del técnico auténticado.\
       Automáticamente cambia los status del técnico y el ticket',
  })
  @ApiBody({ type: FinishTicketDto })
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
  @ApiCreatedResponse({
    description: 'Obtiene los tickets pendientes del técnico auténticado.',
  })
  async getPendingTickets(@GetTechnician() technician: Technician) {
    return this.ticketTechnicianService.getPendingTickets(technician);
  }
}
