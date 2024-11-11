import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class MyTable1730991730598 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Ensure the uuid-ossp extension is available for UUID generation
        await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`);

        // Create Users Table
        await queryRunner.createTable(
            new Table({
                name: 'users',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                        generationStrategy: 'uuid',
                        default: 'uuid_generate_v4()',
                    },
                    { name: 'username', type: 'varchar', length: '255' },
                    { name: 'email', type: 'varchar', length: '255', isUnique: true },
                    { name: 'password', type: 'varchar', length: '255' },
                    { name: 'created_at', type: 'timestamp', default: 'now()' },
                    { name: 'updated_at', type: 'timestamp', isNullable: true },
                    { name: 'created_by', type: 'varchar', isNullable: true },
                    { name: 'updated_by', type: 'varchar', isNullable: true },
                    { name: 'deleted_at', type: 'timestamp', isNullable: true },
                ],
            })
        );

        // Create Roles Table
        await queryRunner.createTable(
            new Table({
                name: 'roles',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                        generationStrategy: 'uuid',
                        default: 'uuid_generate_v4()',
                    },
                    { name: 'name', type: 'varchar', length: '255', isUnique: true },
                    { name: 'created_at', type: 'timestamp', default: 'now()' },
                    { name: 'updated_at', type: 'timestamp', isNullable: true },
                    { name: 'created_by', type: 'varchar', isNullable: true },
                    { name: 'updated_by', type: 'varchar', isNullable: true },
                    { name: 'deleted_at', type: 'timestamp', isNullable: true },
                ],
            })
        );

        // Create Permissions Table
        await queryRunner.createTable(
            new Table({
                name: 'permissions',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                        generationStrategy: 'uuid',
                        default: 'uuid_generate_v4()',
                    },
                    { name: 'name', type: 'varchar', length: '255' },
                    { name: 'slug', type: 'varchar', length: '255', isUnique: true },
                    { name: 'description', type: 'text', isNullable: true },
                    { name: 'created_at', type: 'timestamp', default: 'now()' },
                    { name: 'updated_at', type: 'timestamp', isNullable: true },
                    { name: 'created_by', type: 'varchar', isNullable: true },
                    { name: 'updated_by', type: 'varchar', isNullable: true },
                    { name: 'deleted_at', type: 'timestamp', isNullable: true },
                ],
            })
        );

        // Create user_roles Join Table
        await queryRunner.createTable(
            new Table({
                name: 'user_roles',
                columns: [
                    { name: 'user_id', type: 'uuid', isPrimary: true },
                    { name: 'role_id', type: 'uuid', isPrimary: true },
                ],
            })
        );

        // Foreign Keys for user_roles table
        await queryRunner.createForeignKeys('user_roles', [
            new TableForeignKey({
                columnNames: ['user_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'users',
                onDelete: 'CASCADE',
            }),
            new TableForeignKey({
                columnNames: ['role_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'roles',
                onDelete: 'CASCADE',
            }),
        ]);

        // Create user_permissions Join Table
        await queryRunner.createTable(
            new Table({
                name: 'user_permissions',
                columns: [
                    { name: 'user_id', type: 'uuid', isPrimary: true },
                    { name: 'permission_id', type: 'uuid', isPrimary: true },
                ],
            })
        );

        // Foreign Keys for user_permissions table
        await queryRunner.createForeignKeys('user_permissions', [
            new TableForeignKey({
                columnNames: ['user_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'users',
                onDelete: 'CASCADE',
            }),
            new TableForeignKey({
                columnNames: ['permission_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'permissions',
                onDelete: 'CASCADE',
            }),
        ]);

        // Create role_permissions Join Table
        await queryRunner.createTable(
            new Table({
                name: 'role_permissions',
                columns: [
                    { name: 'role_id', type: 'uuid', isPrimary: true },
                    { name: 'permission_id', type: 'uuid', isPrimary: true },
                ],
            })
        );

        // Foreign Keys for role_permissions table
        await queryRunner.createForeignKeys('role_permissions', [
            new TableForeignKey({
                columnNames: ['role_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'roles',
                onDelete: 'CASCADE',
            }),
            new TableForeignKey({
                columnNames: ['permission_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'permissions',
                onDelete: 'CASCADE',
            }),
        ]);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Drop join tables first to avoid foreign key issues
        await queryRunner.dropTable('role_permissions');
        await queryRunner.dropTable('user_permissions');
        await queryRunner.dropTable('user_roles');

        // Drop main tables
        await queryRunner.dropTable('permissions');
        await queryRunner.dropTable('roles');
        await queryRunner.dropTable('users');
    }
}
