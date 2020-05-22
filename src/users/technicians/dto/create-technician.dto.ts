import { IsNotEmpty } from 'class-validator';

export class CreateTechnicianDto {
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  phone: string;
  @IsNotEmpty()
  email: string;
}
