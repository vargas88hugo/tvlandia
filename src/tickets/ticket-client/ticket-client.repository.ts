import { Repository, EntityRepository, DeleteResult } from 'typeorm';

import { Ticket } from 'src/tickets/ticket.entity';

@EntityRepository(Ticket)
export class TicketClientRepository extends Repository<Ticket> {
  async saveTicket(ticket: Ticket): Promise<void> {
    await ticket.save();
  }
}
