import RegisterModel from "../../business/model/registration.model";

export interface RegisterDatabase {
    createNewAccount(register: RegisterModel): Promise<void>;
  }
  
