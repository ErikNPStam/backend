import { RegisterDatabase } from "../../data/interfaces/RegistrationDatabase";
import RegisterModel from "../model/registration.model";

export class RegisterService {
  constructor(private registerDatabase: RegisterDatabase) { }

  public async createNewAccount(register: RegisterModel): Promise<void> {
    register.verify();
    await register.hashWithArgon();
    await this.registerDatabase.createNewAccount(register);
  }
}
