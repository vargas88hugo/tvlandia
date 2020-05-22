import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { UnauthorizedException } from '@nestjs/common';

import { TechnicianRepository } from './technician.repository';
import { JwtPayload } from '../jwt-payload.interface';
import { Technician } from './technician.entity';

export class JwtTechnicianStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(TechnicianRepository)
    private technicianRepository: TechnicianRepository,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.SECRET,
    });
  }

  async validate(payload: JwtPayload): Promise<Technician> {
    const { name } = payload;
    const technician = await this.technicianRepository.findOne({ name });

    if (!technician) {
      throw new UnauthorizedException();
    }

    return technician;
  }
}
