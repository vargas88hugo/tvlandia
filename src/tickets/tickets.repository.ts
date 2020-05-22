import { Repository, EntityRepository } from 'typeorm';

import { Ticket } from './ticket.entity';
import { Client } from 'src/users/clients/client.entity';

@EntityRepository(Ticket)
export class TicketsRepository extends Repository<Ticket> {}
