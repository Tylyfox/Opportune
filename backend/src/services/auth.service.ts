import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UserService } from "./User.service";
import { CreateUserDto } from "src/dto/user/create.user.dto";
import { JwtService } from "./jwt.service";

@Injectable()
export class AuthService {
    constructor(
      private readonly userService: UserService,
      private readonly jwtService: JwtService,
    ) {}

    async signUp(createUserDto: CreateUserDto) {
        return this.userService.create(createUserDto);
    }

    async signIn(email: string, password: string) {
      const user = await this.userService.validateUser(email, password);
      if (!user) {
        throw new UnauthorizedException('Invalid credentials');
      }

      const payload = { sub: user.id, email: user.email};
      const accessToken = this.jwtService.sign(payload);

      return {accessToken};
    }
}