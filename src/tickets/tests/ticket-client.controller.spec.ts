import { Test, TestingModule } from '@nestjs/testing';
import { TicketClientController } from '../ticket-client/ticket-client.controller';

describe('TicketClient Controller', () => {
  let controller: TicketClientController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TicketClientController],
    }).compile();

    controller = module.get<TicketClientController>(TicketClientController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
