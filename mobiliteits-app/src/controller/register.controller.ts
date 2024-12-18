import * as express from "express";
import { RegisterService } from "../business/service/register.service";
import { RegisterFactory } from "../creation/register.factory";
import RegisterModel from "../business/model/registration.model";

export class RegisterController {
  constructor(private registerService: RegisterService, private registerFactory: RegisterFactory = new RegisterFactory()) { }

  public async createNewAccount(req: express.Request, res: express.Response): Promise<void> {
    try {
      const register: RegisterModel = this.registerFactory.createRegisterFromRequest(req);
      await this.registerService.createNewAccount(register);
        
      res.status(202).json({true: "Account created successfully."});   
      
    }catch (error: any) {
      res.status(401).json(error.message);
    }
  }
}
