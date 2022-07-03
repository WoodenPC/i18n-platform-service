import { AuthApi } from "@shared/api";
import { createEffect } from "effector";

export const signUpFx = createEffect(async ({ userEmail, userPassword }: { userEmail: string, userPassword: string }) => {
    const authApi = AuthApi.getInstance();
    return await authApi.signUp({ userEmail, userPassword });
});