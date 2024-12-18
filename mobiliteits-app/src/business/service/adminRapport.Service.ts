import { AdminRapportDatabase } from "../../data/interfaces/adminRapportDatabase";
import { AdminRapport } from "../model/adminRapportModel";
import { EmissionCalculator } from "../../Util/emissionCalculator";

/**
 * Class for the AdminRapportService
 * @author Erik Stam
 */
export class AdminRapportService {

    private emissionCalculator = new EmissionCalculator();

    constructor(private database: AdminRapportDatabase) {
    }

    /**
     * Get the rapport from the database and add the emission
     * @param fuelType - The fuel type of the vehicle
     * @param totalKilometers - The total kilometers driven per given fuel type
     * @returns - The admin rapport
     */
    public async getRapport(month: number, year: number): Promise<AdminRapport[]> {
        try {
            const report = await this.database.getRapport(month, year);

            // Map the report to add the emission to the report and return the report with the emission added
            return report.map(report => ({
                ...report,
                emission: this.emissionCalculator.calculateEmission(report.fuelType, report.totalKilometers)
            }));
        } catch {
            throw new Error("Service failed")
        }
    }
}