import { CarsModel } from "../model/car.model";
import { UploadCars } from "../../data/interfaces/uploadCarDatabase";

/**
 * Service class for handling car data operations.
 * This class provides an interface to upload a car to the database.
 * @class
 * @author Mohammad Yusufi
 * @param {UploadCars} uploadCarsDatabase - The database connection that provides methods to upload car data.
 */
export class UploadCarService {
  constructor(private uploadCarsDatabase: UploadCars) {}

  public async uploadCar(car: CarsModel): Promise<CarsModel> {
    car.validateCar();

    return await this.uploadCarsDatabase.uploadCar(car);
  }
}
