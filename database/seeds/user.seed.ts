import { UserRole } from 'src/role/entities/role.entity';
import { User } from 'src/user/entities/user.entity';
import { EntityManager } from 'typeorm';
import * as bcrypt from 'bcrypt';

export async function seedSuperAdmin(manager: EntityManager) {
  const superAdminRole = await manager.findOne(UserRole, {
    where: { name: 'super_admin' },
  });

  if (!superAdminRole) {
    console.error("Super Admin role doesn't exist. Run role seeding first.");
    return;
  }

  const existingSuperAdmin = await manager.findOne(User, {where: {
    email: process.env.SUPER_ADMIN_EMAIL,
  }})

  if(existingSuperAdmin){
    console.log('Super Admin already exists. Skipping creation.');
    return;
  }

  const hashedPassword =await bcrypt.hash(process.env.SUPER_ADMIN_PASSWORD, 10);

  const superAdminUser = manager.create(User, {
    username: process.env.SUPER_ADMIN_USERNAME,
    email: process.env.SUPER_ADMIN_EMAIL,
    password: hashedPassword,
    roles: [superAdminRole],
  });

  await manager.save(superAdminUser);
  console.log('Super Admin user created successfully.');
}
