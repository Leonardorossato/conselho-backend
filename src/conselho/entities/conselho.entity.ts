import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Conselho{
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    texto: string

    @Column()
    traducao: string
}