import express from "express";

import config from "dotenv";
config.config({ path: "./config.env" });

import { Router } from "../creation/interfaces/router";
import { Routes } from "../creation/enums/routes";

import { JourneyControllerSingleton } from "../creation/controllers/journeyController.singleton";
import { AdminRapportControllerSingleton } from "../creation/controllers/adminRapport.singleton";
import { UploadCarsControllerSingleton } from "../creation/controllers/adminUploadCar.singleton";
import uploadWithMulter from "../middleware/UploadWithMulter";
import { AuthenticatorSingleton } from "../creation/singleton/AuthenticatorSingleton";
/**
 * Router for the admin endpoints.
 * @author Erik Stam
 */
export class AdminRouter implements Router {
    private router: express.Router;

    /**
     * Creates an instance of AdminRouter.
     * 
     * @param authenticator - The authenticator instance. Defaults to a new instance of Authenticator.
     */
    constructor() {
        this.router = express.Router();

        this.router.use((req, res, next) => {
            AuthenticatorSingleton.getInstance().getAuthenticator().authenticateAdminRoute(req, res, next);
        });

        this.setRoutes();
    }

    public getRouter(): express.Router {
        return this.router
    }

    public getRoute(): Routes.ADMIN {
        return Routes.ADMIN
    }

    /**
     * Sets up the routes for the admin router.
     */
    private setRoutes(): void {
        this.router.get("/account", this.getAccount.bind(this));
        this.router.get("/journeys", this.getAllJourneys.bind(this));
        this.router.get("/rapport/:month/:year", this.getRapport.bind(this));
        this.router.post("/cars/upload", uploadWithMulter.single('carImage'), this.uploadCar.bind(this));
    }

    /**
     * Get the rapport.
     * @param req - The request.
     * @param res - The response.   
     * @author Erik Stam
     */
    private getRapport(req: express.Request, res: express.Response) {
        AdminRapportControllerSingleton.getInstance().controller?.getRapport(req, res);
    }

    private uploadCar(req: express.Request, res: express.Response) {
        UploadCarsControllerSingleton.getInstance().controller?.uploadCar(req, res)
    };

    /**
     * Retrieves the account information.
     * 
     * @param req - The express request object.
     * @param res - The express response object.
     */
    private getAccount(req: express.Request, res: express.Response) {
        res.status(200).json({ Reply: "Hello world! Admin" });
    }

    /**
     * Retrieves all journeys.
     * 
     * @param req - The express request object.
     * @param res - The express response object.
     * @author Raymundo Brunst
     */
    private getAllJourneys(req: express.Request, res: express.Response) {
        JourneyControllerSingleton.getInstance().controller?.getAllJourneys(req, res);
    };
}
