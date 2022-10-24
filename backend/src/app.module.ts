import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeusersModule } from './typeusers/typeusers.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import * as config from '../ormconfig.json';

@Module({
  imports: [TypeOrmModule.forRoot({
                "type": "mysql",
                "host": config.host,
                "port": config.port,
                "username": config.username,
                "password": config.password,
                "database": config.database,
                "entities": ["dist/**/**.entity{.ts,.js}"],
                "synchronize": true
            }),
            TypeusersModule,
            UsersModule,
            AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
