/**
 * @author Luka Piersma
 *
 * The app builder class.
 */

import { App } from "../app";
import { Router } from "../interfaces/router";
import { Routes } from "../enums/routes";
import { RouterFactory } from "../factories/router.factory";

/**
 * The AppBuilder class is responsible for building an instance of the App class.
 * It provides methods for setting the router factory, adding routers, setting the port, and building the app.
 */
export class AppBuilder {
    private static appBuilder: AppBuilder | null = null;

    private routerFactory: RouterFactory = RouterFactory.getInstance();
    private routers: Router[] = [];
    private port: number | null = null;

    private constructor() { }

    /**
     * Returns the singleton instance of the AppBuilder class.
     * @returns The singleton instance of the AppBuilder class.
     */
    public static getInstance(): AppBuilder {
        if (AppBuilder.appBuilder == null) {
            AppBuilder.appBuilder = new AppBuilder();
        }

        return AppBuilder.appBuilder;
    }

    /**
     * Sets the router factory to be used for creating routers.
     * @param routerFactory - The router factory to be set.
     */
    public setRouterFactory(routerFactory: RouterFactory) {
        this.routerFactory = routerFactory;
    }

    /**
     * Adds a router to the list of routers to be used by the app.
     * @param routerName - The name of the router to be added.
     */
    public addRouter(routerName: Routes) {
        if (this.routerFactory == null) {
            throw new Error("Add a router factory.");
        }

        const router = this.routerFactory.createRouter(routerName);

        this.routers.push(router);
    }

    /**
     * Sets the port number for the app.
     * @param port - The port number to be set.
     */
    public setPort(port: number) {
        this.port = port;
    }

    /**
     * Builds an instance of the App class using the configured router factory, routers, and port number.
     * @returns An instance of the App class.
     * @throws Error if the port number is not provided.
     */
    public buildApp(): App {
        if (this.port == null) {
            throw new Error('Provide a port.');
        }

        return new App(this.port, this.routers);
    }
}