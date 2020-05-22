import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { UnauthorizedException } from '@nestjs/common';

import { ClientsRepository } from './clients.repository';
import { JwtPayload } from '../jwt-payload.interface';
import { Client } from './client.entity';

export class JwtClientStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(ClientsRepository)
    private clientsRepository: ClientsRepository,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.SECRET,
    });
  }

  async validate(payload: JwtPayload): Promise<Client> {
    const { name } = payload;
    const client = await this.clientsRepository.findOne({ name });

    if (!client) {
      throw new UnauthorizedException();
    }

    return client;
  }
}
