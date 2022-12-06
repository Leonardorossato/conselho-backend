import { ApiProperty } from "@nestjs/swagger";

export class CreateEmailEnviadoDto{ 

    @ApiProperty({example: '12/10/1999'})
    data: Date

    @ApiProperty({})
    IdConselho: number;

    @ApiProperty({})
    IdEmail: number;

}