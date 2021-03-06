import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Ticket } from 'src/tickets/ticket.entity';
import { Client } from 'src/users/clients/client.entity';
import { CreateTicketDto } from '../dto/create-ticket.dto';
import { TicketStatus } from '../helpers/ticket-status.enum';
import { TicketsRepository } from '../tickets.repository';
import { TechniciansRepository } from 'src/users/technicians/technicians.repository';
import { TechnicianStatus } from 'src/users/technicians/helpers/technician-status.enum';
import { Technician } from 'src/users/technicians/technician.entity';
import { ClientsRepository } from 'src/users/clients/clients.repository';
import { ReviewClientDto } from '../dto/review-client.dto';

@Injectable()
export class TicketClientService {
  constructor(
    @InjectRepository(TicketsRepository)
    private ticketRepository,
    @InjectRepository(TechniciansRepository)
    private techniciansRepository,
    @InjectRepository(ClientsRepository)
    private clientsRepository,
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
    delete ticket.technician;

    return ticket;
  }

  async getAllTicketsClient(client: Client): Promise<Ticket[]> {
    const query = this.ticketRepository.createQueryBuilder('ticket');

    query.where('ticket.clientId = :clientId', { clientId: client.id });

    const tickets = await query.getMany();

    return tickets;
  }

  async chooseTechnician(): Promise<Technician> {
    const technicians = await this.techniciansRepository.find({});
    if (technicians.length === 0) {
      throw new NotFoundException(
        `There is not technicians. Please try later.`,
      );
    }

    let technician: Technician;
    let i: number = 1;
    while (true) {
      technician = await this.techniciansRepository.findOne({
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

  async getTicketById(id: number, client: Client): Promise<Ticket> {
    const query = this.ticketRepository.createQueryBuilder('ticket');

    query.where('ticket.clientId = :clientId', { clientId: client.id });

    query.andWhere('ticket.id = :id', {
      id,
    });

    const ticket = await query.getOne();
    if (!ticket) {
      throw new NotFoundException(`Ticket with id ${id} not found.`);
    }

    return ticket;
  }

  async reviewTicket(reviewClientDto: ReviewClientDto, client: Client) {
    const query = this.ticketRepository.createQueryBuilder('ticket');

    query.where('ticket.clientId = :clientId', { clientId: client.id });

    query.andWhere('ticket.id = :id', {
      id: reviewClientDto.ticketId,
    });

    const ticket: Ticket = await query.getOne();
    if (!ticket) {
      throw new NotFoundException(
        `Ticket with id ${reviewClientDto.ticketId} not found.`,
      );
    }
    if (ticket.status !== TicketStatus.COMPLETED) {
      throw new ConflictException(
        `Ticket with id ${reviewClientDto.ticketId} has not been finalized.`,
      );
    }

    ticket.review = reviewClientDto.review;
    ticket.calification = reviewClientDto.calification;
    await this.ticketRepository.saveTicket(ticket);

    return ticket;
  }
}
