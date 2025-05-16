import { prisma } from "@/lib/prisma"
import bcrypt from 'bcryptjs';
import { v4 } from 'uuid';

export const hasEmail = async (email: string) => {
    const user = await prisma.user.findUnique({
        where: { email }
    });
    return user ? true : false;
}

export const validateAuth = async (email: string, password: string) => {
    const user = await prisma.user.findUnique({
        where: { email }
    });
    if (!user) return false;
    if (!bcrypt.compareSync(password, user.password)) return false;

    return {
        id: user.id,
        name: user.name,
        email: user.email
    }
}

export const createUser = async (name: string, email: string, password: string) => {
    try {
        const user = await prisma.user.create({
            data: {
                name,
                email: email.toLowerCase(),
                password: bcrypt.hashSync(password, 10)
            }
        });
        return {
            id: user.id,
            name: user.name,
            email: user.email
        }
    } catch (err) {
        return null;
    }
}

export const createUserToken = async (userId: number) => {
    const token = v4();

    await prisma.user.update({
        where: { id: userId },
        data: { token }
    });

    return token;
}