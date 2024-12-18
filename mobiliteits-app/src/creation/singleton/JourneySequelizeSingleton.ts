import JourneySequelize from "../../data/models/journey.model";

/**
 * Represents a singleton class for JourneySequelize.
 * @remarks
 * This class ensures that only one instance of JourneySequelize is created.
 * @author Raymundo Brunst
 */
export class JourneySequelizeSingleton {
    private static instance: JourneySequelizeSingleton | null = null;

    private journeySequelizeInstance: JourneySequelize | null = null;

    private constructor() { }

    /**
     * Gets the instance of JourneySequelize.
     * @returns The instance of JourneySequelize. 
     */
    public static getInstance(): JourneySequelizeSingleton {
        if (!JourneySequelizeSingleton.instance) {
            JourneySequelizeSingleton.instance = new JourneySequelizeSingleton();
        }
        return JourneySequelizeSingleton.instance;
    }

    /**
     * Gets the instance of JourneySequelize.
     * @returns The instance of JourneySequelize.
     */
    public getJourneySequelize(): JourneySequelize {
        if (!this.journeySequelizeInstance) {
            this.journeySequelizeInstance = new JourneySequelize();
        }
        return this.journeySequelizeInstance;
    }
}