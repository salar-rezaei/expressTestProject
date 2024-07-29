import { IsEmail, IsDefined, MinLength } from "class-validator"

export default class loginDto {
    @IsEmail()
    @IsDefined()
    email: string;
    @IsDefined()
    @MinLength(6)
    password: string;
}