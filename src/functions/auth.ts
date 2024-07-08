import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getHashedPassword = (password: string) => {
    return bcrypt.hashSync(password, 8);
};

export const isDuplicateEmail = async (email: string) => {
    const selectedUser = await prisma.user.findUnique({ where: { email } });
    return Boolean(selectedUser);
};

export const isEmail = (email: string) => {
    const emailReg = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,}$/i;
    return emailReg.test(email);
}