/**
 * @author Luka Piersma
 *
 * The journey controller.
 */

import * as express from "express";
import { JourneyService } from "../business/service/journey.service";
import { JourneyFactory } from "../creation/factories/journey.factory";
import { Journey } from "../business/model/journey.model";

export class JourneyController {


  constructor(private journeyService: JourneyService) { }

  /**
   * Gets the journeys of a user based on their email using the service and sends a response with the journeys to the client.
   *
   * @param req
   * @param res
   * @returns
   * @author Luka Piersma
   */

  public async getJourneys(
    req: express.Request,
    res: express.Response,
  ): Promise<void> {
    try {
      const userEmail = req.body.userEmail

      res.status(202).json(await this.journeyService.getJourneys(userEmail));
    } catch (error) {
      res.status(500).json({});
    }
  }

  /**
   * Gets a specific journey of a user based on the createdAt parameter inside of the url and sends response with the journey to the client.
   *
   * @param req
   * @param res
   * @returns
   * @author Luka Piersma
   */

  public async getJourney(req: express.Request, res: express.Response) {
    try {
      const userEmail = req.body.userEmail
      const createdAt = req.params.createdAt

      res.status(202).json(await this.journeyService.getJourney(userEmail, createdAt));
    } catch (error) {
      res.status(500).json({});
    }
  }

  /**
   * Retrieves all journeys.
   *
   * @param req - The express request object.
   * @param res - The express response object.
   * @returns A promise that resolves to void.
   * @author Raymundo Brunst
   */
  public async getAllJourneys(req: express.Request, res: express.Response): Promise<void> {
    try {
      res.status(202).json(await this.journeyService.getAllJourneys());
    } catch {
      res.status(500).json({});
    }
  }

  /**
   * Creates a journey based on the user's request body and sends a response to the client.
   *
   * @param req
   * @param res
   * @returns
   * @author Luka Piersma
   */

  public async createJourney(
    req: express.Request,
    res: express.Response,
  ): Promise<void> {

    try {
      const journey: Journey = JourneyFactory.getInstance().createJourneyFromRequest(req);

      await this.journeyService.createJourney(journey);

      res.status(202).json({});
    } catch (error) {
      res.status(400).json({});
    }
  }

  /**
   * Updates a journey based on the user's request body and sends a response to the client.
   *
   * @param req
   * @param res
   * @returns
   * @author Luka Piersma
   */

  public async updateJourney(req: express.Request, res: express.Response): Promise<void> {
    try {
      const journey: Journey = JourneyFactory.getInstance().createJourneyFromRequest(req);

      await this.journeyService.updateJourney(journey)

      res.status(202).json({});
    } catch {
      res.status(400).json({});
    }
  }

  /**
   * 
   * @param req 
   * @param res 
   * @author Erik Stam
   */
  public async deleteJourney(
    req: express.Request,
    res: express.Response
  ): Promise<void> {
    try {
      const journeyCreatedAt = req.params.journeyCreatedAt;
      journeyCreatedAt.toString()
      const userEmail = req.body.userEmail;

      if (!journeyCreatedAt || !userEmail) {
        res.status(400).json({ message: "Missing parameters" });
      }

      await this.journeyService.deleteJourney(userEmail, journeyCreatedAt);
      res.status(202).json({ message: "Journey deleted" });
    } catch (error: any) {
      if (error.message === "Journey not found") {
        res.status(430).json({ message: "Journey not found" });
      } else {
        res.status(500).json({});
      }
    }
  }
}
