import * as express from 'express';
import { AdminRapportService } from '../business/service/adminRapport.Service';

/**
 * Controller for the adminRapport endpoint
 * @author Erik Stam
 */
export class AdminRapportController {

    constructor(private adminRapportService: AdminRapportService) {
    }

    /**
     * Get the rapport from the adminRapportService
     * @param req 
     * @param res 
     */
    public async getRapport(req: express.Request, res: express.Response): Promise<void> {
        try {
            // Get the month and year from the request parameters 
            // !TODO: Add validation and make an object for the parameters
            const month = parseInt(req.params.month) || 0;
            const year = parseInt(req.params.year) || new Date().getFullYear();  
            res.status(202).json(
                await this.adminRapportService.getRapport(month, year)
            );
        } catch (error) {
            if (error === "Service Error") {
                res.status(422).json(error)
            } else {
                res.status(404).json(
                    error
                );
            }
        }
    }
}
