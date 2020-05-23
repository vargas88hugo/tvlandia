import { IsNotEmpty, IsIn, IsOptional } from 'class-validator';
import { TicketType } from '../helpers/ticket-type.enum';

export class FinishTicketDto {
  @IsNotEmpty()
  ticketId: number;
  observations: string;
}
