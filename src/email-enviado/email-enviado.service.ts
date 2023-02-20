import { MailerService } from '@nestjs-modules/mailer';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { Conselho } from 'src/conselho/entities/conselho.entity';
import { Email } from 'src/email/entities/email.entity';
import { Repository } from 'typeorm';
import { EmailEnviado } from './entities/emailEnviado.entity';
import { EmailEnviadoHelper } from './helpers/email-enviado.helper';

@Injectable()
export class EmailEnviadoService {
  constructor(
    @InjectRepository(EmailEnviado)
    private readonly emailEnviadoRepository: Repository<EmailEnviado>,
    @InjectRepository(Email)
    private readonly emailRepository: Repository<Email>,
    @InjectRepository(Conselho)
    private readonly conselhoRepository: Repository<Conselho>,
    private readonly mailerService: MailerService,
    private readonly emailEnviadoHelper: EmailEnviadoHelper,
  ) {}

  @Cron(CronExpression.EVERY_DAY_AT_10AM)
  handleCron() {
    this.enviarEmails();
  }

  async findAll(): Promise<EmailEnviado[]> {
    try {
      const emailEnviado = await this.emailEnviadoRepository.find();
      await this.emailEnviadoHelper.formatEmailEnviadoResponse(emailEnviado);
      return emailEnviado;
    } catch (error) {
      throw new HttpException(
        'Error to find all emails enviados',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async enviarEmails() {
    try {
      const emailsCadastrados = await this.emailRepository.find();
      const conselho = await this.conselhoRepository;
      if (!emailsCadastrados) {
        throw new HttpException('Emails not found', HttpStatus.NOT_FOUND);
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
          await this.emailEnviadoHelper.formatEmailEnviadoResponse(
            respostaEnvio,
          );
        await this.emailEnviadoRepository.save({
          data: Date(),
          emailId: element.id,
          conselhoId: result[0].id,
        });
      });
    } catch (error) {
      throw new HttpException('Error to send a email', HttpStatus.BAD_REQUEST);
    }
  }

  async scheduleEmail(email: string, subject: string, body: string) {
    try {
      const res = await this.mailerService.sendMail({
        to: email,
        subject: subject,
        from: 'noreply@example.com',
        html: body,
      });
      return res;
    } catch (error) {
      return error;
    }
  }
}
