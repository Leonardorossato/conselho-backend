import { Body, Controller, Post } from '@nestjs/common';
import { CreateEmailDto } from './dto/create.email.dto';
import { EmailService } from './email.service';

@Controller('email')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @Post('/send-email')
  async sendEmail(@Body() dto: CreateEmailDto){
    return await this.emailService.create(dto)
  }

}
