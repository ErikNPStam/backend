import { Request, Response } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import { CarService } from "../../business/service/car.service";
import { CarController } from "../../controller/car.controller";
import { CarBusinessConverter } from "../../data/convert/carBusinessConverter";
import { CarsSequelize } from "../../data/databases/CarsSequelize";

export class CarControllerSingleton {
    private static instance: CarControllerSingleton | null = null;
    private _controller: CarController| null = null;

    private constructor() {}

    public static getInstance(): CarControllerSingleton{
        if (CarControllerSingleton.instance == null) {
            CarControllerSingleton.instance = new CarControllerSingleton()

            const carConverter: CarBusinessConverter = new CarBusinessConverter();
            const carSequelize: CarsSequelize = new CarsSequelize(carConverter);
            const carService: CarService = new CarService(carSequelize);
            const carController: CarController = new CarController(carService)

            CarControllerSingleton.instance.controller = carController;
        }

        return CarControllerSingleton.instance;
    }
    public get controller(): CarController | null {
        return this._controller;
    }
    private set controller(value: CarController | null) {
        if (this._controller == null) {
            this._controller = value;
        }
    }
}