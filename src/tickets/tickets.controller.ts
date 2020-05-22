import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';

import { TicketsService } from './tickets.service';
import { Ticket } from './ticket.entity';

@Controller('tickets')
export class TicketsController {
  constructor(private ticketService: TicketsService) {}

  @Get()
  getAllTickets(): Promise<Ticket[]> {
    return this.ticketService.getAllTickets();
  }

  @Get('/:id')
  getTicketById(@Param('id', ParseIntPipe) id: number) {
    return this.ticketService.getTicketById(id);
  }
}
