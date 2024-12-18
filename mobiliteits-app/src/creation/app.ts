import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import { Router } from "./interfaces/router";
import { Server } from "http";
import path from "path";
import sequelize from "../data/connection";

/**
 * Represents the main application class.
 * 
 * @author Luka Piersma
 */
export class App {
    private app: express.Application;
    private server: Server | null = null;

    /**
     * Creates an instance of the App class.
     * @param port The port number for the server.
     * @param routers An array of Router instances.
     */
    constructor(private port: number, private routers: Router[]) {
        this.app = express();
    }

    /**
     * Attaches the routers to the application.
     */
    public attachRouters(): void {
        for (let i = 0; i < this.routers.length; i++) {
            const router: Router = this.routers[i];

            this.app.use(router.getRoute(), router.getRouter());
        }
    }

    /**
     * Starts the server and listens on the specified port.
     */
    public listen(): void {
        const PORT = this.port || 3002;

        this.server = this.app.listen(PORT, () => {
            console.log(`Server is running on localhost:${PORT}`);
        });
    }

    /**
     * Closes the server.
     */
    public close(): void {
        this.server?.close((error: any) => {
            console.log(error)
        });
    }

    /**
     * Attaches CORS middleware to the application.
     */
    public attachCors(): void {
        // Use cookie-parser middleware
        this.app.use(cookieParser());

        this.app.use('/uploads', express.static(path.join(__dirname, '../..', '/uploads')));

        // Use CORS middleware
        this.app.use(
            cors({
                origin: 'http://localhost:4200',
                credentials: true,
            })
        );

        this.app.options('*', cors());
    }

    /**
     * Attaches headers to the application.
     */
    public attachHeaders(): void {
        this.app.use(function (
            req: express.Request,
            res: express.Response,
            next: express.NextFunction
        ) {
            res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
            res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
            res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
            res.setHeader('Access-Control-Allow-Credentials', 'true');
            next();
        });
    }

    /**
     * Attaches request body encoders to the application.
     */
    public attachEncoder(): void {
        // Parse requests of content-type - application/json
        this.app.use(express.json());

        // Parse requests of content-type - application/x-www-form-urlencoded
        this.app.use(express.urlencoded({ extended: true }));
    }

    /**
     * Gets the express application instance.
     * @returns The express application instance.
     */
    public getApp(): express.Application {
        return this.app;
    }

    public sequelizeSync(): void {
        sequelize
            .sync()
            .then((result) => {
                console.log('Connected to the database');
                console.log(result.models);
            })
            .catch((error: Error) => {
                console.error('Unable to connect to the database:', error);
            });
    }
}