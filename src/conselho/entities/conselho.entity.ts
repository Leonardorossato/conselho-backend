import {
  Column,
  Entity, PrimaryColumn
} from 'typeorm';

@Entity()
export class Conselho {
  @PrimaryColumn()
  id: number;

  @Column({ nullable: false, unique: true })
  texto: string;

  @Column()
  traducao: string;
}
