import { CarDetailService } from "../../business/service/carDetail.service";
import { CarDetailController } from "../../controller/carDetail.controller";
import { CarDetailBusinessModel } from "../../data/convert/CardetailBusinessConverter";
import { CardetailMysqlDatabase } from "../../data/databases/CardetailMysqlDatabase";
import { CarDetailSequelizeDatabase } from "../../data/databases/CardetailSequelizeDatabase";


export class CarDetailControllerSingleton {
    private static instance: CarDetailControllerSingleton | null = null;
    private _controller: CarDetailController | null = null;

    private constructor() { }

    public static getInstance(): CarDetailControllerSingleton {
        if (CarDetailControllerSingleton.instance == null) {
            CarDetailControllerSingleton.instance = new CarDetailControllerSingleton();

            const carDetailConverter: CarDetailBusinessModel = new CarDetailBusinessModel();
            const carDetailDatabase = (process.env.DATA_LAYER === "sequelize" && new CarDetailSequelizeDatabase(carDetailConverter)) || new CardetailMysqlDatabase();
            const carDetailService: CarDetailService = new CarDetailService(carDetailDatabase);
            const carDetailController: CarDetailController = new CarDetailController(carDetailService)

            CarDetailControllerSingleton.instance.controller = carDetailController;
        }

        return CarDetailControllerSingleton.instance;
    }

    public get controller(): CarDetailController | null {
        return this._controller;
    }

    public set controller(value: CarDetailController | null) {
        this._controller = value;
    }
}