/**
 * @typedef {Object} Incidente
 * @property {number} id - Identificador del incidente.
 * @property {string} descripcion - Descripción del suceso.
 * @property {number} gravedad - Nivel de gravedad del 1 al 5 (alerta máxima).
 * @property {boolean} resuelta - Estado de resolución del incidente.
 */

/**
 * Procesa un incidente individual asignándole los recursos disponibles si cumple los criterios.
 *
 * @param {Incidente} incidente - El objeto incidente a evaluar.
 * @param {number} recursosDisponibles - Cantidad actual de recursos disponibles en el sistema.
 * @returns {{ exito: boolean, recursosRestantes: number }} Objeto con el resultado de la asignación y los recursos tras la operación.
 */
function procesarIncidente(incidente, recursosDisponibles) {
    if (recursosDisponibles <= 0 || incidente.resuelta) {
        return { exito: false, recursosRestantes: recursosDisponibles };
    }

    if (window._DEBUGMODE) {
        console.log(`[ASIGNACIÓN] Incidente #${incidente.id}: ${incidente.descripcion}. Recursos previos: ${recursosDisponibles}`);
    }

    incidente.resuelta = true;
    const recursosRestantes = recursosDisponibles - 1;

    return { exito: true, recursosRestantes };
}

/**
 * Ejecuta la asignación priorizada de recursos en dos fases:
 * 1. Atiende primero incidentes con gravedad máxima (5).
 * 2. Atiende incidentes restantes (gravedad 1 a 4) si aún quedan recursos.
 *
 * @param {Incidente[]} listaIncidentes - Array con el lote completo de incidentes a procesar.
 * @param {number} recursosIniciales - Número de recursos totales de los que dispone el sistema.
 * @returns {number} Número de recursos restantes tras finalizar la asignación.
 */
function gestionarLoteIncidentes(listaIncidentes, recursosIniciales) {
    let recursos = recursosIniciales;

    // FASE 1: Prioridad Alerta Máxima (Gravedad 5)
    for (let i = 0; i < listaIncidentes.length; i++) {
        // Punto de interrupción estratégico para depuración
        debugger;

        if (!listaIncidentes[i].resuelta && listaIncidentes[i].gravedad === 5) {
            const resultado = procesarIncidente(listaIncidentes[i], recursos);
            recursos = resultado.recursosRestantes;

            if (recursos === 0) break;
        }
    }

    // FASE 2: Incidentes de gravedad menor (1 a 4)
    if (recursos > 0) {
        for (let i = 0; i < listaIncidentes.length; i++) {
            // Punto de interrupción estratégico para depuración
            debugger;

            if (!listaIncidentes[i].resuelta && listaIncidentes[i].gravedad < 5) {
                const resultado = procesarIncidente(listaIncidentes[i], recursos);
                recursos = resultado.recursosRestantes;

                if (recursos === 0) break;
            }
        }
    }

    return recursos;
}