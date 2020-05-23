import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

export class SignInClientDto {
  @ApiProperty({ type: String, description: 'email' })
  @IsEmail()
  @MinLength(6)
  @MaxLength(30)
  @IsString()
  email: string;

  @ApiProperty({ type: String, description: 'password' })
  @IsString()
  @MinLength(6)
  @MaxLength(20)
  password: string;
}
