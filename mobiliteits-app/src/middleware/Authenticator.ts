import express from "express";
import { SessionManager } from "./SessionManager";

/**
 * Middleware for authentication and authorization.
 * 
 * @author Erik Stam
 */
export class Authenticator {

    constructor(private readonly sessionManager: SessionManager = new SessionManager()) { }

    /**
     * Checks if the user has a session.
     * @param req - The request object.
     * @param res - The response object.
     * @param next - The next function.
     * @returns - The next function or a response with a status code of 401.
     * 
     * @author Erik Stam, Luka Piersma
     */
    public authenticateSession(req: express.Request, res: express.Response, next: express.NextFunction) {
        try {
            const session = this.sessionManager.getSession(req);
            if (session) {
                req.body.userEmail = session.userEmail;
            }

            next();
        } catch {
            res.status(401).json({ message: "Unauthorized: No session" });
        }
    }

    /**
     * Checks if the user has the role of an admin.
     * @param req - The request object.
     * @param res - The response object.
     * @param next - The next function.
     * @returns - The next function or a response with a status code of 401.
     * 
     * @author Erik Stam, Luka Piersma
     */
    public authenticateAdminRoute(req: express.Request, res: express.Response, next: express.NextFunction) {
        try {
            if (this.sessionManager.hasRole(req, "Admin")) {
                next()
            } else {
                res.status(401).json({ message: "Unauthorized: Not an admin" });
            }
        } catch {
            res.status(401).json({ message: "Unauthorized: No session" });
        }
    }
}