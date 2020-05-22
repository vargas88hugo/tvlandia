import { Repository, EntityRepository } from 'typeorm';

import { TvService } from './tv-service.entity';

@EntityRepository(TvService)
export class TvServiceRepository extends Repository<TvService> {
  async saveTvService(tvService: TvService): Promise<void> {
    await tvService.save();
  }
}
