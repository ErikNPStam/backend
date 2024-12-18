import * as argon2 from "argon2";

/**
* @author Joey van der Kuijl
*
* post Register model.
* This class is responsible for the registration of a user.
*/
class RegisterModel {

  private emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  constructor(
    public email: string,
    public password: string,
    public firstname: string,
    public lastname: string,
    public insertion: string,
    public hash?: string
  ) { }

  /**
* @author Joey van der Kuijl
*
* genereates a random string.
*/
  private generateRandomString() {
    let cryptographicallyStrongRandomString: string = "";
    const crypto = require("crypto");

    cryptographicallyStrongRandomString = crypto
      .randomBytes(16)
      .toString("hex");

    return cryptographicallyStrongRandomString;
  }

  public async hashWithArgon(): Promise<void> {
    let hash: string | null = null;

    let salt = this.generateRandomString();
    hash = await argon2.hash(this.password);

    let saltWithHash = `${salt}:${hash}`;

    this.hash = saltWithHash;
  }

  public verifyEmail(): boolean {
    return this.emailRegex.test(
      this.email
    );
  }

  public verifyPassword(): boolean {
    return this.password.length > 6;
  } 

  public verify(): void {
    if (!this.verifyEmail()) {
      throw new Error("Invalid email format");
    }
    if (!this.verifyPassword()) {
      throw new Error("Password must be at least 6 characters long");
    }
  }

  public processRegistration(): void {
    this.verify();
  }
}

export default RegisterModel;
