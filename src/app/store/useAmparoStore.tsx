import { create } from "zustand";

// Definir los tipos para el store
interface CampoAmparo {
    name: string;
    label: string;
    required: boolean;
    type?: string;
    info?: string;
}

// Definir los tipos para el store
interface User {
    id: number;
    username: string;
    email: string;
    role: "user" | "admin";
}

interface AmparoStore {
    tipoAmparo: string | null;
    datosAmparo: Record<string, unknown>;
    camposAmparo: Record<string, CampoAmparo[]>;
    previewFilename?: string;
    url: string;
    user: User | null;
    token: string | null;
    setTipoAmparo: (tipo: string) => void;
    setDatosAmparo: (datos: Record<string, unknown>) => void;
    handleGenerarAmparo: () => Promise<void>;
    handleAmparoIa: (datos: Record<string, unknown>) => Promise<void>;
    setUrl: (url: string) => void;
    registerUser: (email: string, password: string, username: string) => Promise<boolean>;
    loginUser: (email: string, password: string) => Promise<boolean>;
    logoutUser: () => void;
    fetchCurrentUser: () => Promise<void>;
}

// Crear el store con los tipos definidos
const useAmparoStore = create<AmparoStore>((set, get) => ({
    tipoAmparo: null,
    previewFilename: undefined,
    datosAmparo: {},
    url: "http://localhost:8000",
    // url: "https://generador-amparos-backend.onrender.com",
    user: null,
    token: null,
    setUrl: (url) => set({ url }),
    camposAmparo: {
        "Amparo Directo": [
            { name: "autoridad", label: "Autoridad", required: true, info: "Tribunal Colegiado o Juez ante el que se presenta el amparo." },
            { name: "representante_legal", label: "Representante Legal", required: false, info: "Si tienes abogado, ingresa su nombre. Si lo presentas tú, déjalo en blanco." },
            { name: "nombre_quejoso", label: "Nombre del Quejoso", required: true, info: "Nombre completo de la persona que solicita el amparo." },
            { name: "domicilio_quejoso", label: "Domicilio del Quejoso", required: true, info: "Dirección donde se pueden recibir notificaciones relacionadas con el amparo." },
            { name: "licenciados", label: "Autorizados", required: true, info: "Nombres de los abogados o personas autorizadas para actuar en el procedimiento." },
            { name: "cedulas", label: "Cédulas Profesionales", required: true, info: "Número de cédula profesional de los abogados autorizados." },
            { name: "nombre_tercero", label: "Nombre del Tercero Interesado", required: true, info: "Nombre de la persona que tiene interés en el juicio." },
            { name: "domicilio_tercero", label: "Domicilio del Tercero Interesado", required: true, info: "Dirección de la persona interesada en el juicio." },
            { name: "autoridad_responsable", label: "Autoridad Responsable", required: true, info: "Juez o tribunal que dictó la sentencia impugnada." },
            { name: "otras_autoridades", label: "Otras Autoridades", required: false, info: "Otras instituciones involucradas en la resolución del caso." },
            { name: "acto_reclamado", label: "Acto Reclamado", required: true, info: "La sentencia o acto que se impugna mediante el amparo." },
            { name: "expediente", label: "Expediente", required: true, info: "Número de expediente del caso en el que se dicta la sentencia." },
            { name: "fecha_notificacion", label: "Fecha de Notificación", required: true, type: "date", info: "Fecha en que el quejoso fue notificado de la resolución impugnada." },
            { name: "derechos_violados", label: "Derechos Humanos Violados", required: true, info: "Derechos fundamentales que consideras fueron afectados por la resolución." },
            { name: "tratados_internacionales", label: "Tratados Internacionales", required: false, info: "Convenios internacionales que podrían respaldar tu caso." },
            { name: "conceptos_violacion", label: "Conceptos de Violación", required: true, info: "Explicación legal de por qué el acto reclamado es inconstitucional." },
        ],
        "Amparo Indirecto": [
            { name: "autoridad", label: "Autoridad", required: true, info: "Tribunal o autoridad que emitió el acto impugnado." },
            { name: "representante_legal", label: "Representante Legal", required: false, info: "Si tienes abogado, ingresa su nombre. Si lo presentas tú, déjalo en blanco." },
            { name: "nombre_quejoso", label: "Nombre del Quejoso", required: true, info: "Nombre completo de la persona que solicita el amparo." },
            { name: "domicilio_quejoso", label: "Domicilio del Quejoso", required: true, info: "Dirección donde se pueden recibir notificaciones relacionadas con el amparo." },
            { name: "licenciados", label: "Autorizados", required: true, info: "Nombres de los abogados o personas autorizadas para actuar en el procedimiento." },
            { name: "cedulas", label: "Cédulas Profesionales", required: true, info: "Número de cédula profesional de los abogados autorizados." },
            { name: "nombre_tercero", label: "Nombre del Tercero Interesado", required: false, info: "Nombre de la persona que tiene interés en el juicio." },
            { name: "domicilio_tercero", label: "Domicilio del Tercero Interesado", required: true, info: "Dirección de la persona interesada en el juicio." },
            { name: "autoridad_responsable", label: "Autoridad Responsable", required: true, info: "Juez, tribunal o autoridad administrativa que emitió el acto reclamado." },
            { name: "otras_autoridades", label: "Otras Autoridades", required: false, info: "Otras instituciones involucradas en la emisión del acto reclamado." },
            { name: "norma_general_impugnada", label: "Norma General Impugnada", required: false, info: "Ley o reglamento que se considera inconstitucional y afecta tus derechos." },
            { name: "acto_omision", label: "Acto u Omisión Reclamado", required: true, info: "Acción u omisión de la autoridad que causa la afectación de tus derechos." },
            { name: "hechos_antecedentes", label: "Hechos o Antecedentes del Acto Reclamado", required: true, info: "Descripción de los antecedentes que motivan el amparo." },
            { name: "derechos_violados", label: "Derechos Humanos Violados", required: true, info: "Derechos fundamentales que consideras fueron afectados por el acto reclamado." },
            { name: "tratados_internacionales", label: "Tratados Internacionales", required: false, info: "Convenios internacionales que podrían respaldar tu caso." },
            { name: "fundamento_constitucional", label: "Fundamento Constitucional", required: false, info: "Artículo de la Constitución que consideras vulnerado." },
            { name: "conceptos_violacion", label: "Conceptos de Violación", required: true, info: "Explicación legal de por qué el acto reclamado es inconstitucional." },
        ],
    },
    setTipoAmparo: (tipo) => set({ tipoAmparo: tipo }),
    setDatosAmparo: (datos) => set({ datosAmparo: datos }),
    handleGenerarAmparo: async () => {
        const datosAmparo = get().datosAmparo;
        console.log(datosAmparo);

        try {
            const response = await fetch(`${get().url}/generar-amparo`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(datosAmparo),
            });

            if (response.ok) {
                console.log("Amparo generado correctamente");
                const data = await response.json();
                set({ previewFilename: data.filename }); // Guardamos el nombre del archivo
                console.log("Nombre del archivo:", data.filename);
            } else {
                console.error("Error en la respuesta del servidor");
            }
        } catch (error) {
            console.error("Error al generar el amparo", error);
        }
    },
    handleAmparoIa: async (datos: Record<string, unknown>) => {

        try {
            const response = await fetch(`${get().url}/ia/analizar-texto/`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(datos),
            });

            if (response.ok) {
                console.log("Amparo generado correctamente");
                const data = await response.json();
                // Verificar si "data.datos_amparo" es una cadena en lugar de un objeto JSON
                let datosAmparo;
                if (typeof data.datos_amparo === "string") {
                    try {
                        datosAmparo = JSON.parse(data.datos_amparo); // Convertir a JSON
                    } catch (error) {
                        console.error("Error al parsear JSON de la IA", error);
                        return;
                    }
                } else {
                    datosAmparo = data.datos_amparo;
                }

                set({ datosAmparo }); // Guardar el JSON en Zustand
                console.log(datosAmparo);

                get().handleGenerarAmparo();
            } else {
                console.error("Error en la respuesta del servidor");
            }
        } catch (error) {
            console.error("Error al generar el amparo", error);
        }
    },
    // 📌 Registrar usuario
    registerUser: async (email, password, username) => {
        try {
            const response = await fetch(`${get().url}/auth/register`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, email, password }),
            });

            if (response.ok) {
                console.log("Registro exitoso");
                return true;
            } else {
                console.error("Error en el registro");
                return false;
            }
        } catch (error) {
            console.error("Error al registrar", error);
            return false;
        }
    },

    // 📌 Iniciar sesión
    loginUser: async (email, password) => {
        try {
            const response = await fetch(`${get().url}/auth/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
                credentials: "include", // 🔥 Importante para enviar cookies
            });

            if (response.ok) {
                await get().fetchCurrentUser(); // 🔥 Verifica la sesión después del login
                return true;
            } else {
                console.error("Error al iniciar sesión");
                return false;
            }
        } catch (error) {
            console.error("Error en la autenticación", error);
            return false;
        }
    },

    // 📌 Obtener usuario actual
    fetchCurrentUser: async () => {
        // const token = document.cookie.split("; ").find(row => row.startsWith("token="))?.split("=")[1];
        // console.log("Token actual:", token);
        // if (!token) return;

        try {
            const response = await fetch(`${get().url}/auth/me`, {
                method: "GET",
                credentials: "include", // 🔥 Importante para enviar cookies
            });

            if (response.ok) {
                const user = await response.json();
                set({ user });
            } else {
                console.error("No se pudo obtener el usuario");
                set({ user: null });
            }
        } catch (error) {
            console.error("Error al obtener usuario", error);
            set({ user: null });
        }
    },

    // 📌 Cerrar sesión
    logoutUser: async() => {
        try {
            await fetch(`${get().url}/auth/logout`, {
                method: "POST",
                credentials: "include",
            });
    
            set({ user: null });
        } catch (error) {
            console.error("Error al cerrar sesión", error);
        }
    },
}));

export default useAmparoStore;

