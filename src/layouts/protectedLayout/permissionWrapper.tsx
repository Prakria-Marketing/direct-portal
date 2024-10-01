import { useAuth } from '@/hooks/auth';
import React from 'react'

export type Role = "admin" | "customer" | "superadmin" | "resource" | "servicing" | "all";

type PermissionProps = {
    role: Role[];
    children: React.ReactNode;
}
function PermissionWrapper({ children, role }: PermissionProps) {
    const { user } = useAuth();
    if (!user?.role) return null;
    console.log(user.role)
    if (role.includes(user?.role) || role.includes("all")) return <>{children}</>;
    return null;
}

export default PermissionWrapper;