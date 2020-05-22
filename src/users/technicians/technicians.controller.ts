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
import { CreateTechnicianDto } from './dto/create-technician.dto';

@Controller('technicians')
export class TechniciansController {
  constructor(private TechniciansService: TechniciansService) {}

  @Get()
  getAllTechnicians(): Promise<Technician[]> {
    return this.TechniciansService.getAllTechnicians();
  }

  @Get('/:id')
  getTechnicianById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Technician> {
    return this.TechniciansService.getTechnicianById(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createTechnician(@Body() body: CreateTechnicianDto): Promise<Technician> {
    return this.TechniciansService.createTechnician(body);
  }

  @Delete('/:id')
  deleteTechnicianById(@Param('id') id: number): Promise<string> {
    return this.TechniciansService.deleteTechnicianById(id);
  }
}
