import { Injectable, BadRequestException, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/entities/User.entity";
import { Repository } from "typeorm";
import { UpdateUserDto } from "src/dto/user/update.user.dto";
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from "src/dto/user/create.user.dto";
import { instanceToPlain } from "class-transformer";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) { }

  async findByEmail(email: string): Promise<User | undefined> {
    return this.userRepository.findOneBy({ email });
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const existingEmail = await this.findByEmail(createUserDto.email);
    if (existingEmail) {
      throw new BadRequestException('Email is already in use.');
    }
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const user = this.userRepository.create({ ...createUserDto, password: hashedPassword });
    const savedUser= await this.userRepository.save(user);
    return instanceToPlain(savedUser) as User;
  }

  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.findByEmail(email);
    if (user && (await bcrypt.compare(password, user.password))) {
      return user;
    }
    return null;
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Mettre à jour chaque champ si présent dans le DTO
    if (updateUserDto.email) {
      user.email = updateUserDto.email;
    }

    if (updateUserDto.password) {
      user.password = await bcrypt.hash(updateUserDto.password, 10); // Hasher le mot de passe
    }

    if (updateUserDto.firstName) {
      user.firstName = updateUserDto.firstName;
    }

    if (updateUserDto.lastName) {
      user.lastName = updateUserDto.lastName;
    }

    // Sauvegarder l'utilisateur avec les modifications
    return this.userRepository.save(user);
  }

  async delete(id: string): Promise<String> {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    await this.userRepository.remove(user);
    return "User deleted successfully";
  }

}