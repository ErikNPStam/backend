/**
 * @author Luka Piersma
 *
 * The business model of a Journey.
 */

export class Journey {

  constructor(
    public date: Date,
    public email: string,
    public type: string,
    public addressFrom: string,
    public addressTo: string,
    public kilometers: number,
    public price: number,
    public transportType: string,
    private emissions?: number,
    public createdAt?: string,
  ) { }

  public verifyDate(): boolean {
    const currentDate = new Date();
    const journeyDate = new Date(this.date);

    let returnValue = true

    if (journeyDate.getTime() > currentDate.getTime()) {
      returnValue = false
    }

    return returnValue
  }

  public verifyType(): boolean {
    const type = this.type;

    let returnValue = true

    if (type !== "Commuting" && type !== "Business") {
      returnValue = false
    }

    return returnValue
  }

  public verifyKilometers() {
    const kilometers = this.kilometers;

    let returnValue = true

    if (
      typeof kilometers !== "number" ||
      kilometers <= 0 ||
      kilometers > 100000 ||
      isNaN(kilometers)
    ) {
      returnValue = false
    }

    return returnValue
  }

  public verifyPrice() {
    const price = this.price;

    let returnValue = true

    if (typeof price !== "number" || price < 0 || isNaN(price)) {
      returnValue = false
    }

    return returnValue
  }

  public verifyTransportType() {
    const transportTypes = [
      "Boat",
      "Bus",
      "Diesel Car",
      "Petrol Car",
      "Electric Car",
      "Cycling",
      "Metro",
      "Plane",
      "Train",
      "Walking",
    ];
    const transportType = this.transportType;

    let returnValue = true

    if (!transportTypes.includes(transportType)) {
      returnValue = false
    }

    return returnValue
  }

  public verify(): void {
    const verified = this.verifyDate() && this.verifyType() && this.verifyKilometers() && this.verifyPrice() && this.verifyTransportType();

    if (!verified) {
      throw new Error("Journey validation error")
    }
  }
}
