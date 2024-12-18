import { CarsModel } from "../../business/model/car.model";

export interface GetCarsDatabase{
    getAllCars():Promise <CarsModel[]>;
    searchCars(brand: string, model: string, fuelType: string): CarsModel[] | Promise<CarsModel[]>;
}


