import { Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Ticket } from 'src/tickets/ticket.entity';
import { TicketClientRepository } from './ticket-client.repository';
import { Client } from 'src/users/clients/client.entity';
import { CreateTicketDto } from '../dto/create-ticket.dto';
import { TicketStatus } from '../helpers/ticket-status.enum';

@Injectable()
export class TicketClientService {
  constructor(
    @InjectRepository(TicketClientRepository)
    private ticketClientRepository,
  ) {}

  async createTicket(
    createTicketDto: CreateTicketDto,
    client: Client,
  ): Promise<Ticket> {
    const { description, observations, serviceType } = createTicketDto;
    const ticket = new Ticket();

    ticket.description = description;
    if (observations) {
      ticket.observations = observations;
    }
    ticket.serviceType = serviceType;
    ticket.status = TicketStatus.HOLD;
    ticket.client = client;

    await this.ticketClientRepository.saveTicket(ticket);

    delete ticket.client;

    return ticket;
  }

  async getAllTicketsClient(client: Client): Promise<Ticket[]> {
    return this.ticketClientRepository.getTickets(client);
  }
}
