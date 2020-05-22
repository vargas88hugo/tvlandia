import { Injectable } from '@nestjs/common';
import { ClientInterface, ClientStatus } from './client.model';
import { v4 as uuidv4 } from 'uuid';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class ClientsService {
  private users: ClientInterface[] = [];

  getAllClients(): ClientInterface[] {
    return this.users;
  }

  createClient(body: CreateUserDto): ClientInterface {
    const { name, phone, email } = body;

    const client: ClientInterface = {
      id: uuidv4(),
      name,
      phone,
      email,
      status: ClientStatus.ACTIVE,
    };

    return client;
  }
}
