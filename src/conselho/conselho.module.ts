import { Module } from '@nestjs/common';
import { ConselhoService } from './conselho.service';
import { ConselhoController } from './conselho.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Conselho } from './entities/conselho.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Conselho])],
  controllers: [ConselhoController],
  providers: [ConselhoService]
})
export class ConselhoModule {}
