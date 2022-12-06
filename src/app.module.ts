import { Module } from '@nestjs/common';
import { ConselhoModule } from './conselho/conselho.module';
import { EmailModule } from './email/email.module';

@Module({
  imports: [ConselhoModule, EmailModule]
})
export class AppModule {}
