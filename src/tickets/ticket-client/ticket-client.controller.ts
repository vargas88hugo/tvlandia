import {
  Controller,
  Post,
  UseGuards,
  Get,
  UsePipes,
  ValidationPipe,
  Body,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse, ApiBody } from '@nestjs/swagger';

import { ClientAuthGuard } from 'src/users/clients/helpers/client-auth.guard';
import { TicketClientService } from './ticket-client.service';
import { GetClient } from 'src/users/clients/helpers/get-client.decorator';
import { Client } from 'src/users/clients/client.entity';
import { CreateTicketDto } from '../dto/create-ticket.dto';
import { Ticket } from '../ticket.entity';
import { ReviewClientDto } from '../dto/review-client.dto';

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
  async createTicket(
    @Body() createTicketDto: CreateTicketDto,
    @GetClient() client: Client,
  ): Promise<Ticket> {
    return this.ticketClientService.createTicket(createTicketDto, client);
  }

  @Get()
  @ApiCreatedResponse({
    description: 'Obtiene todos lo tickets del cliente autenticado.',
  })
  async getAllTicketsClient(@GetClient() client: Client): Promise<Ticket[]> {
    return this.ticketClientService.getAllTicketsClient(client);
  }

  @Get('/:id')
  @ApiCreatedResponse({
    description:
      'Link para que el cliente autenticado pueda seguir el estado de su ticket',
  })
  async getTicketById(
    @Param('id', ParseIntPipe) id: number,
    @GetClient() client: Client,
  ): Promise<Ticket> {
    return this.ticketClientService.getTicketById(id, client);
  }

  @Post('/review')
  @UsePipes(ValidationPipe)
  @ApiCreatedResponse({
    description:
      'Link para que el cliente autenticado califique un ticket finalizado.',
  })
  @ApiBody({ type: ReviewClientDto })
  async reviewClient(
    @Body() reviewClientDto: ReviewClientDto,
    @GetClient() client: Client,
  ) {
    return this.ticketClientService.reviewTicket(reviewClientDto, client);
  }
}
