import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import * as bcrypt from 'bcryptjs'

import { User } from "./user.entity";

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ) { }

    public async findAll(): Promise<User[]> {
        return this.userRepository.find()
    }

    public getUserByEmail(email): Promise<User> {
        return this.userRepository.findOne({ email: email })
    }

    public async updateUser(user: User, id?: number): Promise<User | NotFoundException> {
        const dbUser = await this.userRepository.findOne({ id: id })
        if(!dbUser){
            return new NotFoundException('User Not Found')
        }
        return this.userRepository.save(user)
    }

    public deleteUser(id: number) {
        return this.userRepository.delete({ id: id })
    }
    public saveUser(user: User) {
        const hashedPassword = bcrypt.hashSync(user.password, 8);
        user.password = hashedPassword
        return this.userRepository.save(user)
    }

    public async getUserById(id: number) {
        const user = await this.userRepository.findOne({ id: id })
        if (user) {
            return user
        } else {
            return new NotFoundException('NotFound')
        }
    }
}