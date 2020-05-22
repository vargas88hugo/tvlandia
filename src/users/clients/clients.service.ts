import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

import { CreateClientDto } from './dto/create-client.dto';
import { ClientStatus } from './helpers/client-status.enum';
import { InjectRepository } from '@nestjs/typeorm';
import { ClientRepository } from './client.repository';
import { Client } from './client.entity';

@Injectable()
export class ClientsService {
  constructor(
    @InjectRepository(ClientRepository)
    private clientRepository: ClientRepository,
  ) {}

  async getAllClients(): Promise<Client[]> {
    return await this.clientRepository.getAllClients();
  }

  async getClientById(id: number) {
    const found = await this.clientRepository.findClient(id);

    if (!found) {
      throw new NotFoundException(`User with id ${id} not found.`);
    }

    return found;
  }

  async createClient(createClientDto: CreateClientDto): Promise<Client> {
    const { name, phone, email } = createClientDto;
    const client = new Client();

    client.name = name;
    client.phone = phone;
    client.email = email;
    client.status = ClientStatus.ACTIVE;

    this.clientRepository.saveClient(client);

    return client;
  }

  async deleteClientById(id: number): Promise<string> {
    const result = await this.clientRepository.deleteClient(id);

    if (result.affected === 0) {
      throw new NotFoundException(`User with id ${id} not found.`);
    }

    return `User with id ${id} has been deleted.`;
  }
}
