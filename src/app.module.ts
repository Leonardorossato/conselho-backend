import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmAsyncConfig } from './config/ormconfig';
import { ConselhoModule } from './conselho/conselho.module';
import { EmailModule } from './email/email.module';
import { EmailEnviadoModule } from './email-enviado/email-enviado.module';

@Module({
  imports: [ TypeOrmModule.forRootAsync(typeOrmAsyncConfig),
    ConfigModule.forRoot({ isGlobal: true }),ConselhoModule, EmailModule, EmailEnviadoModule]
})
export class AppModule {}
