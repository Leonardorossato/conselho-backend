import { MailerService } from '@nestjs-modules/mailer';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateEmailDto } from './dto/create.email.dto';
import { Email } from './entities/email.entity';

@Injectable()
export class EmailService {
    constructor(@InjectRepository(Email) private emailRepository: Repository<Email>,
    private readonly mailService: MailerService
    ) { }
    
    async all(): Promise<Email[]> {
        try {
            const email = await this.emailRepository.find()
            return email
        } catch (error) {
            throw new HttpException('Email not found', HttpStatus.NOT_FOUND)
        }

    }
    async create(dto: CreateEmailDto, token: string){
        try {
            const url = `example.com/confirm?token=${token}`
            const userEmail = await this.emailRepository.find()
            if(!userEmail){
                throw new HttpException('Email already exist', HttpStatus.BAD_REQUEST)
            }
            const email = await this.emailRepository.create(dto)
            await this.mailService.sendMail({
                to: dto.email,
                // from: '"Support Team" <support@example.com>', // override default from
                subject: 'Welcome to Nice App! Confirm your Email',
                template: './templates/confirmation.hbs', // either change to ./transactional or rename transactional.html to confirmation.html
                context: {
                  name: dto.nome,
                  url,
                },
            })
            return await this.emailRepository.save(email)
        } catch (error) {
            throw new HttpException('Erro to create email', HttpStatus.BAD_REQUEST)
        }
    }
}
