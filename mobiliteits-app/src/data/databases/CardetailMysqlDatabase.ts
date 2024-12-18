import { Pool, ResultSetHeader } from "mysql2";
import { RelationalDatabase } from "../RationalDatabase";
import { CarModel } from "../../business/model/carDetail.model";
import { CardetailDatabase } from "../interfaces/CardetailDatabase";
import { CarDetailBusinessModel } from "../convert/CardetailBusinessConverter";

/**
 * @author Joey van der Kuijl
 * RegisterMysql2Database class
 */
export class CardetailMysqlDatabase implements CardetailDatabase{
    constructor() {
    }

      /**
 * @author Joey van der Kuijl
 *
 * Create new account.
*/
    public async getCardetails(id: string): Promise<CarModel | null> {
        let pool: Pool | null = RelationalDatabase.getPool();
        let results: ResultSetHeader | null = null;
        let carDetail: CarModel | null = null;

        if (pool != null) {
            [results] = await pool
              .promise()
              .execute<ResultSetHeader>(
                `SELECT * FROM car WHERE license_plate = ?`, [id]
              );
          }

        if (results != null) {
            carDetail = this.convertResultSetHeaderToCars(results);
          }

          return carDetail;
    }

    private convertResultSetHeaderToCars(
        resultSetHeader: ResultSetHeader,
      ): CarModel | null{
        if (resultSetHeader == undefined) {
          throw new Error("unknow user(s)");
        }
    
        let carModel: CarModel | null = null;
    
        (resultSetHeader as any).forEach((element: any) => {

    
          carModel = new CarModel(
            element.license_plate,
            element.model,
            element.brand,
            element.transmission,
            element.mileage,
            element.build_year,
            element.fuel_type,
            element.carImage
          );
        });

        return carModel;
      }
}