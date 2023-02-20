import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateConselhoInput {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  text: string;

  @Field(() => String)
  traducao: string;
}
