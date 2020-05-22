import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TechniciansRepository } from './technicians.repository';
import { TechniciansController } from './technicians.controller';
import { TechniciansService } from './technicians.service';
import { JwtTechnicianStrategy } from './helpers/jwt-technician.strategy';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.SECRET,
      signOptions: {
        expiresIn: 3600,
      },
    }),
    TypeOrmModule.forFeature([TechniciansRepository]),
  ],
  controllers: [TechniciansController],
  providers: [TechniciansService, JwtTechnicianStrategy],
  exports: [JwtTechnicianStrategy, PassportModule],
})
export class TechniciansModule {}
