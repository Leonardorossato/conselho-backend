import { Args, Int, Query, Resolver } from '@nestjs/graphql';
import { EmailEnviadoService } from './email-enviado.service';
import { EmailEnviadoSchema } from './schema/email-enviado.schema';

@Resolver(() => EmailEnviadoSchema)
export class EmailEnviadoResolver {
  constructor(private readonly emailEnviadoService: EmailEnviadoService) {}

  @Query(() => [EmailEnviadoSchema], { name: 'emailEnviado' })
  findAll() {
    return this.emailEnviadoService.findAll();
  }

  @Query()
  async sendEmail(
    @Args({ name: 'conselhoId', type: () => Number }) conselhoId: number,
    @Args({ name: 'emailId', type: () => Number }) emailId: number,
  ) {
    return await this.emailEnviadoService.enviarEmails(conselhoId, emailId);
  }
}
