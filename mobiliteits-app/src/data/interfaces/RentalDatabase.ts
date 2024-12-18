import { RentalModel } from "../../business/model/rental.model";

export interface RentalDatabase { 
    getRentalTableData(): Promise<RentalModel[]>
}
