// import { useState } from "react";
import { motion } from "framer-motion";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function Modal({ isOpen, onClose }: ModalProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-8">
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="bg-white p-6 rounded-lg shadow-lg max-w-lg"
            >
                <h2 className="text-xl font-bold text-gray-800 mb-4">Descargo de Responsabilidad</h2>
                <p className="text-gray-600 mb-4">
                    Esta aplicación genera documentos de amparo con base en la información proporcionada.
                    No sustituye la asesoría legal de un abogado. 
                    Es responsabilidad del usuario revisar y validar el contenido antes de su presentación.
                </p>
                <button
                    onClick={onClose}
                    className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
                >
                    Acepto y Continuar
                </button>
            </motion.div>
        </div>
    );
}
