"use client";

import { useRouter } from "next/navigation";
import useAmparoStore from "../store/useAmparoStore";
import { motion } from "framer-motion";
import { Download, Edit } from "lucide-react";

export default function PreviewPage() {
    const router = useRouter();
    const { previewFilename } = useAmparoStore();

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-purple-800 to-purple-600 p-6"
        >
            <motion.div 
                className="w-full max-w-5xl bg-white rounded-xl shadow-xl p-6"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
            >
                <motion.h1
                    className="text-2xl font-bold text-center text-gray-800 mb-6"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    Vista Previa del Amparo
                </motion.h1>

                <div className="relative w-full h-96 border rounded-lg overflow-hidden shadow-md">
                    {previewFilename ? (
                        <iframe
                            src={`http://localhost:8000/vista-previa-amparo/${previewFilename}`}
                            className="w-full h-full"
                            title="Vista previa del amparo"
                        ></iframe>
                    ) : (
                        <div className="flex items-center justify-center h-full text-gray-500">
                            Generando vista previa...
                        </div>
                    )}
                </div>

                <div className="mt-6 flex flex-col md:flex-row gap-4">
                    <motion.button
                        onClick={() => router.push("/formulario-manual")}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center justify-center w-full md:w-1/2 bg-yellow-500 text-white py-3 rounded-md shadow-md transition"
                    >
                        <Edit className="w-5 h-5 mr-2" /> Editar Amparo
                    </motion.button>

                    <motion.a
                        href={`http://localhost:8000/descargar-amparo/${previewFilename}`}
                        download="amparo.pdf"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center justify-center w-full md:w-1/2 bg-green-600 text-white py-3 rounded-md shadow-md transition"
                    >
                        <Download className="w-5 h-5 mr-2" /> Descargar PDF
                    </motion.a>
                </div>
            </motion.div>
        </motion.div>
    );

    // return (
    //     <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-xl mt-10">
    //         <h1 className="text-2xl font-bold text-center mb-4 text-slate-700">Vista Previa del Amparo</h1>

    //         {previewFilename ? (
    //             <iframe
    //                 src={`http://localhost:8000/vista-previa-amparo/${previewFilename}`}
    //                 className="w-full h-96 border"
    //                 title="Vista previa del amparo"
    //             ></iframe>
    //         ) : (
    //             <p className="text-center text-gray-500">Generando vista previa...</p>
    //         )}

    //         <button
    //             onClick={() => router.push("/formulario-manual")}
    //             className="mt-4 w-full bg-yellow-500 text-white py-2 rounded-md"
    //         >
    //             Editar Amparo
    //         </button>

    //         <a
    //             href={`http://localhost:8000/descargar-amparo/${previewFilename}`}
    //             download="amparo.pdf"
    //             className="mt-4 block text-center bg-green-600 text-white py-2 rounded-md"
    //         >
    //             Descargar PDF
    //         </a>
    //     </div>
    // );
}
