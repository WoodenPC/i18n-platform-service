import { signInModel } from '@features/auth/sing-in';

export const initApp = async () => {
  await signInModel.refreshFx();
};
