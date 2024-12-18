import express from "express";

import config from "dotenv";
config.config({ path: "./config.env" });

import { Router } from "../creation/interfaces/router";
import { Routes } from "../creation/enums/routes";

import { RegisterControllerSingleton } from "../creation/controllers/registerController.singleton";
import { LoginControllerSingleton } from "../creation/controllers/loginController.singleton";

export class DefaultRouter implements Router {
    private router: express.Router;

    constructor() {
        this.router = express.Router();

        this.setRoutes();
    }

    public getRouter(): express.Router {
        return this.router
    }

    public getRoute(): Routes.DEFAULT {
        return Routes.DEFAULT
    }

    private setRoutes(): void {
        this.router.post('/login', this.login)
        this.router.post('/register', this.register)
    }

    private login(req: express.Request, res: express.Response) {
        LoginControllerSingleton.getInstance().createLogInSession(req, res)
    }

    private register(req: express.Request, res: express.Response) {
        RegisterControllerSingleton.getInstance().controller?.createNewAccount(req, res);
    }
}
