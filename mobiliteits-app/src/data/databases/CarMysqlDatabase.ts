import { Pool, ResultSetHeader } from "mysql2";
import { GetCarsDatabase } from "../interfaces/CarDatabase";
import { RelationalDatabase } from "../RationalDatabase";
import CarSequelize from "../models/car.model";
import { CarsModel } from "../../business/model/car.model";



/**
 * Implements the GetCarsDatabase interface for interacting with a MySQL database using the mysql2 library.
 * Provides functionality to retrieve all cars from the database.
 * @class
 * @implements {GetCarsDatabase}
 * @author Mohammad Yusufi
 */

export class SqlCarsDatabase implements GetCarsDatabase{
 
 public async getAllCars(): Promise<CarsModel[]> {
        let pool: Pool | null = RelationalDatabase.getPool();
        let results: ResultSetHeader | null = null;
        if (pool != null){
            [results] = await pool.promise().execute<ResultSetHeader>("SELECT * FROM `car` ")
        }
        let carArray: CarsModel[] = [];
        if (results != null) {
            carArray = this.convertResultSetHeaderToCars(results)
        }

        return carArray
    }

    public async searchCars(brand?: string, model?: string, fuel_type?: string): Promise<CarsModel[]> {
        let pool: Pool | null = RelationalDatabase.getPool();
        let results: ResultSetHeader | null = null;
    
        // Bouwen van de query met dynamische filters
        let query = "SELECT * FROM `car` WHERE 1=1";
        let parameters: string[] = [];
        
        // The 'LIKE' keyword in SQL is used to search for a specified pattern in a column.
        // Here '%{brand}%' allows for searching any records where 'brand' contains the provided substring.
        // '%' acts as a wildcard character that matches zero or more characters.
        if (brand) {
            query += " AND brand LIKE ?";
            parameters.push(`%${brand}%`);
        }
        if (model) {
            query += " AND model LIKE ?";
            parameters.push(`%${model}%`);
        }
        if (fuel_type) {
            query += " AND fuel_type LIKE ?";
            parameters.push(`%${fuel_type}%`);
        }
    
        if (pool != null) {
            [results] = await pool.promise().execute<ResultSetHeader>(query, parameters);
        }
    
        let carArray: CarsModel[] = [];
        if (results != null) {
            carArray = this.convertResultSetHeaderToCars(results)
        }
    
        return carArray;
    }

    private convertResultSetHeaderToCars(resultSetHeader: ResultSetHeader): CarsModel[] {
        if (resultSetHeader == undefined) {
            throw new Error("unknow user(s)");
        }

        const carArray: CarsModel[] = [];

        (resultSetHeader as any).forEach((element: any) => {
            let car: CarsModel = new CarsModel(element.licensePlate, element.brand, element.model, element.transmission, element.fuelType, element.buildYear, element.carImage, element.mileage) as unknown as CarsModel;
            carArray.push(car);
        });

        return carArray;
    }


}