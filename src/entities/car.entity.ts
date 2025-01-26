import { Check, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('car')
@Check(`"year" > 1900 AND "year" < extract(year from now())`)
export class Car {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', name: 'brand', length: 128 })
  brand: string;

  @Column({ type: 'varchar', name: 'model', length: 128 })
  model: string;

  @Column({
    type: 'smallint',
    name: 'year',
  })
  year: number;

  @Column({ type: 'varchar', name: 'color', length: 128 })
  color: string;
}
