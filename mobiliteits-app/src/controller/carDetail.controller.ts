import * as express from "express";
import { CarDetailService } from "../business/service/carDetail.service";


export class CarDetailController {
  constructor(private cardetailservice: CarDetailService) { }

  public async getCardetail(
    req: express.Request,
    res: express.Response,
  ): Promise<void> {
    try {
      const carDetails = await this.cardetailservice.getCardetails(req.params.id);
      if (carDetails) {
        res.status(202).json(
          carDetails
        )
      } else {
        throw new Error("Car not found");
      }
    } catch (error: any) {
      res.status(400).json(
        error.message
      );
    }
  }

  public async calculateEmissions(req: express.Request, res: express.Response): Promise<void> {
    try {
      let info = req.body
      const calculatedNumber: number = await this.cardetailservice.getCalculatedInfo(parseFloat(info.km), info.fueltype)
      res.status(202).json(
        calculatedNumber
      );
    } catch (error: any) {
      res.status(400).json(
        error.message
      );
    }
  }
}
