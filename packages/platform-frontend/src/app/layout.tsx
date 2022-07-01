import { SplitLayout } from '@vkontakte/vkui';
import React from 'react';
import { Outlet } from 'react-router-dom';



type AppLayoutProps = {
    children: React.ReactNode;
}

export const AppLayout = ({ children }: AppLayoutProps) => {
    return <SplitLayout>
        {children}
    </SplitLayout>
}