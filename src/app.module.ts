import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import * as entities from './entities';
import '../database/data-source';
import { ConfigModule } from '@nestjs/config';
import { HealthModule } from './health/health.module';
import { AuthModule } from './auth/auth.module';
import config from './config/config';
import { DbConfigService } from './config/config.service';
import { DbConfigModule } from './config/config.module';
import { CarsModule } from './cars/cars.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
    }),
    TypeOrmModule.forRootAsync({
      inject: [DbConfigService],
      useFactory: async (config: DbConfigService) => ({
        type: config.type,
        host: config.host,
        port: config.port,
        username: config.username,
        password: config.password,
        database: config.database,
        entities: Object.values(entities),
        synchronize: false,
        logging: config.logging,
      }),
      imports: [DbConfigModule],
    }),
    UserModule,
    HealthModule,
    AuthModule,
    ConfigModule,
    CarsModule,
  ],
})
export class AppModule {}
