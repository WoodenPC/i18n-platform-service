import { AuthApi } from '@shared/api';
import { userModel } from '@entities/user';
import { createEffect, createEvent, forward } from 'effector';
import { fetchUserFx } from '@entities/user/model/model';

export const signInFx = createEffect(
  async ({
    userEmail,
    userPassword,
  }: {
    userEmail: string;
    userPassword: string;
  }) => {
    const authApi = AuthApi.getInstance();
    return await authApi.signIn({ userEmail, userPassword });
  }
);

export const refreshFx = createEffect(async () => {
  const authApi = AuthApi.getInstance();
  return await authApi.refresh();
});

export const signIn = createEvent<{
  userEmail: string;
  userPassword: string;
}>();

export const $isLoading = signInFx.pending;

forward({
  from: signIn,
  to: signInFx
})

forward({
  from: [signInFx.done, refreshFx.done],
  to: fetchUserFx,
});
