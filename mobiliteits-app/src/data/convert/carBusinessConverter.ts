import { CarsModel } from "../../business/model/car.model";
import CarSequelize from "../models/car.model";
import RentalSequelizeModel from "../models/rental.model";
import { RentalModel } from "../../business/model/rental.model";
import { CarsSequelize } from "../databases/CarsSequelize";
import { CarDatabaseRow } from "../interfaces/carDatabaseRow";

export class CarBusinessConverter {
    public createCarSequel(carDatabaseRows: CarSequelize | null): CarsModel {
        if (carDatabaseRows){
            let returnValue: CarsModel = new CarsModel(carDatabaseRows.license_plate, carDatabaseRows.model, carDatabaseRows.brand, carDatabaseRows.transmission, carDatabaseRows.mileage, carDatabaseRows.build_year, carDatabaseRows.fuel_type, carDatabaseRows.carImage);
            return returnValue
        } else {
            throw new Error("carDatabaseRows is null")
        }
    }

    public createCar(carDatabaseRow: CarDatabaseRow | null): CarsModel {
        if (carDatabaseRow) {
            return new CarsModel(
                carDatabaseRow.license_plate,
                carDatabaseRow.model,
                carDatabaseRow.brand,
                carDatabaseRow.transmission,
                carDatabaseRow.mileage,
                carDatabaseRow.build_year,
                carDatabaseRow.fuel_type,
                carDatabaseRow.carImage
            );
        } else {
            throw new Error("carDatabaseRow is null");
        }
    }

    public createCars(carsDatabaseRows: CarSequelize[]): CarsModel[]{
        let returnValueArray: CarsModel[] = [];
        for (let i = 0; i < carsDatabaseRows.length; i++) {
            let car: CarsModel = new CarsModel(carsDatabaseRows[i].license_plate, carsDatabaseRows[i].model, carsDatabaseRows[i].brand, carsDatabaseRows[i].transmission, carsDatabaseRows[i].mileage, carsDatabaseRows[i].build_year, carsDatabaseRows[i].fuel_type, carsDatabaseRows[i].carImage);
            returnValueArray.push(car)
        }
        return returnValueArray
    }

    public createRentals(rentalsDatabaseRows: RentalSequelizeModel[]): RentalModel[]{
        let returnValueArray: RentalModel[] = [];
        for (let i = 0; i < rentalsDatabaseRows.length; i++) {
            let rental: RentalModel = new RentalModel(rentalsDatabaseRows[i].email , rentalsDatabaseRows[i].rental_date , rentalsDatabaseRows[i].date_of_return, rentalsDatabaseRows[i].license_plate);
            returnValueArray.push(rental)
        }
        return returnValueArray
    }


}

