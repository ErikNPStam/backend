import sequelize from "../connection";
import JourneySequelize from "../models/journey.model";
import { Journey } from "../../business/model/journey.model";
import { JourneyDatabase } from "../interfaces/JourneyDatabase";
import { EmissionCalculator } from "../../Util/emissionCalculator";
import { JourneySequelizeSingleton } from "../../creation/singleton/JourneySequelizeSingleton";

/**
 * Represents a database implementation for managing Journey data using Sequelize.
 */
export class JourneySequelizeDatabase implements JourneyDatabase {
  constructor(
    private journeySequelize: JourneySequelize = JourneySequelizeSingleton.getInstance().getJourneySequelize(),
    private emissionCalculator: EmissionCalculator = new EmissionCalculator(),
  ) { }

  /**
   * Retrieves journeys for a specific user from the database.
   * @param userEmail - The email of the user.
   * @returns A promise that resolves to an array of Journey objects.
   * 
   * @author Luka Piersma
   */
  public async getJourneys(userEmail: string): Promise<Journey[]> {
    const results = await this.journeySequelize.getJourneys(userEmail);

    let journeyArray: Journey[] = [];

    if (results !== null) {
      journeyArray = this.convertSequelizeToJourneys(results);
    }

    return journeyArray;
  }

  /**
 * Returns the journey of a user based on their email and the given createdAt using a query and a connection to the database.
 * 
 * @param userEmail The user's email.
 * @param createdAt The createdAt of a journey.
 * @returns 
 * 
 * @author Luka Piersma
 */

  public async getJourney(userEmail: string, createdAt: string): Promise<Journey | null> {
    const result = await this.journeySequelize.getJourney(userEmail, createdAt);

    let journey: Journey | null = null

    if (result !== null) {
      journey = this.convertSequelizeToJourney(result)
    }

    return journey;
  }

  /**
   * Retrieves all journeys from the database.
   * @returns A promise that resolves to an array of Journey objects.
   * @author Raymundo Brunst
   */
  public async getAllJourneys(): Promise<Journey[]> {
    let journeyArray: Journey[] = [];
    const results = await this.journeySequelize.getAllJourneys();
    if (results.length > 0) {
      journeyArray = this.convertSequelizeToJourneys(results);
    }
    return journeyArray;
  }

  /**
   * Creates a new journey in the database.
   * @param journey - The Journey object to be created.
   * @returns A promise that resolves when the journey is created.
   * @author Luka Piersma
   */
  public async createJourney(journey: Journey): Promise<void> {
    await this.journeySequelize.createJourney(journey);
  }

  /**
  * Updates the journey of a user based on the Journey instance using a query and a connection to the database.
 * 
 * @param journey An instance of a Journey.
 * @author Luka Piersma
 */

  public async updateJourney(journey: Journey): Promise<void> {
    await this.journeySequelize.updateJourney(journey);
  }

  /**
   * Deletes a journey from the database.
   * 
   * @param userEmail - The email of the user who owns the journey.
   * @param journeyCreateAt - The creation timestamp of the journey.
   * @returns A promise that resolves when the journey is successfully deleted.
   * @author Erik Stam
   */
  public async deleteJourney(userEmail: string, journeyCreateAt: string): Promise<void> {
    await this.journeySequelize.deleteJourney(userEmail, journeyCreateAt);
  }

  /**
   * Converts an array of Sequelize Journey objects to an array of Journey objects.
   * 
   * @param results - The array of Sequelize Journey objects to be converted.
   * @returns An array of Journey objects.
   * @author Luka Piersma
   */
  private convertSequelizeToJourneys(results: JourneySequelize[]): Journey[] {
    const journeyArray: Journey[] = [];

    (results as any).forEach((element: any) => {
      const journey: Journey = this.convertSequelizeToJourney(element);
      journeyArray.push(journey);
    });

    return journeyArray;
  }

  /**
   * Converts a Sequelize object to a Journey object.
   * @param result - The Sequelize object representing a journey.
   * @returns The converted Journey object.
   * @author Luka Piersma
   */
  private convertSequelizeToJourney(result: JourneySequelize): Journey {
    const emissions: number = this.emissionCalculator.calculateEmission(
      result.dataValues.transport_type_name,
      result.dataValues.kilometers,
    );

    const journey: Journey = new Journey(
      result.dataValues.journey_date,
      result.dataValues.email,
      result.dataValues.journey_type_name,
      result.dataValues.address_from,
      result.dataValues.address_to,
      result.dataValues.kilometers,
      result.dataValues.price,
      result.dataValues.transport_type_name,
      emissions,
      result.dataValues.created_at
    );

    return journey;
  }
}
