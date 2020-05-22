import { Repository, EntityRepository } from 'typeorm';

import { Ticket } from './ticket.entity';
import { Client } from 'src/users/clients/client.entity';

@EntityRepository(Ticket)
export class TicketsRepository extends Repository<Ticket> {
  async saveTicket(ticket: Ticket): Promise<void> {
    await ticket.save();
  }
}
