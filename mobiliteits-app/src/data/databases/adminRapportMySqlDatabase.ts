import { Pool, RowDataPacket } from "mysql2";
import { RelationalDatabase } from "../RationalDatabase";
import { AdminRapportDatabase } from "../interfaces/adminRapportDatabase";
import { AdminRapport } from "../../business/model/adminRapportModel";

/**
 * Class for the AdminRapportMySqlDatabase
 * @author Erik Stam
 */
export class AdminRapportMySqlDatabase implements AdminRapportDatabase {

    /**
     * Get the rapport
     * @returns {Promise<AdminRapport[]>} The admin rapport
     */
    public async getRapport(month: number, year: number): Promise<AdminRapport[]> {
        let pool: Pool | null = RelationalDatabase.getPool();
        let results: RowDataPacket[] | null = null;

        if (pool != null) {
            [results] = await pool.promise().execute<RowDataPacket[]>(
                `SELECT 
                j.transport_type_name AS fuel_type,
                SUM(j.kilometers) AS total_kilometers
            FROM 
                journey j
            LEFT JOIN 
                vehicle_journey vj ON j.created_at = vj.journey_created_at AND j.email = vj.journey_email
            LEFT JOIN 
                car c ON vj.car_license_plate = c.license_plate
            WHERE
                (MONTH(j.journey_date) = ? OR ? = 0) AND YEAR(j.journey_date) = ?
            GROUP BY 
                fuel_type;`, [month, month, year]
            );
        }

        let adminRapportArray: AdminRapport[] = [];
        if (results != null) {
            adminRapportArray = results.map((row: RowDataPacket) => ({
                fuelType: row.fuel_type,
                totalKilometers: row.total_kilometers,
                getRapport: async () => adminRapportArray
            }));
        }
        return adminRapportArray;
    }
}
