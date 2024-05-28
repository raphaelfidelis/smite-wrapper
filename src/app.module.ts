import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { Session } from './infra/Session';
import { PlayerModule } from './player/player.module';

@Module({
  imports: [ConfigModule.forRoot(), PlayerModule],
  controllers: [AppController],
  providers: [AppService, Session],
})
export class AppModule {}
