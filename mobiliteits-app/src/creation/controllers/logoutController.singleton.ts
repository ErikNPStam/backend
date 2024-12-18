import { LogoutController } from "../../controller/logout.controller";

export class LogoutControllerSingleton {

    private static instance: LogoutController | null = null;

    private constructor() { }

    public static getInstance(): LogoutController {
        if (LogoutControllerSingleton.instance == null) {
            LogoutControllerSingleton.instance = new LogoutController();
        }

        return LogoutControllerSingleton.instance;
    }
}