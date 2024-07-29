import { IsEmail, MaxLength, IsDefined, MinLength } from "class-validator"

export default class registerDto {
    @MaxLength(20)
    @IsDefined()
    name: string;
    @IsEmail()
    @IsDefined()
    email: string;
    @IsDefined()
    @MinLength(6)
    password: string;
}
