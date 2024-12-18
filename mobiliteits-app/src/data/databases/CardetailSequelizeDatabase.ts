import { CarDetailBusinessModel } from "../convert/CardetailBusinessConverter";
import { CardetailDatabase } from "../interfaces/CardetailDatabase";
import CarDetailSequelizeModel from "../models/car.model";
import { CarModel } from "../../business/model/carDetail.model";

export class CarDetailSequelizeDatabase implements CardetailDatabase {

    constructor(private carConvert: CarDetailBusinessModel) {

    }

    public async getCardetails(id: string): Promise<CarModel | null> {
        const results = await CarDetailSequelizeModel.findOne({ where: { license_plate: id } });
        return this.carConvert.createCar(results); 
    }
}
