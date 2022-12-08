import { Body, Controller, Post } from '@nestjs/common';
import { CreateEmailDto } from './dto/create.email.dto';
import { EmailConfirmationTokenDto } from './dto/email.confirmation.dto';
import { EmailService } from './email.service';

@Controller('email')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @Post('/send-email')
  async sendEmail(@Body() dto: CreateEmailDto){
    return await this.emailService.create(dto)
  }

  @Post('/confirmation-email')
  async confirmationEmail(@Body() dto: EmailConfirmationTokenDto):Promise<{user: CreateEmailDto}>{
    return await this.emailService.emailConfirmation(dto)
  }
}
