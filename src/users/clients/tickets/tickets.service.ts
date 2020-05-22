import { Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { TicketsRepository } from './tickets.repository';
import { Client } from '../client.entity';
import { Ticket } from 'src/tickets/ticket.entity';

@Injectable()
export class TicketsService {
  constructor(
    @InjectRepository(TicketsRepository)
    private ticketsRepository,
  ) {}

  async getAllTicketsClient(client: Client): Promise<Ticket[]> {
    return this.ticketsRepository.getTickets(client);
  }
}
