import { stubInterface } from 'ts-sinon';
import { JourneySequelizeDatabase } from '../src/data/databases/JourneySequelizeDatabase';
import JourneySequelize from '../src/data/models/journey.model';

describe('JourneySequelizeDatabase', () => {
    describe('getAllJourneys', () => {
        it('should return an array of Journey objects', async () => {
            // Create a stubbed instance of JourneySequelize
            const journeySequelizeStub = stubInterface<JourneySequelize>();

            // Stub the getAllJourneys method to return mock data
            journeySequelizeStub.getAllJourneys.resolves([
                // Mock JourneySequelize objects here
            ]);

            // Create an instance of JourneySequelizeDatabase with the stubbed JourneySequelize
            const journeySequelizeDatabase = new JourneySequelizeDatabase(journeySequelizeStub);

            // Call the method being tested
            await journeySequelizeDatabase.getAllJourneys();

        });
    });
});
