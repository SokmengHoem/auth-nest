import e from "express";
import { Permission } from "src/permission/entities/permission.entity";
import { EntityManager } from "typeorm";


export async function seedPermission(manager: EntityManager) {
    const permissions = [
        { name: 'Create User', slug: 'create_user', description: 'Allows the creation of a new user' },
        { name: 'View User', slug: 'view_user', description: 'Allows viewing of user details' },
        { name: 'Update User', slug: 'update_user', description: 'Allows updating of user details' },
        { name: 'Delete User', slug: 'delete_user', description: 'Allows deletion of a user' },
    ];

    for (const permissionData of permissions) {
        const existingPermission = await manager.findOne(Permission, {where: {slug: permissionData.slug}});
        if(!existingPermission) {
            const permission = manager.create(Permission, permissionData);
            await manager.save(permission);
        }
    }
    console.log('Permissions seeded successfully.');
}