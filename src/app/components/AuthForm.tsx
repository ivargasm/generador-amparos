"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import useAmparoStore from "../store/useAmparoStore";
import { Loader2 } from "lucide-react";

type AuthFormProps = {
    type: "login" | "register";
};

export default function AuthForm({ type }: AuthFormProps) {
    const router = useRouter();
    const { registerUser, loginUser } = useAmparoStore();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        if (type === "login") {
            await loginUser(email, password);
        } else {
            await registerUser(username, email, password);
        }

        setLoading(false);
        router.push("/dashboard"); // Redirigir al dashboard después de login/registro
    };

    return (
        <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-center mb-4">
                {type === "login" ? "Iniciar Sesión" : "Registrarse"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                {type === "register" && (
                    <input
                        type="text"
                        placeholder="Nombre de usuario"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full p-2 border rounded-md"
                        required
                    />
                )}
                <input
                    type="email"
                    placeholder="Correo electrónico"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-2 border rounded-md"
                    required
                />
                <input
                    type="password"
                    placeholder="Contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-2 border rounded-md"
                    required
                />
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded-md"
                    disabled={loading}
                >
                    {loading ? <Loader2 className="animate-spin mx-auto" /> : "Enviar"}
                </button>
            </form>
        </div>
    );
}
