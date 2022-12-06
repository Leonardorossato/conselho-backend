import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import axios from 'axios';
import { Repository } from 'typeorm';
import { CreateConselhoDto } from './dto/create.conselho.dto';
import { Conselho } from './entities/conselho.entity';

@Injectable()
export class ConselhoService {
    constructor(@InjectRepository(Conselho) private readonly conselhoRepository: Repository<Conselho>){}

    async all(): Promise<Conselho[]>{
        try {
            const conselho = await this.conselhoRepository.find()
            return conselho
        } catch (error) {
            throw new HttpException('Conselho not found', HttpStatus.NOT_FOUND)
        }
    }

    
    async getConselhoApi(){
    const conselho = this.conselhoRepository
        axios.get('https://api.adviceslip.com/advice').then(function (response) {
            const id = response.data.slip.id
            console.log(id)
            if(!conselho.find(id)){
                return 'Id already existis'
            }
            conselho.save({
                id: response.data.slip.id,
                texto: response.data.slip.advice
            })   
            console.log(response);
          })
          .catch(function (error) {
            // manipula erros da requisição
            console.error(error);
          })
    }
}
