import React from 'react';
import { SignInForm } from '@features/auth/sing-in';
import { SplitCol, SplitLayout } from '@vkontakte/vkui';



export const SignInPage = () => {
    return (<SplitLayout>
        <SplitCol>
            <SignInForm />
        </SplitCol>
    </SplitLayout>)
}