"use client";

import { useState } from "react";
import useAmparoStore from "../store/useAmparoStore";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function Bienvenida() {
  const router = useRouter();
  const { setTipoAmparo } = useAmparoStore();
  const [seleccionado, setSeleccionado] = useState<string>("");

  const handleSeleccion = (tipo: string) => {
    setTipoAmparo(tipo);
    setSeleccionado(tipo);
    router.push("/seleccion-metodo")
  };

  const amparos = [
    {
      tipo: "Amparo Directo",
      descripcion:
        "Se presenta contra resoluciones definitivas de tribunales, como sentencias o laudos.",
      imagen: "/images/vista-previa.png",
      icon: "⚖️",
    },
    {
      tipo: "Amparo Indirecto",
      descripcion:
        "Se utiliza cuando un acto de autoridad viola derechos fundamentales de una persona.",
      imagen: "/images/seleccion-amparo.png",
      icon: "🏛️",
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-500 to-blue-700 p-10">
      <h1 className="text-4xl font-bold text-white mb-6">Generador de Amparos</h1>
      <p className="text-lg text-white mb-10">
        Selecciona el tipo de amparo que deseas generar:
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {amparos.map((amparo, index) => (
          <motion.div
            key={index}
            className={`bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center cursor-pointer hover:shadow-2xl hover:scale-105 hover:bg-slate-100 transition-all duration-400 
              ${seleccionado === "Amparo Directo" ? "bg-green-500" : "bg-gray-100 text-gray-900"}
            `}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            onClick={() => handleSeleccion(amparo.tipo)}
          >
            <p className="text-9xl mb-2">{amparo.icon}</p>
            <h2 className="text-xl font-semibold mb-2 flex items-center text-slate-500">
              <span className="mr-2">{amparo.icon}</span>
              {amparo.tipo}
            </h2>
            <p className="text-gray-600 text-center">{amparo.descripcion}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );

  // return (
  //   <div className="h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-900 to-blue-600 text-white p-5 text-center">
  //     <motion.h1 
  //       className="text-4xl font-bold mb-4"
  //       initial={{ opacity: 0, y: -20 }}
  //       animate={{ opacity: 1, y: 0 }}
  //       transition={{ duration: 0.5 }}
  //     >
  //       Generador de Amparos
  //     </motion.h1>

  //     <motion.p 
  //       className="text-lg text-gray-200 mb-8"
  //       initial={{ opacity: 0 }}
  //       animate={{ opacity: 1 }}
  //       transition={{ delay: 0.3, duration: 0.5 }}
  //     >
  //       Selecciona el tipo de amparo que deseas generar:
  //     </motion.p>

  //     <div className="flex flex-col md:flex-row w-full gap-6 justify-center items-center">
  //       <motion.button
  //         whileHover={{ scale: 1.05 }}
  //         whileTap={{ scale: 0.95 }}
  //         onClick={() => handleSeleccion("Amparo Directo")}
  //         className={`px-6 py-3 rounded-xl text-lg font-semibold w-[90%] md:w-auto transition ${
  //           seleccionado === "Amparo Directo" ? "bg-green-500" : "bg-gray-100 text-gray-900"
  //         }`}
  //       >
  //         ⚖️ Amparo Directo
  //       </motion.button>

  //       <motion.button
  //         whileHover={{ scale: 1.05 }}
  //         whileTap={{ scale: 0.95 }}
  //         onClick={() => handleSeleccion("Amparo Indirecto")}
  //         className={`px-6 py-3 rounded-xl text-lg font-semibold w-[90%] md:w-auto transition ${
  //           seleccionado === "Amparo Indirecto" ? "bg-green-500" : "bg-gray-100 text-gray-900"
  //         }`}
  //       >
  //         🏛️ Amparo Indirecto
  //       </motion.button>
  //     </div>
  //   </div>
  // );
}
