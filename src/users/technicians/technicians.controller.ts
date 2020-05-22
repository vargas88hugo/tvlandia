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
} from '@nestjs/common';
import { Technician } from './technician.entity';
import { TechniciansService } from './technicians.service';
import { AuthCredentialsDto } from '../clients/dto/auth-client-credentials.dto';

@Controller('technicians')
export class TechniciansController {
  constructor(private techniciansService: TechniciansService) {}

  @Post('/signup')
  @UsePipes(ValidationPipe)
  signUp(@Body() authCredentialsDto: AuthCredentialsDto): Promise<string> {
    return this.techniciansService.signUp(authCredentialsDto);
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
}
