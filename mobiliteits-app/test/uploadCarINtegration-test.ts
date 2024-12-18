
import sinon from "sinon";
import express from "express";
import * as tssinon from "ts-sinon";
import { UploadCarsController } from "../src/controller/uploadcars.controller";
import { UploadCarService } from "../src/business/service/uploadCar.service";
import { UploadCars } from "../src/data/interfaces/uploadCarDatabase";
import { CarsModel } from "../src/business/model/car.model";


describe("Upload Cars Controller", () => {
    const sandbox = tssinon.default.createSandbox();

    let database: tssinon.StubbedInstance<UploadCars>;
    let service: UploadCarService;
    let controller: UploadCarsController;

    let mockRequest: express.Request & { file?: any; };
    let mockResponse: any;

    const mockCar: CarsModel = new CarsModel(
        "ABC-123",
        "Model S",
        "Tesla",
        "Automatic",
        10000,
        2020,
        "Electric",
        "http://localhost:3002/uploads/car.jpg"
    );

    beforeEach(() => {
        database = tssinon.stubInterface<UploadCars>();

        service = new UploadCarService(database);
        controller = new UploadCarsController(service);

        mockRequest = {
            body: {
                licensePlate: 'ABC-123',
                model: 'Model S',
                brand: 'Tesla',
                transmission: 'Automatic',
                mileage: 10000,
                buildYear: 2020,
                fuelType: 'Electric'
            },
            file: {
                filename: 'car.jpg'
            },
            headers: {},
            get: (header: string) => mockRequest.headers[header]
        } as express.Request & { file?: any; };

        mockResponse = {
            json: sinon.spy(),
            status: sinon.stub().returnsThis(),
            headers: {},
            setHeader: (name: string, value: string) => { mockResponse.headers[name] = value; },// "Content-Type": "application/json"
            getHeader: (name: string) => mockResponse.headers[name]
        } as any;

        database.uploadCar.resolves(mockCar);
    });

    afterEach(() => {
        sandbox.restore();
    });

    it("should handle missing image", async () => {
        mockRequest.file = undefined;

        await controller.uploadCar(mockRequest, mockResponse);

        sinon.assert.calledOnce(mockResponse.status);
        sinon.assert.calledWith(mockResponse.status, 404);
        sinon.assert.calledOnce(mockResponse.json);
        sinon.assert.calledWith(mockResponse.json, sinon.match({error: 'Image is required' }));
    });

    it("should handle invalid license plate", async () => {
        mockRequest.body.licensePlate = '';

        await controller.uploadCar(mockRequest, mockResponse);

        sinon.assert.calledOnce(mockResponse.status);
        sinon.assert.calledWith(mockResponse.status, 400);
        sinon.assert.calledOnce(mockResponse.json);
        sinon.assert.calledWith(mockResponse.json, sinon.match({ field: 'licensePlate' }));
    });

    it("should handle server error", async () => {
        sandbox.stub(service, 'uploadCar').rejects(new Error('Server error'));

        await controller.uploadCar(mockRequest, mockResponse);

        sinon.assert.calledOnce(mockResponse.status);
        sinon.assert.calledWith(mockResponse.status, 500);
        sinon.assert.calledOnce(mockResponse.json);
        sinon.assert.calledWith(mockResponse.json, sinon.match({ error: 'Server error' }));
    });
});
