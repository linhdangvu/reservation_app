import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeUser } from './typeuser.entity';

@Injectable()
export class TypeUsersService {

    constructor(@InjectRepository(TypeUser) private typeUsersRepository: Repository<TypeUser>) { }

    async getTypeUsers(): Promise<TypeUser[]> {
        return await this.typeUsersRepository.find();
    }

    async getTypeUser(_id: number): Promise<TypeUser> {
        return await this.typeUsersRepository.find({
            where: [{ "id": _id }]
        })[0];
    }

    async createTypeUser(typeUser: TypeUser) {
        this.typeUsersRepository.save(typeUser)
    }

    async updateTypeUser(typeUser: TypeUser) {
        this.typeUsersRepository.save(typeUser)
    }

    async deleteTypeUser(typeUser: TypeUser) {
        this.typeUsersRepository.delete(typeUser);
    }
}
