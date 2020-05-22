import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';

import { JwtClientStrategy } from './helpers/jwt-client.strategy';
import { ClientsService } from './clients.service';
import { ClientsController } from './clients.controller';
import { ClientsRepository } from './clients.repository';
import { TicketsController } from './tickets/tickets.controller';
import { TicketsService } from './tickets/tickets.service';
import { TicketsRepository } from './tickets/tickets.repository';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.SECRET,
      signOptions: {
        expiresIn: 3600,
      },
    }),
    TypeOrmModule.forFeature([ClientsRepository, TicketsRepository]),
  ],
  controllers: [ClientsController, TicketsController],
  providers: [ClientsService, JwtClientStrategy, TicketsService],
  exports: [JwtClientStrategy, PassportModule],
})
export class ClientsModule {}
