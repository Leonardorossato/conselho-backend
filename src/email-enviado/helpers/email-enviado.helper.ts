import { Injectable } from '@nestjs/common';
import { EmailEnviado } from '../entities/email-enviado.entity';
import { EmailEnviadoSchema } from '../schema/email-enviado.schema';

@Injectable()
export class EmailEnviadoHelper {
  formatEmailEnviadoResponse(
    data: Array<EmailEnviado>,
  ): Array<EmailEnviadoSchema> {
    if (!data) {
      return [];
    }

    const emailEnviado: EmailEnviadoSchema[] = [];

    data.forEach((element: EmailEnviado) => {
      emailEnviado.push({
        id: element.id,
        data: element.data,
        conselhoId: element.conselhoId,
        emailId: element.emailId,
      });
    });

    return emailEnviado;
  }
}
