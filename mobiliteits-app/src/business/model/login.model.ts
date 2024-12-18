import * as argon2 from "argon2";

/**
 * @author Joey van der Kuijl, Mohammed Yusufi, Luka Piersma, Erik Stam
 *
 * post Login endpoint.
*/
export class LoginModel {
  constructor(
    public email: string,
    public password: string,
  ) {}

  /**
 * @author Joey van der Kuijl
 *
 * post Login endpoint.
 * actually verifies the password with the hash.
*/

  private async verifyPasswordWithArgon(
    hash: string,
    password: string,
  ): Promise<boolean | null> {
    let isValidPassword: boolean | null = null;
    let withoutSalt = hash.split(":")[1];
    isValidPassword = await argon2.verify(withoutSalt, password);

    return isValidPassword;
  }

/**
 * @author Joey van der Kuijl
 *
 * Login verify.
 * actually verifies the password with the hash. 
*/

  public async verify(hash: string | null) {
    return hash && (await this.verifyPasswordWithArgon(hash, this.password));
  }
}
