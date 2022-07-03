import { SplitLayout } from '@vkontakte/vkui';
import React from 'react';


type AppLayoutProps = {
    children: React.ReactNode;
}

export const AppLayout = ({ children }: AppLayoutProps) => {
    return <SplitLayout>
        {children}
    </SplitLayout>
}