import * as tssinon from "ts-sinon";
import { AppBuilder } from "../src/creation/builders/app.builder";
import { Routes } from "../src/creation/enums/routes";
import { JourneyService } from "../src/business/service/journey.service";
import { JourneyController } from "../src/controller/journey.controller";
import { JourneyDatabase } from "../src/data/interfaces/JourneyDatabase";
import { JourneyControllerSingleton } from "../src/creation/controllers/journeyController.singleton";
import { Journey } from "../src/business/model/journey.model";
import { SessionManager } from "../src/middleware/SessionManager";
import supertest from "supertest";
import { expect } from "chai";
import sinon from "sinon";

const mockJourneys: Journey[] = [
    new Journey(
        new Date("05/16/2024"),
        "user1@example.com",
        "Commuting",
        "123 Start St",
        "456 End St",
        10,
        20,
        "Bus"
    ),
    new Journey(
        new Date("05/17/2024"),
        "user1@example.com",
        "Business",
        "123 Start St",
        "456 End St",
        20,
        0,
        "Train"
    )
];

const mockEmail = 'user2@example.com'

describe("Journeys integration", () => {
    const sandbox = tssinon.default.createSandbox();

    let database: any;
    let service;
    let controller;

    const appBuilder = AppBuilder.getInstance();
    appBuilder.setPort(3012);
    appBuilder.addRouter(Routes.USER);

    const app = appBuilder.buildApp();
    app.attachCors();
    app.attachHeaders();
    app.attachEncoder();
    app.attachRouters();
    app.listen();

    let agent: any;

    beforeEach(() => {
        database = tssinon.stubInterface<JourneyDatabase>();

        // Create the service and controller using the stubbed database
        service = new JourneyService(database);
        controller = new JourneyController(service);

        JourneyControllerSingleton.getInstance().controller = controller;

        database.getJourneys.resolves(mockJourneys);

        SessionManager.sessions['test'] = {
            userEmail: mockEmail,
            userRole: 'User',
            expirationDate: new Date('2025-12-17')
        }

        agent = supertest.agent(app.getApp());
        agent.jar.setCookie(`session=test`);
    });

    afterEach(() => {
        sandbox.restore();
    });

    after(() => {
        app.close();
    })

    it('should get journeys for a user.', async () => {
        const res = await agent.get('/user/journeys');

        expect(res.statusCode).equals(202);
        expect(JSON.stringify(res.body)).equals(JSON.stringify(mockJourneys))

        sinon.assert.calledOnce(database.getJourneys);
        sinon.assert.calledWith(database.getJourneys, mockEmail);
    })

    it('should create a journey for a user.', async () => {
        const body = {
            date: "05/16/2024",
            type: "Commuting",
            addressFrom: "123 Start St",
            addressTo: "456 End St",
            distance: 20,
            price: 0,
            transport: "Train"
        }

        const res = await agent.post('/user/journey').send(body);

        expect(res.statusCode).equals(202);
        expect(res.body).to.be.an('object').that.is.empty;

        sinon.assert.calledOnce(database.createJourney);
    })
});