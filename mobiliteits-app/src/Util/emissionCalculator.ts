/**
 * The EmissionCalculator class is responsible for calculating the emission based on the fuel type and the total kilometers
 * @author Erik Stam
 */
export class EmissionCalculator {
  /**
   * The emission factors for different fuel types in grams per kilometer
   */
  private fuelTypeEmissionFactors: Record<string, number> = {
    "Diesel Car": 131,
    "Petrol Car": 149,
    "Electric Car": 53,
    Walking: 0,
    Cycling: 0,
    Plane: 285,
    Boat: 19,
  };

  /**
   * Calculate the emission based on the fuel type and the total kilometers
   * @param fuelType - The fuel type of the vehicle
   * @param totalKilometers - The total kilometers driven per given fuel type
   * @returns - The emission in grams
   */
  public calculateEmission(fuelType: string, totalKilometers: number): number {
    let emissionFactorInGramPerKilometer =
      this.fuelTypeEmissionFactors[fuelType];

    if (emissionFactorInGramPerKilometer === undefined) {
      emissionFactorInGramPerKilometer = 28;
    }

    const emission = totalKilometers * emissionFactorInGramPerKilometer;
    return Math.round(emission * 100) / 100;
  }
}
