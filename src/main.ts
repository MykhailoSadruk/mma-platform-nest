import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DataSource } from 'typeorm';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const dataSource = new DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'root',
    password: 'root',
    database: 'database',
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    synchronize: true,
  })
  
  await dataSource.initialize()
  await app.listen(3000);
}
bootstrap();
