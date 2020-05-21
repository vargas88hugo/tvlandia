import { Injectable } from '@nestjs/common';
import { User } from '../../user.model';

@Injectable()
export class ClientsService {
  private users: User[] = [];

  getAllTasks(): User[] {
    return this.users;
  }
}
