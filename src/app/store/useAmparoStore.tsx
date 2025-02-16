import { create } from "zustand";

// Definir los tipos para el store
interface CampoAmparo {
    name: string;
    label: string;
    required: boolean;
    type?: string;
}

interface AmparoStore {
    tipoAmparo: string | null;
    datosAmparo: Record<string, unknown>;
    camposAmparo: Record<string, CampoAmparo[]>;
    previewFilename?: string;
    setTipoAmparo: (tipo: string) => void;
    setDatosAmparo: (datos: Record<string, unknown>) => void;
    handleGenerarAmparo: () => Promise<void>;
    handleAmparoIa: (datos: Record<string, unknown>) => Promise<void>;
}

// Crear el store con los tipos definidos
const useAmparoStore = create<AmparoStore>((set,get) => ({
    tipoAmparo: null,
    previewFilename: undefined,
    datosAmparo: {},
    camposAmparo: {
        "Amparo Directo": [
            { name: "autoridad", label: "Autoridad", required: true },
            { name: "representante_legal", label: "Representante Legal", required: false },
            { name: "nombre_quejoso", label: "Nombre del Quejoso", required: true },
            { name: "domicilio_quejoso", label: "Domicilio del Quejoso", required: true },
            { name: "licenciados", label: "Licenciados", required: true },
            { name: "cedulas", label: "Cédulas Profesionales", required: true },
            { name: "nombre_tercero", label: "Nombre del Tercero Interesado", required: true },
            { name: "domicilio_tercero", label: "Domicilio del Tercero Interesado", required: true },
            { name: "autoridad_responsable", label: "Autoridad Responsable", required: true },
            { name: "otras_autoridades", label: "Otras Autoridades", required: false },
            { name: "acto_reclamado", label: "Acto Reclamado", required: true },
            { name: "expediente", label: "Expediente", required: true },
            { name: "fecha_notificacion", label: "Fecha de Notificación", required: true, type: "date" },
            { name: "derechos_violados", label: "Derechos Humanos Violados", required: true },
            { name: "tratados_internacionales", label: "Tratados Internacionales", required: false },
            { name: "conceptos_violacion", label: "Conceptos de Violación", required: true },
        ],
        "Amparo Indirecto": [
            { name: "autoridad", label: "Autoridad", required: true },
            { name: "representante_legal", label: "Representante Legal", required: false },
            { name: "nombre_quejoso", label: "Nombre del Quejoso", required: true },
            { name: "domicilio_quejoso", label: "Domicilio del Quejoso", required: true },
            { name: "licenciados", label: "licenciados", required: true },
            { name: "cedulas", label: "Cédulas Profesionales", required: true },
            { name: "nombre_tercero", label: "Nombre del Tercero Interesado", required: false },
            { name: "domicilio_tercero", label: "Domicilio del Tercero Interesado", required: true },
            { name: "autoridad_responsable", label: "Autoridad Responsable", required: true },
            { name: "otras_autoridades", label: "Otras Autoridades", required: false },
            { name: "norma_general_impugnada", label: "Norma General Impugnada", required: false },
            { name: "acto_omision", label: "Acto u Omisión Reclamado", required: true },
            { name: "hechos_antecedentes", label: "Hechos o Antecedentes del Acto Reclamado", required: true },
            { name: "derechos_violados", label: "Derechos Humanos Violados", required: true },
            { name: "tratados_internacionales", label: "Tratados Internacionales", required: false },
            { name: "fundamento_constitucional", label: "Fundamento Constitucional", required: false },
            { name: "conceptos_violacion", label: "Conceptos de Violación", required: true },
        ],
    },
    setTipoAmparo: (tipo) => set({ tipoAmparo: tipo }),
    setDatosAmparo: (datos) => set({ datosAmparo: datos }),
    handleGenerarAmparo: async () => {
        const datosAmparo = get().datosAmparo;
        console.log(datosAmparo);

        try {
            const response = await fetch("http://localhost:8000/generar-amparo/", {
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
            const response = await fetch("http://localhost:8000/ia/analizar-texto/", {
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
}));

export default useAmparoStore;

