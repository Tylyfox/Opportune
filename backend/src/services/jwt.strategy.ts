import { Injectable } from '@nestjs/common';
import { JwtService } from './jwt.service';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly jwtService: JwtService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: Request) => {
          return req?.cookies?.jwt; // Cherche le JWT dans les cookies
        },
      ]),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET, // Utilise ta clé secrète
    });
  }

  async validate(payload: any) {
    // La méthode validate est appelée lorsque le token est valide
    // Le payload contient les données que tu as mises dans le token (ex : user.id, user.email)
    return { userId: payload.sub, email: payload.email };
  }
}
