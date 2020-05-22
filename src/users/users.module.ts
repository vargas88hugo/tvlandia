import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { JwtModule, JwtService } from '@nestjs/jwt';

import { ClientsController } from './clients/clients.controller';
import { ClientsService } from './clients/clients.service';
import { ClientRepository } from './clients/client.repository';
import { TechniciansController } from './technicians/technicians.controller';
import { TechniciansService } from './technicians/technicians.service';
import { TechnicianRepository } from './technicians/technician.repository';
import { JwtClientStrategy } from './jwt-client.strategy';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.SECRET,
      signOptions: {
        expiresIn: 3600,
      },
    }),
    TypeOrmModule.forFeature([ClientRepository]),
    TypeOrmModule.forFeature([TechnicianRepository]),
  ],
  controllers: [ClientsController, TechniciansController],
  providers: [ClientsService, TechniciansService, JwtClientStrategy],
  exports: [JwtClientStrategy, PassportModule],
})
export class UsersModule {}
