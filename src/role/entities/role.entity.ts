// role.entity.ts
import { BaseEntity } from 'src/common/base.entity';
import { Permission } from 'src/permission/entities/permission.entity';
import { User } from 'src/user/entities/user.entity';
import { Column, Entity, ManyToMany, JoinTable } from 'typeorm';

@Entity('roles')
export class UserRole extends BaseEntity {
  @Column({ type: 'varchar', length: 50, unique: true })
  name: string;

  @ManyToMany(() => Permission, (permission) => permission.roles)
  @JoinTable({
    name: 'role_permissions',
    joinColumn: { name: 'role_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'permission_id', referencedColumnName: 'id' },
  })
  permissions: Permission[];

  @ManyToMany(() => User, (user) => user.roles)
  users: User[];
}
