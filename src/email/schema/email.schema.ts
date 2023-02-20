import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class EmailSchema {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  email: string;

  @Field(() => String)
  nome: string;
}
