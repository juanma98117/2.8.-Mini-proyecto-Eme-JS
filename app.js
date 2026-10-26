window._DEBUGMODE = true;

/**
 * @typedef {Object} Incidente
 * @property {number} id - Identificador único del incidente.
 * @property {string} descripcion - Descripción breve del suceso.
 * @property {number} gravedad - Nivel de gravedad (1 a 5).
 * @property {boolean} resuelta - Estado de resolución del incidente.
 */

/** @type {Incidente[]} */
const loteIncidentes = [
    { id: 101, descripcion: "Gato atrapado en un árbol", gravedad: 1, resuelta: false },
    { id: 102, descripcion: "Falsa alarma de humo en local", gravedad: 2, resuelta: true },
    { id: 103, descripcion: "Incendio estructural en bloque de viviendas", gravedad: 5, resuelta: false },
    { id: 104, descripcion: "Contenedor ardiendo en la vía pública", gravedad: 3, resuelta: false },
    { id: 105, descripcion: "Inundación leve de un sótano", gravedad: 2, resuelta: true },
    { id: 106, descripcion: "Accidente de tráfico múltiple en la A-4", gravedad: 5, resuelta: false },
    { id: 107, descripcion: "Rescate en ascensor bloqueado", gravedad: 2, resuelta: false }
];

/** @type {number} */
let recursos = 4;

// FASE 1: Prioridad máxima (Gravedad 5)
for (let i = 0; i < loteIncidentes.length; i++) {
    debugger; // Punto de interrupción condicional para DevTools

    if (loteIncidentes[i].resuelta) {
        continue;
    }

    if (loteIncidentes[i].gravedad === 5) {
        if (window._DEBUGMODE) {
            console.log(`[ALERTA MÁXIMA] Incidente #${loteIncidentes[i].id}: ${loteIncidentes[i].descripcion}. Se asignan ${recursos} recursos.`);
        }

        recursos--;
        loteIncidentes[i].resuelta = true;
        if (recursos === 0) {
            if (window._DEBUGMODE) {
                console.log("No hay recursos disponibles para asignar.");
            }
            break;
        }
    }
}

// FASE 2: Resto de incidentes
if (recursos > 0) {
    for (let i = 0; i < loteIncidentes.length; i++) {
        debugger; // Punto de interrupción condicional para DevTools

        if (loteIncidentes[i].resuelta) {
            continue;
        }

        switch (loteIncidentes[i].gravedad) {
            case 1:
            case 2:
            case 3:
            case 4:
                if (window._DEBUGMODE) {
                    console.log(`[INCIDENTE] Se asignan ${recursos} recursos a: ${loteIncidentes[i].descripcion} (Gravedad: ${loteIncidentes[i].gravedad}).`);
                }
                recursos--;
                loteIncidentes[i].resuelta = true;
                break;
        }

        if (recursos === 0) {
            if (window._DEBUGMODE) {
                console.log("No hay recursos disponibles para asignar.");
            }
            break;
        }
    }
}