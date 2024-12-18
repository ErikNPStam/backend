import * as tssinon from "ts-sinon";
import { AppBuilder } from "../src/creation/builders/app.builder";
import { Routes } from "../src/creation/enums/routes";
import { SessionManager } from "../src/middleware/SessionManager";
import supertest, { agent } from "supertest";
import { expect } from "chai";
import sinon from "sinon";
import RegisterModel from "../src/business/model/registration.model";
import { RegisterDatabase } from "../src/data/interfaces/RegistrationDatabase";
import { RegisterService } from "../src/business/service/register.service";
import { RegisterController } from "../src/controller/register.controller";
import { RegisterControllerSingleton } from "../src/creation/controllers/registerController.singleton";

/**
 * This is an Register Intergration tests
 * @Author Joey van der Kuijl
 */
const mockRegister: RegisterModel =
    new RegisterModel(
        "user222@example.com",
        "wachtwoord123",
        "User",
        "Two",
        "Middle",
    );
    
mockRegister.hashWithArgon();


describe("Register Intergration test", () => {
    const sandbox = tssinon.default.createSandbox();

    let database: any;
    let service;
    let controller;

    const appBuilder = AppBuilder.getInstance();
    appBuilder.setPort(3013);
    appBuilder.addRouter(Routes.DEFAULT);

    const app = appBuilder.buildApp();
    app.attachCors();
    app.attachHeaders();
    app.attachEncoder();
    app.attachRouters();
    app.listen();

    let agent: any;

    beforeEach(() => {
        database = tssinon.stubInterface<RegisterDatabase>();

        // Create the service and controller using the stubbed database
        service = new RegisterService(database);
        controller = new RegisterController(service);

        RegisterControllerSingleton.getInstance().controller = controller;

        database.createNewAccount.resolves({});

        agent = supertest.agent(app.getApp());
        agent.jar.setCookie(`session=test`);
    });

    afterEach(() => {
        sandbox.restore();
    });

    after(() => {
        app.close();
    })

    it('should create a user.', async () => {
        const body = {
            email: "user2@example.com",
            password: "wachtwoord123",
            firstName: "User",
            lastName: "Two",
            middleName: "Middle"
        }

        const res = await agent.post('/register').send(body);

        expect(res.statusCode).equals(202);
        expect(res.body).to.be.an('object').that.is.been.deep.equal({ true: "Account created successfully." });

        sinon.assert.calledOnce(database.createNewAccount);
    })

});