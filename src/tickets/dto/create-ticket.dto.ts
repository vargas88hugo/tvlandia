import { IsNotEmpty, IsIn, IsOptional } from 'class-validator';
import { TicketType } from '../helpers/ticket-type.enum';

export class CreateTicketDto {
  @IsNotEmpty()
  description: string;

  observations: string;

  @IsIn([TicketType.INSTALATION, TicketType.MAINTENANCE])
  @IsNotEmpty()
  serviceType: TicketType;
}
