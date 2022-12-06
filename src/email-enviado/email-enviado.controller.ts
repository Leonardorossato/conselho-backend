import { Controller } from '@nestjs/common';
import { EmailEnviadoService } from './email-enviado.service';

@Controller('email-enviado')
export class EmailEnviadoController {
  constructor(private readonly emailEnviadoService: EmailEnviadoService) {}
}
