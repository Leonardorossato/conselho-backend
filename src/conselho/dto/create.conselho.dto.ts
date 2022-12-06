import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateConselhoDto {
    @ApiProperty({ example: 'testando'})
    @IsString()
    @IsNotEmpty()
    texto: string

    @ApiProperty({example: 'tradução', description: 'tradução do texto'})
    @IsNotEmpty()
    @IsString()
    traducao: string;

}

