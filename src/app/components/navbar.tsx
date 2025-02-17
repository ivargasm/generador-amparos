"use client";

import { useState } from "react";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Menu, X, Home, FilePlus, Folder } from "lucide-react";
import Link from "next/link";

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <nav className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
            <div className="max-w-4xl mx-auto px-6 py-4 flex justify-between items-center">
                <Link href="/" className="text-xl font-bold text-slate-700">
                    📜 Generador de Amparos
                </Link>

                {/* Botón de menú en móviles */}
                <button
                    className="md:hidden text-slate-700"
                    onClick={() => setMenuOpen(!menuOpen)}
                >
                    {menuOpen ? <X size={28} /> : <Menu size={28} />}
                </button>

                {/* Menú principal */}
                <ul className="hidden md:flex space-x-6 text-slate-700">
                    <li>
                        <Link href="/" className="flex items-center gap-2 hover:text-blue-600">
                            <Home size={20} /> Inicio
                        </Link>
                    </li>
                    <li>
                        <Link href="/seleccion-amparo" className="flex items-center gap-2 hover:text-blue-600">
                            <FilePlus size={20} /> Nuevo Amparo
                        </Link>
                    </li>
                    {/* <li>
                        <Link href="/mis-amparos" className="flex items-center gap-2 hover:text-blue-600">
                            <Folder size={20} /> Mis Amparos
                        </Link>
                    </li> */}
                </ul>
            </div>

            {/* Menú desplegable en móviles */}
            {menuOpen && (
                <div className="md:hidden bg-white shadow-lg">
                    <ul className="flex flex-col items-center space-y-4 py-4">
                        <li>
                            <Link href="/" className="flex items-center gap-2 text-slate-700 hover:text-blue-600" onClick={() => setMenuOpen(false)}>
                                <Home size={20} /> Inicio
                            </Link>
                        </li>
                        <li>
                            <Link href="/seleccion-amparo" className="flex items-center gap-2 text-slate-700 hover:text-blue-600" onClick={() => setMenuOpen(false)}>
                                <FilePlus size={20} /> Nuevo Amparo
                            </Link>
                        </li>
                        {/* <li>
                            <Link href="/mis-amparos" className="flex items-center gap-2 text-slate-700 hover:text-blue-600" onClick={() => setMenuOpen(false)}>
                                <Folder size={20} /> Mis Amparos
                            </Link>
                        </li> */}
                    </ul>
                </div>
            )}
        </nav>
    );
}
