import { Injectable } from '@nestjs/common';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Car } from 'src/entities';
import { Repository } from 'typeorm';

@Injectable()
export class CarsService {
  constructor(
    @InjectRepository(Car)
    private carRepository: Repository<Car>,
  ) {}

  create(createCarDto: CreateCarDto) {
    return this.carRepository.save(createCarDto);
  }

  findAll() {
    const builder = this.carRepository.createQueryBuilder('car');
    return builder.getMany();
  }

  findOne(id: number) {
    const builder = this.carRepository.createQueryBuilder('car');
    return builder.where('car.id = :id', { id }).getOne();
  }

  update(id: number, updateCarDto: UpdateCarDto) {
    return `This action updates a #${id} car`;
  }

  remove(id: number) {
    const builder = this.carRepository.createQueryBuilder('car');
    return builder.delete().where('car.id = :id', { id }).execute();
  }
}
