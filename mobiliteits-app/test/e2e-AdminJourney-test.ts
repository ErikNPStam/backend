/**
 * ! De pipeline is nog niet geconfigureerd om e2e-tests uit te voeren.
 * ! De e2e test werken wel maar komen dus nog niet langs de pipeline.
 */
// import * as tssinon from "ts-sinon";
// import { AppBuilder } from "../src/creation/builders/app.builder";
// import { Routes } from "../src/creation/enums/routes";
// import { JourneyService } from "../src/business/service/journey.service";
// import { JourneyController } from "../src/controller/journey.controller";
// import { JourneyControllerSingleton } from "../src/creation/controllers/journeyController.singleton";
// import { JourneySequelizeSingleton } from "../src/creation/singleton/JourneySequelizeSingleton";
// import { SessionManager } from "../src/middleware/SessionManager";
// import supertest, { agent } from "supertest";
// import { expect } from "chai";
// import sinon from "sinon";
// import { Sequelize } from "sequelize-typescript";
// import { fillDatabaseWithMockData } from "../src/Util/fillDatabaseWithMockData";
// import dotenv from 'dotenv';


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


// const mockEmail = 'admin1@example.com'

// describe("AdminJourneys e2e", () => {
//     const sandbox = tssinon.default.createSandbox();

//     let database: any;
//     let service: JourneyService;
//     let controller: JourneyController;
//     let agent: any;

//     const appBuilder = AppBuilder.getInstance();
//     appBuilder.setPort(3029);
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
//         // Gebruik de standaard sequelize-verbinding voor de tests
//         await fillDatabaseWithMockData();
//         database = JourneySequelizeSingleton.getInstance();
//         service = new JourneyService(database);
//         controller = new JourneyController(service);

//         JourneyControllerSingleton.setInstance(controller);
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

//     it('should get all journeys for admin.', async () => {
//         const getAllJourneysSpy = sandbox.spy(database, 'getAllJourneys');

//         const res = await agent.get('/admin/journeys');

//         expect(res.statusCode).equals(202);

//         sinon.assert.calledOnce(getAllJourneysSpy);
//         const journeysFromDB = await database.getAllJourneys();
//         expect(journeysFromDB.length).to.equal(2);
//         expect(journeysFromDB[0].email).to.equal('user1@example.com');
//         expect(journeysFromDB[1].email).to.equal('user2@example.com');
//     });

//     it('should handle empty journey list for admin.', async () => {
//         // Maak de journeys tabel leeg
//         await database.deleteAllJourneys();

//         const res = await agent.get('/admin/journeys');
//         expect(res.statusCode).equals(202);
//         expect(res.body).to.be.an('array').that.is.empty;
//         const journeysFromDB = await database.getAllJourneys();
//         expect(journeysFromDB.length).to.equal(0);
//     });

//     it('should handle unauthorized access.', async () => {
//         // Stel een ongeldige gebruikersrol in in de sessie
//         SessionManager.sessions['tester'] = {
//             userEmail: mockEmail,
//             userRole: 'user',
//             expirationDate: new Date('2025-12-17')
//         }
//         agent.jar.setCookie(`session=tester`);

//         const res = await agent.get('/admin/journeys');
//         expect(res.statusCode).equals(401);
//         expect(res.body.message).equals("Unauthorized: Not an admin");
//         const getAllJourneysSpy = sandbox.spy(database, 'getAllJourneys');
//         sinon.assert.notCalled(getAllJourneysSpy);
//     });

//     it('should handle expired session.', async () => {
//         // Stel een verlopen sessie in
//         SessionManager.sessions['test'] = {
//             userEmail: mockEmail,
//             userRole: 'Admin',
//             expirationDate: new Date('2022-12-17')
//         }
//         agent.jar.setCookie(`session=test`);

//         const res = await agent.get('/admin/journeys');
//         expect(res.statusCode).equals(401);
//         const getAllJourneysSpy = sandbox.spy(database, 'getAllJourneys');
//         sinon.assert.notCalled(getAllJourneysSpy);
//     });
// });
