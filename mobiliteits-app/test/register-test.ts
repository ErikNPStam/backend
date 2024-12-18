import { expect } from "chai";
import RegisterModel from "../src/business/model/registration.model"
import sinon from "sinon";

describe("Register business model", () => {
    let register: RegisterModel;

    beforeEach(async () => {
        register = new RegisterModel(
            "user2@example.com",
            "wachtwoord123",
            "User",
            "Two",
            "Middle",
        );

    });

    describe("hashPassword", () => {
        it("should be equal to eachother", async () => {
            await register.hashWithArgon();
            expect(register.hash).to.be.exist;
        });

        it("should return false for a invalid passsword", () => {
            expect(register.hash).to.be.undefined;
        });
    });


    describe("verify", () => {
        it("should return true for a valid email and password", async () => {
            const verifySpy = sinon.spy(register, 'verify');
            const verifyEmailSpy = sinon.spy(register, 'verifyEmail');
            const verifyPasswordSpy = sinon.spy(register, 'verifyPassword');

            await register.processRegistration();

            expect(verifySpy.calledOnce).to.be.true;
            expect(verifyEmailSpy.calledOnce).to.be.true;
            expect(verifyPasswordSpy.calledOnce).to.be.true;

            verifySpy.restore();
            verifyEmailSpy.restore();
            verifyPasswordSpy.restore();
        });

        it("should return false for a invalid email and password", () => {
            register.email = "user2";
            expect(() => register.verify()).to.throw('Invalid email format')
        });

        it("should return false for a invalid password", () => {
            register.password = "123";
            expect(() => register.verify()).to.throw('Password must be at least 6 characters long')
        });
    });

    describe("verifyEmail", () => {
        it("should return true for a valid email", () => {
            expect(register.verifyEmail()).to.be.true;
        });

        it("should return false for a invalid email", () => {
            register.email = "user2";
            expect(register.verifyEmail()).to.be.false;
        });
    });

    describe("verifyPassword", () => {
        it("should return true for a valid password", () => {
            expect(register.verifyPassword()).to.be.true;
        });

        it("should return false for a invalid password", () => {
            register.password = "123";
            expect(register.verifyPassword()).to.be.false;
        });
    });


});
