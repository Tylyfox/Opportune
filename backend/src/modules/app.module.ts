import { Module } from '@nestjs/common';
import { AppController } from '../controllers/app.controller';
import { AppService } from '../services/app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppDataSource } from '../config/datasource';
import { UserModule } from './user.module';
import { AuthModule } from './auth.module'; // Ajoute AuthModule

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: async () => {
        await AppDataSource.initialize();
        return {
          ...AppDataSource.options,
        };
      },
    }),
    UserModule,
    AuthModule, // Ajoute AuthModule ici
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}