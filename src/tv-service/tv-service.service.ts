import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { CreateTvServiceDto } from './dto/create-tv-service.dto';
import { TvService } from './tv-service.entity';
import { TvServiceStatus } from './helpers/tv-service-status.enum';
import { TvServiceRepository } from './tv-service.repository';

@Injectable()
export class TvServiceService {
  constructor(
    @InjectRepository(TvServiceRepository)
    private tvServiceRepository,
  ) {}

  async createTvService(
    createTvServiceDto: CreateTvServiceDto,
  ): Promise<TvService> {
    const { description, observations, serviceType } = createTvServiceDto;
    const tvService = new TvService();

    tvService.description = description;
    if (observations) {
      tvService.observations = observations;
    }
    tvService.serviceType = serviceType;
    tvService.status = TvServiceStatus.HOLD;

    this.tvServiceRepository.saveTvService(tvService);

    return tvService;
  }

  async getAllTvServices(): Promise<TvService[]> {
    return await this.tvServiceRepository.find({});
  }

  async getTvServiceById(id: number): Promise<TvService> {
    const found = await this.tvServiceRepository.findOne(id);
    if (!found) {
      throw new NotFoundException(`Tv Service with id ${id} not found.`);
    }
    return found;
  }
}
