"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import useAmparoStore from "../../store/useAmparoStore";
import { motion } from "framer-motion";

export default function FormularioIA() {
    const router = useRouter();
    const { tipoAmparo, setDatosAmparo, handleAmparoIa } = useAmparoStore();
    const [situacion, setSituacion] = useState("");
    const [autoridad, setAutoridad] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!situacion || !autoridad) {
            alert("Por favor, llena todos los campos.");
            return;
        }

        const datos = { situacion, autoridad, tipoAmparo };
        console.log("Datos enviados:", datos);
        setDatosAmparo(datos);
        await handleAmparoIa(datos); // Llamar la API para generar el PDF

        // Redirigir a la vista previa mientras se procesa en el backend
        router.push("/preview");
    };

    return (
        <motion.div
            className="h-screen flex flex-col items-center justify-center bg-gradient-to-r from-purple-800 to-purple-600"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <motion.div
                className="w-[60%] mx-auto p-6 bg-white rounded-xl shadow-xl mt-10 text-slate-700"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                <h1 className="text-2xl font-bold text-center mb-6">Describe tu situación</h1>

                <form onSubmit={handleSubmit} className="space-y-4">
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
                        className="w-full bg-blue-600 text-white py-2 rounded-md mt-4"
                    >
                        Enviar para análisis con IA
                    </motion.button>
                </form>
            </motion.div>

        </motion.div>
    );
}
