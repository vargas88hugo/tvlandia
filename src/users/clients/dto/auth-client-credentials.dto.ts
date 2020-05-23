import {
  IsString,
  MinLength,
  MaxLength,
  Matches,
  IsEmail,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AuthCredentialsDto {
  @ApiProperty({ type: String, description: 'name' })
  @IsString()
  @MinLength(3)
  @MaxLength(20)
  name: string;

  @ApiProperty({ type: String, description: 'phone' })
  @IsString()
  @MinLength(6)
  @MaxLength(20)
  phone: string;

  @ApiProperty({ type: String, description: 'email' })
  @IsString()
  @IsEmail()
  @MinLength(6)
  @MaxLength(30)
  email: string;

  @ApiProperty({ type: String, description: 'password' })
  @IsString()
  @MinLength(6)
  @MaxLength(20)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'Password too weak',
  })
  password: string;
}
