// import * as tssinon from "ts-sinon";
// import { AppBuilder } from "../src/creation/builders/app.builder";
// import { Routes } from "../src/creation/enums/routes";
// import { Journey } from "../src/business/model/journey.model";
// import { SessionManager } from "../src/middleware/SessionManager";
// import supertest, { agent } from "supertest";
// import { expect } from "chai";
// import testSequelize from "../src/data/testSequelize";
// import JourneySequelize from "../src/data/models/journey.model";
// import { App } from "../src/creation/app";

// const mockJourneys: Journey[] = [
//     new Journey(
//         new Date("05/16/2024"),
//         "user1@example.com",
//         "Commuting",
//         "123 Start St",
//         "456 End St",
//         10,
//         20,
//         "Bus"
//     ),
//     new Journey(
//         new Date("05/17/2024"),
//         "user2@example.com",
//         "Business",
//         "123 Start St",
//         "456 End St",
//         20,
//         0,
//         "Train"
//     )
// ];

// const mockEmail = 'user2@example.com'

// describe("Journeys e2e using test database", () => {
//     const sandbox = tssinon.default.createSandbox();

//     const journeySequelize = new JourneySequelize();
//     const appBuilder = AppBuilder.getInstance();
//     appBuilder.setPort(3003);
//     appBuilder.addRouter(Routes.USER);

//     const app: App = appBuilder.buildApp();
//     app.attachCors();
//     app.attachHeaders();
//     app.attachEncoder();
//     app.attachRouters();
//     app.listen();

//     let agent: any;

//     beforeEach(async () => {
//         await testSequelize.sync({ force: true });

//         for (let i = 0; i < mockJourneys.length; i++) {
//             const journey: Journey = mockJourneys[i];

//             await journeySequelize.createJourney(journey);
//         }

//         SessionManager.sessions['test'] = {
//             userEmail: mockEmail,
//             userRole: 'User',
//             expirationDate: new Date('2025-12-17')
//         }

//         agent = supertest.agent(app.getApp());
//         agent.jar.setCookie(`session=test`);
//     });

//     afterEach(() => {
//         sandbox.restore();
//     });

//     after(() => {
//         app.close();
//     });

//     it('should get journeys for a user.', async () => {
//         const res = await agent.get('/user/journeys');

//         expect(res.statusCode).equals(202);
//         expect(res.body).to.be.an('array').that.has.lengthOf(1);
//     });

//     it('should create a journey for a user.', async () => {
//         const body = {
//             date: "05/16/2024",
//             type: "Commuting",
//             addressFrom: "123 Start St",
//             addressTo: "456 End St",
//             distance: 40,
//             price: 0,
//             transport: "Plane"
//         };

//         await new Promise(resolve => setTimeout(resolve, 1000));

//         const res = await agent.post('/user/journey').send(body);

//         expect(res.statusCode).equals(202);
//         expect(res.body).to.be.an('object').that.is.empty;
//     });
// });