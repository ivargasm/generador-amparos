"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import useAmparoStore from "../../store/useAmparoStore";
import { motion } from "framer-motion";

export default function SubirPDF() {
    const router = useRouter();
    const { setDatosAmparo } = useAmparoStore();
    const [file, setFile] = useState<File | null>(null);

    const handleUpload = async () => {
        if (!file) {
            alert("Por favor, selecciona un archivo PDF.");
            return;
        }

        const formData = new FormData();
        formData.append("file", file);

        const response = await fetch("http://localhost:8000/analizar-pdf", {
            method: "POST",
            body: formData,
        });

        if (response.ok) {
            const data = await response.json();
            setDatosAmparo(data); // Guardar la respuesta de la IA
            router.push("/preview");
        } else {
            alert("Error al analizar el PDF");
        }
    };

    return (
        <motion.div
            className="h-screen flex flex-col items-center justify-center bg-gradient-to-r from-purple-800 to-purple-600"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <motion.div
                className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-xl mt-10 text-slate-700"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                <h1 className="text-2xl font-bold text-center mb-6">Sube tu resolución</h1>

                <input
                    type="file"
                    accept="application/pdf"
                    onChange={(e) => setFile(e.target.files?.[0] || null)}
                    className="w-full p-2 border rounded-md"
                />

                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleUpload}
                    className="w-full bg-green-600 text-white py-2 rounded-md mt-4"
                >
                    Enviar PDF para análisis con IA
                </motion.button>
            </motion.div>
        </motion.div>
    );
}
