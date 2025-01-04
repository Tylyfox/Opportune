import { Controller, Post, Body, Param, Patch, Delete } from "@nestjs/common";
import { CreateUserDto } from "src/dto/user/create.user.dto";
import { UpdateUserDto } from "src/dto/user/update.user.dto";
import { UserService } from "src/services/User.service";

@Controller('user')
export class UserController {
    constructor(
        private readonly userService: UserService
    ) {}
    
    @Post('register')
    async register(@Body() createUserDto: CreateUserDto) {
        return this.userService.create(createUserDto);
    }
    @Patch('update/:id')
    async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
        return this.userService.update(id, updateUserDto);
    }
    @Delete('delete/:id')
    async delete(@Param('id') id: string) {
        return this.userService.delete(id);
    }
}