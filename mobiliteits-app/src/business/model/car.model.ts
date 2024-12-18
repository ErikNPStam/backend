/**
 * Represents a car model with detailed attributes about the car.
 * @class
 * @author Mohammad Yusufi
 *
 * @param {string} licensePlate - The license plate number of the car.
 * @param {string} model - The model of the car.
 * @param {string} brand - The brand of the car.
 * @param {string} transmission - The type of transmission used in the car (e.g., automatic, manual).
 * @param {number} mileage - The current mileage of the car.
 * @param {number} buildYear - The year the car was manufactured.
 * @param {string} fuelType - The type of fuel the car uses (e.g., gasoline, diesel, electric).
 * @param {string} carImage - A URL or path to an image of the car.
 */

export class CarsModel {

  constructor(
    public licensePlate: string,
    public model: string,
    public brand: string,
    public transmission: string,
    public mileage: number,
    public buildYear: number,
    public fuelType: string,
    public carImage: string
  ) {}

  public validateCar(): void {

    if (!this.licensePlateValidation()) {
      throw new Error('licensePlate');
    }
    if (!this.modelValidation()) {
      throw new Error('model');
    }
    if (!this.brandValidation()) {
      throw new Error('brand');
    }
    if (!this.transmissionValidation()) {
      throw new Error('transmission');
    }
    if (!this.mileageValidation()) {
      throw new Error('mileage');
    }
    if (!this.buildYearValidation()) {
      throw new Error('build year');
    }
    if (!this.fuelTypeValidation()) {
      throw new Error('fuel type');
    }

  }


  private licensePlateValidation(): boolean {
    return this.licensePlate.trim() !== '';
  }

  private modelValidation(): boolean {
    return this.model.trim() !== '';
  }

  private brandValidation(): boolean {
    return this.brand.trim() !== '';
  }

  private transmissionValidation(): boolean {
    return this.transmission.trim() !== '';
  }

  private mileageValidation(): boolean {
    return this.mileage > 0;
  }

  private buildYearValidation(): boolean {
    return this.buildYear > 0;
  }

  private fuelTypeValidation(): boolean {
    return this.fuelType.trim() !== '';
  }
}
