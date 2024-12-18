import sinon from "sinon";
import express from "express";
import * as tssinon from "ts-sinon";
import { JourneyController } from "../src/controller/journey.controller";
import { JourneyService } from "../src/business/service/journey.service";
import { JourneyDatabase } from "../src/data/interfaces/JourneyDatabase";
import { Journey } from "../src/business/model/journey.model";

describe("Journey Controller", () => {
    const sandbox = tssinon.default.createSandbox();

    let database: tssinon.StubbedInstance<JourneyDatabase>;
    let service: JourneyService;
    let controller: JourneyController;
    let mockRequest: express.Request;
    let mockResponse: any;

    const mockJourneys: Journey[] = [
        new Journey(
            new Date("2024-05-21"),
            "user1@example.com",
            "Commuting",
            "123 Start St",
            "456 End St",
            10,
            20,
            "Bus"
        ),
        new Journey(
            new Date("2024-05-21"),
            "user1@example.com",
            "Business",
            "123 Start St",
            "456 End St",
            20,
            0,
            "Train"
        )
    ];

    beforeEach(() => {
        // Create a stubbed instance of the database
        database = tssinon.stubInterface<JourneyDatabase>();

        // Create the service and controller using the stubbed database
        service = new JourneyService(database);
        controller = new JourneyController(service);

        // Mock the request and response objects
        mockRequest = {
            body: {
                userEmail: 'user1@example.com'
            }
        } as express.Request;

        mockResponse = {
            json: sinon.spy(),
            status: sinon.stub().returnsThis()
        } as any;

        // Stub the database method to return the mockJourneys
        database.getJourneys.resolves(mockJourneys);
    });

    afterEach(() => {
        // Restore the sandbox to clean up any stubs or spies created
        sandbox.restore();
    });

    it("should return journeys for a user", async () => {
        await controller.getJourneys(mockRequest, mockResponse);

        sinon.assert.calledOnce(mockResponse.json);
        sinon.assert.calledWith(mockResponse.json, mockJourneys);

        sinon.assert.calledOnce(mockResponse.status);
        sinon.assert.calledWith(mockResponse.status, 202);
    });

    it("should create a journey", async () => {
        // Update the mock request to include journey data
        mockRequest.body = {
            date: "2024-05-21",
            userEmail: 'user1@example.com',
            type: "Commuting",
            addressFrom: "123 Start St",
            addressTo: "456 End St",
            distance: 10,
            price: 20,
            transport: "Bus"
        };

        // Define the journey to be created
        const newJourney = new Journey(
            new Date(mockRequest.body.date),
            mockRequest.body.userEmail,
            mockRequest.body.type,
            mockRequest.body.addressFrom,
            mockRequest.body.addressTo,
            mockRequest.body.distance,
            mockRequest.body.price,
            mockRequest.body.transport
        );

        // Stub the database method to resolve as it returns void
        database.createJourney.resolves();

        await controller.createJourney(mockRequest, mockResponse);

        sinon.assert.calledOnce(database.createJourney);
        sinon.assert.calledWith(database.createJourney, newJourney);
        sinon.assert.calledOnce(mockResponse.json);
        sinon.assert.calledWith(mockResponse.json, {});
        sinon.assert.calledOnce(mockResponse.status);
        sinon.assert.calledWith(mockResponse.status, 202);
    });

    it("should handle errors when creating a journey", async () => {
        // Update the mock request to include incorrect journey data
        mockRequest.body = {}; // Invalid data

        await controller.createJourney(mockRequest, mockResponse);
        sinon.assert.calledOnce(mockResponse.status);
        sinon.assert.calledWith(mockResponse.status, 400);
        sinon.assert.calledOnce(mockResponse.json);
    });

    it("should return all journeys", async () => {
        // Stub the journeyService's getAllJourneys method to resolve with mockJourneys
        sandbox.stub(service, "getAllJourneys").resolves(mockJourneys);

        await controller.getAllJourneys(mockRequest, mockResponse);
        sinon.assert.calledOnce(mockResponse.json);
        sinon.assert.calledWith(mockResponse.json, mockJourneys);
        sinon.assert.calledOnce(mockResponse.status);
        sinon.assert.calledWith(mockResponse.status, 202);
    });

    it("should handle errors when getting all journeys", async () => {
        // Stub the journeyService's getAllJourneys method to reject with an error
        sandbox.stub(service, "getAllJourneys").rejects(new Error("Database error"));

        await controller.getAllJourneys(mockRequest, mockResponse);
        sinon.assert.calledOnce(mockResponse.json);
        sinon.assert.calledWith(mockResponse.json, {});
        sinon.assert.calledTwice(mockResponse.status);
        sinon.assert.calledWith(mockResponse.status, 500);
    });
});
