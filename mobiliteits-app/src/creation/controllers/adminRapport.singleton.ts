import { AdminRapportService } from "../../business/service/adminRapport.Service";
import { AdminRapportController } from "../../controller/adminRapportController";
import { AdminRapportMySqlDatabase } from "../../data/databases/adminRapportMySqlDatabase";
import { AdminRapportSequelizeDatabase } from "../../data/databases/adminRapportSequelizeDatabase";
import { AdminRapportDatabase } from "../../data/interfaces/adminRapportDatabase";


export class AdminRapportControllerSingleton {

    private static instance: AdminRapportControllerSingleton | null = null
    private _controller: AdminRapportController | null = null;

    private constructor() { }

    public static getInstance(): AdminRapportControllerSingleton {
        if (AdminRapportControllerSingleton.instance == null) {
            AdminRapportControllerSingleton.instance = new AdminRapportControllerSingleton();

            const adminRapportDatabase: AdminRapportDatabase = (process.env.DATA_LAYER === "sequelize" && new AdminRapportSequelizeDatabase()) || new AdminRapportMySqlDatabase();
            const adminRapportService: AdminRapportService = new AdminRapportService(adminRapportDatabase);
            const adminRapportController: AdminRapportController = new AdminRapportController(adminRapportService);

            AdminRapportControllerSingleton.instance.controller = adminRapportController;
        }

        return AdminRapportControllerSingleton.instance;
    }

    public get controller(): AdminRapportController | null {
        return this._controller;
    }

    public set controller(value: AdminRapportController | null) {
        this._controller = value;
    }
}
