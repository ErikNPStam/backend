import { Authenticator } from "../../middleware/Authenticator";

/**
 * Represents a singleton class for the Authenticator.
 * @author Raymundo Brunst
 */
export class AuthenticatorSingleton {
    private static instance: AuthenticatorSingleton | null = null;


    private AuthenticatorInstance: Authenticator | null = null;

    /**
     * Private constructor to prevent direct instantiation of the class.
     */
    private constructor() { }

    /**
     * Returns the instance of the Authenticator class.
     * If an instance does not exist, a new instance is created and returned.
     * @returns The instance of the Authenticator class.
     */
    public static getInstance(): AuthenticatorSingleton {
        if (!AuthenticatorSingleton.instance) {
            AuthenticatorSingleton.instance = new AuthenticatorSingleton();
        }
        return AuthenticatorSingleton.instance;
    }

    /**
     * Gets the instance of Authenticator.
     * @returns The instance of Authenticator.
     */
    public getAuthenticator(): Authenticator {
        if (!this.AuthenticatorInstance) {
            this.AuthenticatorInstance = new Authenticator();
        }
        return this.AuthenticatorInstance;
    }
}