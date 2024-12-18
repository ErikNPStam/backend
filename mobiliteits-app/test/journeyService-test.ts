import * as tssinon from "ts-sinon";
import { expect } from "chai";
import { JourneyService } from "../src/business/service/journey.service";
import { JourneyDatabase } from "../src/data/interfaces/JourneyDatabase";
import { Journey } from "../src/business/model/journey.model";

describe("Journey service", () => {
    const sandbox = tssinon.default.createSandbox();

    // Create mock data
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

    // Mock the JourneySequelizeDatabase
    const journeyDatabaseStub = tssinon.stubInterface<JourneyDatabase>();
    journeyDatabaseStub.getJourneys.resolves(mockJourneys);
    journeyDatabaseStub.getAllJourneys.resolves(mockJourneys);

    let journeyService: JourneyService;

    beforeEach(() => {
        journeyService = new JourneyService(journeyDatabaseStub);
    });

    afterEach(() => {
        sandbox.restore();
        tssinon.default.restore();
    });

    it("Get the correct journeys for a user", async () => {
        const journeys = await journeyService.getJourneys("user1@example.com");

        expect(journeys).to.deep.equal(mockJourneys);
        expect(journeyDatabaseStub.getJourneys.calledOnceWith("user1@example.com")).to.be.true;
    });

    it("should retrieve all journeys from the database", async () => {
        const result = await journeyService.getAllJourneys();

        expect(result).to.deep.equal(mockJourneys);
        expect(journeyDatabaseStub.getAllJourneys.calledOnce).to.be.true;
    });

    it("should handle errors when retrieving all journeys from the database", async () => {
        const errorMessage = "Database error";
        journeyDatabaseStub.getAllJourneys.rejects(new Error(errorMessage));

        try {
            await journeyService.getAllJourneys();
            expect.fail("Expected an error to be thrown");
        } catch (error: any) {
            expect(error.message).to.equal(errorMessage);
        }
    });
});
