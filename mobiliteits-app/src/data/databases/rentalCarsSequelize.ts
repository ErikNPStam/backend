import { RentalModel } from "../../business/model/rental.model";
import { RentalDatabase } from "../interfaces/RentalDatabase";
import RentalSequelizeModel from "../models/rental.model";
import { CarBusinessConverter } from "../convert/carBusinessConverter";



export class RentalsSequelize implements RentalDatabase {
    constructor(private rentalConverter: CarBusinessConverter ){}

  public async getRentalTableData(): Promise<RentalModel[]> {
    const rentalResults = await RentalSequelizeModel.findAll();
    return this.rentalConverter.createRentals(rentalResults)
} 
}
