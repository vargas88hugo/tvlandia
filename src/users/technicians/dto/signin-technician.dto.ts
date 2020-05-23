import { IsEmail, IsString, MinLength, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SignInTechnicianDto {
  @IsEmail()
  @IsString()
  @MinLength(6)
  @MaxLength(30)
  @ApiProperty({ type: String, description: 'email' })
  email: string;

  @ApiProperty({ type: String, description: 'password' })
  @IsString()
  @MinLength(6)
  @MaxLength(20)
  password: string;
}
