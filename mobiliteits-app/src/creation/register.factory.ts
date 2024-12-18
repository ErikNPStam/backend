import express from "express";
import RegisterModel from "../business/model/registration.model";
import { register } from "module";

/**
 * @author Joey van der Kuijl
 * RegisterFactory class
 */
export class RegisterFactory {
    constructor() { }

    public createRegisterFromRequest(req: express.Request): RegisterModel {
        const body = req.body
        const register: RegisterModel = new RegisterModel(
            body.email,
            body.password,
            body.firstName,
            body.lastName,
            body.middleName,
        );

        return register
    }
}