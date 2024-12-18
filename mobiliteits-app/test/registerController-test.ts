import sinon from "sinon";
import express from "express";
import * as tssinon from "ts-sinon";
import { RegisterController } from "../src/controller/register.controller";
import { RegisterService } from "../src/business/service/register.service";
import { RegisterDatabase } from "../src/data/interfaces/RegistrationDatabase";

describe("Register Controller", () => {
    const sandbox = tssinon.default.createSandbox();

    let database: tssinon.StubbedInstance<RegisterDatabase>;
    let service: RegisterService;
    let controller: RegisterController;

    let mockRequest: express.Request;
    let mockResponse: any;

    const mockRegisterResponse = { true: "Account created successfully." };

    beforeEach(() => {
        // Create a stubbed instance of the database
        database = tssinon.stubInterface<RegisterDatabase>();

        // Create the service and controller using the stubbed database
        service = new RegisterService(database);
        controller = new RegisterController(service);

        // Mock the request and response objects
        mockRequest = {
            body: {
                email: "user2@example.com",
                password: "wachtwoord123",
                firstName: "User",
                lastName: "Two",
                middleName: "Middle"
            }
        } as express.Request;

        mockResponse = {
            json: sinon.spy(),
            status: sinon.stub().returnsThis()
        } as any;

        // Stub the database method to return 
        database.createNewAccount.resolves();
    });

    afterEach(() => {
        // Restore the sandbox to clean up any stubs or spies created
        sandbox.restore();
    });

    it("should return a boolean", async () => {
        await controller.createNewAccount(mockRequest, mockResponse);

        sinon.assert.calledOnce(mockResponse.json);
        sinon.assert.calledWith(mockResponse.json, mockRegisterResponse);

        sinon.assert.calledOnce(mockResponse.status);
        sinon.assert.calledWith(mockResponse.status, 202);
    });

    it("should create a account", async () => {
        // Update the mock request to include register data
        mockRequest.body = {
            email: "user2@example.com",
            password: "wachtwoord123",
            firstName: "User",
            lastName: "Two",
            middleName: "Middle"
        };

        database.createNewAccount.resolves();

        await controller.createNewAccount(mockRequest, mockResponse);

        sinon.assert.calledOnce(database.createNewAccount);

        // can not be tested because of the hash, because the hash is unique every time and even when trying to stub response it will not work cause it resolves in void
        // sinon.assert.calledWith(database.createNewAccount, newRegister);

        sinon.assert.calledOnce(mockResponse.json);
        sinon.assert.calledWith(mockResponse.json, mockRegisterResponse);

        sinon.assert.calledOnce(mockResponse.status);
        sinon.assert.calledWith(mockResponse.status, 202);
    });

    it("should handle errors when creating a account", async () => {
        mockRequest.body = {}; // Invalid data

        await controller.createNewAccount(mockRequest, mockResponse);

        sinon.assert.calledOnce(mockResponse.status);
        sinon.assert.calledWith(mockResponse.status, 401);
        sinon.assert.calledOnce(mockResponse.json);
    });
});

//sinon
//sinon is a JavaScript library used for creating test doubles such as spies, stubs, and mocks. 
//It provides a set of powerful features for testing and mocking functions, objects, 
//and dependencies in your code. 
//In the given code, it is used to create stubbed instances of the database and to spy on the response object.

//chai
//Chai is an assertion library for JavaScript and TypeScript. 
//It provides a set of functions and methods that allow you to write expressive 
//and readable assertions in your tests. Chai supports different assertion styles, 
//including the traditional assert style, the BDD (Behavior-Driven Development) style, 
//and the TDD (Test-Driven Development) style.


//spy
//A spy function is a special function that records information about its invocations,
//such as the number of times it was called, the arguments it was called with, and more.
