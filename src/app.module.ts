import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmAsyncConfig } from './config/ormconfig';
import { ConselhoModule } from './conselho/conselho.module';
import { EmailModule } from './email/email.module';

@Module({
  imports: [ TypeOrmModule.forRootAsync(typeOrmAsyncConfig),
    ConfigModule.forRoot({ isGlobal: true }),ConselhoModule, EmailModule]
})
export class AppModule {}
