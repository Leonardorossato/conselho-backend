import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { translate } from '@vitalets/google-translate-api';
import axios from 'axios';
import { Repository } from 'typeorm';
import { Conselho } from './entities/conselho.entity';
import { ConselhoHelper } from './helpers/conselho.helper';
@Injectable()
export class ConselhoService {
  constructor(
    @InjectRepository(Conselho)
    private readonly conselhoRepository: Repository<Conselho>,
    private readonly conselhoHelper: ConselhoHelper,
  ) {}

  async findAll(): Promise<Conselho[]> {
    try {
      const conselho = await this.conselhoRepository.find();
      await this.conselhoHelper.formatCustomerResponse(conselho);
      return conselho;
    } catch (error) {
      throw new HttpException(
        'Error to find all cosnelhos',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getConselhoApi() {
    try {
      const conselho = await this.conselhoRepository;
      const quantidadeExistente = await conselho.count();
      if (quantidadeExistente === 50)
        throw new Error(`Quantity maximum: ${quantidadeExistente}`);

      for (let index = quantidadeExistente; index < 50; index++) {
        await axios
          .get('https://api.adviceslip.com/advice')
          .then(async function (response) {
            const conselhoExistente = await conselho.findOneBy({
              id: response.data.slip.id,
            });
            if (conselhoExistente) {
              index--;
              return 'Id already existis';
            }
            await conselho.save({
              id: response.data.slip.id,
              texto: response.data.slip.advice,
            });
          })
          .catch((error) =>{
            console.error(error);
          });
        setTimeout(() => {}, 3000);
      }
    } catch (error) {
      throw new HttpException(
        'Error to get a conselho with the api',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async getConselhoAleatorio() {
    const conselho = await this.conselhoRepository;
    const array = await conselho
      .createQueryBuilder()
      .select('*')
      .from(Conselho, 'conselho')
      .orderBy('RANDOM()')
      .limit(1)
      .execute();
    await this.conselhoHelper.formatCustomerResponse(array);
    return array[0];
  }

  async translateConselho() {
    try {
      const texto = await this.conselhoRepository.find({
        where: { traducao: null },
      });
      texto.forEach(async (element) => {
        const textoTraduzido = await translate(element.texto, {
          from: 'en',
          to: 'pt',
        });
        await this.conselhoRepository.save({
          id: element.id,
          traducao: textoTraduzido.text,
        });
        setTimeout(() => {}, 3000);
      });
      await this.conselhoHelper.formatCustomerResponse(texto);
      return `Quantity de textos traduzidos ${texto.length}`;
    } catch (error) {
      throw new HttpException(
        'Error to translate all conselhos',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
