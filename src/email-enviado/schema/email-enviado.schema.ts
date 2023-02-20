import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class EmailEnviadoSchema {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  data: string;

  @Field(() => Int)
  emailId: number;

  @Field(() => Int)
  conselhoId: number;
}
