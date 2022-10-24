import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeUsersService } from './typeusers.service';
import { TypeusersController } from './typeusers.controller';
import { TypeUser } from './typeuser.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TypeUser])],
  providers: [TypeUsersService],
  controllers: [TypeusersController]
})

export class TypeusersModule {}
