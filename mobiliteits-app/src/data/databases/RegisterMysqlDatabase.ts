import { Pool, ResultSetHeader } from "mysql2";
import { RegisterDatabase } from "../interfaces/RegistrationDatabase";
import { RelationalDatabase } from "../RationalDatabase";
import RegisterModel from "../../business/model/registration.model";

/**
 * @author Joey van der Kuijl
 * RegisterMysql2Database class
 */
export class RegisterMysql2Database implements RegisterDatabase {
    constructor() {
    }

      /**
 * @author Joey van der Kuijl
 *
 * Create new account.
*/
    async createNewAccount(register: RegisterModel): Promise<void> {
        let pool: Pool | null = RelationalDatabase.getPool();
        let results: ResultSetHeader | null = null;
        let results2: ResultSetHeader | null = null;

        let account_type_name = process.env.USER_TYPE;

        if (pool != null) {
            [results] = await pool
              .promise()
              .execute<ResultSetHeader>(
                'INSERT INTO account (firstname, lastname, insertion, email, account_type_name) VALUES (?, ?, ?, ?, ?)',
                [
                  register.firstname,
                  register.lastname,
                  register.insertion,
                  register.email,
                  account_type_name
                ],
              );
          }

        if (pool != null) {
            [results2] = await pool
              .promise()
              .execute<ResultSetHeader>(
                'INSERT INTO password (hash, email, created_at) VALUES (?, ?, ?)',
                [
                  register.hash,
                  register.email,  
                  new Date()    
                ],
              );
          }
    }
}