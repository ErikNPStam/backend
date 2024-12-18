import * as express from "express";
import { CarService } from "../business/service/car.service";

/**
 * Controller class for handling HTTP requests related to car operations.
 * This class uses the CarService to fetch car data and respond to client requests.
 * @class
 * @author Mohammad Yusufi
 *
 * @param {CarService} serviceCars - An instance of CarService to handle business logic related to cars.
 */

export class CarController {
  constructor(private serviceCars: CarService) {}
  public async getAllCars(
    req: express.Request,
    res: express.Response
  ): Promise<void> {
    try {
      const cars = await this.serviceCars.getAllCars();
      if (cars.length === 0) {
        res
          .status(404)
          .json;
      }
      res.status(202).json(cars);
    } catch (error) {
      console.log(error);
      res.status(500).json
    }
  }

  public async searchCars(
    req: express.Request,
    res: express.Response
  ): Promise<void> {
    try {
      const brand = req.query.brand as string;
      const model = req.query.model as string;
      const fuelType = req.query.fuelType as string;
      const cars = await this.serviceCars.searchCars(brand, model, fuelType);

      res.status(202).json(cars);
    } catch (error) {
      res.status(500).json;
    }
  }
}
