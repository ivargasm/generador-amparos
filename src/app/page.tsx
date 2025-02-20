"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Modal from "./components/modal";
import { useRouter } from "next/navigation";
import { ArrowDown } from "lucide-react";

export default function Home() {
    const [isModalOpen, setIsModalOpen] = useState(true);
    const router = useRouter();

    const sections = [
        {
            title: "📜 ¿Cómo Funciona?",
            description: "Esta plataforma te ayuda a generar documentos de amparo de manera sencilla y rápida."
        },
        {
            title: "1️⃣ Selección del Tipo de Amparo",
            description: "Puedes elegir entre Amparo Directo o Amparo Indirecto según tu caso.",
            image: "/images/seleccion-amparo.png",
        },
        {
            title: "2️⃣ Método de Generación",
            description: "Puedes ingresar los datos manualmente o recibir ayuda con IA.",
            image: "/images/metodo-ingreso.png",
        },
        {
            title: "3️⃣ Vista Previa y Edición",
            description: "Podrás revisar cómo quedará tu documento y modificar cualquier detalle antes de descargarlo.",
            image: "/images/vista-previa.png",
        },
        {
            title: "4️⃣ Descarga del Amparo",
            description: "Una vez revisado, podrás descargarlo en formato PDF para su uso legal."
        },
    ];

    return (
        <div className="h-screen w-full overflow-y-auto snap-y snap-mandatory scroll-smooth no-scrollbar relative">
            {/* MODAL */}
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

            {/* FLECHA ANIMADA */}
            <motion.div 
                className="absolute bottom-24 md:bottom-8 w-full flex flex-col items-center justify-center text-white"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 10 }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut", repeatType: "mirror" }}
            >
                <span className="text-sm">Desliza hacia abajo</span>
                <ArrowDown className="w-8 h-8 animate-bounce" />
            </motion.div>

            {/* SECCIONES SCROLLABLES */}
            {sections.map((section, index) => (
                <motion.div
                    key={index}
                    className="h-svh p-8 flex flex-col items-center justify-center bg-gradient-to-r from-blue-600 to-purple-700 text-white snap-start"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2, ease: "easeInOut" }}
                >
                    <h2 className="text-4xl font-bold mb-4 text-center">{section.title}</h2>
                    <p className="text-xl max-w-2xl text-center mb-6">{section.description}</p>

                    {/* IMAGEN */}
                    {section.image && (
                        <motion.img
                            src={section.image}
                            alt="Tutorial"
                            className="w-[40%] rounded-lg shadow-md"
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8 }}
                        />
                    )}
                </motion.div>
                
            ))}

            {/* SECCIÓN FINAL CON BOTÓN */}
            <motion.div
                className="h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-600 to-purple-700 text-white snap-start"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, ease: "easeInOut" }}
            >
                <h2 className="text-4xl font-bold mb-4">¡Listo para comenzar?</h2>
                <p className="text-xl max-w-2xl text-center mb-6">Selecciona el tipo de amparo y sigue los pasos para generarlo.</p>
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => router.push("/seleccion-amparo")}
                    className="bg-white text-blue-600 px-6 py-2 rounded-md shadow-md font-bold"
                >
                    Comenzar
                </motion.button>
            </motion.div>
        </div>
    );
}
