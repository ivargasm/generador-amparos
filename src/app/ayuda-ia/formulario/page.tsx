"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import useAmparoStore from "../../store/useAmparoStore";
import { motion } from "framer-motion";
import Link from "next/link";
import { Loader2 } from "lucide-react";

export default function FormularioIA() {
    const router = useRouter();
    const { tipoAmparo, setDatosAmparo, handleAmparoIa } = useAmparoStore();
    const [situacion, setSituacion] = useState("");
    const [autoridad, setAutoridad] = useState("");
    const [loading, setLoading] = useState(false); // Estado del loader

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!situacion || !autoridad) {
            alert("Por favor, llena todos los campos.");
            return;
        }

        setLoading(true); // Activar el loader

        const datos = { situacion, autoridad, tipoAmparo };
        console.log("Datos enviados:", datos);
        setDatosAmparo(datos);

        try {
            await handleAmparoIa(datos); // Llamar a la API para generar el PDF
            router.push("/preview"); // Redirigir a la vista previa
        } catch (error) {
            console.error("Error generando el amparo:", error);
        } finally {
            setLoading(false); // Desactivar el loader
        }
    };

    return (
        <motion.div
            className="h-screen flex flex-col gap-6 items-center justify-start md:pt-0 bg-gradient-to-r from-purple-800 to-purple-600"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <div className="w-full flex justify-start mt-6 ml-6">
                <Link href="/ayuda-ia">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-6 py-3 bg-purple-500 rounded-xl text-lg font-semibold transition"
                    >
                        ⬅️ Regresar
                    </motion.button>
            </Link>
            </div>
            <motion.div
                className="w-[75%] mx-auto p-6 min-h-[70%] md:min-h-[50%] md:mt-10 bg-white rounded-xl shadow-xl text-slate-700"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                <h1 className="text-2xl font-bold text-center mb-6">Describe tu situación</h1>

                <form onSubmit={handleSubmit} className="space-y-4 flex flex-col gap-10">
                    <div>
                        <label className="block font-medium">Explica tu situación:</label>
                        <textarea
                            value={situacion}
                            onChange={(e) => setSituacion(e.target.value)}
                            rows={5}
                            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block font-medium">Autoridad responsable:</label>
                        <input
                            type="text"
                            value={autoridad}
                            onChange={(e) => setAutoridad(e.target.value)}
                            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        type="submit"
                        disabled={loading} // Deshabilitar mientras se procesa
                        className="w-full bg-blue-600 text-white py-2 rounded-md mt-4"
                    >
                        {loading ? (
                            <>
                                <div className="flex items-center justify-center gap-2">
                                    <Loader2 className="animate-spin" size={20} /> Procesando...
                                </div>
                            </>
                        ) : (
                            "Enviar para análisis con IA"
                        )}
                    </motion.button>
                </form>
            </motion.div>
            
        </motion.div>
    );
}
