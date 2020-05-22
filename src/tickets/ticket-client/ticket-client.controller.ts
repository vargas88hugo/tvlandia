import {
  Controller,
  Post,
  UseGuards,
  Get,
  UsePipes,
  ValidationPipe,
  Body,
} from '@nestjs/common';

import { ClientAuthGuard } from 'src/users/clients/helpers/client-auth.guard';
import { TicketClientService } from './ticket-client.service';
import { GetClient } from 'src/users/clients/helpers/get-client.decorator';
import { Client } from 'src/users/clients/client.entity';
import { CreateTicketDto } from '../dto/create-ticket.dto';
import { Ticket } from '../ticket.entity';

@Controller('ticket-client')
@UseGuards(ClientAuthGuard)
export class TicketClientController {
  constructor(private ticketClientService: TicketClientService) {}

  @Post()
  @UsePipes(ValidationPipe)
  createTicket(
    @Body() createTicketDto: CreateTicketDto,
    @GetClient() client: Client,
  ): Promise<Ticket> {
    return this.ticketClientService.createTicket(createTicketDto, client);
  }

  @Get()
  getAllTicketsClient(@GetClient() client: Client) {
    return this.ticketClientService.getAllTicketsClient(client);
  }
}
