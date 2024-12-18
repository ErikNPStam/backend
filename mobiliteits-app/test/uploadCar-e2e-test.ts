!/gaat niet door de Pipeline/

// import * as tssinon from "ts-sinon";
// import { AppBuilder } from "../src/creation/builders/app.builder";
// import { Routes } from "../src/creation/enums/routes";
// import { UploadCarService } from "../src/business/service/uploadCar.service";
// import { UploadCarsController } from "../src/controller/uploadcars.controller";
// import { UploadCarsControllerSingleton } from "../src/creation/controllers/adminUploadCar.singleton";
// import { UploadCarsSequelize } from "../src/data/databases/UploadCarsSecuelize";
// import { SessionManager } from "../src/middleware/SessionManager";
// import { CarBusinessConverter } from "../src/data/convert/carBusinessConverter";
// import supertest from "supertest";
// import { expect } from "chai";
// import { Sequelize } from "sequelize-typescript";
// import dotenv from 'dotenv';
// import CarSequelize from "../src/data/models/car.model";

// dotenv.config();

// process.env.SCHEMA_RELATIONAL_DB = 'test_' + process.env.SCHEMA_RELATIONAL_DB;

// const sequelize = new Sequelize({
//     database: process.env.SCHEMA_RELATIONAL_DB,
//     dialect: 'mysql',
//     username: process.env.USER_RELATIONAL_DB,
//     password: process.env.PASSWORD_RELATIONAL_DB,
//     models: [__dirname + '\\models'],
// });

// sequelize.addModels([__dirname + '\\models']);

// const mockEmail = 'admin1@example.com';

// describe("AdminUploadCar e2e", () => {
//     const sandbox = tssinon.default.createSandbox();

//     let database: UploadCarsSequelize;
//     let service: UploadCarService;
//     let controller: UploadCarsController;
//     let agent: any;

//     const appBuilder = AppBuilder.getInstance();
//     appBuilder.setPort(3030);
//     appBuilder.addRouter(Routes.ADMIN);

//     const app = appBuilder.buildApp();
//     app.attachCors();
//     app.attachHeaders();
//     app.attachEncoder();
//     app.attachRouters();
//     app.listen();

//     before(async () => {
//         // Authenticatie en synchronisatie van modellen
//         await sequelize.authenticate();
//         await sequelize.sync();
//     });

//     beforeEach(async () => {
//         // Initialiseer database en services
//         const carConverter = new CarBusinessConverter();
//         database = new UploadCarsSequelize(carConverter);
//         service = new UploadCarService(database);
//         controller = new UploadCarsController(service);

//         UploadCarsControllerSingleton.setInstance(controller);
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

//     after(async () => {
//         // Sluit de verbinding na de tests
//         await sequelize.close();
//         app.close();
//     });

//     it('should upload a car for admin.', async () => {
//         const body = {
//             licensePlate: "ABC1423",
//             model: "Civic",
//             brand: "Honda",
//             transmission: "Automatic",
//             mileage: 50000,
//             buildYear: 2020,
//             fuelType: "Petrol"
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

//         console.log('Response status:', res.statusCode);
//         console.log('Response body:', res.body);

//         expect(res.statusCode).equals(200);
//         expect(res.body).to.have.property('success', true);

//         const carFromDB = await CarSequelize.findOne({ where: { license_plate: body.licensePlate } });
//         console.log('Car from DB:', carFromDB);
//         expect(carFromDB?.model).to.equal(body.model);
//     });

//     it('should handle missing image.', async () => {
//         const body = {
//             licensePlate: "XYZ456",
//             model: "Accord",
//             brand: "Honda",
//             transmission: "Manual",
//             mileage: 75000,
//             buildYear: 2018,
//             fuelType: "Diesel"
//         };

//         const res = await agent
//             .post('/admin/cars/upload')
//             .field('licensePlate', body.licensePlate)
//             .field('brand', body.brand)
//             .field('model', body.model)
//             .field('transmission', body.transmission)
//             .field('buildYear', body.buildYear)
//             .field('fuelType', body.fuelType)
//             .field('mileage', body.mileage);

//         console.log('Response status:', res.statusCode);
//         console.log('Response body:', res.body);

//         expect(res.statusCode).equals(404);
//         expect(res.body).to.have.property('error', 'Image is required');
//     });
// });
