import { Controller, Post, UseGuards, Get } from '@nestjs/common';

import { TicketsService } from './tickets.service';
import { GetClient } from '../helpers/get-client.decorator';
import { Client } from '../client.entity';
import { ClientAuthGuard } from '../helpers/client-auth.guard';

@Controller('clients-tickets')
@UseGuards(ClientAuthGuard)
export class TicketsController {
  constructor(private ticketService: TicketsService) {}

  @Get()
  getAllTicketsClient(@GetClient() client: Client) {
    return this.ticketService.getAllTicketsClient(client);
  }
}
