import { IsEmail, MaxLength, IsDefined, IsOptional, MinLength } from "class-validator"

class CreateUserDto {
    @MaxLength(20)
    @IsDefined()
    name: string;
    @IsEmail()
    @IsDefined()
    email: string;
    @IsDefined()
    @MinLength(6)
    password: string;
    @IsOptional()
    age: string;
}

export default CreateUserDto;