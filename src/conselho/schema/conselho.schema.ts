import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ConselhoSchema {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  text: string;

  @Field(() => String)
  traducao: string;
}
