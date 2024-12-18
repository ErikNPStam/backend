import sinon from "sinon";
import express from "express";
import * as tssinon from "ts-sinon";
import { CarDetailController } from "../src/controller/carDetail.controller";
import { CarDetailService } from "../src/business/service/carDetail.service";
import { CardetailDatabase } from "../src/data/interfaces/CardetailDatabase";
import CarDetailSequelizeModel from "../src/data/models/car.model";
import { CarModel } from "../src/business/model/carDetail.model";
import { EmissionCalculator } from "../src/Util/emissionCalculator";

describe("carDetail Controller", () => {
    const sandbox = tssinon.default.createSandbox();

    let database: tssinon.StubbedInstance<CardetailDatabase>;
    let service: CarDetailService;
    let controller: CarDetailController;

    let mockRequest: express.Request;
    let mockResponse: any;

    const mockCreateCar: CarDetailSequelizeModel = {
        license_plate: "ABC123",
        model: "Civic",
        brand: "Honda",
        transmission: "Automatic",
        mileage: 50000,
        build_year: 2020,
        fuel_type: "Petrol",
        carImage: "https://media.discordapp.net/attachments/1222131677711826958/1239904742789091388/download.jpg?ex=66449ec6&is=66434d46&hm=5f6f26f1f26fe2ebada2a88d70355f9bbae3905ff9b51240a114052bbcc006a0&=&format=webp&width=414&height=273"
    } as CarDetailSequelizeModel;

    const mockCardetail: CarModel = new CarModel(
        mockCreateCar.license_plate,
        mockCreateCar.model,
        mockCreateCar.brand,
        mockCreateCar.transmission,
        mockCreateCar.mileage,
        mockCreateCar.build_year,
        mockCreateCar.fuel_type,
        mockCreateCar.carImage
    );

    beforeEach(() => {
        // Create a stubbed instance of the database
        database = tssinon.stubInterface<CardetailDatabase>();

        // Create the service and controller using the stubbed database
        service = new CarDetailService(database);
        controller = new CarDetailController(service);

        // Mock the request and response objects
        mockRequest = {
            params: {
                id: 'ABC123'
            }
        } as unknown as express.Request;

        mockResponse = {
            json: sinon.spy(),
            status: sinon.stub().returnsThis()
        } as any;


        // Stub the database method to return the mockCar
        database.getCardetails.resolves(mockCardetail);
    });

    afterEach(() => {
        // Restore the sandbox to clean up any stubs or spies created
        sandbox.restore();
    });

    it("should return car for user", async () => {
        await controller.getCardetail(mockRequest, mockResponse);

        sinon.assert.calledOnce(mockResponse.json);
        sinon.assert.calledWith(mockResponse.json, mockCardetail);

        sinon.assert.calledOnce(mockResponse.status);
        sinon.assert.calledWith(mockResponse.status, 202);
    });

    it("should return 400 if car is not found", async () => {
        database.getCardetails.resolves(null);

        await controller.getCardetail(mockRequest, mockResponse);

        sinon.assert.calledOnce(mockResponse.status);
        sinon.assert.calledWith(mockResponse.status, 400);
    });
});
