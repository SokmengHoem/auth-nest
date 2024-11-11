// user.entity.ts
import { BaseEntity } from 'src/common/base.entity';
import { UserRole } from 'src/role/entities/role.entity';
import { Permission } from 'src/permission/entities/permission.entity';
import { Column, Entity, ManyToMany, JoinTable } from 'typeorm';

@Entity('users')
export class User extends BaseEntity {
  @Column()
  username: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @ManyToMany(() => UserRole)
  @JoinTable({
    name: 'user_roles',
    joinColumn: { name: 'user_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'role_id', referencedColumnName: 'id' },
  })
  roles: UserRole[];

  @ManyToMany(() => Permission)
  @JoinTable({
    name: 'user_permissions',
    joinColumn: { name: 'user_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'permission_id', referencedColumnName: 'id' },
  })
  permissions: Permission[];
}
