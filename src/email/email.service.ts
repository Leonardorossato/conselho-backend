import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Email } from './entities/email.entity';

@Injectable()
export class EmailService {
    constructor(@InjectRepository(Email) private emailRepository: Repository<Email>) {}
}
