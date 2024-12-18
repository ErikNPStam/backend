/**
 * @author Luka Piersma
 *
 * The JourneyService class.
 */

import { JourneyDatabase } from "../../data/interfaces/JourneyDatabase";
import { Journey } from "../model/journey.model";

export class JourneyService {

  constructor(private journeyDatabase: JourneyDatabase) { }

  /**
   * Returns an array of Journey instances given by the database using the userEmail parameter.
   * 
   * @param userEmail The user's email.
   * @returns 
   * @author Luka Piersma
   */

  public async getJourneys(userEmail: string): Promise<Journey[]> {
    return await this.journeyDatabase.getJourneys(userEmail);
  }

  /**
   * Returns a Journey instance given by the database using the userEmail and createdAt parameters.
   * 
   * @param userEmail The user's email.
   * @param createdAt The createdAt of the journey.
   * @returns 
   * 
   * @author Luka Piersma
   */

  public async getJourney(userEmail: string, createdAt: string): Promise<Journey | null> {
    return await this.journeyDatabase.getJourney(userEmail, createdAt);
  }

  /**
   * Retrieves all journeys from the database.
   * @returns A promise that resolves to an array of Journey objects.
   * @author Raymundo Brunst
   */
  public async getAllJourneys(): Promise<Journey[]> {
    return await this.journeyDatabase.getAllJourneys();
  }

  /**
   * Verifies the given journey and calls the database to create a journey.
   * 
   * @param journey An instance of the Journey class.
   * @author Luka Piersma
   */

  public async createJourney(
    journey: Journey
  ): Promise<void> {
    journey.verify()

    await this.journeyDatabase.createJourney(journey);
  }

  /**
   * Verifies the given journey and calls the database to update a journey.
   * 
   * @param journey An instance of the Journey class.
   * @author Luka Piersma
   */

  public async updateJourney(journey: Journey): Promise<void> {
    journey.verify()

    await this.journeyDatabase.updateJourney(journey);
  }

  /**
   * 
   * @param userEmail 
   * @param journeyCreateAt 
   * @author Erik Stam
   */

  public async deleteJourney(
    userEmail: string,
    journeyCreateAt: string
  ): Promise<void> {
    try {
      await this.journeyDatabase.deleteJourney(userEmail, journeyCreateAt);
    } catch (error) {
      throw new Error("Journey not found");
    }

  }
}
