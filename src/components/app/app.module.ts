import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RedisModule } from 'nestjs-redis';
import { Module } from '@nestjs/common';

import LocationsModule from '@components/locations/locations.module';
import DistrictsModule from '@components/districts/districts.module';
import ReviewsModule from '@components/reviews/reviews.module';
import HousesModule from '@components/houses/houses.module';
import UsersModule from '@components/users/users.module';
import AuthModule from '@components/auth/auth.module';

import configuration from '../../config/configuration';
import AppController from './app.controller';
import AppService from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('database.host'),
        port: configService.get('database.port'),
        username: configService.get('database.username'),
        password: configService.get('database.password'),
        database: configService.get('database.name'),
        autoLoadEntities: true,
        synchronize: true,
        ssl: false,
      }),
      inject: [ConfigService],
    }),
    RedisModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        host: configService.get('redis.host'),
        port: configService.get('redis.port'),
        db: 0,
        password: configService.get('redis.password'),
        onClientReady: async (client): Promise<void> => {
          client.on('error', console.error);
          client.on('ready', () => {
            console.log('redis is running on 6379 port');
          });
          client.on('restart', () => {
            console.log('attempt to restart the redis server');
          });
        },
        reconnectOnError: (): boolean => true,
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    UsersModule,
    HousesModule,
    ReviewsModule,
    DistrictsModule,
    LocationsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export default class AppModule {
}
