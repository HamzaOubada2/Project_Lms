import { Injectable, ConflictException, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./entities/user.entity";
import { Repository } from "typeorm";
import { CreateUserDto } from "./dtos/create-user.dto";
import * as bcrypt from "bcrypt";
import { UpdateUserDto } from "./dtos/update-user.dto";

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly usersRepository: Repository<User>,
    ) { }

    // Create User
    async create(createUserDto: CreateUserDto): Promise<User> {
        const existing = await this.usersRepository.findOne({
            where: { email: createUserDto.email },
        });

        if (existing) {
            throw new ConflictException("Email Already in use");
        }

        const hashed = await bcrypt.hash(createUserDto.password, 10);

        const user = this.usersRepository.create({
            ...createUserDto,
            password: hashed,
        });

        return this.usersRepository.save(user);
    }

    // FindAll
    async findAll(): Promise<User[]> {
        return this.usersRepository.find();
    }

    // Find One
    async findOne(id: number): Promise<User> {
        const user = await this.usersRepository.findOne({ where: { id } });
        if (!user) throw new NotFoundException(`User #${id} not found`);
        return user;
    }

    // Find By Email
    async findByEmail(email: string): Promise<User | null> {
        return this.usersRepository.findOne({ where: { email } })
    }

    // Update
    async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
        const user = await this.findOne(id);
        if (updateUserDto.password) {
            updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
        }
        Object.assign(user, updateUserDto);
        return this.usersRepository.save(user);
    }

    // Remove
    async remove(id: number): Promise<void> {
        const user = await this.findOne(id);
        await this.usersRepository.remove(user);
    }
}