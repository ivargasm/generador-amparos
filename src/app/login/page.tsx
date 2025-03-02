"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useAmparoStore from "../store/useAmparoStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function LoginPage() {
    const router = useRouter();
    const { loginUser, user  } = useAmparoStore();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    // 🔹 Si el usuario ya está logueado, redirigir automáticamente a /dashboard
    useEffect(() => {
        if (user) {
            router.push("/dashboard");
        }
    }, [router, user]);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        const success = await loginUser(email, password);
        if (success) {
            router.push("/dashboard"); // Redirigir al dashboard si el login es exitoso
        } else {
            setError("Correo o contraseña incorrectos.");
        }

        setLoading(false);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold text-center mb-4">Iniciar Sesión</h2>
                <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                        <label className="block font-medium">Correo electrónico</label>
                        <Input 
                            type="email" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)}
                            required 
                        />
                    </div>
                    <div>
                        <label className="block font-medium">Contraseña</label>
                        <Input 
                            type="password" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)}
                            required 
                        />
                    </div>
                    {error && <p className="text-red-500 text-sm">{error}</p>}
                    <Button type="submit" className="w-full" disabled={loading}>
                        {loading ? "Ingresando..." : "Ingresar"}
                    </Button>
                </form>
            </div>
        </div>
    );
}
