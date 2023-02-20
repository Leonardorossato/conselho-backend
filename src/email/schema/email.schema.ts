import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class EmailSchema {
  @Field()
  id: number;

  @Field(() => String)
  email: string;

  @Field(() => String)
  nome: string;
}
