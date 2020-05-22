import { Test, TestingModule } from '@nestjs/testing';
import { TicketTechnicianService } from '../ticket-technician/ticket-technician.service';

describe('TicketTechnicianService', () => {
  let service: TicketTechnicianService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TicketTechnicianService],
    }).compile();

    service = module.get<TicketTechnicianService>(TicketTechnicianService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
