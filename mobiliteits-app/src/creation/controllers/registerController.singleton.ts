import { RegisterService } from "../../business/service/register.service";
import { RegisterController } from "../../controller/register.controller";
import { RegisterMysql2Database } from "../../data/databases/RegisterMysqlDatabase";
import { RegisterSequelizeDatabase } from "../../data/databases/RegsiterSequelizeDatabase";

export class RegisterControllerSingleton {

    private static instance: RegisterControllerSingleton | null = null;
    private _controller: RegisterController | null = null;

    private constructor() { }

    public static getInstance(): RegisterControllerSingleton {
        if (RegisterControllerSingleton.instance == null) {
            RegisterControllerSingleton.instance = new RegisterControllerSingleton();

            const registerDatabase = (process.env.DATA_LAYER === "sequelize" && new RegisterSequelizeDatabase()) || new RegisterMysql2Database();
            const registerService: RegisterService = new RegisterService(registerDatabase);
            const registerController: RegisterController = new RegisterController(registerService)

            RegisterControllerSingleton.instance.controller = registerController;
        }

        return RegisterControllerSingleton.instance;
    }

    public get controller(): RegisterController | null {
        return this._controller;
    }

    public set controller(value: RegisterController | null) {
            this._controller = value;
    }
}