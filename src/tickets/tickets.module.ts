import { Module } from '@nestjs/common';
import { TicketsController } from './tickets.controller';
import { TicketsService } from './tickets.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TicketsRepository } from './tickets.repository';

@Module({
  imports: [TypeOrmModule.forFeature([TicketsRepository])],
  controllers: [TicketsController],
  providers: [TicketsService],
})
export class TicketsModule {}
