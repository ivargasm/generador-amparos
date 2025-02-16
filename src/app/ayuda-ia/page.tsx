"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function AyudaIA() {
    const router = useRouter();

    const metodo = [
        {
            titulo: "Explica tus necesidades",
            tipo: "formulario",
            descripcion:
                "Ingresa los datos de manera manual, debes de tener a la mano la información necesaria.",
            icon: "✍️",
        },
        {
            titulo: "Subir PDF",
            tipo: "subir-pdf",
            descripcion:
                "Tendras ayuda de una IA para generar el amparo, solo necesitas describir tu situación.",
            icon: "🗂️",
        },
    ];

    return (
        <motion.div
            className="h-screen flex flex-col items-center justify-center bg-gradient-to-r from-purple-800 to-purple-600 text-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <h1 className="text-2xl font-bold text-center mb-6">Elige cómo deseas recibir ayuda con IA</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {metodo.map((metodo, index) => (
                    <motion.div
                        key={index}
                        className={`bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center cursor-pointer hover:shadow-2xl hover:scale-105 hover:bg-slate-100 transition-all duration-400 `}
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: index * 0.2 }}
                        onClick={() => router.push(`/ayuda-ia/${metodo.tipo}`)}
                    >
                        <p className="text-9xl mb-2">{metodo.icon}</p>
                        <h2 className="text-xl font-semibold mb-2 flex items-center text-slate-500">
                            <span className="mr-2">{metodo.icon}</span>
                            {metodo.tipo}
                        </h2>
                        <p className="text-gray-600 text-center">{metodo.descripcion}</p>
                    </motion.div>
                ))}
            </div>

            {/* <div className="space-y-4">
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => router.push("/ayuda-ia/formulario")}
                    className="w-full bg-blue-600 text-white py-3 rounded-md text-lg"
                >
                    Cuéntame tu situación
                </motion.button>

                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => router.push("/ayuda-ia/subir-pdf")}
                    className="w-full bg-green-600 text-white py-3 rounded-md text-lg"
                >
                    Sube tu resolución
                </motion.button>
            </div> */}
        </motion.div>
    );
}
