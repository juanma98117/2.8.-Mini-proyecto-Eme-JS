const loteIncidentes = [
    { id: 101, descripcion: "Gato atrapado en un árbol", gravedad: 1, resuelta: false },
    { id: 102, descripcion: "Falsa alarma de humo en local", gravedad: 2, resuelta: true },
    { id: 103, descripcion: "Incendio estructural en bloque de viviendas", gravedad: 5, resuelta: false },
    { id: 104, descripcion: "Contenedor ardiendo en la vía pública", gravedad: 3, resuelta: false },
    { id: 105, descripcion: "Inundación leve de un sótano", gravedad: 2, resuelta: true },
    { id: 106, descripcion: "Accidente de tráfico múltiple en la A-4", gravedad: 5, resuelta: false },
    { id: 107, descripcion: "Rescate en ascensor bloqueado", gravedad: 2, resuelta: false }
];
let recursos=4;


for(let i=0;i<loteIncidentes.length;i++){

    if(loteIncidentes[i].resuelta){
        continue;
    }else{
        switch(loteIncidentes[i].gravedad){
            case 1:
                console.log("Se asignan" + recursos + " recursos a: " + loteIncidentes[i].descripcion);
                break;
            case 2:
                console.log("Se asigna" + recursos + " recurso a: " + loteIncidentes[i].descripcion);  
                break;
            case 3:
                console.log("Se asigna" + recursos + " recursos a: " + loteIncidentes[i].descripcion);
                break;
            case 4:
                console.log("Se asigna" + recursos + " recursos a: " + loteIncidentes[i].descripcion);
                break;
            case 5:
                console.log("MÁXIMA PRIORIDAD:" + loteIncidentes[i].descripcion + ". Se asignan " + recursos + " recursos.");
                break;
        }
    }

    if(recursos===0){
        console.log("No hay recursos disponibles para asignar.");
    }
}
