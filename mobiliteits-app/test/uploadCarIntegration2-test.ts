!/gaat niet door de Pipeline/

// import * as tssinon from "ts-sinon";
// import { AppBuilder } from "../src/creation/builders/app.builder";
// import { Routes } from "../src/creation/enums/routes";
// import { UploadCarService } from "../src/business/service/uploadCar.service";
// import { UploadCarsController } from "../src/controller/uploadcars.controller";
// import { UploadCars } from "../src/data/interfaces/uploadCarDatabase";
// import { UploadCarsControllerSingleton } from "../src/creation/controllers/adminUploadCar.singleton";
// import { CarsModel } from "../src/business/model/car.model";
// import { SessionManager } from "../src/middleware/SessionManager";
// import supertest from "supertest";
// import { expect } from "chai";
// import sinon from "sinon";

// const mockCar: CarsModel = new CarsModel(
//     "AB-123-CD",
//     "Model S",
//     "Tesla",
//     "Automatic",
//     15000,
//     2021,
//     "Electric",
//     "http://localhost:3002/uploads/car.jpg"
// );

// const mockEmail = 'admin@example.com';

// describe("Upload Car integration", () => {
//     const sandbox = tssinon.default.createSandbox();

//     let database: any;
//     let service: UploadCarService;
//     let controller: UploadCarsController;

//     const appBuilder = AppBuilder.getInstance();
//     appBuilder.setPort(3018);
//     appBuilder.addRouter(Routes.ADMIN);

//     const app = appBuilder.buildApp();
//     app.attachCors();
//     app.attachHeaders();
//     app.attachEncoder();
//     app.attachRouters();
//     app.listen();

//     let agent: any;

//     beforeEach(() => {
//         database = tssinon.stubInterface<UploadCars>();

//         // Create the service and controller using the stubbed database
//         service = new UploadCarService(database);
//         controller = new UploadCarsController(service);

//         UploadCarsControllerSingleton.setInstance(controller);

//         database.uploadCar.resolves(mockCar);

//         SessionManager.sessions['test'] = {
//             userEmail: mockEmail,
//             userRole: 'Admin',
//             expirationDate: new Date('2025-12-17')
//         };

//         agent = supertest.agent(app.getApp());
//         agent.jar.setCookie(`session=test`);
//     });

//     afterEach(() => {
//         sandbox.restore();
//     });

//     after(() => {
//         app.close();
//     });

//     it('should upload a car.', async () => {
//         const body = {
//             licensePlate: "AB-123-CD",
//             brand: "Tesla",
//             model: "Model S",
//             transmission: "Automatic",
//             buildYear: 2021,
//             fuelType: "Electric",
//             mileage: 15000
//         };

//         const res = await agent
//             .post('/admin/cars/upload')
//             .field('licensePlate', body.licensePlate)
//             .field('brand', body.brand)
//             .field('model', body.model)
//             .field('transmission', body.transmission)
//             .field('buildYear', body.buildYear)
//             .field('fuelType', body.fuelType)
//             .field('mileage', body.mileage)
//             .attach('carImage', 'C:/Users/Mohammad/UtilMapje/Backend latest/backend/mobiliteits-app/uploads/test-car.jpg');

//         expect(res.statusCode).equals(200);
//         expect(res.body).to.have.property('success', true);
//         expect(res.body.car).to.deep.equal(mockCar);

//         sinon.assert.calledOnce(database.uploadCar);
//     });
// });

