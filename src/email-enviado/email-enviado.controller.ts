import { Controller, Get } from '@nestjs/common';
import { EmailEnviadoService } from './email-enviado.service';

@Controller('email-enviado')
export class EmailEnviadoController {
  constructor(private readonly emailEnviadoService: EmailEnviadoService) {}

  @Get('/all')
  async getAllEmailsCadastrados(){
    return await this.emailEnviadoService.emailsCadastrados()
  }
}
