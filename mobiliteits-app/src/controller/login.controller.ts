import * as express from "express";
import { LoginService } from "../business/service/login.service";
import { Session } from "../data/interfaces/Session";
import { SessionManager } from "../middleware/SessionManager";

/**
 * @author Joey van der Kuijl, Mohammed Yusufi, Luka Piersma, Erik Stam
 *
 * post Login controller.
*/
export class LoginController {
  constructor(private loginService: LoginService, private sessionManager: SessionManager = new SessionManager()) { }

  public async createLogInSession(
    req: express.Request,
    res: express.Response
  ): Promise<void> {
    const email = req.body.email;
    const password = req.body.password;

    try {
      const session: Session | null = await this.loginService.createLogInSession(
        email,
        password,
      );
      if (session) {
        this.sessionManager.createSession(res, session.userEmail, session.userRole);

        res.status(202).json({
          success: true,
        });
      } else {
        res.status(401).json({
          message: "Email or password is not correct.",
        });
      }
    } catch (error) {
      console.log(error)
      res.status(500).json({
        message: "There was an server error.",
        error: error,
      });
    }
  }
}
