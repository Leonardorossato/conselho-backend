import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Conselho {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, unique: true })
  text: string;

  @Column()
  traducao: string;
}
