import React from 'react';
import { SignUpForm } from '@features/auth/sing-up';
import { SplitCol, SplitLayout } from '@vkontakte/vkui';



export const SignUpPage = () => {
    return (<SplitLayout>
    <SplitCol>
        <SignUpForm />
    </SplitCol>
</SplitLayout>)
}