import { AuthApi } from "@shared/api";
import { userModel } from '@entities/user';
import { createEffect, createEvent, forward } from "effector";

export const signInFx = createEffect(async ({ userEmail, userPassword }: { userEmail: string, userPassword: string }) => {
    console.log('effect');
    const authApi = AuthApi.getInstance();
    return await authApi.signIn({ userEmail, userPassword });
});

export const refreshFx = createEffect(async () => {
    const authApi = AuthApi.getInstance();
    return await authApi.refresh();
});

export const signIn = createEvent<{ userEmail: string, userPassword: string }>();

export const $isLoading = signInFx.pending;

userModel.$user.on(signInFx.doneData, (_, userPayload) => {
    return {
        user: userPayload,
        isLoading: false
    };
}).on(signInFx.fail, () => {
    return {
        user: null,
        isLoading: false
    };
}).on(signInFx.pending, (state) => {
    return {...state, isLoading: true}
}).on(refreshFx.pending, (state) => ({
    ...state,
    isLoading: true
}));

forward({
    from: signIn,
    to: signInFx
})