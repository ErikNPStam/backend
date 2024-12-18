import { expect } from "chai";
import { Journey } from "../src/business/model/journey.model"

describe("Journey business model", () => {
    let journey: Journey;

    beforeEach(() => {
        journey = new Journey(
            new Date(),
            "test@example.com",
            "Commuting",
            "123 Start St",
            "456 End St",
            10,
            20,
            "Bus"
        );
    });

    describe("verifyDate", () => {
        it("should return true for a past or current date", () => {
            journey.date = new Date(new Date().getTime() - 1000); // 1 second in the past
            expect(journey.verifyDate()).to.be.true;
        });

        it("should return false for a future date", () => {
            journey.date = new Date(new Date().getTime() + 1000); // 1 second in the future
            expect(journey.verifyDate()).to.be.false;
        });
    });

    describe("verifyType", () => {
        it("should return true for 'Commuting'", () => {
            journey.type = "Commuting";
            expect(journey.verifyType()).to.be.true;
        });

        it("should return true for 'Business'", () => {
            journey.type = "Business";
            expect(journey.verifyType()).to.be.true;
        });

        it("should return false for other types", () => {
            journey.type = "Holiday";
            expect(journey.verifyType()).to.be.false;
        });
    });

    describe("verifyKilometers", () => {
        it("should return true for a valid number of kilometers", () => {
            journey.kilometers = 50;
            expect(journey.verifyKilometers()).to.be.true;
        });

        it("should return false for non-numeric kilometers", () => {
            journey.kilometers = NaN;
            expect(journey.verifyKilometers()).to.be.false;
        });

        it("should return false for negative kilometers", () => {
            journey.kilometers = -10;
            expect(journey.verifyKilometers()).to.be.false;
        });

        it("should return false for kilometers greater than 100,000", () => {
            journey.kilometers = 100_001;
            expect(journey.verifyKilometers()).to.be.false;
        });
    });

    describe("verifyPrice", () => {
        it("should return true for a non-negative price", () => {
            journey.price = 10;
            expect(journey.verifyPrice()).to.be.true;
        });

        it("should return false for a negative price", () => {
            journey.price = -5;
            expect(journey.verifyPrice()).to.be.false;
        });

        it("should return false for non-numeric price", () => {
            journey.price = NaN;
            expect(journey.verifyPrice()).to.be.false;
        });
    });

    describe("verifyTransportType", () => {
        it("should return true for a valid transport type", () => {
            journey.transportType = "Train";
            expect(journey.verifyTransportType()).to.be.true;
        });

        it("should return false for an invalid transport type", () => {
            journey.transportType = "Hoverboard";
            expect(journey.verifyTransportType()).to.be.false;
        });
    });

    describe("verify", () => {
        it("should not throw an error for valid journey", () => {
            expect(() => journey.verify()).to.not.throw();
        });

        it("should throw an error for invalid journey", () => {
            journey.date = new Date(new Date().getTime() + 1000);
            expect(() => journey.verify()).to.throw("Journey validation error");
        });
    });
});
