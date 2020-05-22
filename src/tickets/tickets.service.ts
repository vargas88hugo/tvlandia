import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { CreateTicketDto } from './dto/create-ticket.dto';
import { Ticket } from './ticket.entity';
import { TicketStatus } from './helpers/ticket-status.enum';
import { TicketsRepository } from './tickets.repository';
import { Client } from 'src/users/clients/client.entity';

@Injectable()
export class TicketsService {
  constructor(
    @InjectRepository(TicketsRepository)
    private ticketsRepository,
  ) {}

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
