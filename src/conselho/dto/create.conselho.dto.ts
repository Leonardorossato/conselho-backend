import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateConselhoDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    texto: string

    @ApiProperty()
    @IsString()
    traducao!: string;

}

