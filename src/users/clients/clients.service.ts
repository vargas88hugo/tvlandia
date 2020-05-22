import {
  Injectable,
  NotFoundException,
  ConflictException,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';

import { ClientStatus } from './helpers/client-status.enum';
import { ClientsRepository } from './clients.repository';
import { Client } from './client.entity';
import { AuthCredentialsDto } from './dto/auth-client-credentials.dto';
import { hashPassword } from '../../common/hash-password';
import { JwtPayload } from '../jwt-payload.interface';
import { SignInClientDto } from './dto/signin-client.dto';

@Injectable()
export class ClientsService {
  constructor(
    @InjectRepository(ClientsRepository)
    private clientsRepository: ClientsRepository,
    private jwtService: JwtService,
  ) {}

  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<string> {
    const { name, phone, email, password } = authCredentialsDto;
    const salt = await bcrypt.genSalt();
    const client = new Client();

    client.name = name;
    client.phone = phone;
    client.email = email;
    client.status = ClientStatus.ACTIVE;
    client.password = await hashPassword(password, salt);
    client.salt = salt;

    if (await this.clientsRepository.findOne({ email })) {
      throw new ConflictException(`Client with email ${email} already exists.`);
    }
    await this.clientsRepository.saveClient(client);

    return `New client with email ${email} has been created.`;
  }

  async signIn(
    signInClientDto: SignInClientDto,
  ): Promise<{ accessToken: string }> {
    const email = await this.validateUserPassword(signInClientDto);

    if (!email) {
      throw new UnauthorizedException('Invalid Credentials');
    }

    const payload: JwtPayload = { email };
    const accessToken = this.jwtService.sign(payload);

    return { accessToken };
  }

  async getAllClients(): Promise<Client[]> {
    return await this.clientsRepository.getAllClients();
  }

  async getClientById(id: number) {
    const found = await this.clientsRepository.findClient(id);
    if (!found) {
      throw new NotFoundException(`Client with id ${id} not found.`);
    }
    return found;
  }

  async deleteClientById(id: number): Promise<string> {
    const result = await this.clientsRepository.deleteClient(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Client with id ${id} not found.`);
    }
    return `Client with id ${id} has been deleted.`;
  }

  async validateUserPassword(
    signInClientDto: SignInClientDto,
  ): Promise<string> {
    const { email, password } = signInClientDto;
    const client = await this.clientsRepository.findOne({ email });

    if (client && (await client.validatePassword(password))) {
      return client.email;
    }

    return null;
  }
}
