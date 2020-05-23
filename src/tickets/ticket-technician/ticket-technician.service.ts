import { Injectable, NotFoundException } from '@nestjs/common';

import { FinishTicketDto } from '../dto/finish-ticket.dto';
import { TicketsRepository } from '../tickets.repository';
import { TicketStatus } from '../helpers/ticket-status.enum';
import { Technician } from 'src/users/technicians/technician.entity';
import { TechnicianStatus } from 'src/users/technicians/helpers/technician-status.enum';
import { TechniciansRepository } from 'src/users/technicians/technicians.repository';
import { Ticket } from '../ticket.entity';

@Injectable()
export class TicketTechnicianService {
  constructor(
    private ticketRepository: TicketsRepository,
    private technicianRepository: TechniciansRepository,
  ) {}

  async finishTicket(
    finishTicketDto: FinishTicketDto,
    technician: Technician,
  ): Promise<string> {
    const { ticketId, observations } = finishTicketDto;
    const ticket = await this.ticketRepository.findOne({ id: ticketId });

    if (!ticket) {
      throw new NotFoundException(`Ticket with id ${ticketId} not found.`);
    }

    ticket.status = TicketStatus.COMPLETED;
    if (observations) {
      ticket.observations = observations;
    }
    await this.ticketRepository.saveTicket(ticket);

    technician.status = TechnicianStatus.IDLE;
    await this.technicianRepository.saveTechnician(technician);

    return `Ticket with id ${ticketId} has been finished by technician with id ${technician.id}`;
  }

  async getPendingTickets(technician: Technician): Promise<Ticket[]> {
    const query = this.ticketRepository.createQueryBuilder('ticket');

    query.where('ticket.technicianId = :technicianId', {
      technicianId: technician.id,
    });

    query.andWhere('ticket.status = :status', {
      status: TicketStatus.INPROCESS,
    });

    const tickets = await query.getMany();

    return tickets;
  }
}
