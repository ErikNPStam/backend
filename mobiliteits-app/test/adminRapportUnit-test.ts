import * as express from 'express';
import { AdminRapportService } from '../src/business/service/adminRapport.Service';
import { AdminRapportController } from '../src/controller/adminRapportController';
import { expect } from 'chai';
import { SinonStub, stub } from 'sinon';
import * as tssinon from 'ts-sinon';
import { AdminRapportSequelizeDatabase } from '../src/data/databases/adminRapportSequelizeDatabase';

/**
 * @author Erik Stam
 */

describe('AdminRapportController', () => {
    let adminRapportController: AdminRapportController;
    let adminRapportServiceStub: SinonStub;
    let adminDatabaseStub: tssinon.StubbedInstance<AdminRapportSequelizeDatabase>;

    beforeEach(() => {
        // Create a stub for the AdminRapportService
        adminRapportServiceStub = stub(AdminRapportService.prototype, 'getRapport');
        // Create a stub for the AdminRapportSequelizeDatabase
        adminRapportController = new AdminRapportController(new AdminRapportService(adminDatabaseStub));
    });

    afterEach(() => {
        // Restore the stubs
        adminRapportServiceStub.restore();
    });

    it('should return the rapport from the adminRapportService', async () => {
        const req: express.Request = {
            params: {
                month: '1',
                year: '2022'
            }
        } as unknown as express.Request;

        // Create a response object with the expected status code and response body
        const res: express.Response = {
            status: (statusCode: number) => {
                expect(statusCode).to.equal(202);
                return res;
            },
            json: (data: any) => {
                expect(data).to.deep.equal('mockedRapport');
            }
        } as express.Response;

        // Stub the getRapport method to return a fixed value
        adminRapportServiceStub.resolves('mockedRapport');

        // Call the getRapport method
        await adminRapportController.getRapport(req, res);

        // Verify that the getRapport method was called with the correct arguments
        expect(adminRapportServiceStub.calledOnceWithExactly(1, 2022)).to.be.true;
    });

    it('should return an error response if an error occurs in the Service', async () => {
        // Create a request object with invalid month
        const req: express.Request = {
            params: {
                month: 'invalid',
                year: '2022'
            }
        } as unknown as express.Request;

        // Create a response object with the expected status code and response body
        const res: express.Response = {
            status: (statusCode: number) => {
                expect(statusCode).to.equal(404);
                return res;
            },
            json: (data: any) => {
                return res;
            }
        } as express.Response;

        // Stub the getRapport method to throw an error
        adminRapportServiceStub.rejects(new Error('Mocked error'));

        // Call the getRapport method
        try {
            await adminRapportController.getRapport(req, res);
        } catch (error) {
            // Verify that the error response was returned
            expect(error).to.be.an('error');
            // Verify that the getRapport method was called with the correct arguments
            expect(adminRapportServiceStub.calledOnceWith(0, 2022)).to.be.true;
        }
    });

    it('should return the rapport from the adminRapportService', async () => {
        // Create a request object with month set to one and year to 2022
        const req: express.Request = {
            params: {
                month: '1',
                year: '2022'
            }
        } as unknown as express.Request;

        // Create a response object with the expected status code and response body
        const res: express.Response = {
            status: (statusCode: number) => {
                // Verify that the status code is 202
                expect(statusCode).to.equal(202);
                // Return the response object
                return res;
            },
            json: (data: any) => {
                expect(data).to.deep.equal({ mockedRapport: 'mockedRapport' });
                return res;
            }
        } as express.Response;

        // resolve the stubbed method with a mocked value
        adminRapportServiceStub.resolves({ mockedRapport: 'mockedRapport' });

        // Call the getRapport method with the request and response objects
        await adminRapportController.getRapport(req, res);

        // Verify that the getRapport method was called with the correct arguments
        expect(adminRapportServiceStub.calledOnceWith(1, 2022)).to.be.true;
    });

    it('should return an error response if an error occurs in the Controller', async () => {

        const req: express.Request = {
            params: {
                month: '1',
                year: '2022'
            }
        } as unknown as express.Request;

        const res: express.Response = {
            status: (statusCode: number) => {
                expect(statusCode).to.equal(404);
                return res;
            },
            json: (data: any) => {
                return res;
            }
        } as express.Response;

        // Stub the getRapport method to throw an error
        adminRapportServiceStub.rejects(new Error('Mocked error'));

        // Call the getRapport method
        try {
            await adminRapportController.getRapport(req, res);
        // Verify that the error response was returned
        } catch (error) {
            expect(error).to.be.an('error');
            expect(adminRapportServiceStub.calledOnceWith(1, 2022)).to.be.true;
        }
    });

    it('should set month to 0 and year to current year when no input is provided', async () => {
        // Create a request object with month and year set to null
        const req: express.Request = {
            params: {
                month: null,
                year: null,
            },
        } as unknown as express.Request;

        // Create a response object 
        const res: express.Response = {
            // Create a status method that returns this
            status: function (statusCode: number) {
                // Return this where this is 
                // this is the status code
                return this;
            },
            // Create a json method that returns this
            json: function (data: any) {
                return this;
            }
        } as unknown as express.Response;

        // Call the getRapport on the controller with the request and response objects
        await adminRapportController.getRapport(req, res);

        // Verify that the getRapport method was called with the correct arguments
        expect(adminRapportServiceStub.calledOnceWithExactly(0, new Date().getFullYear())).to.be.true;
    });
});