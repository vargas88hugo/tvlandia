import { Module } from '@nestjs/common';
import { TicketsController } from './tickets.controller';
import { TicketsService } from './tickets.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TicketsRepository } from './tickets.repository';
import { ClientsModule } from 'src/users/clients/clients.module';
import { TicketClientController } from './ticket-client/ticket-client.controller';
import { TicketClientService } from './ticket-client/ticket-client.service';
import { TicketClientRepository } from './ticket-client/ticket-client.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([TicketsRepository, TicketClientRepository]),
    ClientsModule,
  ],
  controllers: [TicketsController, TicketClientController],
  providers: [TicketsService, TicketClientService],
})
export class TicketsModule {}
