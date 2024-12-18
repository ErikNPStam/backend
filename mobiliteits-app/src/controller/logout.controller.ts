import * as express from 'express';
import { SessionManager } from '../middleware/SessionManager';


/**
   * @authored by Max Sijbrands
   */
export class LogoutController {
    constructor(private sessionManager: SessionManager = new SessionManager()) { }

    // Method to handle logout requests
    public async logout(req: express.Request, res: express.Response): Promise<void> {
        try {
            const sessionId = req.cookies['session']; // gets the session id 
            if (sessionId && SessionManager.sessions[sessionId]) {
                delete SessionManager.sessions[sessionId];
                res.cookie('session', '', { expires: new Date(0), httpOnly: true, secure: process.env.NODE_ENV === 'production' }); // Clear the session cookie by setting its expiration date to a past date
                res.status(200).send({ message: 'Logged out successfully' });
            } else {
                res.status(401).send({ message: 'Unauthorized: No session' });
            }
        } catch (error) {
            console.error('Logout error:', error);
            res.status(500).send({ message: 'An error occurred while logging out' });
        }
    }
}