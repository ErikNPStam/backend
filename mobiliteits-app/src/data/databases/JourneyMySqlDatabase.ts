/**
 * @author Luka Piersma
 *
 * The JourneyMySqlDatabase class.
 */

import { RelationalDatabase } from "../RationalDatabase";
import { Pool, ResultSetHeader } from "mysql2";
import { Journey } from "../../business/model/journey.model";
import { JourneyDatabase } from "../interfaces/JourneyDatabase";
import { EmissionCalculator } from "../../Util/emissionCalculator";

export class JourneyMySqlDatabase implements JourneyDatabase {
  constructor(
    private emissionCalculator: EmissionCalculator = new EmissionCalculator(),
  ) { }

  /**
   * Returns the journeys of a user based on their email using a query and a connection to the database.
   *
   * @param userEmail
   * @returns {Promise<Journey[]>}
   * 
   * @author Luka Piersma
   */

  public async getJourneys(userEmail: string): Promise<Journey[]> {
    let pool: Pool | null = RelationalDatabase.getPool();
    let results: ResultSetHeader | null = null;
    let journeyArray: Journey[] = [];

    if (pool != null) {
      [results] = await pool.promise().execute<ResultSetHeader>(
        `SELECT 
        j.journey_date,
        j.email,
        j.created_at,
        j.journey_type_name,
        j.address_from,
        j.address_to,
        j.kilometers,
        j.price,
        j.transport_type_name
    FROM 
        journey j
    WHERE 
        j.email = ?
    GROUP BY 
        j.created_at, j.email, j.journey_date, j.journey_type_name, j.address_from, j.address_to, j.kilometers, j.price, j.transport_type_name
    ORDER BY 
        j.journey_date ASC;       
    `,
        [userEmail],
      );
    }

    if (results != null) {
      journeyArray = this.convertResultSetHeaderToJourneys(results);
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
    let pool: Pool | null = RelationalDatabase.getPool();
    let results: ResultSetHeader | null = null;
    let journey: Journey | null = null

    if (pool != null) {
      [results] = await pool.promise().execute<ResultSetHeader>(
        `SELECT 
        j.journey_date,
        j.email,
        j.created_at,
        j.journey_type_name,
        j.address_from,
        j.address_to,
        j.kilometers,
        j.price,
        j.transport_type_name
    FROM 
        journey j
    WHERE 
        j.email = ?,
        j.created_at = ?
    GROUP BY 
        j.created_at, j.email, j.journey_date, j.journey_type_name, j.address_from, j.address_to, j.kilometers, j.price, j.transport_type_name
    ORDER BY 
        j.journey_date ASC;       
    `,
        [userEmail, createdAt],
      );
    }

    if (results != null) {
      journey = this.convertResultSetHeaderToJourneys(results)[0];
    }

    return journey;
  }

  /**
   * Updates the journey of a user based on the Journey instance using a query and a connection to the database.
   * 
   * @param journey An instance of a Journey.
   * @author Luka Piersma
   */

  public async updateJourney(journey: Journey): Promise<void> {
    let pool: Pool | null = RelationalDatabase.getPool();

    if (pool != null) {
      await pool
        .promise()
        .execute<ResultSetHeader>(
          `UPDATE journey SET journey_date = ?, journey_type_name = ?, address_from = ?, address_to = ?, kilometers = ?, price = ?, transport_type_name = ? WHERE email = ? AND created_at = ?`,
          [
            journey.date,
            journey.type,
            journey.addressFrom,
            journey.addressTo,
            journey.kilometers,
            journey.price,
            journey.transportType,
            journey.email,
            journey.createdAt
          ],
        );
    }
  }

  /**
   * Retrieves all journeys from the database.
   * @returns A Promise that resolves to an array of Journey objects.
   */
  public async getAllJourneys(): Promise<Journey[]> {
    let pool: Pool | null = RelationalDatabase.getPool();
    let results: ResultSetHeader | null = null;
    let journeyArray: Journey[] = [];

    if (pool != null) {
      [results] = await pool.promise().execute<ResultSetHeader>(
        `SELECT 
        j.journey_date,
        j.email,
        j.created_at,
        j.journey_type_name,
        j.address_from,
        j.address_to,
        j.kilometers,
        j.price,
        j.transport_type_name
    FROM 
        journey j
    GROUP BY 
        j.created_at, j.email, j.journey_date, j.journey_type_name, j.address_from, j.address_to, j.kilometers, j.price, j.transport_type_name
    ORDER BY 
        j.journey_date DESC;       
    `,
      );
    }

    if (results != null) {
      journeyArray = this.convertResultSetHeaderToJourneys(results);
    }

    return journeyArray;
  }


  /**
   * Creates a new journey in the database.
   * @param journey - The journey object to be created.
   * @returns A Promise that resolves to void.
   * 
   * @author Luka Piersma
   */
  public async createJourney(journey: Journey): Promise<void> {
    let pool: Pool | null = RelationalDatabase.getPool();
    let results: ResultSetHeader | null = null;

    if (pool != null) {
      [results] = await pool
        .promise()
        .execute<ResultSetHeader>(
          `INSERT INTO journey (journey_date, email, created_at, journey_type_name, address_from, address_to, kilometers, price, transport_type_name) VALUES (?, ?, NOW(), ?, ?, ?, ?, ?, ?)`,
          [
            journey.date,
            journey.email,
            journey.type,
            journey.addressFrom,
            journey.addressTo,
            journey.kilometers,
            journey.price,
            journey.transportType,
          ],
        );
    }
  }

  /**
   * Deletes a journey from the database based on the email of the user and the date the journey was created.
   * @param userEmail - The email of the user
   * @param journeyCreatedAt - The date the journey was 
   * @author Erik Stam
   */
  public async deleteJourney(userEmail: string, journeyCreatedAt: string): Promise<void> {
    let pool: Pool | null = RelationalDatabase.getPool();
    let results: ResultSetHeader | null = null;

    if (pool != null) {
      [results] = await pool
        .promise()
        .execute<ResultSetHeader>(
          `SELECT * FROM journey WHERE email = ? AND created_at = ?`,
          [userEmail, journeyCreatedAt],
        );
    }

    if (results != null && pool != null && results.affectedRows > 0) {
      [results] = await pool
        .promise()
        .execute<ResultSetHeader>(
          `DELETE FROM journey WHERE email = ? AND created_at = ?`,
          [userEmail, journeyCreatedAt],
        );
    } else {
      throw new Error("Journey not found");
    }
  }

  /**
   * Returns an array of Journey instances that have been converted from sql data.
   *
   * @param resultSetHeader
   * @returns
   * 
   * @author Luka Piersma
   */

  private convertResultSetHeaderToJourneys(
    resultSetHeader: ResultSetHeader,
  ): Journey[] {
    if (resultSetHeader == undefined) {
      throw new Error("unknow user(s)");
    }

    const journeyArray: Journey[] = [];

    (resultSetHeader as any).forEach((element: any) => {
      const date = new Date(element.journey_date);
      const emissions = this.emissionCalculator.calculateEmission(
        element.transport_type_name,
        element.kilometers,
      )

      let journey: Journey = new Journey(
        date,
        element.email,
        element.journey_type_name,
        element.address_from,
        element.address_to,
        parseFloat(element.kilometers),
        parseFloat(element.price),
        element.transport_type_name,
        emissions,
        element.created_at
      );
      journeyArray.push(journey);
    });

    return journeyArray;
  }
}
