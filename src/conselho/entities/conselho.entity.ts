import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Conselho{
    @PrimaryColumn()
    id: number

    @Column({nullable: false, unique: true})
    text: string

    @Column()
    Translation: string
}