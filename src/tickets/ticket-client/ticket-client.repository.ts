import { Repository, EntityRepository, DeleteResult } from 'typeorm';

import { Ticket } from 'src/tickets/ticket.entity';
import { Client } from 'src/users/clients/client.entity';

@EntityRepository(Ticket)
export class TicketClientRepository extends Repository<Ticket> {
  async getTickets(client: Client): Promise<Ticket[]> {
    const query = this.createQueryBuilder('ticket');

    query.where('ticket.clientId = :clientId', { clientId: client.id });

    const tickets = await query.getMany();

    return tickets;
  }

  async saveTicket(ticket: Ticket): Promise<void> {
    await ticket.save();
  }
}
