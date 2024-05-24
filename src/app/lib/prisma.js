import { PrismaClient } from "@prisma/client";
import jwt from 'jsonwebtoken';

const prismaClientCache = new Map();

export const getPrismaClient = (token) => {
    if (!token) {
        throw new Error("Token is required to initialize PrismaClient");
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
