import { Module } from '@nestjs/common';
import { EmailEnviadoService } from './email-enviado.service';
import { EmailEnviadoController } from './email-enviado.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmailEnviado } from './entities/emailEnviado.entity';
import { Conselho } from 'src/conselho/entities/conselho.entity';
import { Email } from 'src/email/entities/email.entity';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [TypeOrmModule.forFeature([EmailEnviado, Conselho, Email]), ScheduleModule.forRoot()],
  controllers: [EmailEnviadoController],
  providers: [EmailEnviadoService]
})
export class EmailEnviadoModule {}
