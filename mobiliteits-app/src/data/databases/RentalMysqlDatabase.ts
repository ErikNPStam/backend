

import { Pool, ResultSetHeader } from "mysql2";
import { GetCarsDatabase } from "../interfaces/CarDatabase";
import { RelationalDatabase } from "../RationalDatabase";

import { RentalDatabase } from "../interfaces/RentalDatabase";
import { RentalModel } from "../../business/model/rental.model";



/**
 * Implements the GetCarsDatabase interface for interacting with a MySQL database using the mysql2 library.
 * Provides functionality to retrieve all cars from the database.
 * @class
 * @implements {GetCarsDatabase}
 * @author Mohammad Yusufi
 */

export class SqlRentalssDatabase implements RentalDatabase{
 
 public async getRentalTableData(): Promise<RentalModel[]> {
        let pool: Pool | null = RelationalDatabase.getPool();
        let results: ResultSetHeader | null = null;
        if (pool != null){
            [results] = await pool.promise().execute<ResultSetHeader>("SELECT * FROM `rental` ")
        }
        let rentalArray: RentalModel[] = [];
        if (results != null) {
            rentalArray = this.convertResultSetHeaderToCars(results)
        }

        return rentalArray
    }

private convertResultSetHeaderToCars(resultSetHeader: ResultSetHeader): RentalModel[] {
    if (resultSetHeader == undefined) {
        throw new Error("unknow user(s)");
    }

    const rentalArray: RentalModel[] = [];

    (resultSetHeader as any).forEach((element: any) => {
        let rental: RentalModel = new RentalModel(element.email, element.rentalDate, element.dateOfReturn, element.licensePlate) as unknown as RentalModel;
        rentalArray.push(rental);
    });

    return rentalArray;
}
}