import { LoginService } from "../../business/service/login.service";
import { LoginController } from "../../controller/login.controller";
import { LoginSqlDatabase } from "../../data/databases/LoginSqlDatabase";

export class LoginControllerSingleton {

    private static instance: LoginController | null = null;

    private constructor() { }

    public static getInstance(): LoginController {
        if (LoginControllerSingleton.instance == null) {
            const loginDatabase = new LoginSqlDatabase();
            const loginService = new LoginService(loginDatabase);

            LoginControllerSingleton.instance = new LoginController(loginService);
        }

        return LoginControllerSingleton.instance;
    }
}