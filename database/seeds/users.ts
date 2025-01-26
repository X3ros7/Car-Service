import * as users from '../fixtures/users.json';
import * as entities from '../../src/entities';
import config from '../config';
import { DataSource, DataSourceOptions } from 'typeorm';
import { Role } from '../../src/user/enums/role.enum';

const main = async () => {
  const dataSource = new DataSource({
    ...(config as DataSourceOptions),
    entities: Object.values(entities),
  });

  const connection = await dataSource.initialize();
  console.log('Connection established');

  const repo = connection.getRepository(entities.User);

  await Promise.all(
    users.map(async (user) => {
      await repo.save({
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        username: user.username,
        email: user.email,
        password: user.password,
        role: Role.Admin,
      });
    }),
  );

  await connection.destroy();

  console.log('Connection closed');
};

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
