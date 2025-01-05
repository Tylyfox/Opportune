import { Controller, Post, Body, Response } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { Response as ExpressResponse } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

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
}
