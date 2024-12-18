import sinon from 'sinon';
import * as tssinon from 'ts-sinon';
import express from 'express';
import { AdminRapportController } from '../src/controller/adminRapportController';
import { AdminRapportService } from '../src/business/service/adminRapport.Service';
import { AdminRapportSequelizeDatabase } from '../src/data/databases/adminRapportSequelizeDatabase';
import { AdminRapport } from '../src/business/model/adminRapportModel';
import { EmissionCalculator } from '../src/Util/emissionCalculator';

/**
 * This test file tests the AdminRapportController class.
 * @author Erik Stam
 */

describe('AdminRapportController', () => {
    // Create a sandbox for the tests (Sandboxes are used to create a controlled environment for the tests to run in)
    const sandbox = sinon.createSandbox();

    // Create the controller and service instances
    let adminRapportController: AdminRapportController;
    let adminRapportService: AdminRapportService;
    // Stubbed database instance
    let adminRapportDatabase: tssinon.StubbedInstance<AdminRapportSequelizeDatabase>;
    // Mock request and response objects
    let mockRequest: express.Request;
    let mockResponse: any;

    // Create a new instance of the EmissionCalculator
    let emissionCalculator = new EmissionCalculator;

    /**
     * Mock data for the admin rapport.
     */
    const mockRapport: AdminRapport[] = [{ fuelType: 'Diesel Car', totalKilometers: 1000 }];


    beforeEach(() => {
        // Stubbed database instance
        adminRapportDatabase = tssinon.stubInterface<AdminRapportSequelizeDatabase>();
        // Create the service and controller using the stubbed database
        adminRapportService = new AdminRapportService(adminRapportDatabase);
        adminRapportController = new AdminRapportController(adminRapportService);

        // Mock request and response objects
        mockRequest = {
            params: {
                month: '4',
                year: '2024'
            }
        } as unknown as express.Request;

        mockResponse = {
            // Spy on the json method (to check if it gets called with the correct value)
            json: sinon.spy(),
            // Spy on the status method (to check if it gets called with the correct value)
            status: sinon.stub().returnsThis()
        } as any;

        adminRapportDatabase.getRapport.resolves(mockRapport);
    });

    afterEach(() => {
        sandbox.restore();
    });

    // Test if the getRapport method returns a 202 status code and the rapport
    it('should return a 202 status code and the rapport', async () => {
        // Stub the calculateEmission method to return a fixed value
        const stubCalculate = sinon.stub(emissionCalculator, 'calculateEmission');

        // Give the calculateEmission method a fixed value
        stubCalculate.withArgs('Diesel Car', 1000).returns(131000);

        // Call the getRapport method
        await adminRapportController.getRapport(mockRequest, mockResponse);
        // check if the response gets called once
        sinon.assert.calledOnce(mockResponse.json);

        // check if the response gets called with the correct value
        sinon.assert.calledWith(mockResponse.json, mockRapport.map(rapport => ({ ...rapport, emission: 131000 })));

        // check if the status gets called once
        sinon.assert.calledOnce(mockResponse.status);

        // check if the status gets called with the correct value
        sinon.assert.calledWith(mockResponse.status, 202);
    });
});

