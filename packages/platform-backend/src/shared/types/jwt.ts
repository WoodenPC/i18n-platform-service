import { JWT } from "@fastify/jwt";

export type CustomFastifyJWT = {
    access: JWT;
    refresh: JWT
}

export type UserJWTPayload = {
    id: string;
    userEmail: string;
}