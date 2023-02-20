import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ConselhoSchema {
  @Field(() => ID)
  id: number;

  @Field(() => String)
  text: string;

  @Field(() => String)
  traducao: string;
}
