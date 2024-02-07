import MainLayout from '@/components/MainLayout';
import React from 'react'

interface AdminLayoutProps {
    children: React.ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
    return (
        <MainLayout>
            {children}
        </MainLayout>
    )
}

export default AdminLayout