"use client";

import useAmparoStore from "../store/useAmparoStore";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Bienvenida() {
  const router = useRouter();
  const { setTipoAmparo, verificarLimiteAmparos, amparosGenerados } = useAmparoStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      await verificarLimiteAmparos();
      setLoading(false);
    };
    fetchData();
  }, [verificarLimiteAmparos]);

  const handleSeleccion = (tipo: string) => {
    if (amparosGenerados !== null && amparosGenerados >= 2) {
      alert("Has alcanzado el límite de amparos gratuitos. Adquiere una suscripción o paga por amparo.");
      return;
    }
    setTipoAmparo(tipo);
    router.push("/seleccion-metodo");
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
    <div className="flex flex-col items-center justify-center min-h-svh bg-gradient-to-br from-blue-500 to-blue-700 p-10">
      <h1 className="text-4xl font-bold text-white mb-6">Generador de Amparos</h1>
      <p className="text-lg text-white mb-10">
        Selecciona el tipo de amparo que deseas generar:
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:max-w-[80%] lg:max-w-[60%]">
        {loading ? (
          <p className="text-white">Cargando...</p>
        ) : (
          amparos.map((amparo, index) => (
            <motion.div
              key={index}
              className={`bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center cursor-pointer hover:shadow-2xl hover:scale-105 hover:bg-slate-100 transition-all duration-400 ${amparosGenerados !== null && amparosGenerados >= 2
                  ? "opacity-50 cursor-not-allowed"
                  : ""
                }`}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              onClick={() => handleSeleccion(amparo.tipo)}
            >
              <p className="text-9xl mb-4">{amparo.icon}</p>
              <h2 className="text-xl font-semibold mb-2 flex items-center text-slate-500">
                <span className="mr-2">{amparo.icon}</span>
                {amparo.tipo}
              </h2>
              <p className="text-gray-600 text-center">{amparo.descripcion}</p>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );

}
