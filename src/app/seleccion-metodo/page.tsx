"use client";

import { useRouter } from "next/navigation";
import useAmparoStore from "../store/useAmparoStore";
import { motion } from "framer-motion";

export default function SeleccionMetodo() {
    const router = useRouter();
    const { tipoAmparo } = useAmparoStore();

    const handleSeleccion = (metodo: string) => {
        if (metodo === "manual") {
            router.push("/formulario-manual");
        } else {
            router.push("/ayuda-ia");
        }
    };

    const metodo = [
        {
            tipo: "Manual",
            descripcion:
                "Ingresa los datos de manera manual, debes de tener a la mano la información necesaria.",
            icon: "✍️",
        },
        {
            tipo: "IA",
            descripcion:
                "Tendras ayuda de una IA para generar el amparo, solo necesitas describir tu situación.",
            icon: "🤖",
        },
    ];

    return (
        <div className="h-screen flex flex-col items-center justify-center bg-gradient-to-r from-purple-800 to-purple-600 text-white p-6">
            <motion.h1
                className="text-3xl font-bold mb-4"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                ¿Cómo deseas ingresar los datos?
            </motion.h1>

            <motion.p
                className="text-lg text-gray-300 mb-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
            >
                Has seleccionado: <span className="font-semibold text-yellow-300">{tipoAmparo}</span>
            </motion.p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {metodo.map((metodo, index) => (
                    <motion.div
                        key={index}
                        className={`bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center cursor-pointer hover:shadow-2xl hover:scale-105 hover:bg-slate-100 transition-all duration-400 `}
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: index * 0.2 }}
                        onClick={() => handleSeleccion(metodo.tipo.toLowerCase())}
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

            {/* <div className="flex gap-6">
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleSeleccion("manual")}
                    className="px-6 py-3 bg-blue-500 rounded-xl text-lg font-semibold transition"
                >
                    ✍️ Ingreso Manual
                </motion.button>

                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleSeleccion("ia")}
                    className="px-6 py-3 bg-green-500 rounded-xl text-lg font-semibold transition"
                >
                    🤖 Ayuda de IA
                </motion.button>
            </div> */}
        </div>
    );
}
