import { AdminRapportDatabase } from "../interfaces/adminRapportDatabase";
import { AdminRapport } from "../../business/model/adminRapportModel";

import { QueryTypes, Op } from 'sequelize';
import VehicleJourneySequelize from "../models/vehicleJourney.model";

/**
 * Class for the AdminRapportSequelizeDatabase
 * @implements { AdminRapportDatabase }
 * @author Erik Stam
 */
export class AdminRapportSequelizeDatabase implements AdminRapportDatabase {

    /**
     * get the rapport from the database using sequelize
     * @param month - The month
     * @param year - The year
     * @returns - The admin rapport
     */
    public async getRapport(month: number, year: number): Promise<AdminRapport[]> {
        const results: AdminRapport[] = (await VehicleJourneySequelize.sequelize?.query(`
            SELECT 
                j.transport_type_name AS fuelType,
                SUM(j.kilometers) AS totalKilometers
            FROM 
                journey j
            LEFT JOIN 
                vehicle_journey vj ON j.created_at = vj.journey_created_at AND j.email = vj.journey_email
            LEFT JOIN 
                car c ON vj.car_license_plate = c.license_plate
            WHERE
                (MONTH(j.journey_date) = :month OR :month = 0) AND YEAR(j.journey_date) = :year
            GROUP BY 
                j.transport_type_name
        `, {
            replacements: { month, year },
            type: QueryTypes.SELECT,
            raw: true
        })
            // If the results are null, return an empty array (nullish coalescing operator)
        ) ?? [];
        const adminRapportArray: AdminRapport[] = results.map((row) => ({
            fuelType: row.fuelType,
            totalKilometers: row.totalKilometers,
            getRapport: async () => adminRapportArray
        }));

        return adminRapportArray;
    }

}
