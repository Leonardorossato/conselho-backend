import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class CreateEmailDto {

    @ApiProperty({example: 'Fulano de Tal'})
    @IsString()
    @IsNotEmpty()
    nome: string

    @ApiProperty({example: 'meu@gmail.com'})
    @IsEmail()
    @IsString()
    email: string;

}