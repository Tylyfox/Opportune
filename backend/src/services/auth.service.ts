import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from './User.service';

@Injectable()
export class AuthService {
  constructor(private usersService: UserService) {}

  async signIn(email: string, pass: string): Promise<any> {
    const user = await this.usersService.validateUser(email, pass);
    if (!user) {
      throw new UnauthorizedException();
    }
    const { password, ...result } = user;
    // TODO: Generate a JWT and return it here
    // instead of the user object

    return result;
  }
}