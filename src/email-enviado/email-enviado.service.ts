import { MailerService } from '@nestjs-modules/mailer';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Conselho } from 'src/conselho/entities/conselho.entity';
import { Email } from 'src/email/entities/email.entity';
import { Repository } from 'typeorm';
import { SendConslhoToEamilDTO } from './dto/send.email.dto';
import { EmailEnviado } from './entities/emailEnviado.entity';

@Injectable()
export class EmailEnviadoService {
    constructor(@InjectRepository(EmailEnviado) private readonly emailEnviadoRepository: Repository<EmailEnviado>,
    @InjectRepository(Email) private readonly emailRepository: Repository<Email>,
    @InjectRepository(Conselho) private readonly conselhoRepository: Repository<Conselho>,
    private readonly mailerService: MailerService ){}

    async all(): Promise<EmailEnviado[]>{
        try {
            const emailEnviado = await this.emailEnviadoRepository.find()
            return emailEnviado
        } catch (error) {
            throw new HttpException('Email enviado not found', HttpStatus.NOT_FOUND)
        }
    }

    async emailsCadastrados(){
        try {
            const emailsCadastrados = await this.emailRepository.find()
            const conselho = await this.conselhoRepository
            if(!emailsCadastrados){
                throw new HttpException('Emails not found', HttpStatus.BAD_REQUEST)
            }
            emailsCadastrados.forEach(async element => {
                const emailsEnviado= await this.emailEnviadoRepository.find({where: {email: element}, relations: {conselho: true}})
                const allConselho = emailsEnviado.map(value => value.conselho.id)
                let conselhoParaEnvio= await conselho.createQueryBuilder()
                .select('*')
                .orderBy('RANDOM()')
                .limit(1);
                if(allConselho.length > 0){
                    conselhoParaEnvio.where(`id NOT IN (${allConselho}) `)
                }
                let result = await conselhoParaEnvio.execute();
                return result
            });
        } catch (error) {
            throw new HttpException('Email', HttpStatus.BAD_REQUEST)
        }
    }

    async sendEmail(dto: SendConslhoToEamilDTO){
        try {
            const userEmail = await this.emailRepository.findOneBy({email: dto.email})
            if(!userEmail) throw new HttpException('Email already in use', HttpStatus.BAD_REQUEST)
            const conselho = await this.conselhoRepository.find()

            const sendEmail = await this.mailerService.sendMail({
                to: userEmail.email,
                from: '',
                subject: dto.subject,
                template: './confirmation',
                html: dto.html,
                context: {
                    name: userEmail,
                    conselho
                }
            })
            return await this.emailEnviadoRepository.save(sendEmail)
        } catch (error) {
            throw new HttpException('Erro to send email', HttpStatus.BAD_REQUEST)
        }
    }
}
