import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsPositive, IsString } from "class-validator";

export class CreateConselhoDto {
    @IsPositive()
    id: number;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    texto: string

    @ApiProperty()
    @IsString()
    traducao!: string;

}

