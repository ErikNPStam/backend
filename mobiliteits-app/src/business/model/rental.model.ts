export class RentalModel {
    push(rental: RentalModel) {
        throw new Error("Method not implemented.");
    }
    constructor(
        public email: string,
        public rentalDate: Date,
        public dateOfReturn: Date,
        public licensePlate: string
    ){}
}