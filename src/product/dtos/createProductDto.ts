import { IsEmail, MaxLength, IsDefined, MinLength, IsOptional } from "class-validator"

export default class productDto {
    @MaxLength(20)
    @IsDefined()
    name: string;
    @IsDefined()
    code: string;
    @IsOptional()
    @MinLength(6)
    description: string;
}