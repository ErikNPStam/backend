import { expect } from 'chai';
import sinon, { SinonSandbox, SinonStub } from 'sinon';
import * as tsSinon from 'ts-sinon';
import { JourneyMySqlDatabase } from '../src/data/databases/JourneyMySqlDatabase';
import { RelationalDatabase } from '../src/data/RationalDatabase';
import { Journey } from '../src/business/model/journey.model';
import { EmissionCalculator } from '../src/Util/emissionCalculator';
import { Pool, ResultSetHeader } from 'mysql2';

type SinonStubbedInstance<T> = tsSinon.StubbedInstance<T>;

describe('JourneyMySqlDatabase', () => {
    let sandbox: SinonSandbox;
    let journeyDb: JourneyMySqlDatabase;
    let poolStub: SinonStub;
    let emissionCalculatorStub: SinonStubbedInstance<EmissionCalculator>;

    beforeEach(() => {
        sandbox = sinon.createSandbox();
        emissionCalculatorStub = tsSinon.stubInterface<EmissionCalculator>();
        journeyDb = new JourneyMySqlDatabase(emissionCalculatorStub);
        poolStub = sandbox.stub(RelationalDatabase, 'getPool');
    });

    afterEach(() => {
        sandbox.restore();
    });

    describe('getAllJourneys', () => {
        it('should return an array of all journeys', async () => {
            const mockPool = {
                promise: () => ({
                    execute: sandbox.stub().resolves([[
                        {
                            journey_date: '2023-05-15',
                            email: 'test@example.com',
                            created_at: '2023-05-15T12:34:56Z',
                            journey_type_name: 'business',
                            address_from: 'Location A',
                            address_to: 'Location B',
                            kilometers: 50,
                            price: 100,
                            transport_type_name: 'car'
                        }
                    ]])
                })
            };

            poolStub.returns(mockPool as unknown as Pool);

            emissionCalculatorStub.calculateEmission.returns(10);

            const journeys = await journeyDb.getAllJourneys();

            expect(journeys).to.be.an('array').that.has.lengthOf(1);
            expect(journeys[0].email).to.equal('test@example.com');
        });

        it('should return an empty array if no pool is available', async () => {
            poolStub.returns(null);

            const journeys = await journeyDb.getAllJourneys();

            expect(journeys).to.be.an('array').that.is.empty;
        });
    });
});
