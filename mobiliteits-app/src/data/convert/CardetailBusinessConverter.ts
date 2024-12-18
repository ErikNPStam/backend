import CarDetailSequelizeModel from "../models/car.model";
import { CarModel } from "../../business/model/carDetail.model";

export class CarDetailBusinessModel {
    public createCar(CarDetailDatabaseRows: CarDetailSequelizeModel | null): CarModel {
        if (CarDetailDatabaseRows) {
            let returnValue: CarModel = new CarModel(
                CarDetailDatabaseRows.license_plate,
                CarDetailDatabaseRows.model,
                CarDetailDatabaseRows.brand,
                CarDetailDatabaseRows.transmission,
                CarDetailDatabaseRows.mileage,
                CarDetailDatabaseRows.build_year,
                CarDetailDatabaseRows.fuel_type,
                CarDetailDatabaseRows.carImage
            );
            return returnValue;
        } else {
            throw new Error("CarDetailDatabaseRows is null");
        }
    }
}
