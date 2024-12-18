import { EmissionCalculator } from "../../Util/emissionCalculator";
import { CardetailDatabase } from "../../data/interfaces/CardetailDatabase";
import { CarModel } from "../model/carDetail.model";

export class CarDetailService {
  constructor(private database: CardetailDatabase, private emissionCalculator: EmissionCalculator = new EmissionCalculator()) { }

  public async getCardetails(id: string): Promise<CarModel | null> {
    if (id == null) {
      throw new Error("id is null");
    } else {
      return await this.database.getCardetails(id);
    }
  }

  public async getCalculatedInfo(number: number, fuelType: string): Promise<number> {
    if (!number && !fuelType) {
      throw new Error("invalid number")
    } else {
      return this.emissionCalculator.calculateEmission(fuelType, number)
    }

  }
}

