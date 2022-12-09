import { MailerService } from '@nestjs-modules/mailer';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Conselho } from 'src/conselho/entities/conselho.entity';
import { Email } from 'src/email/entities/email.entity';
import { Repository } from 'typeorm';
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
                let html = `<html><body><h1>Olá ${element.nome}</h1>
                <p>Segue seu conselho do dia: ${result[0].traducao} </p>
                </body></html>`
                const respostaEnvio = await this.sendEmail(element.email, 'Conselho do dia', html)
                if(respostaEnvio) await this.emailEnviadoRepository.save({
                    data: Date(),
                    emailId: element.id,
                    conselhoId: result[0].id
                })
                console.log(respostaEnvio)
                return result
            });
        } catch (error) {
            throw new HttpException('Email', HttpStatus.BAD_REQUEST)
        }
    }

    async sendEmail(email: string, subject: string, body: string){
        try {
            await this.mailerService.sendMail({
                to: email,
                subject: subject,
                from: 'noreply@example.com',
                
                html: body,
            })
            return true
        } catch (error) {
            return false
        }
    }
}
