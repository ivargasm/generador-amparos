"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import useAmparoStore from "../store/useAmparoStore";
import Link from "next/link";
import { Loader2, Info } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../components/ui/tooltip";

export default function FormularioManual() {
    const router = useRouter();
    const { tipoAmparo, camposAmparo, setDatosAmparo, handleGenerarAmparo, datosAmparo } = useAmparoStore();
    const [formData, setFormData] = useState<Record<string, string>>({});
    const [loading, setLoading] = useState(false);
    const [openTooltips, setOpenTooltips] = useState<{ [key: string]: boolean }>({});
    const tooltipRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (Object.keys(datosAmparo).length > 0) {
            setFormData(datosAmparo as Record<string, string>);
        } else {
            const campos = tipoAmparo && camposAmparo[tipoAmparo]?.reduce((acc, campo) => {
                acc[campo.name] = "";
                return acc;
            }, {} as Record<string, string>);
            if (campos) {
                setFormData(campos);
            }
        }
    }, [datosAmparo, tipoAmparo, camposAmparo]);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (tooltipRef.current && !tooltipRef.current.contains(event.target as Node)) {
                setOpenTooltips({});
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const campos = tipoAmparo ? camposAmparo[tipoAmparo].map(campo => campo.name) : [];
        const datosAmparo = campos.reduce((acc, campo) => {
            acc[campo] = formData[campo] ?? "";
            return acc;
        }, {} as Record<string, string>);

        datosAmparo.tipo_amparo = tipoAmparo ?? "";

        console.log("Datos enviados:", datosAmparo);
        setDatosAmparo(datosAmparo);

        try {
            await handleGenerarAmparo();
            router.push("/preview");
        } catch (error) {
            console.error("Error generando el amparo:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <TooltipProvider>
            <motion.div className="flex flex-col items-center justify-center bg-gradient-to-r from-purple-800 to-purple-600 min-h-screen pl-6 pr-6">
                <div className="w-full flex justify-start mt-5">
                    <Link href="/seleccion-metodo">
                        <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="px-6 py-3 bg-purple-500 rounded-xl text-lg font-semibold transition">
                            ⬅️ Regresar
                        </motion.button>
                    </Link>
                </div>
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
                    className="w-full max-w-4xl mx-auto p-8 bg-slate-50 rounded-xl shadow-xl mt-6 xl:mt-10 mb-10">
                    <motion.h2 initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}
                        className="text-2xl font-bold text-center mb-6 text-gray-800">
                        Formulario de {tipoAmparo}
                    </motion.h2>
                    <motion.form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 p-4 gap-6"
                        initial="hidden" animate="visible" variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.1 } } }}>
                        {tipoAmparo && camposAmparo[tipoAmparo]?.map((campo) => (
                            <motion.div key={campo.name} variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}>
                                <div className="flex items-center gap-2" ref={tooltipRef}>
                                    <label className="font-medium text-gray-700">
                                        {campo.label} {campo.required && <span className="text-red-500">*</span>}:
                                    </label>
                                    {campo.info && (
                                        <Tooltip open={openTooltips[campo.name] || false}>
                                            <TooltipTrigger asChild>
                                                <Info className="text-gray-500 cursor-pointer hover:text-gray-700"
                                                    size={18} onClick={() => setOpenTooltips(prev => ({ ...prev, [campo.name]: !prev[campo.name] }))} />
                                            </TooltipTrigger>
                                            <TooltipContent className="bg-gray-800 text-white text-sm rounded p-2">
                                                {campo.info}
                                            </TooltipContent>
                                        </Tooltip>
                                    )}
                                </div>
                                {["acto_reclamado", "fundamento_constitucional", "conceptos_violacion", "acto_omision", "hechos_antecedentes"].includes(campo.name) ? (
                                    <textarea name={campo.name} value={formData[campo.name] || ""} required={campo.required} onChange={handleChange}
                                        className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 text-gray-700 h-24 resize-none" />
                                ) : (
                                    <input type={campo.type || "text"} name={campo.name} value={formData[campo.name] || ""} required={campo.required} onChange={handleChange}
                                        className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 text-gray-700" />
                                )}
                            </motion.div>
                        ))}
                        <motion.div className="md:col-span-2">
                            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} type="submit" className="w-full bg-blue-600 text-white py-3 rounded-md mt-4">
                                {loading ? <div className="flex items-center justify-center gap-2"><Loader2 className="animate-spin" size={20} /> Procesando...</div> : "Generar Preview"}
                            </motion.button>
                        </motion.div>
                    </motion.form>
                </motion.div>
            </motion.div>
        </TooltipProvider>
    );
}
