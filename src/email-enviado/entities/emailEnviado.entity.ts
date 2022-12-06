import { Conselho } from "src/conselho/entities/conselho.entity";
import { Email } from "src/email/entities/email.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class EmailEnviado{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    data: string;

    @ManyToOne(() => Email, (email)=>email.id)
    email: Email

    @ManyToOne(() => Conselho, (conselho)=>conselho.id)
    conselho: Conselho
}