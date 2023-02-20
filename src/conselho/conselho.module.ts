import { Module } from '@nestjs/common';
import { ConselhoService } from './conselho.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Conselho } from './entities/conselho.entity';
import { ConfigModule } from '@nestjs/config';
import { ConselhoHelper } from './helpers/conselho.helper';
import { ConselhoResolver } from './conselho.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Conselho]), ConfigModule],
  providers: [ConselhoService, ConselhoHelper, ConselhoResolver],
})
export class ConselhoModule {}
