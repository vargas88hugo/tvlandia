import { IsNotEmpty, IsIn, IsOptional } from 'class-validator';
import { TicketType } from '../helpers/ticket-type.enum';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTicketDto {
  @IsNotEmpty()
  @ApiProperty({ type: String, description: 'description' })
  description: string;

  observations: string;

  @IsIn([TicketType.INSTALATION, TicketType.MAINTENANCE])
  @IsNotEmpty()
  @ApiProperty({ type: String, enum: ['MAINTENANCE | INSTALATION'] })
  serviceType: TicketType;
}
