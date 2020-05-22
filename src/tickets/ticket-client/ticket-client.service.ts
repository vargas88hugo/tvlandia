import { Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Ticket } from 'src/tickets/ticket.entity';
import { TicketClientRepository } from './ticket-client.repository';
import { Client } from 'src/users/clients/client.entity';

@Injectable()
export class TicketClientService {
  constructor(
    @InjectRepository(TicketClientRepository)
    private ticketClientRepository,
  ) {}

  async getAllTicketsClient(client: Client): Promise<Ticket[]> {
    return this.ticketClientRepository.getTickets(client);
  }
}
