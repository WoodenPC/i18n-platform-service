import { useEvent, useStore } from "effector-react"
import { $signUpStatus, resetSignUpStatus, signUp, $isLoading } from './model';

export const useSignUp = () => {
    const status = useStore($signUpStatus);
    const isLoading = useStore($isLoading)
    const resetSignUpStatusFn = useEvent(resetSignUpStatus);
    const signUpFn = useEvent(signUp);

    return { status, isLoading, resetSignUpStatusFn, signUpFn }
}