import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Session } from './infra/Session';

@Controller()
export class AppController {
  constructor(private readonly session: Session, private readonly appService: AppService) {}

  @Get()
  async getHello(): Promise<string> {
    const session = new Session();
    const info = await session.serverInfo()
    return info;
  }
}
