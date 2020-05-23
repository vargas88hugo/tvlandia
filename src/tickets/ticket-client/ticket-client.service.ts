import { Injectable, NotFoundException } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Ticket } from 'src/tickets/ticket.entity';
import { Client } from 'src/users/clients/client.entity';
import { CreateTicketDto } from '../dto/create-ticket.dto';
import { TicketStatus } from '../helpers/ticket-status.enum';
import { TicketsRepository } from '../tickets.repository';
import { TechniciansRepository } from 'src/users/technicians/technicians.repository';
import { TechnicianStatus } from 'src/users/technicians/helpers/technician-status.enum';
import { Technician } from 'src/users/technicians/technician.entity';

@Injectable()
export class TicketClientService {
  constructor(
    @InjectRepository(TicketsRepository)
    private ticketRepository,
    @InjectRepository(TechniciansRepository)
    private technicianRepository,
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
    ticket.technician = await this.chooseTechnician();
    ticket.status = TicketStatus.INPROCESS;

    await this.ticketRepository.saveTicket(ticket);

    delete ticket.client;

    return ticket;
  }

  async getAllTicketsClient(client: Client): Promise<Ticket[]> {
    const query = this.ticketRepository.createQueryBuilder('ticket');

    query.where('ticket.clientId = :clientId', { clientId: client.id });

    const tickets = await query.getMany();

    return tickets;
  }

  async chooseTechnician(): Promise<Technician> {
    const technicians = await this.technicianRepository.find({});
    if (technicians.length === 0) {
      throw new NotFoundException(
        `There is not technicians. Please try later.`,
      );
    }

    let technician: Technician;
    let i: number = 1;
    while (true) {
      technician = await this.technicianRepository.findOne({
        status: TechnicianStatus.IDLE,
      });
      if (technician !== undefined) {
        technician.status = TechnicianStatus.BUSY;
        await technician.save();
        break;
      } else {
        i++;
        setTimeout(() => {
          console.log('Please wait');
        }, i * 3000);
      }
    }

    return technician;
  }
}
