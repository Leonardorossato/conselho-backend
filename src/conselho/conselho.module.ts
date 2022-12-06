import { Module } from '@nestjs/common';
import { ConselhoService } from './conselho.service';
import { ConselhoController } from './conselho.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Conselho } from './entities/conselho.entity';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [TypeOrmModule.forFeature([Conselho]), ConfigModule],
  controllers: [ConselhoController],
  providers: [ConselhoService],
  exports: [ConselhoService]
})
export class ConselhoModule {}
