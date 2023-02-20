import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateEmailEnviadoInput {
  @Field(() => String)
  data: Date;

  @Field(() => Int)
  emailId: number;

  @Field(() => Int)
  conselhoId: number;
}
