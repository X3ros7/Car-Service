import { Controller, Get } from '@nestjs/common';

@Controller({
  version: '1',
  path: 'health',
})
export class HealthController {
  constructor() {}

  @Get('')
  health() {
    return 'Ok';
  }
}
