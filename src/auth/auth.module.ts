import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
import { cookies } from "next/headers";
import { SignupFormProps } from "@/auth/auth.interface";

const prisma = new PrismaClient();

export const isSomeEmptySignupForm = (signupForm: SignupFormProps) => {
    const signupFormValues = Object.values(signupForm);
    const isSomeEmpty = signupFormValues.some((value) => !value);
    return isSomeEmpty;
};

export const isCompletedSignupForm = (signupForm: SignupFormProps) => {
    const formInputArray = Object.values(signupForm);
    const isCompleted = formInputArray.every((formInput) => Boolean(formInput));
    return isCompleted;
};

export const isDuplicateEmail = async (email: string) => {
    const selectedUser = await prisma.user.findUnique({ where: { email } });
    return Boolean(selectedUser);
};

export const getHashedPassword = (password: string) => {
    return bcrypt.hashSync(password, 8);
};

export const isEmail = (email: string) => {
    const emailReg =
        /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,}$/i;
    return emailReg.test(email);
};

export const createUserData = (signupForm: SignupFormProps) => {
    const { email, name, password } = signupForm;
    return {
        email,
        password: getHashedPassword(password),
        name,
    };
};

export const getAccessToken = () => {
    const accessCookie = cookies().get("access_token");
    return accessCookie ? accessCookie.value : null;
};

export const verifyAccessToken = (token: string) => {
    return jwt.verify(token, process.env.JWT_SECRET!);
};
