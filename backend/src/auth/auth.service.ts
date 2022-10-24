import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
var randtoken = require('rand-token');
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService,
              private jwtService: JwtService) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    if (user) {
      const { password, ...result } = user;
      const isMatch = await bcrypt.compare(pass, user.password);
      if(isMatch){
        return result;
      }
    }
    return null;
  }

  async generateRefreshToken(userId):  Promise<string>{
    var refreshToken = randtoken.generate(16);
    var expirydate =new Date();
    expirydate.setDate(expirydate.getDate() + 6);
    await this.usersService.saveorupdateRefreshToke(refreshToken, userId, expirydate);
    return refreshToken
  }

  async login(user: any) {
    const payload = { username: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
      refresh_token: await this.generateRefreshToken(user.id)
    };
  }
}