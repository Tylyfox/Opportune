import { Controller, Post, Body, Response } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { Response as ExpressResponse } from 'express';
import { CreateUserDto } from '../dto/user/create.user.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('signin')
    async signIn(@Body() body: { email: string; password: string }, @Response() res: ExpressResponse) {
        const { accessToken } = await this.authService.signIn(body.email, body.password);

        // Envoie le token dans un cookie HTTP-only
        res.cookie('jwt', accessToken, {
            httpOnly: true, // Sécurise le cookie
            secure: process.env.NODE_ENV === 'production', // Utilise secure en production
            maxAge: 3600000, // Durée de vie du cookie (1h)
        });

        return res.send({ message: 'Successfully signed in' });
    }

    @Post('signup')
    async signUp(@Body() createUserDto: CreateUserDto) {
        const { accessToken } = await this.authService.signUp(createUserDto);
        return { message: 'Successfully signed up' };
    }

    @Post('logout')
    async logout(@Response() res: ExpressResponse) {
        // Supprimer le cookie JWT
        res.clearCookie('jwt');

        return res.send({ message: 'Successfully logged out' });
    }
}
