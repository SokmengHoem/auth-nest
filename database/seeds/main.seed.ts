import { AppDataSource } from "database/data-source";
import { EntityManager } from "typeorm";
import { seedPermission } from "./permission.seed";
import { seedRoles } from "./role.seed";
import { seedSuperAdmin } from "./user.seed";
import { clearData } from "./setup-cleardb.seed";


async function main() {
    await AppDataSource.initialize();
    await AppDataSource.transaction(async (manager: EntityManager) => {
         // Clear data before seeding
         await clearData(manager);

         // Seed new data
        await seedPermission(manager);
        await seedRoles(manager);
        await seedSuperAdmin(manager);
    });
    console.log('Database seeding completed');
    await AppDataSource.destroy();
}

main().catch((error) => {
    console.error('Error seeding data:', error);
})