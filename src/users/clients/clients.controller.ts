import { Controller, Get, Post, Body } from '@nestjs/common';
import { ClientsService } from './clients.service';
import { ClientInterface } from './client.model';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('clients')
export class ClientsController {
  constructor(private clientsService: ClientsService) {}

  @Get()
  getAllClients(): ClientInterface[] {
    return this.clientsService.getAllClients();
  }

  @Post()
  createClient(@Body() body: CreateUserDto): ClientInterface {
    return this.clientsService.createClient(body);
  }
}
