import { Repository, EntityRepository, DeleteResult } from 'typeorm';

import { Ticket } from 'src/tickets/ticket.entity';
import { Client } from '../client.entity';

@EntityRepository(Ticket)
export class TicketsRepository extends Repository<Ticket> {
  async getTickets(client: Client): Promise<Ticket[]> {
    const query = this.createQueryBuilder('ticket');

    query.where('ticket.clientId = :clientId', { clientId: client.id });

    const tickets = await query.getMany();

    return tickets;
  }
}
