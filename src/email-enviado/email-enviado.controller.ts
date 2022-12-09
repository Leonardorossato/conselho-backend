import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { EmailEnviadoService } from './email-enviado.service';

@ApiTags('Email Enviado')
@Controller('email-enviado')
export class EmailEnviadoController {
  constructor(private readonly emailEnviadoService: EmailEnviadoService) {}

  @Get('/all')
  async getAllEmailsCadastrados(){
    return await this.emailEnviadoService.emailsCadastrados()
  }
}
