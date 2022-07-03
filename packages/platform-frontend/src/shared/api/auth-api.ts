import { ApiClient } from "./api-client";

export class AuthApi {
    private static instance: AuthApi | null = null;

    static getInstance() {
        if (!AuthApi.instance) {
            AuthApi.instance = new AuthApi();
        }

        return AuthApi.instance;
    }


    signIn({ userEmail, userPassword }: { userEmail: string, userPassword: string }) {
        return ApiClient.getInstance().fetch(`${ApiClient.API_URL}/auth/signIn`, {
            method: 'POST',
            body: JSON.stringify({
                userEmail,
                userPassword
            })
        });
    }

    signUp({ userEmail, userPassword }: { userEmail: string, userPassword: string }) {
        return ApiClient.getInstance().fetch(`${ApiClient.API_URL}/auth/signUp`, {
            method: 'POST',
            body: JSON.stringify({
                userEmail,
                userPassword
            })
        });
    }

    refresh() {
        return ApiClient.getInstance().fetch(`${ApiClient.API_URL}/auth/refresh`, {
            method: 'GET'
        });
    }

}
