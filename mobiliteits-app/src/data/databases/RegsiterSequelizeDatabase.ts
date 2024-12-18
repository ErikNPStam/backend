import { RegisterDatabase } from '../interfaces/RegistrationDatabase'
import RegisterModelSequelize from '../models/account.model'
import RegisterPasswordModel from '../models/password.model';
import RegisterModel from '../../business/model/registration.model';

/**
 * @author Joey van der Kuijl
 *
 * RegisterSequelizeDatabase class
*/

export class RegisterSequelizeDatabase implements RegisterDatabase {
  constructor() { }

/**
* @author Joey van der Kuijl
*
* Create new account.
*/
  async createNewAccount(register: RegisterModel): Promise<void> {
    let account_type_name = process.env.USER_TYPE;

    await RegisterModelSequelize.create({
      firstname: register.firstname,
      lastname: register.lastname,
      tussenvoegsel: register.insertion,
      email: register.email,
      account_type_name: account_type_name
    });


    await RegisterPasswordModel.create({
      hash: register.hash,
      email: register.email,
      created_at: new Date()
    });
  }
}