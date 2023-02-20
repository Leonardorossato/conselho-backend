import { Module } from '@nestjs/common';
import { EmailEnviadoService } from './email-enviado.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmailEnviado } from './entities/emailEnviado.entity';
import { Conselho } from 'src/conselho/entities/conselho.entity';
import { Email } from 'src/email/entities/email.entity';
import { ScheduleModule } from '@nestjs/schedule';
import { EmailEnviadoResolver } from './email-enviado.resolver';
import { EmailEnviadoHelper } from './helpers/email-enviado.helper';

@Module({
  imports: [
    TypeOrmModule.forFeature([EmailEnviado, Conselho, Email]),
    ScheduleModule.forRoot(),
  ],
  providers: [EmailEnviadoService, EmailEnviadoResolver, EmailEnviadoHelper],
})
export class EmailEnviadoModule {}
