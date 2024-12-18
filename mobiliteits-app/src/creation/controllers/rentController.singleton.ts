import { RentalCarService } from "../../business/service/rentals.service";
import { RentalCarsController } from "../../controller/rental.controller";
import { CarBusinessConverter } from "../../data/convert/carBusinessConverter";
import { RentalsSequelize } from "../../data/databases/rentalCarsSequelize";

export class RentalCarsControllerSingleton {

    private static instance: RentalCarsControllerSingleton | null = null;
    private _controller: RentalCarsController | null = null 

    private constructor() { }

    public static getInstance(): RentalCarsControllerSingleton {
        if (RentalCarsControllerSingleton.instance == null) {
            RentalCarsControllerSingleton.instance = new RentalCarsControllerSingleton()

            const rentalConverter: CarBusinessConverter = new CarBusinessConverter();
            const rentalSequelize: RentalsSequelize = new RentalsSequelize(rentalConverter);
            const rentalService: RentalCarService = new RentalCarService(rentalSequelize);
            const rentalController: RentalCarsController = new RentalCarsController(rentalService)

            RentalCarsControllerSingleton.instance.controller = rentalController
        }

        return RentalCarsControllerSingleton.instance;
    }
    public get controller(): RentalCarsController | null {
        return this._controller;
    }
    private set controller(value: RentalCarsController | null) {
        if (this._controller == null) {
            this._controller = value;
        }
    }
}