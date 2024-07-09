import bcrypt from 'bcryptjs';
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export interface AuthInputProps {
    value: string;
    valid: boolean;
    message: string;
}

export interface AuthFormProps {
    [key: string]: AuthInputProps;
    email: AuthInputProps;
    password: AuthInputProps;
    confirmPassword: AuthInputProps;
    name: AuthInputProps;
}

export const createInitialAuthInfo = (): AuthFormProps => {
    const initialAuthInputProps: AuthInputProps = {
        value: "",
        valid: false,
        message: "",
    };

    return {
        email: { ...initialAuthInputProps },
        password: { ...initialAuthInputProps },
        confirmPassword: { ...initialAuthInputProps },
        name: { ...initialAuthInputProps },
    };
};

export const isCompletedSignupForm = (signupForm: AuthFormProps) => {
    const isCompleted = Object.keys(signupForm).every((key) => signupForm[key].value);
    return isCompleted;
}

export const isSamePassword = (signupForm: AuthFormProps) => {
    const isSame = signupForm.password.value === signupForm.confirmPassword.value;
    return isSame;
}

export const isDuplicateEmail = async (email: string) => {
    const selectedUser = await prisma.user.findUnique({ where: { email } });
    return Boolean(selectedUser);
};

export const getHashedPassword = (password: string) => {
    return bcrypt.hashSync(password, 8);
};

export const isEmail = (email: string) => {
    const emailReg = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,}$/i;
    return emailReg.test(email);
}

export const createUserData = (signupForm: AuthFormProps) => {
    const {email, name, password} = signupForm;
    return {
        email: email.value,
        password: getHashedPassword(password.value),
        name: name.value, 
    }
}