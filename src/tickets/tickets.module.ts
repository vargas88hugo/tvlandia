import { Module } from '@nestjs/common';
import { TicketsController } from './tickets.controller';
import { TicketsService } from './tickets.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TicketsRepository } from './tickets.repository';
import { ClientsModule } from 'src/users/clients/clients.module';
import { TicketClientController } from './ticket-client/ticket-client.controller';
import { TicketClientService } from './ticket-client/ticket-client.service';
import { TicketTechnicianController } from './ticket-technician/ticket-technician.controller';
import { TicketTechnicianService } from './ticket-technician/ticket-technician.service';
import { TechniciansRepository } from 'src/users/technicians/technicians.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([TicketsRepository, TechniciansRepository]),
    ClientsModule,
  ],
  controllers: [
    TicketsController,
    TicketClientController,
    TicketTechnicianController,
  ],
  providers: [TicketsService, TicketClientService, TicketTechnicianService],
})
export class TicketsModule {}
