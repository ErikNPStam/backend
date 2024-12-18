import { UploadCarService } from "../../business/service/uploadCar.service";
import { UploadCarsController } from "../../controller/uploadcars.controller";
import { CarBusinessConverter } from "../../data/convert/carBusinessConverter";
import { UploadCarsSequelize } from "../../data/databases/UploadCarsSecuelize";
import { UploadCarsMySQL } from "../../data/databases/uploadCarMysql";

export class UploadCarsControllerSingleton {
  private static instance: UploadCarsControllerSingleton | null = null;
  private _controller: UploadCarsController | null = null;


  private constructor() {}

  public static getInstance(): UploadCarsControllerSingleton {
    if (UploadCarsControllerSingleton.instance == null) {
UploadCarsControllerSingleton.instance = new UploadCarsControllerSingleton()

      const uploadCarConverter: CarBusinessConverter = new CarBusinessConverter();
      const uploadCarSequelize: UploadCarsSequelize = new UploadCarsSequelize(uploadCarConverter);
      const uploadCarService: UploadCarService = new UploadCarService(uploadCarSequelize);
      const uploadCarController: UploadCarsController = new UploadCarsController(uploadCarService)

      UploadCarsControllerSingleton.instance.controller = uploadCarController
    }

    return UploadCarsControllerSingleton.instance;
  }
  public get controller(): UploadCarsController | null {
    return this._controller;
}
private set controller(value: UploadCarsController | null) {
    if (this._controller == null) {
        this._controller = value;
    }
}
}