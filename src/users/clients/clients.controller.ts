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
import { Client } from './client.entity';
import { AuthCredentialsDto } from './dto/auth-client-credentials.dto';

@Controller('clients')
export class ClientsController {
  constructor(private clientsService: ClientsService) {}

  @Post('/signup')
  @UsePipes(ValidationPipe)
  signUp(@Body() authCredentialsDto: AuthCredentialsDto): Promise<string> {
    return this.clientsService.signUp(authCredentialsDto);
  }

  @Get()
  getAllClients(): Promise<Client[]> {
    return this.clientsService.getAllClients();
  }

  @Get('/:id')
  getClientById(@Param('id', ParseIntPipe) id: number): Promise<Client> {
    return this.clientsService.getClientById(id);
  }

  @Delete('/:id')
  deleteClientById(@Param('id') id: number): Promise<string> {
    return this.clientsService.deleteClientById(id);
  }
}
