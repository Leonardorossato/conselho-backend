import { Controller } from '@nestjs/common';
import { ConselhoService } from './conselho.service';

@Controller('conselho')
export class ConselhoController {
  constructor(private readonly conselhoService: ConselhoService) {}
}
