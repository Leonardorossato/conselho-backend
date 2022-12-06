import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
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

    async create(dto: CreateConselhoDto){
        try {
            const conselho = await this.conselhoRepository.save(dto)
            return conselho
        } catch (error) {
            throw new HttpException('Erro to create conselho', HttpStatus.BAD_REQUEST)
        }
    }
}
