import { Test, TestingModule } from '@nestjs/testing';
import { TvServiceController } from '../tv-service.controller';

describe('TvService Controller', () => {
  let controller: TvServiceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TvServiceController],
    }).compile();

    controller = module.get<TvServiceController>(TvServiceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
