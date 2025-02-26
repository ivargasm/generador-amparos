"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import useAmparoStore from "../store/useAmparoStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function RegisterPage() {
    const router = useRouter();
    const { registerUser } = useAmparoStore();
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        const success = await registerUser(email, password, username);
        if (success) {
            router.push("/login"); // Redirigir a login después del registro
        } else {
            setError("Error al registrar. Intenta con otro correo.");
        }

        setLoading(false);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold text-center mb-4">Crear Cuenta</h2>
                <form onSubmit={handleRegister} className="space-y-4">
                    <div>
                        <label className="block font-medium">Nombre de usuario</label>
                        <Input 
                            type="text" 
                            value={username} 
                            onChange={(e) => setUsername(e.target.value)}
                            required 
                        />
                    </div>
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
                        {loading ? "Registrando..." : "Registrarse"}
                    </Button>
                </form>
            </div>
        </div>
    );
}
