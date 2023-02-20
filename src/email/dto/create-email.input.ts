import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateEmailInput {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  email: string;

  @Field(() => String)
  nome: string;
}
