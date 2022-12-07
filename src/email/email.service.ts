import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateEmailDto } from './dto/create.email.dto';
import { Email } from './entities/email.entity';

@Injectable()
export class EmailService {
    constructor(@InjectRepository(Email) private emailRepository: Repository<Email>) { }
    async all(): Promise<Email[]> {

        try {

            const email = await this.emailRepository.find()

            return email

        } catch (error) {

            throw new HttpException('Email not found', HttpStatus.NOT_FOUND)
        }

    }
    async create(dto: CreateEmailDto) {

        // try {
        //     var nodemailer = require('nodemailer');
        //     var transporter = nodemailer.createTransport({
        //         service: 'gmail',
        //         auth: {
        //             user: 'youremail@gmail.com',
        //             pass: 'yourpassword'
        //         }
        //     });

        //     var mailOptions = {
        //         from: 'youremail@gmail.com',
        //         to: 'myfriend@yahoo.com',
        //         subject: 'Sending Email using Node.js',
        //         text: 'That was easy!'
        //     };

        //     transporter.sendMail(mailOptions, function () {
        //         if (error) {
        //             console.log(error);
        //         } else {
        //             console.log('Email sent: ' + info.response);
        //         }
        //     });

            const email = await this.emailRepository.save(dto)

            return email

        } catch (error) {

            throw new HttpException('Erro to create email', HttpStatus.BAD_REQUEST)

        }

    }
// }
