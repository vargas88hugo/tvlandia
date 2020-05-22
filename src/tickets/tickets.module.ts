import { Module } from '@nestjs/common';
import { TicketsController } from './tickets.controller';
import { TicketsService } from './tickets.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TicketsRepository } from './tickets.repository';
import { ClientsModule } from 'src/users/clients/clients.module';

@Module({
  imports: [TypeOrmModule.forFeature([TicketsRepository]), ClientsModule],
  controllers: [TicketsController],
  providers: [TicketsService],
})
export class TicketsModule {}
