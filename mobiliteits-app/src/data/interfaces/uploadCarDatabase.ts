import { CarsModel } from "../../business/model/car.model";

export interface UploadCars {
uploadCar(car: CarsModel): Promise<CarsModel>
}