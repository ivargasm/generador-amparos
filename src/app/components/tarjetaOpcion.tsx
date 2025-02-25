"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

interface TarjetaOpcionProps {
    titulo: string;
    descripcion: string;
    icon: string;
    ruta: string;
}

export default function TarjetaOpcion({ titulo, descripcion, icon, ruta }: TarjetaOpcionProps) {
    const router = useRouter();

    return (
        <motion.div
            className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center cursor-pointer hover:shadow-2xl hover:scale-105 hover:bg-slate-100 transition-all duration-400"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            onClick={() => router.push(ruta)}
        >
            <p className="text-9xl mb-2">{icon}</p>
            <h2 className="text-xl font-semibold mb-2 flex items-center text-slate-500">
                <span className="mr-2">{icon}</span>
                {titulo}
            </h2>
            <p className="text-gray-600 text-center">{descripcion}</p>
        </motion.div>
    );
}
