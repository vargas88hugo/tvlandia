import { Controller, Get } from '@nestjs/common';
import { ClientsService } from './clients.service';
import { User } from 'src/users/user.model';

@Controller('clients')
export class ClientsController {
  constructor(private clientsService: ClientsService) {}

  @Get()
  getAllClients(): User[] {
    return this.clientsService.getAllTasks();
  }
}
