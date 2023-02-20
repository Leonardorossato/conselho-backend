import { Query, Resolver } from '@nestjs/graphql';
import { EmailEnviadoService } from './email-enviado.service';
import { EmailEnviadoSchema } from './schema/email-enviado.schema';

@Resolver(() => EmailEnviadoSchema)
export class EmailEnviadoResolver {
  constructor(private readonly emailEnviadoService: EmailEnviadoService) {}

  @Query(() => [EmailEnviadoSchema], { name: 'emailEnviado' })
  findAll() {
    return this.emailEnviadoService.findAll();
  }

  @Query(() => [EmailEnviadoSchema], { name: 'enviarEmail' })
  async sendEmail() {
    return await this.emailEnviadoService.findAll();
  }
}
