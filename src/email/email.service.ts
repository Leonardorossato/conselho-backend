import { MailerService } from '@nestjs-modules/mailer';
import { CACHE_MANAGER, HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { randomBytes } from 'crypto';
import { Repository } from 'typeorm';
import { CreateEmailDto } from './dto/create.email.dto';
import { Email } from './entities/email.entity';

@Injectable()
export class EmailService {
    constructor(@InjectRepository(Email) private emailRepository: Repository<Email>,
    ) { }

    async all(): Promise<Email[]> {
        try {
            const email = await this.emailRepository.find()
            return email
        } catch (error) {
            throw new HttpException('Email not found', HttpStatus.NOT_FOUND)
        }
    }
    
    async create(dto: CreateEmailDto) {
        try {
            const user = await this.emailRepository.findOneBy({ email: dto.email })
            if (user) {
                throw new HttpException('Email already existis', HttpStatus.BAD_REQUEST)
            }
            const email = await this.emailRepository.create(dto)
            await this.emailRepository.save(email)
            return email
        } catch (error) {
            throw new HttpException('Erro to create email', HttpStatus.BAD_REQUEST)
        }
    }
}


