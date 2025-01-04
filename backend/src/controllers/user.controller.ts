import { Controller, Post, Body } from "@nestjs/common";
import { CreateUserDto } from "src/dto/user/create.user.dto";
import { UserService } from "src/services/User.service";

@Controller('user')
export class UserController {
    constructor(
        private readonly userService: UserService
    ) {}
    
    @Post('register')
    async register(@Body() createUserDto: CreateUserDto) {
        return this.userService.create(
            createUserDto.email, 
            createUserDto.password, 
            createUserDto.firstName, 
            createUserDto.lastName
        );
    }
}