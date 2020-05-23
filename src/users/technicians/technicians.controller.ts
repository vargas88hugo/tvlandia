import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UsePipes,
  ValidationPipe,
  Body,
  Delete,
  UseGuards,
} from '@nestjs/common';

import { Technician } from './technician.entity';
import { TechniciansService } from './technicians.service';
import { AuthCredentialsDto } from '../clients/dto/auth-client-credentials.dto';
import { SignInTechnicianDto } from './dto/signin-technician.dto';
import { ApiCreatedResponse, ApiBody } from '@nestjs/swagger';

@Controller('technicians')
export class TechniciansController {
  constructor(private techniciansService: TechniciansService) {}

  @Post('/signup')
  @ApiCreatedResponse({ description: 'Registro de Técnico.' })
  @ApiBody({ type: AuthCredentialsDto })
  @UsePipes(ValidationPipe)
  signUp(@Body() authCredentialsDto: AuthCredentialsDto): Promise<string> {
    return this.techniciansService.signUp(authCredentialsDto);
  }

  @Post('signin')
  @ApiCreatedResponse({ description: 'Autenticación de Técnico' })
  @ApiBody({ type: SignInTechnicianDto })
  signIn(
    @Body(ValidationPipe) signInTechnicianDto: SignInTechnicianDto,
  ): Promise<{ accessToken: string }> {
    return this.techniciansService.signIn(signInTechnicianDto);
  }

  @Get()
  @ApiCreatedResponse({
    description: 'Endpoint para testear. Devuelve todos los técnicos',
  })
  getAllTechnicians(): Promise<Technician[]> {
    return this.techniciansService.getAllTechnicians();
  }

  @Get('/:id')
  @ApiCreatedResponse({
    description: 'Endpoint para testear. Devuelve técnico por id',
  })
  getTechnicianById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Technician> {
    return this.techniciansService.getTechnicianById(id);
  }

  @ApiCreatedResponse({
    description: 'Endpoint para testear. Elimina técnico por id',
  })
  @Delete('/:id')
  deleteTechnicianById(@Param('id') id: number): Promise<string> {
    return this.techniciansService.deleteTechnicianById(id);
  }
}
