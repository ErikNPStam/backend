import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  ForeignKey,
  AllowNull,
} from "sequelize-typescript";
import AccountSequelize from "./account.model";
import JourneyTypeSequelize from "./journeyType.model";
import TransportTypeSequelize from "./transportType.model";
import { Journey } from "../../business/model/journey.model";

/**
 * Represents a journey table in the database.
 */
@Table({ tableName: "journey", timestamps: false })
export default class JourneySequelize extends Model {
  /**
   * The date of the journey.
   */
  @AllowNull(false)
  @Column({ type: DataType.DATE })
  journey_date!: Date;

  /**
   * The email of the user associated with the journey.
   */
  @PrimaryKey
  @AllowNull(false)
  @ForeignKey(() => AccountSequelize)
  @Column({ type: DataType.STRING })
  email!: string;

  /**
   * The creation date of the journey record.
   */
  @PrimaryKey
  @Column({ type: DataType.DATE })
  created_at!: Date;

  /**
   * The name of the journey type.
   */
  @AllowNull(false)
  @ForeignKey(() => JourneyTypeSequelize)
  @Column({ type: DataType.STRING })
  journey_type_name!: string;

  /**
   * The starting address of the journey.
   */
  @Column({ type: DataType.STRING })
  address_from!: string | null;

  /**
   * The destination address of the journey.
   */
  @Column({ type: DataType.STRING })
  address_to!: string | null;

  /**
   * The distance traveled in kilometers.
   */
  @AllowNull(false)
  @Column({ type: DataType.DECIMAL(10, 2) })
  kilometers!: number;

  /**
   * The price of the journey.
   */
  @AllowNull(false)
  @Column({ type: DataType.DECIMAL(10, 2) })
  price!: number;

  /**
   * The name of the transport type.
   */
  @AllowNull(false)
  @ForeignKey(() => TransportTypeSequelize)
  @Column({ type: DataType.STRING })
  transport_type_name!: string;

  /**
   * Creates a new journey record in the database.
   * @param journey - The journey object containing the journey details.
   * @returns A promise that resolves when the journey is created successfully.
   * @author Luka Piersma
   */
  public async createJourney(journey: Journey): Promise<void> {
    await JourneySequelize.create({
      journey_date: journey.date,
      email: journey.email,
      created_at: new Date(),
      journey_type_name: journey.type,
      address_from: journey.addressFrom,
      address_to: journey.addressTo,
      kilometers: journey.kilometers,
      price: journey.price,
      transport_type_name: journey.transportType
    });
  }

  /**
   * 
   * @param userEmail 
   * @param journeyCreatedAt 
   * @throws Error if the journey is not found
   * @author Erik Stam
   */
  public async deleteJourney(userEmail: string, journeyCreatedAt: string) {
    const journey = await JourneySequelize.findOne({
      where: {
        email: userEmail,
        created_at: journeyCreatedAt,
      },
    });

    if (!journey) {
      throw new Error("Journey not found");
    }

    await JourneySequelize.destroy({
      where: {
        email: userEmail,
        created_at: journeyCreatedAt,
      },
    });
  }

  /**
   * Retrieves journeys for a given user.
   * @param userEmail - The email of the user.
   * @returns A promise that resolves to an array of JourneySequelize objects.
   * @author Luka Piersma
   */
  public async getJourneys(userEmail: string): Promise<JourneySequelize[]> {
    const results: JourneySequelize[] | null = await JourneySequelize.findAll({
      attributes: [
        "journey_date",
        "email",
        "created_at",
        "journey_type_name",
        "address_from",
        "address_to",
        "kilometers",
        "price",
        "transport_type_name",
      ],
      where: {
        email: userEmail,
      },
      order: [["journey_date", "ASC"]],
      group: [
        "created_at",
        "email",
        "journey_date",
        "journey_type_name",
        "address_from",
        "address_to",
        "kilometers",
        "price",
        "transport_type_name",
      ],
    });

    return results;
  }

  /**
   * Retrieves a journey from the database using the userEmail and the createdAt.
   * 
   * @param userEmail The user's email
   * @param createdAt The createdAt belonging to the journey
   * @returns a Promise that has a JourneySequelize Instance
   * @author Luka Piersma
   */

  public async getJourney(userEmail: string, createdAt: string): Promise<JourneySequelize> {
    const results: JourneySequelize[] | null = await JourneySequelize.findAll({
      attributes: [
        "journey_date",
        "email",
        "created_at",
        "journey_type_name",
        "address_from",
        "address_to",
        "kilometers",
        "price",
        "transport_type_name",
      ],
      where: {
        email: userEmail,
        created_at: createdAt
      },
      order: [["journey_date", "ASC"]],
      group: [
        "created_at",
        "email",
        "journey_date",
        "journey_type_name",
        "address_from",
        "address_to",
        "kilometers",
        "price",
        "transport_type_name",
      ],
    });

    return results[0];
  }

  /**
   * Updates a journey inside of the database using the given Journey instance.
   * 
   * @param journey An instance of a Journey
   */

  public async updateJourney(journey: Journey): Promise<void> {
    await JourneySequelize.update(
      {
        journey_date: journey.date,
        journey_type_name: journey.type,
        address_from: journey.addressFrom,
        address_to: journey.addressTo,
        kilometers: journey.kilometers,
        price: journey.price,
        transport_type_name: journey.transportType
      },
      {
        where: {
          email: journey.email,
          created_at: journey.createdAt
        }
      })
  }

  /**
   * Retrieves all journeys from the database.
   * @returns A promise that resolves to an array of JourneySequelize objects.
   * @author Raymundo Brunst
   */
  public async getAllJourneys(): Promise<JourneySequelize[]> {
    return await JourneySequelize.findAll({
      order: [["journey_date", "DESC"]],
    });
  }

  /**
  * Delete all journeys from the database.
  * @returns a promise.
  */
  public async deleteAllJourneys(): Promise<void> {
    await JourneySequelize.destroy({ where: {} });
  }
}
