import express from "express";
import { RentalCarService } from "../business/service/rentals.service";

export class RentalCarsController {
  constructor(private serviceRental: RentalCarService) {}

  public async getRentalTableData(
    req: express.Request,
    res: express.Response
  ): Promise<void> {
    try {
      res.status(200).json(await this.serviceRental.getRentalTableData());
    } catch (error) {
      res.status(500).json();
    }
  }
}
