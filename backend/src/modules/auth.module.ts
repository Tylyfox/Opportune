import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from './user.module';
import { AuthController } from '../controllers/auth.controller';
import { AuthService } from '../services/auth.service';
import { JwtService } from '../services/jwt.service'; // Ton service Jwt
import { JwtStrategy } from 'src/services/jwt.strategy';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET, // Ta clé secrète, doit être définie dans .env
      signOptions: { expiresIn: '1h' }, // Durée d'expiration du token
    }),
    UserModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtService, JwtStrategy], // Assure-toi d'ajouter JwtService ici
})
export class AuthModule {}
