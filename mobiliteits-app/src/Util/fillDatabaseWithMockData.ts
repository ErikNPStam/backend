import { Journey } from "../business/model/journey.model";
import { JourneySequelizeSingleton } from "../creation/singleton/JourneySequelizeSingleton";

/**
 * Fills the database with mock data.
 */
export async function fillDatabaseWithMockData(): Promise<void> {
    const database = JourneySequelizeSingleton.getInstance();

    await database.deleteAllJourneys();

    await database.createJourney(new Journey(new Date("2024-05-21"),
        "user1@example.com",
        "Commuting",
        "123 Start St",
        "456 End St",
        10,
        20,
        "Bus"));
    await database.createJourney(new Journey(new Date("2024-05-21"),
        "user2@example.com",
        "Commuting",
        "399 Start St",
        "16 End St",
        10,
        20,
        "Bus"));
}
