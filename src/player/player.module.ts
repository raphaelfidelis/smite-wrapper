import { Module } from '@nestjs/common';
import { PlayerController } from './player.controller';
import { Queries } from './queries';

@Module({
  controllers: [PlayerController],
  providers: [...Queries],
  exports: [...Queries]
})
export class PlayerModule {}
