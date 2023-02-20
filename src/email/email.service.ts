import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateEmailInput } from './dto/create-email.input';
import { Email } from './entities/email.entity';
import { EmailHelper } from './helpers/email.helper';

@Injectable()
export class EmailService {
  constructor(
    @InjectRepository(Email) private emailRepository: Repository<Email>,
    private readonly emailHelper: EmailHelper,
  ) {}

  async findAll(): Promise<Email[]> {
    try {
      const email = await this.emailRepository.find();
      return email;
    } catch (error) {
      throw new HttpException(
        'Error to find all emails',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async create(dto: CreateEmailInput) {
    try {
      const user = await this.emailRepository.findOneBy({ email: dto.email });
      if (user) {
        throw new HttpException(
          'Email already existis',
          HttpStatus.BAD_REQUEST,
        );
      }
      const email = await this.emailRepository.create(dto);
      await this.emailHelper.formatEmailResponse([email]);
      await this.emailRepository.save(email);
      return email;
    } catch (error) {
      throw new HttpException('Erro to create a email', HttpStatus.BAD_REQUEST);
    }
  }
}
