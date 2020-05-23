import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';

import { TicketsService } from './tickets.service';
import { Ticket } from './ticket.entity';
import { ApiCreatedResponse } from '@nestjs/swagger';

@Controller('tickets')
export class TicketsController {
  constructor(private ticketService: TicketsService) {}

  @Get()
  @ApiCreatedResponse({
    description: 'Endpoint para testear y visualizar todos los tickets',
  })
  getAllTickets(): Promise<Ticket[]> {
    return this.ticketService.getAllTickets();
  }

  @Get('/:id')
  @ApiCreatedResponse({
    description: 'Endpoint para testear y visualizar un ticket por id',
  })
  getTicketById(@Param('id', ParseIntPipe) id: number) {
    return this.ticketService.getTicketById(id);
  }
}
