import { DataSource, DataSourceOptions } from 'typeorm';
import * as dotenv from 'dotenv';
import { User } from '../src/user/entities/user.entity';
import { UserRole } from '../src/role/entities/role.entity';
import { Permission } from '../src/permission/entities/permission.entity';

dotenv.config();

const isCompiled = __dirname.includes('dist');

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  url: process.env.DATABASE_URL,
  ssl: process.env.DB_SSL === 'require' ? { rejectUnauthorized: false } : false,
  entities: isCompiled
    ? ['dist/**/*.entity{.ts,.js}']  // For production (compiled files)
    : [User, UserRole, Permission],  // For development and seeding with ts-node
  migrations: isCompiled
    ? ['dist/database/migrations/*{.ts,.js}']
    : ['database/migrations/*{.ts,.js}'],
  synchronize: false,
};

export const AppDataSource = new DataSource(dataSourceOptions);
