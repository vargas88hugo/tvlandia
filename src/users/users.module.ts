import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ClientsController } from './clients/clients.controller';
import { ClientsService } from './clients/clients.service';
import { ClientRepository } from './clients/client.repository';
import { TechniciansController } from './technicians/technicians.controller';
import { TechniciansService } from './technicians/technicians.service';
import { TechnicianRepository } from './technicians/technician.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([ClientRepository]),
    TypeOrmModule.forFeature([TechnicianRepository]),
  ],
  controllers: [ClientsController, TechniciansController],
  providers: [ClientsService, TechniciansService],
})
export class UsersModule {}
