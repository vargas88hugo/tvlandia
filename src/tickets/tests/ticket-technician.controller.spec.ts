import { Test, TestingModule } from '@nestjs/testing';
import { TicketTechnicianController } from '../ticket-technician/ticket-technician.controller';

describe('TicketTechnician Controller', () => {
  let controller: TicketTechnicianController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TicketTechnicianController],
    }).compile();

    controller = module.get<TicketTechnicianController>(
      TicketTechnicianController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
