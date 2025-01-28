import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { RegisterDto } from 'src/auth/dto/register.dto';
import { hashSync } from 'bcrypt';
import { Role } from './enums/role.enum';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    const builder = this.userRepository.createQueryBuilder('user');
    return builder.getMany();
  }

  async findById(id: number): Promise<User> {
    const builder = this.userRepository.createQueryBuilder('user');
    return builder.where('user.id = :id', { id }).getOne();
  }

  async create(
    { email, password, firstName, lastName, username }: RegisterDto,
    role = Role.User,
  ): Promise<User> {
    const user = new User();
    user.email = email;
    user.password = hashSync(password, 10);
    user.firstName = firstName;
    user.lastName = lastName;
    user.username = username;
    user.role = role;

    return this.userRepository.save(user);
  }

  async findByEmail(email: string): Promise<User> {
    const builder = this.userRepository.createQueryBuilder('user');
    return builder.where('user.email = :email', { email }).getOne();
  }
}
