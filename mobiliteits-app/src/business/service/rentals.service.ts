import { RentalModel } from "../model/rental.model";
import { RentalDatabase } from "../../data/interfaces/RentalDatabase";

/**
 * Service class for handling rental car data operations.
 * This class provides an interface to fetch all rental data from the database.
 * @class
 * @autor Mohammad Yusufi
 * @param {RentalDatabase} rentalDatabase - The database connection that provides methods to access rental data.
 */
export class RentalCarService {
    constructor(private rentalDatabase: RentalDatabase) {}

    public async getRentalTableData(): Promise<RentalModel[]>{
       const resultRental = await this.rentalDatabase.getRentalTableData();
        return resultRental
    }
}
