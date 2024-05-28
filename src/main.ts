import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Session } from './infra/Session';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const interval = 15 * 60 * 1000;
  const domain = new Session();
  
  const session = await domain.createHirezSession();
  if (!session) console.log('Error creating Hirez session.');
  global.session = domain.sessionId
  setInterval(async () => {
    const session = await domain.createHirezSession();
    if (!session) console.log('Error creating Hirez session.');
    global.session = domain.sessionId
  }, interval);

  await app.listen(3000);
}
bootstrap();
