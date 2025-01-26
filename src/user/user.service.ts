import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findAll() {
    const builder = this.userRepository.createQueryBuilder('user');
    return builder.getMany();
  }

  async findById(id: number) {
    const builder = this.userRepository.createQueryBuilder('user');
    return builder.where('user.id = :id', { id }).getOne();
  }

  async create() {}

  async findByEmail(email: string): Promise<User> {
    const builder = this.userRepository.createQueryBuilder('user');
    return builder.where('user.email = :email', { email }).getOne();
  }
}
