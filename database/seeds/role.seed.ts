import { Permission } from "src/permission/entities/permission.entity";
import { UserRole } from "src/role/entities/role.entity";
import { EntityManager } from "typeorm";


export async function seedRoles(manager:EntityManager) {
    const permissions = await manager.find(Permission);

    const roles = [
        {name: 'super_admin', permissions},
        {name: 'sub_admin', permissions: permissions.filter(p => ['view_user', 'update_user'].includes(p.slug))},
        {name: 'user', permissions: permissions.filter(p => p.slug === 'view_user')},
    ];

    for(const rolesData of roles) {
        const existingRole = await manager.findOne(UserRole, {where: {name: rolesData.name}});
        if(!existingRole){
            const role = manager.create(UserRole, rolesData);
            await manager.save(role);
        }
    }
    console.log('Roles seeded successfully.');
}