import { GetCarsDatabase } from "../../data/interfaces/CarDatabase";
import { CarsModel } from "../model/car.model";

/**
 * Service class for handling car data operations.
 * This class provides an interface to fetch all cars from the database.
 * @class
 * @author Mohammad Yusufi
 * @param {GetCarsDatabase} database - The database connection that provides methods to access car data.
 */
export class CarService{

    constructor(private database: GetCarsDatabase){

    }
    public async getAllCars(): Promise<CarsModel[]> {
        return await this.database.getAllCars();
     }

     public async searchCars(brand: string, model: string, fuelType: string): Promise<CarsModel[]> {
        return await this.database.searchCars(brand, model, fuelType)
     }
}