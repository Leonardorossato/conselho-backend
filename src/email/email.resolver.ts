import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateEmailInput } from './dto/create-email.input';
import { EmailService } from './email.service';
import { EmailSchema } from './schema/email.schema';

@Resolver(() => EmailSchema)
export class EmailResolver {
  constructor(private readonly emailService: EmailService) {}

  @Mutation(() => EmailSchema)
  createEmail(@Args('createEmailInput') createEmailInput: CreateEmailInput) {
    return this.emailService.create(createEmailInput);
  }

  @Query(() => [EmailSchema], { name: 'email' })
  findAll() {
    return this.emailService.findAll();
  }
}
