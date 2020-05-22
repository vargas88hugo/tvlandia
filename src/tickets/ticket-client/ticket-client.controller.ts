import { Controller, Post, UseGuards, Get } from '@nestjs/common';

import { ClientAuthGuard } from 'src/users/clients/helpers/client-auth.guard';
import { TicketClientService } from './ticket-client.service';
import { GetClient } from 'src/users/clients/helpers/get-client.decorator';
import { Client } from 'src/users/clients/client.entity';

@Controller('clients-tickets')
@UseGuards(ClientAuthGuard)
export class TicketClientController {
  constructor(private ticketClientService: TicketClientService) {}

  @Get()
  getAllTicketsClient(@GetClient() client: Client) {
    return this.ticketClientService.getAllTicketsClient(client);
  }
}
