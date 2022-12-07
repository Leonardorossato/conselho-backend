import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ConselhoService } from './conselho.service';
import { CreateConselhoDto } from './dto/create.conselho.dto';

@ApiTags('Conselhos')
@Controller('conselho')
export class ConselhoController {
  constructor(private readonly conselhoService: ConselhoService) {}

  @Get('/all')
  async getAllConselhos(){
    return await this.conselhoService.all()
  }

  @Get('/get-conselho')
  async getConselhoApi(){
    return await this.conselhoService.getConselhoApi()
  }
  @Get('/get-conselho-aleatorio')
  async getConselhoAleatorio(){
    return await this.conselhoService.getConselhoAleatorio()
  }
  @Get('/translate-conselho')
  async translateConselho(){
    return await this.conselhoService.translateConselho()
  }
}
