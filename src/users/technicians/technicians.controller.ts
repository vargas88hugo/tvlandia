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
import { TechnicianAuthGuard } from './helpers/technician-auth.guard';
import { GetTechnician } from './helpers/get-technician.decorator';
import { SignInTechnicianDto } from './dto/signin-technician.dto';

@Controller('technicians')
export class TechniciansController {
  constructor(private techniciansService: TechniciansService) {}

  @Post('/signup')
  @UsePipes(ValidationPipe)
  signUp(@Body() authCredentialsDto: AuthCredentialsDto): Promise<string> {
    return this.techniciansService.signUp(authCredentialsDto);
  }

  @Post('signin')
  signIn(
    @Body(ValidationPipe) signInTechnicianDto: SignInTechnicianDto,
  ): Promise<{ accessToken: string }> {
    return this.techniciansService.signIn(signInTechnicianDto);
  }

  @Get()
  getAllTechnicians(): Promise<Technician[]> {
    return this.techniciansService.getAllTechnicians();
  }

  @Get('/:id')
  getTechnicianById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Technician> {
    return this.techniciansService.getTechnicianById(id);
  }

  @Delete('/:id')
  deleteTechnicianById(@Param('id') id: number): Promise<string> {
    return this.techniciansService.deleteTechnicianById(id);
  }

  @Post('/test')
  @UseGuards(TechnicianAuthGuard)
  test(@GetTechnician() technician: Technician) {
    console.log(technician);
  }
}
