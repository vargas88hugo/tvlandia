import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { typeOrmConfig } from './config/typeorm.config';
import { TicketsModule } from './tickets/tickets.module';
import { ClientsModule } from './users/clients/clients.module';
import { TechniciansModule } from './users/technicians/technicians.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    TicketsModule,
    ClientsModule,
    TechniciansModule,
  ],
})
export class AppModule {}
