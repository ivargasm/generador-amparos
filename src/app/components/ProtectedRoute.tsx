"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import useAmparoStore from "../store/useAmparoStore";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const { isAuthenticated, verificarSesion } = useAmparoStore();

    useEffect(() => {
        const checkAuth = async () => {
            await verificarSesion();
            if (!isAuthenticated) {
                router.push("/login");
            }
        };
        checkAuth();
    }, [isAuthenticated, router, verificarSesion]);

    return isAuthenticated ? children : null;
}
