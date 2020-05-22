import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UsePipes,
  ValidationPipe,
  Body,
} from '@nestjs/common';

import { TicketsService } from './tickets.service';
import { Ticket } from './ticket.entity';
import { CreateTicketDto } from './dto/create-ticket.dto';

@Controller('ticket')
export class TicketsController {
  constructor(private ticketService: TicketsService) {}

  @Post()
  @UsePipes(ValidationPipe)
  createClient(@Body() body: CreateTicketDto): Promise<Ticket> {
    return this.ticketService.createTicket(body);
  }

  @Get()
  getAllTickets(): Promise<Ticket[]> {
    return this.ticketService.getAllTickets();
  }

  @Get('/:id')
  getTicketById(@Param('id', ParseIntPipe) id: number) {
    return this.ticketService.getTicketById(id);
  }
}
