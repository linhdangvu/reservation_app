import { Controller, Post, Body, Get, Put, Delete,Param} from '@nestjs/common';
import { TypeUsersService } from './typeusers.service';
import { TypeUser } from './typeuser.entity';

@Controller('typeusers')
export class TypeusersController {

    constructor(private service: TypeUsersService) { }
    
    @Get()
    getAll(@Param() params) {
        return this.service.getTypeUsers();
    }

    @Get(':id')
    get(@Param() params) {
        return this.service.getTypeUser(params.id);
    }

    @Post()
    create(@Body() typeuser: TypeUser) {
        return this.service.createTypeUser(typeuser);
    }

    @Put()
    update(@Body() typeuser: TypeUser) {
        return this.service.updateTypeUser(typeuser);
    }

    @Delete(':id')
    deleteUser(@Param() params) {
        return this.service.deleteTypeUser(params.id);
    }
}
