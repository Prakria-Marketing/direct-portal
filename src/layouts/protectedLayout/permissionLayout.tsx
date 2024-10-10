import { useAuth } from '@/hooks/auth';
import React, { useEffect } from 'react'
import { Navigate } from 'react-router-dom';
import Loading from '@/components/Loading';

export type Role = "admin" | "customer" | "superadmin" | "resource" | "servicing" | "all";

type PermissionProps = {
    role: Role[];
    children: React.ReactNode;
}
function PermissionLayout({ children, role }: PermissionProps) {
    const { user } = useAuth();
    if (!user?.role) return <>
        <Loading />
    </>
    if (role.includes("all")) return <>{children}</>
    if (!role.includes(user.role)) return <Navigate to="/404" />
    return <>{children}</>
}

export default PermissionLayout;