import { IsNotEmpty, IsNumber, Min, Max } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class ReviewClientDto {
  @IsNotEmpty()
  @ApiProperty({ type: Number })
  @IsNotEmpty()
  ticketId: number;

  @Min(0)
  @Max(5)
  @IsNumber()
  @Type(() => Number)
  @ApiProperty({ type: Number })
  @IsNotEmpty()
  calification: number;

  @ApiProperty({ type: String, description: 'review' })
  review: string;
}
