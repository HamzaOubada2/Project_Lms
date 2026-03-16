import { Body, Controller, Delete, Get, Param, ParseIntPipe, Put } from "@nestjs/common";
import { UserService } from "./users.service";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { UpdateUserDto } from "./dtos/update-user.dto";


@ApiTags('Users')
@ApiBearerAuth()
@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UserService){}

    @Get()
    findAll(){
        return this.usersService.findAll();
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id:number){
        return this.usersService.findOne(id);
    }

    @Put(':id')
    update(@Param('id', ParseIntPipe) id:number, @Body() updateUserDto: UpdateUserDto){
        return this.usersService.update(id, updateUserDto);
    }

    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id:number){
        return this.usersService.remove(id);
    }

}