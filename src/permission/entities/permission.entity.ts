// permission.entity.ts
import { BaseEntity } from 'src/common/base.entity';
import { UserRole } from 'src/role/entities/role.entity';
import { Column, Entity, ManyToMany } from 'typeorm';

@Entity('permissions')
export class Permission extends BaseEntity {
  @Column({ type: 'varchar', length: 50 })
  name: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  slug: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @ManyToMany(() => UserRole, (role) => role.permissions)
  roles: UserRole[];
}
