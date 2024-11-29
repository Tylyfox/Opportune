import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'user',
  password: 'password',
  database: 'opportune_db',
  entities: [__dirname + '/../**/*.entity{.ts,.js}'], // Assurez-vous du chemin
  synchronize: true,
});
