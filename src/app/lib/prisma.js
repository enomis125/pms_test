import { PrismaClient } from "@prisma/client";
import jwt from 'jsonwebtoken';

const prismaClientCache = new Map();

export const getPrismaClient = (token, isJWT) => {
    if (!token) {
        throw new Error("Token is required to initialize PrismaClient");
    }

    if (!isJWT) {

        if (prismaClientCache.has(token)) {
            return prismaClientCache.get(token);
        }

        const databaseUrl = process.env.DATABASE_URL.replace("sysPMSSchema", token);

        const prisma = new PrismaClient({
            datasources: {
                db: {
                    url: databaseUrl,
                },
            },
        });

        prismaClientCache.set(token, prisma);

        return prisma;
    }

    const decodedToken = jwt.decode(token);

    if (!decodedToken || !decodedToken.connectionString) {
        throw new Error("Invalid token");
    }

    const connectionString = decodedToken.connectionString;

    if (prismaClientCache.has(connectionString)) {
        return prismaClientCache.get(connectionString);
    }

    const databaseUrl = process.env.DATABASE_URL.replace("sysPMSSchema", connectionString);

    const prisma = new PrismaClient({
        datasources: {
            db: {
                url: databaseUrl,
            },
        },
    });

    prismaClientCache.set(connectionString, prisma);

    return prisma;
};
