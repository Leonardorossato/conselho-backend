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

  @Post('/create')
  async createConselho(@Body() dto: CreateConselhoDto){
    return await this.conselhoService.create(dto)
  }
}
