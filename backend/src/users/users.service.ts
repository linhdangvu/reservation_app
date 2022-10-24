import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {

    constructor(@InjectRepository(User) private usersRepository: Repository<User>) { }

    async getUsers(): Promise<User[]> {
        return await this.usersRepository.find({relations:{type:true}});
    }

    async findOne(username: string): Promise<User | undefined> {
        let users= await this.usersRepository.find({relations:{type:true}, where: [{ "email": username }]});
        if(users.length==1){
            return users[0];
        }else{
            return undefined;
        }
    }

    async saveorupdateRefreshToke(refreshToken:string,
        id:string, 
        refreshtokenexpires){
        await this.usersRepository.update(id,{refreshtoken:refreshToken, refreshtokenexpires});
    }

    async getUser(_id: number): Promise<User| undefined> {
        return await this.usersRepository.find({
            relations:{type:true},
            where: [{ "id": _id }]
        })[0];
    }

    async createUser(user: User) {
        if(user.password){
            const password= user.password;
            const saltOrRounds = 10;
            const hash = await bcrypt.hash(password, saltOrRounds);
            user.password= hash;
        }
        this.usersRepository.save(user)
    }

    async updateUser(user: User) {
        if(user.password){
            const password= user.password;
            const saltOrRounds = 10;
            const hash = await bcrypt.hash(password, saltOrRounds);
            user.password= hash;
        }
        this.usersRepository.save(user)
    }

    async deleteUser(user: User) {
        this.usersRepository.delete(user);
    }
}
