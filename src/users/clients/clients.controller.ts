import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  UsePipes,
  ValidationPipe,
  ParseIntPipe,
} from '@nestjs/common';

import { ClientsService } from './clients.service';
import { CreateClientDto } from './dto/create-client.dto';
import { Client } from './client.entity';

@Controller('clients')
export class ClientsController {
  constructor(private clientsService: ClientsService) {}

  @Get()
  getAllClients(): Promise<Client[]> {
    return this.clientsService.getAllClients();
  }

  @Get('/:id')
  getClientById(@Param('id', ParseIntPipe) id: number): Promise<Client> {
    return this.clientsService.getClientById(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createClient(@Body() body: CreateClientDto): Promise<Client> {
    return this.clientsService.createClient(body);
  }

  @Delete('/:id')
  deleteClientById(@Param('id') id: number): Promise<string> {
    return this.clientsService.deleteClientById(id);
  }
}
