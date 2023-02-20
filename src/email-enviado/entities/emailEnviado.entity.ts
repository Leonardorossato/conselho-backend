import { Conselho } from '../../conselho/entities/conselho.entity';
import { Email } from '../../email/entities/email.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class EmailEnviado {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  data: string;

  @ManyToOne(() => Email)
  @JoinColumn({name: 'emailId'})
  email: Email;

  @Column({nullable: false})
  emailId: number;

  @ManyToOne(() => Conselho)
  @JoinColumn({name: 'conselhoId'})
  conselho: Conselho;

  @Column({ nullable: false })
  conselhoId: number;
}
