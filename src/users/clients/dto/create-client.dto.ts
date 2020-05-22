import { IsNotEmpty } from 'class-validator';

export class CreateClientDto {
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  phone: string;
  @IsNotEmpty()
  email: string;
}
