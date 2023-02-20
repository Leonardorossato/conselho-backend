import { Injectable } from '@nestjs/common';
import { Email } from '../entities/email.entity';
import { EmailSchema } from '../schema/email.schema';

@Injectable()
export class EmailHelper {
  formatEmailResponse(data: Array<Email>): Array<EmailSchema> {
    if (!data) {
      return [];
    }

    const conselho: EmailSchema[] = [];

    data.forEach((element: Email) => {
      conselho.push({
        id: element.id,
        nome: element.nome,
        email: element.email,
      });
    });

    return conselho;
  }
}
