import {
  Controller,
  Post,
  UseGuards,
  Get,
  UsePipes,
  ValidationPipe,
  Body,
} from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse, ApiBody } from '@nestjs/swagger';

import { ClientAuthGuard } from 'src/users/clients/helpers/client-auth.guard';
import { TicketClientService } from './ticket-client.service';
import { GetClient } from 'src/users/clients/helpers/get-client.decorator';
import { Client } from 'src/users/clients/client.entity';
import { CreateTicketDto } from '../dto/create-ticket.dto';
import { Ticket } from '../ticket.entity';

@ApiBearerAuth()
@Controller('ticket-client')
@UseGuards(ClientAuthGuard)
export class TicketClientController {
  constructor(private ticketClientService: TicketClientService) {}

  @Post()
  @UsePipes(ValidationPipe)
  @ApiCreatedResponse({
    description:
      'Crea un Ticket al usuario autenticado y lo asigna automáticamente a \
      un técnico. Si todos los técnicos están ocupados la API esperará hasta que \
      se desocupe alguno.',
  })
  @ApiBody({ type: CreateTicketDto })
  createTicket(
    @Body() createTicketDto: CreateTicketDto,
    @GetClient() client: Client,
  ): Promise<Ticket> {
    return this.ticketClientService.createTicket(createTicketDto, client);
  }

  @Get()
  @ApiCreatedResponse({
    description: 'Obtiene todos lo tickets del cliente autenticado.',
  })
  getAllTicketsClient(@GetClient() client: Client) {
    return this.ticketClientService.getAllTicketsClient(client);
  }
}
