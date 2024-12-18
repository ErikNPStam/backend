/**
 * @author Luka Piersma
 *
 * The journey factory class.
 */

import express from "express";
import { Journey } from "../../business/model/journey.model";

export class JourneyFactory {
    private static journeyFactory: JourneyFactory | null = null

    private constructor() { }

    /**
     * Creates an instance of the JourneyFactory class if one doesn't exist and returns it.
     * 
     * @returns The instance of the JourneyFactory class.
     */

    public static getInstance(): JourneyFactory {
        if (JourneyFactory.journeyFactory == null) {
            JourneyFactory.journeyFactory = new JourneyFactory();
        }

        return JourneyFactory.journeyFactory;
    }

    /**
     * Creates an instance of the Journey class based on the request parameter and returns this instance.
     * 
     * @returns A journey instance.
     */

    public createJourneyFromRequest(req: express.Request): Journey {
        const body = req.body
        const journey: Journey = new Journey(
            new Date(body.date),
            body.userEmail,
            body.type,
            body.addressFrom || "",
            body.addressTo || "",
            parseFloat(body.distance),
            parseFloat(body.price),
            body.transport,
        );

        return journey
    }
}