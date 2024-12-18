/**
 * @author Luka Piersma
 *
 * The journey controller singleton class.
 */

import { JourneyService } from "../../business/service/journey.service";
import { JourneyController } from "../../controller/journey.controller";
import { JourneyMySqlDatabase } from "../../data/databases/JourneyMySqlDatabase";
import { JourneySequelizeDatabase } from "../../data/databases/JourneySequelizeDatabase";
import { JourneyDatabase } from "../../data/interfaces/JourneyDatabase";

export class JourneyControllerSingleton {

    private static instance: JourneyControllerSingleton | null = null
    private _controller: JourneyController | null = null;

    private constructor() { }

    public static getInstance(): JourneyControllerSingleton {
        if (JourneyControllerSingleton.instance == null) {
            JourneyControllerSingleton.instance = new JourneyControllerSingleton();

            const journeyDatabase: JourneyDatabase = (process.env.DATA_LAYER === "sequelize" && new JourneySequelizeDatabase()) || new JourneyMySqlDatabase();
            const journeyService: JourneyService = new JourneyService(journeyDatabase);
            const journeyController: JourneyController = new JourneyController(journeyService);

            JourneyControllerSingleton.instance.controller = journeyController;
        }

        return JourneyControllerSingleton.instance;
    }

    public get controller(): JourneyController | null {
        return this._controller;
    }

    public set controller(value: JourneyController | null) {
        this._controller = value;
    }
}