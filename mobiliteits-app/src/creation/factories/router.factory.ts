/**
 * @author Luka Piersma
 *
 * The journey factory class.
 */

import { DefaultRouter } from "../../routers/defaultRouter";
import { UserRouter } from "../../routers/userRouter";
import { Router } from "../interfaces/router";
import { Routes } from "../enums/routes";
import { AdminRouter } from "../../routers/adminRouter";

/**
 * Represents a factory for creating routers.
 */
export class RouterFactory {
    private static routerFactory: RouterFactory | null = null

    private constructor() { }

    /**
     * Gets the instance of the RouterFactory.
     * @returns The instance of the RouterFactory.
     */
    public static getInstance(): RouterFactory {
        if (RouterFactory.routerFactory == null) {
            RouterFactory.routerFactory = new RouterFactory();
        }

        return RouterFactory.routerFactory;
    }

    /**
     * Creates a router based on the provided router name.
     * @param routerName - The name of the router.
     * @returns The created router.
     * @throws Error if the router name does not exist.
     */
    public createRouter(routerName: Routes): Router {
        let router = null

        if (routerName === Routes.USER) {
            router = new UserRouter();
        } else if (routerName === Routes.ADMIN) {
            router = new AdminRouter();
        } else if (routerName === Routes.DEFAULT) {
            router = new DefaultRouter();
        }

        if (router == null) {
            throw new Error(`router: ${routerName} does not exist.`)
        }

        return router
    }
}