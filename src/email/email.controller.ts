import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateEmailDto } from './dto/create.email.dto';
import { EmailService } from './email.service';

@ApiTags('Emails')
@Controller('email')
export class EmailController {
  constructor(private readonly emailService: EmailService) { }

  @Post('create')
  create(@Body() createEmailDto: CreateEmailDto) {
    return this.emailService.create(createEmailDto);
  }

}
