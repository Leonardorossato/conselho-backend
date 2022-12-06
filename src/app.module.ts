import { Module } from '@nestjs/common';
import { ConselhoModule } from './conselho/conselho.module';

@Module({
  imports: [ConselhoModule]
})
export class AppModule {}
