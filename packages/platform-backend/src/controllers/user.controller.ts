import { TokenService } from "@services/token.service";
import { UserService } from "@services/user.service";

export class UserController {
    private userService: UserService;
    private tokenService: TokenService;

    constructor({ userService, tokenService }: { userService: UserService, tokenService: TokenService }) {
        this.userService = userService;
        this.tokenService = tokenService;
    }

    async signUp(userEmail: string, userPassword: string) {
       const userDto = await this.userService.createUser(userEmail, userPassword);
       const { accessToken, refreshToken } = await this.tokenService.generateToken(userDto);

       await this.tokenService.saveToken(userDto, refreshToken);
       return { accessToken, refreshToken, user: userDto };
    }

    async signIn(userEmail: string, userPassword: string) {
        const userDto = await this.userService.getUser(userEmail, userPassword);
        const { accessToken, refreshToken } = await this.tokenService.generateToken(userDto);
        await this.tokenService.saveToken(userDto, refreshToken);
        return { accessToken, refreshToken, user: userDto }
    }

    async logout(regreshToken: string) {
        return await this.tokenService.deleteToken(regreshToken);
    }

    async refreshToken() {

    }
}
