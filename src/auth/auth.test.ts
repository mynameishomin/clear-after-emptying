import { SignupFormProps } from "./auth.interface";
import { isSomeEmptySignupForm } from "./auth.module";

describe("isSomeEmptySignupForm", () => {
    it("빈 값이 없음", () => {
        const signupForm: SignupFormProps = {
            email: "hello@gmail.com",
            password: "1234",
            confirmPassword: "1234",
            name: "user"
        };
        expect(isSomeEmptySignupForm(signupForm)).toBe(false);
    });
    it("빈 값이 있음", () => {
        const signupForm: SignupFormProps = {
            email: "",
            password: "1234",
            confirmPassword: "1234",
            name: "user"
        };
        expect(isSomeEmptySignupForm(signupForm)).toBe(true);
    });
});
