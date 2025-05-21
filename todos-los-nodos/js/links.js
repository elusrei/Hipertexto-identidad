// Función para crear enlaces entre nodos
function createLinks() {
    // Crear enlaces entre nodos de la misma ruta sensorial
    for (let i = 0; i < nodes.length; i++) {
        if (nodes[i].nodeType === "sensory") {
            const pathId = nodes[i].pathId;
            
            // Buscar otros nodos de la misma ruta sensorial
            for (let j = i + 1; j < nodes.length; j++) {
                if (nodes[j].nodeType === "sensory" && nodes[j].pathId === pathId) {
                    // Calcular distancia entre nodos
                    const dist = distance2D(
                        nodes[i].x, nodes[i].y,
                        nodes[j].x, nodes[j].y
                    );
                    
                    // Conectar solo nodos cercanos con cierta probabilidad
                    const maxDist = min(width, height) * 0.8;
                    if (dist < maxDist && random() < (1 - dist/maxDist) * 0.4) {
                        // Crear enlace con el color de la ruta
                        links.push({
                            source: i,
                            target: j,
                            pathId: pathId,
                            points: generateIntermediatePoints2D(
                                nodes[i].x, nodes[i].y,
                                nodes[j].x, nodes[j].y,
                                floor(random(1, 4))
                            ),
                            velocities: Array(floor(random(1, 4))).fill().map(() => ({
                                x: random(-0.1, 0.1),
                                y: random(-0.1, 0.1)
                            })),
                            color: nodes[i].color,
                            opacity: random(0.5, 0.8),
                            pulseRate: random(0.001, 0.005),
                            pulseAmount: random(0.1, 0.3)
                        });
                    }
                }
            }
        }
    }
    
    // Crear algunos enlaces entre nodos neutros
    for (let i = 0; i < nodes.length; i++) {
        if (nodes[i].nodeType === "neutral") {
            // Buscar otros nodos neutros cercanos
            for (let j = i + 1; j < nodes.length; j++) {
                if (nodes[j].nodeType === "neutral") {
                    // Calcular distancia entre nodos
                    const dist = distance2D(
                        nodes[i].x, nodes[i].y,
                        nodes[j].x, nodes[j].y
                    );
                    
                    // Conectar solo nodos cercanos con baja probabilidad
                    const maxDist = min(width, height) * 0.5;
                    if (dist < maxDist && random() < 0.08) {
                        links.push({
                            source: i,
                            target: j,
                            pathId: "neutral",
                            points: generateIntermediatePoints2D(
                                nodes[i].x, nodes[i].y,
                                nodes[j].x, nodes[j].y,
                                floor(random(1, 2))
                            ),
                            velocities: Array(floor(random(1, 2))).fill().map(() => ({
                                x: random(-0.05, 0.05),
                                y: random(-0.05, 0.05)
                            })),
                            color: color(150, 150, 150, 100),
                            opacity: random(0.2, 0.4),
                            pulseRate: random(0.001, 0.002),
                            pulseAmount: random(0.05, 0.1)
                        });
                    }
                }
            }
        }
    }
    
    // Crear algunos enlaces entre nodos temáticos y neutros
    for (let i = 0; i < nodes.length; i++) {
        if (nodes[i].nodeType === "sensory") {
            // Buscar nodos neutros cercanos
            for (let j = 0; j < nodes.length; j++) {
                if (nodes[j].nodeType === "neutral") {
                    // Calcular distancia entre nodos
                    const dist = distance2D(
                        nodes[i].x, nodes[i].y,
                        nodes[j].x, nodes[j].y
                    );
                    
                    // Conectar solo nodos cercanos con baja probabilidad
                    const maxDist = min(width, height) * 0.6;
                    if (dist < maxDist\
