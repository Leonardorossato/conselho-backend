import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateEmailEnviadoInput } from './dto/create-email-enviado.input';
import { EmailEnviadoService } from './email-enviado.service';
import { EmailEnviadoSchema } from './schema/email-enviado.schema';

@Resolver(() => EmailEnviadoSchema)
export class EmailEnviadoResolver {
  constructor(private readonly emailEnviadoService: EmailEnviadoService) {}

  @Query(() => [EmailEnviadoSchema], { name: 'emailEnviado' })
  findAll() {
    return this.emailEnviadoService.findAll();
  }

  @Mutation(() => [EmailEnviadoSchema], { name: 'sendEmail' })
  async sendEmail() {
    return await this.emailEnviadoService.enviarEmails();
  }
}
