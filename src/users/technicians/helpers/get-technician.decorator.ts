import { createParamDecorator, ExecutionContext } from '@nestjs/common';

import { Technician } from '../technician.entity';

export const GetTechnician = createParamDecorator(
  (data, ctx: ExecutionContext): Technician => {
    const req = ctx.switchToHttp().getRequest();
    return req.user;
  },
);
