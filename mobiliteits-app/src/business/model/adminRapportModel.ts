/**
 * Model for the admin report
 */
export class AdminRapport {
    constructor(
        public fuelType: string,
        public totalKilometers: number,
        public totalEmission?: number
    ) { }
}