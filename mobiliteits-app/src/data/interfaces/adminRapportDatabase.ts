import { AdminRapport } from "../../business/model/adminRapportModel";

/**
 * Interface for the AdminRapport class
 */
export interface AdminRapportDatabase {
    getRapport(month: number, year: number): Promise<AdminRapport[]>;
}
