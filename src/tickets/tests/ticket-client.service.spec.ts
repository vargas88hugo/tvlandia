import { Test, TestingModule } from '@nestjs/testing';
import { TicketClientService } from '../ticket-client/ticket-client.service';

describe('TicketClientService', () => {
  let service: TicketClientService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TicketClientService],
    }).compile();

    service = module.get<TicketClientService>(TicketClientService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
