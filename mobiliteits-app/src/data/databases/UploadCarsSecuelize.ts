import { CarsModel } from "../../business/model/car.model";
import { CarBusinessConverter } from "../convert/carBusinessConverter";
import CarSequelize from "../models/car.model";
import { UploadCars } from "../interfaces/uploadCarDatabase";


export class UploadCarsSequelize implements UploadCars {


    constructor(private rentalConverter: CarBusinessConverter ){}
 
    public async uploadCar(car: CarsModel): Promise<CarsModel> {
        const carInstance = await CarSequelize.create({
          license_plate: car.licensePlate,
          model: car.model,
          brand: car.brand,
          transmission: car.transmission,
          mileage: car.mileage,
          build_year: car.buildYear,
          fuel_type: car.fuelType,
          carImage: car.carImage
        });
        console.log('Car uploaded:', carInstance);

        return this.rentalConverter.createCarSequel(carInstance);
      }
}