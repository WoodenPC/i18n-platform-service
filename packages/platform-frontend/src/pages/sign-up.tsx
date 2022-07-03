import React from 'react';
import { SignUpForm } from '@features/auth/sing-up';
import { Panel, PanelHeader, SplitCol, SplitLayout } from '@vkontakte/vkui';



export const SignUpPage = () => {
    return (<SplitLayout>
    <SplitCol>
        <Panel>
            <PanelHeader>Зарегистрироваться</PanelHeader>
            <div style={{ width: '400px', margin: 'auto' }}>
        <SignUpForm />
        </div>
        </Panel>
    </SplitCol>
</SplitLayout>)
}