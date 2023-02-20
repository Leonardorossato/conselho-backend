import { MailerService } from '@nestjs-modules/mailer';
import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression, SchedulerRegistry } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { CronJob } from 'cron';
import { Conselho } from 'src/conselho/entities/conselho.entity';
import { EmailService } from 'src/email/email.service';
import { Email } from 'src/email/entities/email.entity';
import { Repository } from 'typeorm';
import { EmailEnviado } from './entities/emailEnviado.entity';

@Injectable()
export class EmailEnviadoService {
  private readonly loggerService = new Logger(EmailService.name);

  constructor(
    @InjectRepository(EmailEnviado)
    private readonly emailEnviadoRepository: Repository<EmailEnviado>,
    @InjectRepository(Email)
    private readonly emailRepository: Repository<Email>,
    @InjectRepository(Conselho)
    private readonly conselhoRepository: Repository<Conselho>,
    private readonly schedulerRegistry: SchedulerRegistry,
    private readonly mailerService: MailerService,
  ) {}

  @Cron(CronExpression.EVERY_DAY_AT_10AM)
  handleCron() {
    this.enviarEmails();
  }

  async all(): Promise<EmailEnviado[]> {
    try {
      const emailEnviado = await this.emailEnviadoRepository.find();
      return emailEnviado;
    } catch (error) {
      throw new HttpException('Email enviado not found', HttpStatus.NOT_FOUND);
    }
  }

  async enviarEmails() {
    try {
      const emailsCadastrados = await this.emailRepository.find();
      const conselho = await this.conselhoRepository;
      if (!emailsCadastrados) {
        throw new HttpException('Emails not found', HttpStatus.BAD_REQUEST);
      }
      emailsCadastrados.forEach(async (element) => {
        const emailsEnviado = await this.emailEnviadoRepository.find({
          where: { emailId: element.id },
        });
        const allConselho = emailsEnviado.map((value) => value.conselhoId);
        const conselhoParaEnvio = await conselho
          .createQueryBuilder()
          .select('*')
          .orderBy('RANDOM()')
          .limit(1);
        if (allConselho.length > 0) {
          conselhoParaEnvio.where(`id NOT IN (${allConselho}) `);
        }
        const result = await conselhoParaEnvio.execute();
        if (result.length == 0) return;
        const html = `<html><body><h1>Olá ${element.nome}</h1>
                <p>Segue seu conselho do dia: ${result[0].traducao} </p>
                </body></html>`;
        const respostaEnvio = await this.scheduleEmail(
          element.email,
          'Conselho do dia',
          html,
        );
        if (respostaEnvio)
          await this.emailEnviadoRepository.save({
            data: Date(),
            emailId: element.id,
            conselhoId: result[0].id,
          });
      });
    } catch (error) {
      throw new HttpException('Email', HttpStatus.BAD_REQUEST);
    }
  }

  async scheduleEmail(email: string, subject: string, body: string) {
    try {
      await this.mailerService.sendMail({
        to: email,
        subject: subject,
        from: 'noreply@example.com',
        html: body,
      });
      return true;
    } catch (error) {
      return false;
    }
  }
}
