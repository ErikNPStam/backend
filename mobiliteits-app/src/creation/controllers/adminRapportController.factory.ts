import { AdminRapportService } from "../../business/service/adminRapport.Service";
import { AdminRapportMySqlDatabase } from "../../data/databases/adminRapportMySqlDatabase";
import { AdminRapportSequelizeDatabase } from "../../data/databases/adminRapportSequelizeDatabase";
import { AdminRapportController } from "../../controller/adminRapportController";

/**
 * Factory for the AdminRapportController.
 * Creates a singleton instance of the AdminRapportController.
 */
export class AdminRapportControllerFactory {

    // Singleton instance of the AdminRapportController.
    private static controllerInstance: AdminRapportController | null = null;

    // Private constructor to prevent instantiation.
    private constructor() { }

    /**
     * Gets the AdminRapportController instance.
     * @returns The AdminRapportController instance.
     * @author Erik Stam
     */
    public static getControllerInstance(): AdminRapportController {
        if (AdminRapportControllerFactory.controllerInstance == null) {
            const adminRapportDatabase = (process.env.DATA_LAYER === "sequelize" && new AdminRapportSequelizeDatabase()) || new AdminRapportMySqlDatabase();
            const adminRapportService = new AdminRapportService(adminRapportDatabase);

            AdminRapportControllerFactory.controllerInstance = new AdminRapportController(adminRapportService);
        }

        return AdminRapportControllerFactory.controllerInstance;
    }
}