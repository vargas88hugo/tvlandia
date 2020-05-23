import { IsNotEmpty, IsIn, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class FinishTicketDto {
  @IsNotEmpty()
  @ApiProperty({ type: Number })
  ticketId: number;

  @ApiProperty({ type: String, description: 'observations' })
  observations: string;
}
