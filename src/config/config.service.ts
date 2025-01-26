import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

type DbType =
  | 'mysql'
  | 'mariadb'
  | 'mongodb'
  | 'postgres'
  | 'sqlite'
  | 'better-sqlite3';

@Injectable()
export class DbConfigService {
  constructor(private readonly config: ConfigService) {}

  get type(): DbType {
    return this.config.get<DbType>('db.type');
  }

  get host(): string {
    return this.config.get<string>('db.host');
  }

  get port(): number {
    return parseInt(this.config.get<string>('db.port'), 10);
  }

  get username(): string {
    return this.config.get<string>('db.username');
  }

  get password(): string {
    return this.config.get<string>('db.password');
  }

  get database(): string {
    return this.config.get<string>('db.database');
  }

  get debug(): boolean {
    return this.config.get<boolean>('db.debug');
  }

  get logging(): boolean {
    return this.config.get<boolean>('db.logging');
  }
}
