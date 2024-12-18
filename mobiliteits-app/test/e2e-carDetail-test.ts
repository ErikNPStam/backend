// import supertest from "supertest";
// import { AppBuilder } from "../src/creation/builders/app.builder";
// import { Routes } from "../src/creation/enums/routes";
// import { expect } from "chai";
// import { SessionManager } from "../src/middleware/SessionManager";
// import * as tssinon from "ts-sinon";
// import { CarModel } from "../src/business/model/carDetail.model";
// import CarSequelize from "../src/data/models/car.model";
// import AccountSequelize from "../src/data/models/account.model";
// import PasswordSequelize from "../src/data/models/password.model";
// import RegisterModel from "../src/business/model/registration.model";
// import testSequelize  from "../src/data/testSequelize";
// import AccountTypeSequelize from "../src/data/models/accountType.model";

// /**
//  * This is an end to end test for the carDetail controller
//  * @author Joey van der Kuijl
//  */

// describe("carDetail end to end test", () => {
//     const sandbox = tssinon.default.createSandbox();
    
//     const appBuilder = AppBuilder.getInstance();
//     appBuilder.setPort(3016);
//     appBuilder.addRouter(Routes.USER);

//     const app = appBuilder.buildApp();
//     app.attachCors();
//     app.attachHeaders();
//     app.attachEncoder();
//     app.attachRouters();
//     app.listen();

//     let agent: any;

//     beforeEach(async() => {
//         let password: string = 'IloveProgramming123!';
//         let hasher: RegisterModel = new RegisterModel('test@test.nl', password, 'test', 'test', 'test');
//         await hasher.hashWithArgon();
//         await Promise.resolve(testSequelize.sync({ force: true }).then((result) => console.log(result)));
//         await Promise.resolve(CarSequelize.create({ license_plate: "ABC123", model: "Civic", brand: "Honda", transmission: "Automatic", mileage: 50000, build_year: 2020, fuel_type: "Petrol", carImage: "https://media.discordapp.net/attachments/1222131677711826958/1239904742789091388/download.jpg?ex=66449ec6&is=66434d46&hm=5f6f26f1f26fe2ebada2a88d70355f9bbae3905ff9b51240a114052bbcc006a0&=&format=webp&width=414&height=273" }));
//         await Promise.resolve(AccountTypeSequelize.create({ name: "User" })); // Create a user account type
//         await Promise.resolve(AccountSequelize.create({ email: "test2@tesing.com", firstname: "test", tussenvoegsel: "test", lastname: "test", account_type_name: "User",  }));
//         await Promise.resolve(PasswordSequelize.create({ hash: hasher.hash, email: "test22@testing.com", created_at: new Date(Date.now()) }));

//         SessionManager.sessions['test'] = {
//             userEmail: 'user2@example.com',
//             userRole: 'user',
//             expirationDate: new Date('2025-12-17')
//         }
        
//         agent = supertest.agent(app.getApp());
//         //the supertest library to perform HTTP requests for testing an Express application.
//         agent.jar.setCookie(`session=test`);
//         //agent.jar.setCookie(session=test); is setting a cookie on the supertest agent. 
//         //The jar property of the agent is a cookie jar that can be used to manage cookies.

//     });

//     afterEach(async () => {
//         sandbox.restore();
//         // testSequelize.close();
//     });

//     after(() => {
//         app.close();
//     })

//     it("should return a car from database", async () => {

//         const newCar = new CarModel(
//             'ABC123',
//             'Civic',
//             'Honda',
//             'Automatic',
//             50000,
//             2020,
//             'Petrol', 
//             'https://media.discordapp.net/attachments/1222131677711826958/1239904742789091388/download.jpg?ex=66449ec6&is=66434d46&hm=5f6f26f1f26fe2ebada2a88d70355f9bbae3905ff9b51240a114052bbcc006a0&=&format=webp&width=414&height=273'
//         );

//         const response = await agent.get("/user/cardetail/ABC123").set('Cookie', 'session=test');
//         //set('Cookie', 'session=test') part of the code is setting a cookie in the header of the HTTP request
//         // expect(response.status).to.equal(202); // The status should be 200 for a successful GET request
//         expect(response.body).to.deep.equal(newCar); 

//     });

//     it("should return a error when req.params.id is null", async () => {
//         const newCar = { error: "Car not found" };

//         const response = await agent.get("/user/carDetail/null").set('Cookie', 'session=test');
//         //set('Cookie', 'session=test') part of the code is setting a cookie in the header of the HTTP request
//         expect(response.status).to.equal(400); // The status should be 200 for a successful GET request
//         expect(response.body).to.deep.equal(newCar); 

//     });
// });
