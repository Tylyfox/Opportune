import { Injectable } from '@nestjs/common';
import { JwtService as NestJwtService } from '@nestjs/jwt';

@Injectable()
export class JwtService {
  constructor(private readonly jwtService: NestJwtService) {}

  // Méthode pour générer un token
  sign(payload: any): string {
    return this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET, // Assure-toi d'ajouter la clé secrète dans ton .env
      expiresIn: '1h', // Le token expire après 1 heure
    });
  }

  // Méthode pour vérifier un token
  verify(token: string): any {
    try {
      return this.jwtService.verify(token, { secret: process.env.JWT_SECRET });
    } catch (error) {
      throw new Error('Invalid token');
    }
  }
}
