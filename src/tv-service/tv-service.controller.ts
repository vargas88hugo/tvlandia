import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UsePipes,
  ValidationPipe,
  Body,
} from '@nestjs/common';

import { TvServiceService } from './tv-service.service';
import { TvService } from './tv-service.entity';
import { CreateTvServiceDto } from './dto/create-tv-service.dto';

@Controller('tv-service')
export class TvServiceController {
  constructor(private tvServiceService: TvServiceService) {}

  @Post()
  @UsePipes(ValidationPipe)
  createClient(@Body() body: CreateTvServiceDto): Promise<TvService> {
    return this.tvServiceService.createTvService(body);
  }

  @Get()
  getAllTvServices(): Promise<TvService[]> {
    return this.tvServiceService.getAllTvServices();
  }

  @Get('/:id')
  getTvServiceById(@Param('id', ParseIntPipe) id: number) {
    return this.tvServiceService.getTvServiceById(id);
  }
}
