import { Repository, EntityRepository, DeleteResult } from 'typeorm';

import { Client } from './client.entity';

@EntityRepository(Client)
export class ClientRepository extends Repository<Client> {
  async getAllClients(): Promise<Client[]> {
    return await this.find({});
  }

  async findClient(id: number): Promise<Client> {
    return await this.findOne(id);
  }

  async saveClient(client: Client): Promise<void> {
    client.save();
  }

  async deleteClient(id: number): Promise<DeleteResult> {
    return this.delete(id);
  }
}
