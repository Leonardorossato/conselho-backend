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
    @InjectRepository(Conselho) private readonly conselhoRepository: Repository<Conselho> ){}

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
                await conselho.createQueryBuilder()
                .select('*')
                .from(Conselho, 'Conselho')
                .where(`id NOT IN (${allConselho}) `)
                .orderBy('RANDOM()')
                .limit(1)
                .execute();
                return emailsEnviado
            });
        } catch (error) {
            throw new HttpException('Email', HttpStatus.BAD_REQUEST)
        }
    }
}
