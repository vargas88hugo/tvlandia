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
import {
  ApiCreatedResponse,
  ApiResponse,
  ApiUnauthorizedResponse,
  ApiBody,
} from '@nestjs/swagger';

import { ClientsService } from './clients.service';
import { Client } from './client.entity';
import { AuthCredentialsDto } from './dto/auth-client-credentials.dto';
import { SignInClientDto } from './dto/signin-client.dto';

@Controller('clients')
export class ClientsController {
  constructor(private clientsService: ClientsService) {}

  @Post('/signup')
  @ApiCreatedResponse({ description: 'Registro de Cliente' })
  @ApiBody({ type: AuthCredentialsDto })
  @UsePipes(ValidationPipe)
  signUp(@Body() authCredentialsDto: AuthCredentialsDto): Promise<string> {
    return this.clientsService.signUp(authCredentialsDto);
  }

  @Post('signin')
  @UsePipes(ValidationPipe)
  @ApiCreatedResponse({
    description: 'Autenticación del Cliente. Devuelve el JWT.',
  })
  @ApiUnauthorizedResponse({ description: 'Credenciales inválidas' })
  @ApiBody({ type: SignInClientDto })
  signIn(
    @Body(ValidationPipe) signInClientDto: SignInClientDto,
  ): Promise<{ accessToken: string }> {
    return this.clientsService.signIn(signInClientDto);
  }

  @Get()
  @ApiCreatedResponse({
    description: 'Endpoint para testear. Devuelve todos los cientes',
  })
  getAllClients(): Promise<Client[]> {
    return this.clientsService.getAllClients();
  }

  @Get('/:id')
  @ApiCreatedResponse({
    description: 'Endpoint para testear. Devuelve cliente por id',
  })
  getClientById(@Param('id', ParseIntPipe) id: number): Promise<Client> {
    return this.clientsService.getClientById(id);
  }

  @Delete('/:id')
  @ApiCreatedResponse({
    description: 'Endpoint para testear. Elimina cliente por id',
  })
  deleteClientById(@Param('id') id: number): Promise<string> {
    return this.clientsService.deleteClientById(id);
  }
}
