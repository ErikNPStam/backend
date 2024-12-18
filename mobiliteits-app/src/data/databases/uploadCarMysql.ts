import { Pool, ResultSetHeader } from "mysql2";
import { UploadCars } from "../interfaces/uploadCarDatabase";
import { RelationalDatabase } from "../RationalDatabase";
import { CarsModel } from "../../business/model/car.model";
import { CarBusinessConverter} from "../convert/carBusinessConverter";
import { CarDatabaseRow } from "../interfaces/carDatabaseRow";

export class UploadCarsMySQL implements UploadCars {
    private pool: Pool;

    constructor(private carConverter: CarBusinessConverter) {
        const pool = RelationalDatabase.getPool();
        if (!pool) {
            throw new Error('Database connection failed');
        }
        this.pool = pool;
    }

    public async uploadCar(car: CarsModel): Promise<CarsModel> {
        const query = `
            INSERT INTO car (license_plate, model, brand, transmission, mileage, build_year, fuel_type, carImage)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `;

        const values = [
            car.licensePlate,
            car.model,
            car.brand,
            car.transmission,
            car.mileage,
            car.buildYear,
            car.fuelType,
            car.carImage
        ];

        const [results] = await this.pool.promise().execute<ResultSetHeader>(query, values);

        if (results.affectedRows === 1) {
            const carDatabaseRow: CarDatabaseRow = {
                license_plate: car.licensePlate,
                model: car.model,
                brand: car.brand,
                transmission: car.transmission,
                mileage: car.mileage,
                build_year: car.buildYear,
                fuel_type: car.fuelType,
                carImage: car.carImage
            };
            return this.carConverter.createCar(carDatabaseRow);
        } else {
            throw new Error('Failed to upload car to the database');
        }
    }
}
