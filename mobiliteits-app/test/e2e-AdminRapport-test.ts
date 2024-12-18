// // ! Commented out because of the pipeline not having a test database
// import * as tssinon from "ts-sinon";
// import { AppBuilder } from "../src/creation/builders/app.builder";
// import { Routes } from "../src/creation/enums/routes";
// import { AdminRapport } from "../src/business/model/adminRapportModel";
// import { SessionManager } from "../src/middleware/SessionManager";
// import supertest, { agent } from "supertest";
// import { expect } from "chai";
// import testSequelize from "../src/data/testSequelize";
// import { App } from "../src/creation/app";

// /**
//  * @author Erik Stam
//  */

// const mockRapport: AdminRapport[] = [
//     new AdminRapport(
//         'Diesel Car',
//         1000
//     )
// ];

// const mockEmail = 'admin1@example.com'

// describe("AdminRapport e2e", () => {
//     // Create a sandbox
//     const sandbox = tssinon.default.createSandbox();

//     // Create the app
//     const appBuilder = AppBuilder.getInstance();

//     // Set the port and add the router
//     appBuilder.setPort(3045);
//     appBuilder.addRouter(Routes.ADMIN);

//     // Build the app
//     const app: App = appBuilder.buildApp();
//     app.attachCors();
//     app.attachHeaders();
//     app.attachEncoder();
//     app.attachRouters();
//     app.listen();

//     let agent: any;

//     // Before each test, sync the test database and add a session
//     beforeEach(() => {
//         await testSequelize.sync({ force: true });

//         SessionManager.sessions['test'] = {
//             userEmail: mockEmail,
//             userRole: 'Admin',
//             expirationDate: new Date('2025-12-17')
//         }

//         agent = supertest.agent(app.getApp());
//         agent.jar.setCookie(`session=test`);
//     });

//     // After each test, restore the sandbox
//     afterEach(() => {
//         sandbox.restore();
//     });

//     // After all tests, close the app
//     after(() => {
//         app.close();
//     })

//     // Test if the admin report is returned
//     it('should get admin report for admin', async () => {
//         const res = await agent.get('/admin/adminRapport/:month/:year');

//         // Check if the response is correct
//         expect(res.statusCode).equals(202);
//         expect(res.body).to.be.an('array').that.has.lengthOf(1);
//     });

//     it('should handle unauthorized access.', async () => {
//         // Set an invalid user role in the session
//         SessionManager.sessions['tester'] = {
//             userEmail: mockEmail,
//             userRole: 'user',
//             expirationDate: new Date('2025-12-17')
//         }
//         agent.jar.setCookie(`session=tester`);

//         const res = await agent.get('/admin/adminRapport/:month/:year');
//         expect(res.statusCode).equals(401);
//         expect(res.body.message).equals("Unauthorized: Not an admin");
//     });

//     it('should handle expired session.', async () => {
//         // Set an expired session
//         SessionManager.sessions['test'] = {
//             userEmail: mockEmail,
//             userRole: 'Admin',
//             expirationDate: new Date('2022-12-17')
//         }
//         agent.jar.setCookie(`session=test`);

//         const res = await agent.get('/admin/adminRapport/:month/:year');
//         expect(res.statusCode).equals(401);
//         expect(res.body.message).equals("Unauthorized: No Session");
//     });
// });