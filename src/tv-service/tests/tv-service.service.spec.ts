import { Test, TestingModule } from '@nestjs/testing';
import { TvServiceService } from '../tv-service.service';

describe('TvServiceService', () => {
  let service: TvServiceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TvServiceService],
    }).compile();

    service = module.get<TvServiceService>(TvServiceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
