/**
 * @author Luka Piersma
 *
 * The interface for a journey database.
 */

import { Journey } from "../../business/model/journey.model";

export interface JourneyDatabase {
  getJourney(userEmail: string, createdAt: string): Promise<Journey | null>;
  getJourneys(userEmail: string): Promise<Journey[]>;
  getAllJourneys(): Promise<Journey[]>;
  createJourney(journey: Journey): Promise<void>;
  updateJourney(journey: Journey): Promise<void>;
  deleteJourney(userEmail: string, journeyCreateAt: string): Promise<void>;
}
