import { Injectable } from '@nestjs/common';
import { Conselho } from '../entities/conselho.entity';
import { ConselhoSchema } from '../schema/conselho.schema';

@Injectable()
export class ConselhoHelper {
  formatCustomerResponse(data: Array<Conselho>): Array<ConselhoSchema> {
    if (!data) {
      return [];
    }

    const conselho: ConselhoSchema[] = [];

    data.forEach((element: Conselho) => {
      conselho.push({
        id: element.id,
        text: element.text,
        traducao: element.traducao,
      });
    });

    return conselho;
  }
}
