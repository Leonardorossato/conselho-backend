import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class EmailEnviadoSchema {
  @Field(() => ID)
  id: number;

  @Field(() => String)
  data: string;

  @Field(() => ID)
  emailId: number;

  @Field(() => ID)
  conselhoId: number;
}
