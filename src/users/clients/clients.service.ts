import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { ClientStatus } from './helpers/client-status.enum';
import { InjectRepository } from '@nestjs/typeorm';
import { ClientRepository } from './client.repository';
import { Client } from './client.entity';
import { AuthCredentialsDto } from './dto/auth-client-credentials.dto';
import { hashPassword } from '../../common/hash-password';

@Injectable()
export class ClientsService {
  constructor(
    @InjectRepository(ClientRepository)
    private clientRepository: ClientRepository,
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

    if (await this.clientRepository.findOne({ email })) {
      throw new ConflictException(`Client with email ${email} already exists.`);
    }
    await this.clientRepository.saveClient(client);

    return `New client with email ${email} has been created.`;
  }

  async getAllClients(): Promise<Client[]> {
    return await this.clientRepository.getAllClients();
  }

  async getClientById(id: number) {
    const found = await this.clientRepository.findClient(id);
    if (!found) {
      throw new NotFoundException(`Client with id ${id} not found.`);
    }
    return found;
  }

  async deleteClientById(id: number): Promise<string> {
    const result = await this.clientRepository.deleteClient(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Client with id ${id} not found.`);
    }
    return `Client with id ${id} has been deleted.`;
  }
}
