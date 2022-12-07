import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import axios from 'axios';
import { Repository } from 'typeorm';
import { CreateConselhoDto } from './dto/create.conselho.dto';
import { Conselho } from './entities/conselho.entity';

@Injectable()
export class ConselhoService {
    constructor(@InjectRepository(Conselho) private readonly conselhoRepository: Repository<Conselho>) { }

    async all(): Promise<Conselho[]> {
        try {
            const conselho = await this.conselhoRepository.find()
            return conselho
        } catch (error) {
            throw new HttpException('Conselho not found', HttpStatus.NOT_FOUND)
        }
    }

    async getConselhoApi() {
        const conselho = await this.conselhoRepository
        const quantidadeExistente = await conselho.count()
        if (quantidadeExistente === 50) throw new Error(`Quantity maximum: ${quantidadeExistente}`)

        for (let index = quantidadeExistente; index < 50; index++) {
            await axios.get('https://api.adviceslip.com/advice').then(async function (response) {
                let conselhoExistente = await conselho.findOneBy({ id: response.data.slip.id })
                if (conselhoExistente) {
                    index--
                    return 'Id already existis'
                }
                await conselho.save({
                    id: response.data.slip.id,
                    texto: response.data.slip.advice
                })
            })
                .catch(function (error) {
                    // manipula erros da requisição
                    console.error(error.response.status);
                })
            setTimeout(() => {

            }, 3000)
        }
    }

    async getConselhoAleatorio() {
        const conselho = await this.conselhoRepository
        const array = await conselho.createQueryBuilder()
            .select('*')
            .from(Conselho, 'conselho')
            .orderBy('RANDOM()')
            .limit(1)
            .execute();
            console.log(array)
        return array[0];
    }
}



