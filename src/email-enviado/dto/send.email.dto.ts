import { ApiProperty } from "@nestjs/swagger";
import { IsEmail } from "class-validator";

export class SendConslhoToEamilDTO{
    @ApiProperty()
    @IsEmail()
    email: string;

    @ApiProperty()
    subject: string;
    
    @ApiProperty()
    html: string;
}