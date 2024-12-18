import { LoginDatabase } from "../../data/interfaces/LoginDatabase";
import { Session } from "../../data/interfaces/Session";
import { LoginModel } from "../model/login.model";

/**
 * @author Joey van der Kuijl, Mohammed Yusufi, Luka Piersma, Erik Stam
 *
 * post Login service.
*/
export class LoginService {
  constructor(private loginDatabase: LoginDatabase) { }

  public async createLogInSession(
    email: string,
    password: string,
  ): Promise<Session | null> {
    const login: LoginModel = new LoginModel(email, password);
    const hash = await this.loginDatabase.getCurrentPassword(email);

    let session: Session | null = null;

    if (await login.verify(hash)) {
      const userRole: string | null = await this.loginDatabase.getUserRole(email);

      session = {
        userEmail: email,
        userRole: userRole as string,
        expirationDate: new Date()
      }
    }

    return session;
  }
}
