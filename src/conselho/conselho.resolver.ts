import { Query, Resolver } from '@nestjs/graphql';
import { ConselhoService } from './conselho.service';
import { ConselhoSchema } from './schema/conselho.schema';

@Resolver(() => ConselhoSchema)
export class ConselhoResolver {
  constructor(private readonly conselhoService: ConselhoService) {}

  @Query(() => [ConselhoSchema], { name: 'conselho' })
  async findAll() {
    return await this.conselhoService.findAll();
  }

  @Query(() => [ConselhoSchema], { name: 'getconselhoApi' })
  async getConselhoApi() {
    return await this.conselhoService.getConselhoApi();
  }

  @Query(() => [ConselhoSchema], { name: 'conselhoAleatorio' })
  async conselhoAleatorio() {
    return await this.conselhoService.getConselhoAleatorio();
  }

  @Query(() => [ConselhoSchema], { name: 'translate' })
  async translate() {
    return await this.conselhoService.translateConselho();
  }
}
