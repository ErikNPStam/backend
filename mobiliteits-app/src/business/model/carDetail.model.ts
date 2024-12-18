/**
* @author Joey van der Kuijl
*
* Car model.
*/
export class CarModel {

        constructor(
                public licensePlate: string,
                public model: string,
                public brand: string,
                public transmission: string,
                public mileage: number,
                public buildYear: number,
                public fuelType: string,
                public carImage: string) { }

}
