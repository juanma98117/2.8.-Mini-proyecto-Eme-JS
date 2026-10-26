const _DEBUGMODE = true;

/**
 * @typedef {Object} Incidente
 * @property {number} id Identificador del incidente.
 * @property {string} descripcion Descripción del suceso.
 * @property {number} gravedad Nivel de gravedad (1 a 5).
 * @property {boolean} resuelta Estado de resolución del incidente.
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

/**
 * Calcula el nuevo total de recursos disponibles restando los consumidos por el incidente.
 *
 * @param {number} recursosActuales Cantidad de recursos disponibles en este momento.
 * @param {number} [recursosAsignados=1] Cantidad de recursos que se van a descontar (por defecto 1).
 * @returns {number} El número de recursos disponibles tras la operación.
 */
function calcularRecursos(recursosActuales, recursosAsignados = 1) {
    return recursosActuales - recursosAsignados;
}

/**
 * Marca un incidente como resuelto, calcula los nuevos recursos y registra el cambio en consola si el modo depuración está activo.
 *
 * @param {Incidente} incidente Objeto que representa la emergencia a procesar.
 * @param {number} recursosActuales Cantidad de recursos disponibles al momento de la asignación.
 * @returns {Incidente} El objeto incidente actualizado con `resuelta` igual a `true`.
 */
function procesarIncidente(incidente, recursosActuales) {
    if (recursos > 0) {
        if (incidente.gravedad === 5) {
            if (_DEBUGMODE) {
                console.log(`[ALERTA MÁXIMA] Incidente #${incidente.id}: ${incidente.descripcion}. Asignando recursos ... [RECURSOS DISPONIBLES ${recursos}].`);
            }
            recursos = calcularRecursos(recursos);
            incidente.resuelta = true;
        } else {
            switch (incidente.gravedad) {
                case 1:
                case 2:
                case 3:
                case 4:
                    if (_DEBUGMODE) {
                        console.log(`[INCIDENTE] Se asignan ${recursos} recursos a: ${incidente.descripcion} (Gravedad: ${incidente.gravedad}).`);
                    }
                    recursos = calcularRecursos(recursos);
                    incidente.resuelta = true;
                    break;
            }
        }
    }

    if (_DEBUGMODE) {
        console.log(`[PROCESADO] Incidente #${incidente.id}: ${incidente.descripcion}. Recursos tras asignación: ${recursos}.`);
    }

    return incidente;
}

for (let i = 0; i < loteIncidentes.length; i++) {
    debugger;

    if (loteIncidentes[i].resuelta) {
        continue;
    }

    // Solo procesamos si es gravedad 5
    if (loteIncidentes[i].gravedad === 5) {
        procesarIncidente(loteIncidentes[i], recursos);

        if (recursos === 0) {
            if (_DEBUGMODE) console.log("Sistema detenido: No quedan recursos.");
            break;
        }
    }
}


if (recursos > 0) {
    for (let i = 0; i < loteIncidentes.length; i++) {
        debugger;

        if (loteIncidentes[i].resuelta) {
            continue;
        }

        // Ya no procesamos los de 5 porque se hicieron en la Fase 1
        if (loteIncidentes[i].gravedad !== 5) {
            procesarIncidente(loteIncidentes[i], recursos);

            if (recursos === 0) {
                if (_DEBUGMODE) console.log("Sistema detenido: No quedan recursos.");
                break;
            }
        }
    }
}