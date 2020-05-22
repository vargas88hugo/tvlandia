import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UsePipes,
  ValidationPipe,
  Body,
  UseGuards,
} from '@nestjs/common';

import { TicketsService } from './tickets.service';
import { Ticket } from './ticket.entity';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { Client } from 'src/users/clients/client.entity';
import { GetClient } from 'src/users/clients/helpers/get-client.decorator';
import { ClientAuthGuard } from 'src/users/clients/helpers/client-auth.guard';

@Controller('ticket')
@UseGuards(ClientAuthGuard)
export class TicketsController {
  constructor(private ticketService: TicketsService) {}

  @Post()
  @UsePipes(ValidationPipe)
  createTicket(
    @Body() createTicketDto: CreateTicketDto,
    @GetClient() client: Client,
  ): Promise<Ticket> {
    return this.ticketService.createTicket(createTicketDto, client);
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
