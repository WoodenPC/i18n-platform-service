import { TokenService } from "@services/token.service";
import { UnathorizedError } from "@shared/exceptions";
import { FastifyReply, FastifyRequest, DoneFuncWithErrOrRes } from "fastify";

export function authOnly(req: FastifyRequest, res: FastifyReply, done: DoneFuncWithErrOrRes) {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) {
        throw new UnathorizedError();
    }

    const accessToken = authorizationHeader.split(' ')[1];

    if (!accessToken) {
        throw new UnathorizedError();
    }

    const tokenService = req.diScope.resolve<TokenService>('tokenService');
    const userTokenData = tokenService.validateAccessToken(accessToken);
    if (!userTokenData) {
        throw new UnathorizedError();
    }

    req.user = userTokenData;

    return done();
}