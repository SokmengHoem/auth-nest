import { EntityManager } from "typeorm";

export async function clearData(manager: EntityManager) {
    // Clear existing data by truncating tables
    await manager.query(`TRUNCATE TABLE user_permissions, user_roles, role_permissions, permissions, roles, users RESTART IDENTITY CASCADE;`);
    console.log('Existing data cleared');
}