"use client";

import { useEffect } from "react";
import useAmparoStore from "../store/useAmparoStore";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import ProtectedRoute from "../components/ProtectedRoute";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";

export default function Dashboard() {
    const { user, fetchCurrentUser, user_amparos, verificarLimiteAmparos, url, setAmparoId, setDatosAmparo } = useAmparoStore();
    const router = useRouter();

    useEffect(() => {
        fetchCurrentUser();
        verificarLimiteAmparos();
    }, [fetchCurrentUser, verificarLimiteAmparos]);
    
    const handdleClick = (amparo: { id: number; datos_amparo: Record<string, unknown>; }) => {
        setAmparoId(amparo.id);
        setDatosAmparo(amparo.datos_amparo);
        router.push("/formulario-manual")
    }

    return (
        <ProtectedRoute>
            <div className="min-h-screen flex flex-col items-center justify-center p-8">
                {user ? (
                    <>
                        <h1 className="text-3xl font-bold mb-4">Bienvenido, {user.username}!</h1>
                        {/* <p className="text-gray-500 mb-4">Tu rol: {user.role}</p> */}

                        <h2 className="text-2xl font-semibold mb-4">Tus Amparos</h2>

                        {user_amparos.length > 0 ? (  // ✅ Validamos que `user_amparos` no esté vacío
                            <Table className="w-full max-w-4xl bg-white shadow-md rounded-lg overflow-hidden m-auto">
                                <TableHeader>
                                    <TableRow className="bg-gray-200">
                                        <TableHead>ID</TableHead>
                                        <TableHead>Nombre</TableHead>
                                        <TableHead>Tipo</TableHead>
                                        <TableHead>Creado</TableHead>
                                        <TableHead>Última Modificación</TableHead>
                                        <TableHead>Acciones</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {user_amparos.map((amparo) => (
                                        <TableRow key={amparo.id}>
                                            <TableCell>{amparo.id}</TableCell>
                                            <TableCell>{amparo.nombre_corto}</TableCell>
                                            <TableCell>{amparo.tipo_amparo}</TableCell>
                                            <TableCell>{new Date(amparo.fecha_creacion).toLocaleDateString()}</TableCell>
                                            <TableCell>{new Date(amparo.fecha_ultima_modificacion).toLocaleDateString()}</TableCell>
                                            <TableCell className="flex gap-2">
                                                <Button
                                                    size="sm"
                                                    disabled={!amparo.modificado_en_24h} // ❌ Bloquea si ya pasó el tiempo
                                                    onClick={() => handdleClick(amparo)}
                                                >
                                                    ✏️ Editar
                                                </Button>
                                                <Button
                                                    size="sm"
                                                    variant="outline"
                                                    onClick={() => window.open(`${url}/descargar-amparo/${amparo.nombre_amparo}`)}
                                                >
                                                    📥 Descargar
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        ) : (
                            <p className="text-gray-600">No tienes amparos generados aún.</p>  // ✅ Mensaje cuando no hay amparos
                        )}
                    </>
                ) : (
                    <p>Cargando...</p>
                )}
            </div>
        </ProtectedRoute>
    );
}
