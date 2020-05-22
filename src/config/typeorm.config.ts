import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'password123',
  database: 'tvlandia',
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  synchronize: true,
};
