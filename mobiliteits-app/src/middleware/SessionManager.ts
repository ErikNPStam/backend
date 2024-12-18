/**
 * @author Luka Piersma
 *
 * The Session Manager class.
 */

import express from "express";
import { v4 as uuidv4 } from "uuid";
import { Session } from "../data/interfaces/Session";

/**
 * The interface of an individual session.
 */

export class SessionManager {

  /**
   * The sessions object where all the sessions will be stored.
   * Each key inside of the sessions object is a UUID and the value is equal to a session.
   */
  public static sessions: {
    [key: string]: Session;
  } = {};

  /**
   * The maximum age of a session in milliseconds.
   * ! This variable decides how long a user can be logged in in milliseconds. !
   */
  private static maxAge: number = 60 * 60 * 24 * 7 * 1000; // 1 week in milliseconds

  /**
   * Creates a session by generating a UUID and stores the given userEmail in that session.
   * Also stores the UUID in the cookies of the frontend.
   * @param {express.Response} res
   * @param {string} userEmail
   * @param {string} userRole
   * @returns {void}
   * 
   * @author Luka Piersma
   */
  public createSession(res: express.Response, userEmail: string, userRole: string): void {
    const sessionId: string = this.generateUUID();
    const expirationDate = new Date(Date.now() + SessionManager.maxAge);

    SessionManager.sessions[sessionId] = {
      userEmail: userEmail,
      userRole: userRole,
      expirationDate: expirationDate
    };

    res.cookie('session', sessionId, {
      expires: expirationDate,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production'
    });
  }

  /**
   * Returns a session that belongs to the stored UUID cookie in the frontend.
   * @param {express.Request} req
   * @returns {Session | null}
   * 
   * @author Luka Piersma
   */
  public getSession(req: express.Request): Session | null {
    const sessionId = req.cookies['session'];
    const session = sessionId && SessionManager.sessions[sessionId] || null;

    // If the session is older than the maxAge, delete the session.
    if (sessionId && session && new Date() > session.expirationDate) {
      delete SessionManager.sessions[sessionId];
      throw new Error('Session expired');
    } else if (session === null) {
      throw new Error('No session found');
    }

    return session;
  }

  /**
   * Checks if the request has an active session.
   * @param req - The express request object.
   * @returns A boolean indicating whether the request has an active session.
   * 
   * @author Luka Piersma
   */
  public hasSession(req: express.Request): boolean {
    const sessionId = req.cookies['session'];
    const session = sessionId && SessionManager.sessions[sessionId] || null;

    return session && true || false
  }

  /**
   * Checks if the user associated with the request has the specified role.
   * @param req - The Express request object.
   * @param role - The role to check against.
   * @returns True if the user has the specified role, false otherwise.
   * 
   * @author Erik Stam
   */
  public hasRole(req: express.Request, role: string): boolean {
    const session = this.getSession(req);
    return session?.userRole === role;
  }

  /**
   * Generates a UUID that is not already in the sessions object.
   * @returns {string} - A UUID that is not already in the sessions object.
   * 
   * @author Erik Stam
   */
  private generateUUID(): string {
    let uuid = uuidv4();

    while (uuid in SessionManager.sessions) {
      uuid = uuidv4();
    }
    return uuid;
  }
}
