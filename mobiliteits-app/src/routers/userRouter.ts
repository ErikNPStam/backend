import express from "express";

import config from "dotenv";
config.config({ path: "./config.env" });

import { Router } from "../creation/interfaces/router";
import { Routes } from "../creation/enums/routes";

import { JourneyControllerSingleton } from "../creation/controllers/journeyController.singleton";
import { CarControllerSingleton } from "../creation/controllers/carController.singleton";
import { LogoutControllerSingleton } from "../creation/controllers/logoutController.singleton";
import { RentalCarsControllerSingleton } from "../creation/controllers/rentController.singleton";
import { CarDetailControllerSingleton } from "../creation/controllers/carDetailController.singleton";
import { AuthenticatorSingleton } from "../creation/singleton/AuthenticatorSingleton";

/**
 * Router for the user endpoints.
 * @author Erik Stam
 */
export class UserRouter implements Router {
  // The router for the user endpoints is stored in this variable.
  private router: express.Router;

  /**
   * Constructor for the UserRouter.
   * Sets up the routes for the user endpoints.
   */
  constructor() {
    this.router = express.Router();

    this.router.use((req, res, next) => {
      AuthenticatorSingleton.getInstance().getAuthenticator().authenticateSession(req, res, next)
    });

    this.setRoutes();
  }

  public getRouter(): express.Router {
    return this.router
  }

  public getRoute(): Routes.USER {
    return Routes.USER
  }

  private setRoutes(): void {
    this.router.get("/cars/all", this.getAllCars);
    this.router.get("/cars/search", this.getAllCarsForSearch);
    this.router.get("/cars/rentals", this.getAllRentals)

    this.router.get("/cardetail/:id", this.getCarDetails);
    this.router.post("/cardetail/emission", this.getCarDetailEmission);

    this.router.get("/journeys", this.getJourneys);
    this.router.get("/journey/:createdAt", this.getJourney)
    this.router.post("/journey", this.createJourney);
    this.router.put("/journey", this.updateJourney);

    this.router.post('/logout', this.logout);
    this.router.delete('/journey/delete/:journeyCreatedAt', this.deleteJourney)
  }

  private getAllRentals(req: express.Request, res: express.Response) {
    RentalCarsControllerSingleton.getInstance().controller?.getRentalTableData(req, res)
  }

  /**
   * @param req 
   * @param res 
   * @author Mohammed Yusufi
   */
  private getAllCars(req: express.Request, res: express.Response) {
    CarControllerSingleton.getInstance().controller?.getAllCars(req, res);
  }


  /**
   * @param req 
   * @param res 
   * @author Joey
   */
  private getCarDetails(req: express.Request, res: express.Response) {
    CarDetailControllerSingleton.getInstance().controller?.getCardetail(req, res);
  }

  /**
   * @param req 
   * @param res 
   * @author Luka Piersma
   */
  private getJourneys(req: express.Request, res: express.Response) {
    JourneyControllerSingleton.getInstance().controller?.getJourneys(req, res);
  };

  private getJourney(req: express.Request, res: express.Response) {
    JourneyControllerSingleton.getInstance().controller?.getJourney(req, res);
  }

  private getAllCarsForSearch(req: express.Request, res: express.Response) {
    CarControllerSingleton.getInstance().controller?.searchCars(req, res);
  }

  private createJourney(req: express.Request, res: express.Response) {
    JourneyControllerSingleton.getInstance().controller?.createJourney(req, res);
  }

  private updateJourney(req: express.Request, res: express.Response) {
    JourneyControllerSingleton.getInstance().controller?.updateJourney(req, res);
  }

  private logout(req: express.Request, res: express.Response) {
    LogoutControllerSingleton.getInstance().logout(req, res);
  }

  private deleteJourney(req: express.Request, res: express.Response) {
    JourneyControllerSingleton.getInstance().controller?.deleteJourney(req, res);
  }

  private getCarDetailEmission(req: express.Request, res: express.Response) {
    CarDetailControllerSingleton.getInstance().controller?.calculateEmissions(req, res);
  }
} 
