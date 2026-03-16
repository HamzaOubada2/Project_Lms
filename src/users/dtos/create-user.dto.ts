import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsEnum, IsOptional, IsString, MinLength } from "class-validator";
import { UserRole } from "src/constants/UserRole";


export class CreateUserDto {
    @ApiProperty({ example: 'John' })
    @IsString()
    firstname: string;


    @ApiProperty({ example: 'Doe' })
    @IsString()
    lastname: string;


    @ApiProperty({ example: 'john.doe@example.com' })
    @IsEmail()
    email: string;

    @ApiProperty({ example: 'password123', minItems: 6 })
    @IsString()
    @MinLength(6)
    password: string;

    @ApiProperty({ enum: UserRole, default: UserRole.STUDENT })
    @IsEnum(UserRole)
    @IsOptional()
    role?: UserRole;
}