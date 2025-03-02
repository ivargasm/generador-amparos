import { redirect } from "next/navigation";
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

interface UserAmparos {
    id: number;
    user_id: number;
    fecha_creacion: string;
    fecha_ultima_modificacion: string;
    tipo_amparo: string;
    modificado_en_24h: boolean;
    nombre_amparo: string;
    nombre_corto: string;
    datos_amparo: Record<string, unknown>;
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
    amparosGenerados: number | null;
    verificarLimiteAmparos: () => Promise<void>;
    amparoId: number | null;  // 🔥 Nuevo campo para guardar el ID del amparo
    setAmparoId: (id: number) => void;
    isAuthenticated: boolean;
    verificarSesion: () => Promise<void>;
    user_amparos: UserAmparos[];  // ⬅️ Cambiado a un array normal
    set_user_amparos: (amparos: UserAmparos[]) => void;
    amparosDisponibles: number | null;
    comprarAmparo: () => Promise<void>;
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
    amparosGenerados: null,
    amparoId: null,
    isAuthenticated: false,
    user_amparos: [],  // Inicializamos como un array vacío
    amparosDisponibles: null,
    set_user_amparos: (amparos) => set({ user_amparos: amparos }),
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
                credentials: "include",
            });

            if (response.ok) {
                console.log("Amparo generado correctamente");
                const data = await response.json();
                set({ previewFilename: data.filename, amparoId: data.amparo_id }); // Guardamos el nombre del archivo
                console.log("Nombre del archivo:", data.filename);
            } else if (response.status === 403) {
                alert("Has alcanzado el límite de amparos gratuitos. Compra una suscripción o paga por amparo.")
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
                credentials: "include",
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
                set({ user, isAuthenticated: true });
            } else {
                console.error("No se pudo obtener el usuario");
                set({ user: null, isAuthenticated: false, token: null, amparoId: null });
            }
        } catch (error) {
            console.error("Error al obtener usuario", error);
            set({ user: null, isAuthenticated: false });
        }
    },

    // 📌 Cerrar sesión
    logoutUser: async() => {
        try {
            await fetch(`${get().url}/auth/logout`, {
                method: "POST",
                credentials: "include",
            });
    
            set({ user: null, isAuthenticated: false, token: null, amparoId: null });
            redirect("/login");
        } catch (error) {
            console.error("Error al cerrar sesión", error);
        }
    },

    setAmparoId: (id) => set({ amparoId: id }),

    // 📌 Verifica si el usuario ha alcanzado su límite de amparos gratuitos
    verificarLimiteAmparos: async () => {
        // verificar sesion activa

        await get().verificarSesion();
        if (!get().isAuthenticated) {
            return redirect("/login");
        }


        try {
            const response = await fetch(`${get().url}/amparos/mis-amparos`, {
                method: "GET",
                credentials: "include",
            });

            if (response.ok) {
                const data = await response.json();
                set({ amparosGenerados: data.total_amparos, user_amparos: data.amparos, amparosDisponibles: data.amparos_disponibles });
            } else {
                console.error("Error al obtener la cantidad de amparos generados");
            }
        } catch (error) {
            console.error("Error en la verificación de amparos", error);
        }
    },

    // 📌 Verifica si el usuario tiene sesión activa
    verificarSesion: async () => {
        try {
            const response = await fetch(`${get().url}/auth/me`, {
                method: "GET",
                credentials: "include",
            });

            if (response.ok) {
                const user = await response.json();
                set({ user, isAuthenticated: true });
            } else {
                console.warn("Sesión expirada o no iniciada");
                set({ user: null, isAuthenticated: false, token: null, amparoId: null });
                redirect("/login"); // 🔥 Redirigir al login si no hay sesión
            }
        } catch (error) {
            console.error("Error al verificar sesión", error);
            set({ user: null, isAuthenticated: false });
            redirect("/login"); // 🔥 Redirigir al login si hay error
        }
    },

    // 📌 Nueva función para pagar por un amparo
    comprarAmparo: async () => {
        try {
            const response = await fetch(`${get().url}/payments/create-payment-link`, {
                method: "POST",
                credentials: "include",  // Enviar cookies
            });

            if (response.ok) {
                const data = await response.json()
                console.log(data)
                window.location.href = data.url;  // Redirigir a Stripe
            } else {
                console.error("Error al generar el enlace de pago");
            }
        } catch (error) {
            console.error("Error en la compra del amparo", error);
        }
    },

}));

export default useAmparoStore;

