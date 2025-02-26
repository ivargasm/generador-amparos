"use client";

import { useEffect } from "react";
import useAmparoStore from "../store/useAmparoStore";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function Dashboard() {
    const { user, fetchCurrentUser, logoutUser } = useAmparoStore();
    const router = useRouter();

    useEffect(() => {
        fetchCurrentUser();
    }, [fetchCurrentUser]);

    if (!user) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p>Cargando...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center">
            <h1 className="text-3xl font-bold">Bienvenido, {user.username}!</h1>
            <p className="text-gray-500">Tu rol: {user.role}</p>
            <Button className="mt-4" onClick={() => { logoutUser(); router.push("/login"); }}>
                Cerrar sesión
            </Button>
        </div>
    );
}
