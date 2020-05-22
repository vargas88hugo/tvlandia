import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { CreateTicketDto } from './dto/create-ticket.dto';
import { Ticket } from './ticket.entity';
import { TicketStatus } from './helpers/ticket-status.enum';
import { TicketsRepository } from './tickets.repository';

@Injectable()
export class TicketsService {
  constructor(
    @InjectRepository(TicketsRepository)
    private ticketsRepository,
  ) {}

  async createTicket(createTicketDto: CreateTicketDto): Promise<Ticket> {
    const { description, observations, serviceType } = createTicketDto;
    const ticket = new Ticket();

    ticket.description = description;
    if (observations) {
      ticket.observations = observations;
    }
    ticket.serviceType = serviceType;
    ticket.status = TicketStatus.HOLD;

    this.ticketsRepository.saveTicket(ticket);

    return ticket;
  }

  async getAllTickets(): Promise<Ticket[]> {
    return await this.ticketsRepository.find({});
  }

  async getTicketById(id: number): Promise<Ticket> {
    const found = await this.ticketsRepository.findOne(id);
    if (!found) {
      throw new NotFoundException(`Tv Service with id ${id} not found.`);
    }
    return found;
  }
}
