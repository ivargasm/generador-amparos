"use client";

// import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import TarjetaOpcion from "../components/tarjetaOpcion";

export default function AyudaIA() {
    // const router = useRouter();

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
            className="min-h-svh flex flex-col items-center bg-gradient-to-r from-purple-800 to-purple-600 text-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <div className="w-full flex justify-start mb-6 mt-10 ml-8">
                <Link href="/seleccion-metodo">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-6 py-3 bg-purple-500 rounded-xl text-lg font-semibold transition"
                    >
                            ⬅️ Regresar
                    </motion.button>
                </Link>

            </div>
            <h1 className="text-2xl font-bold text-center mb-6">Elige cómo deseas recibir ayuda con IA</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 md:max-w-[80%] lg:max-w-[60%]">
                {metodo.map((item, index) => (
                    <TarjetaOpcion 
                    key={index}
                    titulo={item.titulo}
                    descripcion={item.descripcion}
                    icon={item.icon}
                    ruta={`/ayuda-ia/${item.tipo}`} 
                    />
                ))}
            </div>
            
        </motion.div>
        
    );
}
