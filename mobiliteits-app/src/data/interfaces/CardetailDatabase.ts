import { CarModel } from "../../business/model/carDetail.model";

export interface CardetailDatabase {
    getCardetails(id: string): Promise<CarModel | null>;
}
