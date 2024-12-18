import { expect } from 'chai';
import { AuthenticatorSingleton } from '../src/creation/singleton/AuthenticatorSingleton';


describe('AuthenticatorSingleton', () => {
    let authenticatorSingleton: AuthenticatorSingleton;

    beforeEach(() => {
        authenticatorSingleton = AuthenticatorSingleton.getInstance();
    });

    it('should return the same instance of AuthenticatorSingleton', () => {
        const instance1 = AuthenticatorSingleton.getInstance();
        const instance2 = AuthenticatorSingleton.getInstance();

        expect(instance1).to.equal(instance2);
    });

    it('should return the same instance of Authenticator', () => {
        const authenticator1 = authenticatorSingleton.getAuthenticator();
        const authenticator2 = authenticatorSingleton.getAuthenticator();

        expect(authenticator1).to.equal(authenticator2);
    });

    it('should create a new instance of Authenticator if not already created', () => {
        const authenticator1 = authenticatorSingleton.getAuthenticator();
        authenticatorSingleton['AuthenticatorInstance'] = null;
        const authenticator2 = authenticatorSingleton.getAuthenticator();

        expect(authenticator1).to.not.equal(authenticator2);
    });
});