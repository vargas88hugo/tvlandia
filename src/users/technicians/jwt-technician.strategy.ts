import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { UnauthorizedException } from '@nestjs/common';

import { TechniciansRepository } from './technicians.repository';
import { JwtPayload } from '../jwt-payload.interface';
import { Technician } from './technician.entity';

export class JwtTechnicianStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(TechniciansRepository)
    private techniciansRepository: TechniciansRepository,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.SECRET,
    });
  }

  async validate(payload: JwtPayload): Promise<Technician> {
    const { email } = payload;
    const technician = await this.techniciansRepository.findOne({ email });

    if (!technician) {
      console.log('aaaaaaaaaaaaaaaaaaa');
      throw new UnauthorizedException();
    }

    return technician;
  }
}
