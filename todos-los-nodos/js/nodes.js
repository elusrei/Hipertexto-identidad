// Declaración de variables globales
const textureImages = {}
let thematicAreas
let width
let height
let sensoryPaths // Declare sensoryPaths
let NODES_PER_PATH // Declare NODES_PER_PATH
let color // Declare color
let pow // Declare pow
let random // Declare random
let min // Declare min
let TWO_PI // Declare TWO_PI
let cos // Declare cos
let sin // Declare sin
let map // Declare map

// Función para crear texturas
function createTextures() {
  // Crear imágenes para texturas
  // Arañas - Rojo
  textureImages.muchas_lineas = createTextureImage("muchas_lineas", "#FF0000")
  textureImages.lineas_entrecruzadas = createTextureImage("lineas_entrecruzadas", "#FF3333")
  textureImages.tela_araña = createTextureImage("tela_araña", "#FF6666")

  // Arañas - Verde
  textureImages.lineas_que_se_acercan = createTextureImage("lineas_que_se_acercan", "#00FF00")
  textureImages.estructuras_3d = createTextureImage("estructuras_3d", "#33FF33")
  textureImages.entramados = createTextureImage("entramados", "#66FF66")

  // Arañas - Azul
  textureImages.menos_lineas = createTextureImage("menos_lineas", "#0000FF")
  textureImages.rotas = createTextureImage("rotas", "#3333FF")
  textureImages.endebles = createTextureImage("endebles", "#6666FF")

  // Feliz - Rojo
  textureImages.granulado = createTextureImage("granulado", "#FF9999")
  textureImages.vibrante = createTextureImage("vibrante", "#FF6666")
  textureImages.texturado = createTextureImage("texturado", "#FF3333")

  // Feliz - Verde
  textureImages.mojado = createTextureImage("mojado", "#99FF99")
  textureImages.brillante = createTextureImage("brillante", "#66FF66")
  textureImages.fluido = createTextureImage("fluido", "#33FF33")

  // Feliz - Azul
  textureImages.amarillo = createTextureImage("amarillo", "#FFFF00")
  textureImages.dorado = createTextureImage("dorado", "#FFD700")
  textureImages.luminoso = createTextureImage("luminoso", "#FFFFCC")

  // Triste - Rojo
  textureImages.liso_y_frio = createTextureImage("liso_frio", "#CC9999")
  textureImages.plano = createTextureImage("plano", "#BB7777")
  textureImages.simple = createTextureImage("simple", "#AA5555")

  // Triste - Verde
  textureImages.humeda = createTextureImage("humeda", "#99CC99")
  textureImages.fría = createTextureImage("fria", "#77BB77")
  textureImages.brumosa = createTextureImage("brumosa", "#55AA55")

  // Triste - Azul
  textureImages.pegajosa = createTextureImage("pegajosa", "#9999CC")
  textureImages.viscosa = createTextureImage("viscosa", "#7777BB")
  textureImages.densa = createTextureImage("densa", "#5555AA")
}

// Función para inicializar nodos
function initializeNodes() {
  // Definir áreas temáticas con colores
  thematicAreas = [
    {
      name: "Arañas",
      id: "aranias",
      center: { x: width * 4 * 0.15, y: height * 4 * 0.15 }, // Moved further to corner
      color: color(255, 100, 100), // Rojo
    },
    {
      name: "Feliz/Motivación",
      id: "feliz",
      center: { x: width * 4 * 0.85, y: height * 4 * 0.15 }, // Moved further to corner
      color: color(100, 255, 100), // Verde
    },
    {
      name: "Triste",
      id: "triste",
      center: { x: width * 4 * 0.5, y: height * 4 * 0.85 }, // Moved further down
      color: color(100, 100, 255), // Azul
    },
  ]

  // Crear nodos para cada ruta sensorial
  for (let areaIndex = 0; areaIndex < thematicAreas.length; areaIndex++) {
    const area = thematicAreas[areaIndex]
    const mainNodeId = area.id
    const paths = sensoryPaths[mainNodeId]

    // Para cada ruta sensorial de este nodo principal
    for (const path of paths) {
      // Crear nodos para esta ruta sensorial
      for (let i = 0; i < NODES_PER_PATH; i++) {
        // Calcular distancia desde el centro del área (más nodos cerca del centro)
        // Usar distribución exponencial para concentrar nodos cerca del centro
        const distanceFactor = pow(random(), 1.5) // Exponencial para concentrar cerca del centro
        const maxDistance = min(width, height) * 2.0
        const distance = distanceFactor * maxDistance

        // Posición aleatoria en círculo alrededor del centro del área
        const angle = random(TWO_PI)
        const x = area.center.x + cos(angle) * distance
        const y = area.center.y + sin(angle) * distance

        // Calcular intensidad de color basada en la distancia al centro
        // Nodos más cercanos al centro tienen color más intenso
        const colorIntensity = map(distanceFactor, 0, 1, 1, 0.5)

        // Seleccionar características sensoriales para este nodo
        const sectionIndex = floor(i / (NODES_PER_PATH / 3))

        // Seleccionar textura, sonido, palabra y color basados en la ruta
        const texture = path.textures[min(sectionIndex, path.textures.length - 1)]
        const nodeSound = path.sounds[min(sectionIndex, path.sounds.length - 1)]
        const word = path.words[floor(random(path.words.length))]
        const nodeColor = path.colors[min(sectionIndex, path.colors.length - 1)]

        // Determinar el tipo de camino (rojo, verde, azul)
        let pathType = "rojo"
        if (path.id.includes("verde")) {
          pathType = "verde"
        } else if (path.id.includes("azul")) {
          pathType = "azul"
        }

        // Crear nodo
        nodes.push({
          x: x,
          y: y,
          baseX: x,
          baseY: y,
          vx: 0,
          vy: 0,
          radius: random(12, 18), // Tamaño variable
          color: color(
            red(color(nodeColor)) * colorIntensity,
            green(color(nodeColor)) * colorIntensity,
            blue(color(nodeColor)) * colorIntensity,
            200,
          ),
          nodeType: "sensory",
          pathId: path.id, // ID de la ruta sensorial
          pathType: pathType, // Tipo de camino (rojo, verde, azul)
          mainNodeId: mainNodeId, // ID del nodo principal al que pertenece
          thematicArea: areaIndex, // Índice del área temática
          name: `${path.name} - Nodo ${i + 1}`,
          noiseOffsetX: random(1000),
          noiseOffsetY: random(1000),
          noiseScale: random(0.01, 0.03),
          screenX: 0,
          screenY: 0,
          visible: true,
          active: true, // Indica si el nodo está activo o no
          activeTransition: 1.0, // Valor de transición para animación (1.0 = completamente activo)
          targetActiveTransition: 1.0, // Valor objetivo para la transición
          labelOpacity: 0,
          scale: 1.0,
          targetScale: 1.0,
          pulseOffset: random(TWO_PI),
          texture: texture,
          sound: nodeSound,
          word: word,
          rhythm: path.rhythm,
          pathColor: nodeColor, // Guardar el color original de la ruta
          distanceFactor: distanceFactor, // Para referencia
          transitionOffsetX: random(-5, 5), // Offset para movimiento durante transición
          transitionOffsetY: random(-5, 5), // Offset para movimiento durante transición
        })
      }
    }
  }

  // Crear nodos neutros (grises)
  for (let i = 0; i < NEUTRAL_NODES; i++) {
    // Distribución en un área 4 veces más grande que la pantalla
    const x = random(0, width * 4)
    const y = random(0, height * 4)

    // Color gris con variación
    const grayValue = random(100, 180)
    const nodeColor = color(grayValue, grayValue, grayValue, 180)

    // Crear nodo neutro
    nodes.push({
      x: x,
      y: y,
      baseX: x,
      baseY: y,
      vx: 0,
      vy: 0,
      radius: random(5, 12), // Más pequeños que los temáticos
      color: nodeColor,
      nodeType: "neutral",
      thematicArea: -1, // -1 indica nodo neutro
      name: `Nodo Neutral ${i + 1}`,
      noiseOffsetX: random(1000),
      noiseOffsetY: random(1000),
      noiseScale: random(0.01, 0.02),
      screenX: 0,
      screenY: 0,
      visible: true,
      active: true, // Indica si el nodo está activo o no
      activeTransition: 1.0, // Valor de transición para animación
      targetActiveTransition: 1.0, // Valor objetivo para la transición
      labelOpacity: 0,
      scale: 1.0,
      targetScale: 1.0,
      pulseOffset: random(TWO_PI),
      texture: null,
      sound: null,
      word: "neutral",
      rhythm: "neutral",
      transitionOffsetX: random(-5, 5), // Offset para movimiento durante transición
      transitionOffsetY: random(-5, 5), // Offset para movimiento durante transición
    })
  }
}

// Función para dibujar nodos
function drawNodes() {
  noStroke()

  // Primero dibujar los nodos que no están en hover o seleccionados
  for (let i = 0; i < nodes.length; i++) {
    if (i !== hoveredNode && i !== selectedNode) {
      drawNode(i)
    }
  }

  // Luego dibujar el nodo seleccionado y el nodo en hover para que aparezcan encima
  if (selectedNode !== null) {
    drawNode(selectedNode)
  }

  if (hoveredNode !== null && hoveredNode !== selectedNode) {
    drawNode(hoveredNode)
  }
}

function drawNode(i) {
  const node = nodes[i]

  // Actualizar la transición de activación con suavizado
  node.activeTransition = lerp(node.activeTransition, node.targetActiveTransition, 0.05)

  // Solo dibujar si el nodo es visible y tiene alguna opacidad
  if (node.visible && node.activeTransition > 0.01) {
    // Actualizar escala con suavizado
    node.scale = lerp(node.scale, node.targetScale, 0.2)

    // Efecto de pulso basado en el ritmo del nodo
    let pulseEffect = 1.0

    if (node.rhythm === "pulso_constante") {
      // Pulso regular y constante
      pulseEffect = sin(globalTime * 2 + node.pulseOffset) * 0.15 + 1
    } else if (node.rhythm === "iiiiiiiiiiiiiiiiiiiiiip") {
      // Pulso irregular entrecortado
      pulseEffect = noise(globalTime + node.pulseOffset) * 0.3 + 0.85
    } else if (node.rhythm === "oscilacion_lenta") {
      // Oscilación suave y lenta
      pulseEffect = sin(globalTime * 0.5 + node.pulseOffset) * 0.1 + 1
    } else if (node.rhythm === "desvanece") {
      // Desvanecimiento y reaparición
      pulseEffect = abs(sin(globalTime * 0.3 + node.pulseOffset)) * 0.5 + 0.7
    } else if (node.rhythm === "constante") {
      // Sin apenas variación
      pulseEffect = 1.0 + sin(globalTime * 0.1 + node.pulseOffset) * 0.05
    } else {
      // Nodos sin ritmo específico
      pulseEffect = sin(globalTime * 0.5 + node.pulseOffset) * 0.05 + 1
    }

    // Aplicar escala considerando la transición de activación
    const currentScale = node.scale * pulseEffect * node.activeTransition

    // Calcular posición con offset de transición
    const transitionX = node.x + node.transitionOffsetX * (1 - node.activeTransition)
    const transitionY = node.y + node.transitionOffsetY * (1 - node.activeTransition)

    // Efecto de círculos concéntricos para TODOS los nodos
    // Efecto de bloom (varias capas con diferentes tamaños y opacidades)
    for (let j = 3; j > 0; j--) {
      // Nodo seleccionado o hover: más brillante
      if (selectedNode === i || hoveredNode === i) {
        fill(
          min(red(node.color) + 70, 255),
          min(green(node.color) + 70, 255),
          min(blue(node.color) + 70, 255),
          (60 / j) * node.activeTransition, // Opacidad afectada por la transición
        )
      } else {
        fill(red(node.color), green(node.color), blue(node.color), (50 / j) * node.activeTransition)
      }
      circle(transitionX, transitionY, node.radius * 2 * j * currentScale)
    }

    // Si el nodo tiene textura, usarla como patrón en el círculo central
    if (node.texture && textureImages[node.texture]) {
      // Dibujar imagen de textura como fondo del nodo central
      const textureImg = textureImages[node.texture]
      push()
      imageMode(CENTER)

      // Ajustar tamaño de la textura al nodo
      const texSize = node.radius * 2 * currentScale

      // Ajustar opacidad de la imagen
      tint(255, 255 * node.activeTransition)
      image(textureImg, transitionX, transitionY, texSize, texSize)
      noTint()
      pop()
    } else {
      // Nodo principal
      if (selectedNode === i || hoveredNode === i) {
        fill(
          min(red(node.color) + 70, 255),
          min(green(node.color) + 70, 255),
          min(blue(node.color) + 70, 255),
          230 * node.activeTransition,
        )
      } else {
        fill(red(node.color), green(node.color), blue(node.color), 200 * node.activeTransition)
      }
      circle(transitionX, transitionY, node.radius * 2 * currentScale)
    }

    // Si el nodo tiene una palabra, mostrarla cuando está seleccionado o en hover
    if (node.word && (selectedNode === i || hoveredNode === i)) {
      fill(255, 255, 255, 230 * node.activeTransition)
      textAlign(CENTER, CENTER)
      textSize(12)
      // Dibujar palabra encima del nodo
      text(node.word, transitionX, transitionY - node.radius * currentScale - 10)
    }
  }
}

// Función para actualizar posiciones en pantalla de los nodos
function updateScreenPositions() {
  for (let i = 0; i < nodes.length; i++) {
    const node = nodes[i]

    // Calcular posición en pantalla
    node.screenX = node.x - viewX + width / 2
    node.screenY = node.y - viewY + height / 2

    // Verificar si está dentro de la pantalla (con margen)
    const margin = node.radius * 3
    node.visible =
      node.screenX + margin >= 0 &&
      node.screenX - margin <= width &&
      node.screenY + margin >= 0 &&
      node.screenY - margin <= height
  }
}

// Función para actualizar las posiciones de los nodos con movimiento orgánico
function updateNodePositions() {
  for (const node of nodes) {
    // Calcular nuevas velocidades basadas en ruido Perlin
    const time = frameCount * 0.01
    const noiseX = noise(node.noiseOffsetX + time) * 2 - 1
    const noiseY = noise(node.noiseOffsetY + time) * 2 - 1

    // Aplicar suavizado a los cambios de velocidad
    node.vx = lerp(node.vx, noiseX * node.noiseScale * 2, 0.02)
    node.vy = lerp(node.vy, noiseY * node.noiseScale * 2, 0.02)

    // Actualizar posición solo si el nodo está completamente activo
    // Esto evita que los nodos que están desapareciendo sigan moviéndose
    if (node.activeTransition > 0.9) {
      node.x += node.vx
      node.y += node.vy

      // Mantener cerca de la posición base con fuerza suave
      node.x += (node.baseX - node.x) * 0.01
      node.y += (node.baseY - node.y) * 0.01
    }

    // Actualizar escala objetivo basada en hover
    if (hoveredNode === nodes.indexOf(node)) {
      node.targetScale = 1.1 // Agrandar ligeramente al hacer hover
    } else if (selectedNode !== nodes.indexOf(node) && !selectedPath) {
      // Solo restablecer si no hay una ruta seleccionada
      node.targetScale = 1.0 // Tamaño normal
    }
  }
}

// Función para verificar si el mouse está sobre algún nodo
function checkMouseOverNodes() {
  // Resetear hover
  const previousHoveredNode = hoveredNode
  hoveredNode = null

  // Verificar todos los nodos
  for (let i = 0; i < nodes.length; i++) {
    const node = nodes[i]

    // Solo verificar nodos visibles y con suficiente opacidad
    if (node.visible && node.activeTransition > 0.5) {
      const distance = dist(mouseX, mouseY, node.screenX, node.screenY)

      if (distance < node.radius * node.scale) {
        hoveredNode = i

        // Si es un nodo sensorial, mostrar su media
        if (node.nodeType === "sensory") {
          showNodeMedia(node)
        } else {
          hideMediaPanel()
        }

        break // Tomar solo el primer nodo encontrado
      }
    }
  }

  // Si ya no hay nodo en hover, ocultar el panel de media
  if (hoveredNode === null && previousHoveredNode !== null) {
    hideMediaPanel()
    stopAudio()
  }
}

// Función para actualizar la información del nodo
function updateNodeInfo() {
  if (hoveredNode !== null) {
    const node = nodes[hoveredNode]
    let infoText = `${node.name}`

    if (node.nodeType === "sensory") {
      infoText += ` - Haz clic para seguir la ruta ${node.pathId}`
      if (node.texture) infoText += ` | Textura: ${node.texture}`
      if (node.sound) infoText += ` | Sonido: ${node.sound}`
      if (node.word) infoText += ` | Palabra: ${node.word}`
    } else {
      infoText += " - Haz clic para volver al centro"
    }

    nodeInfo.html(infoText)
  } else {
    nodeInfo.html("Mueve el cursor sobre un nodo para ver información")
  }
}

// Función para mostrar más nodos del tipo seleccionado y ocultar otros
function updateNodeVisibility(selectedPathType) {
  if (!currentArea) return

  // Contar cuántos nodos activos hay del tipo seleccionado
  let activeNodesCount = 0
  for (let i = 0; i < nodes.length; i++) {
    const node = nodes[i]
    if (
      node.nodeType === "sensory" &&
      node.mainNodeId === currentArea &&
      node.pathType === selectedPathType &&
      node.activeTransition > 0.5
    ) {
      activeNodesCount++
    }
  }

  // Establecer un límite máximo de nodos por tipo sensorial
  const MAX_NODES_PER_TYPE = 60

  // Para cada nodo en el sistema
  for (let i = 0; i < nodes.length; i++) {
    const node = nodes[i]

    if (node.nodeType === "sensory") {
      if (node.mainNodeId === currentArea) {
        // Si el nodo pertenece al área seleccionada
        if (node.pathType === selectedPathType) {
          // Mostrar nodos del tipo de camino seleccionado (sin cambiar tamaño)
          node.targetActiveTransition = 1.0
          node.targetScale = 1.0 // Mantener tamaño normal

          // Generar nuevos nodos SOLO si no hemos alcanzado el límite
          if (activeNodesCount < MAX_NODES_PER_TYPE && random() < 0.05) {
            generateNewNode(currentArea, selectedPathType, node)
            activeNodesCount++
          }
        } else {
          // Hacer desaparecer nodos de otros tipos de camino en la misma área
          // Con una probabilidad para que sea gradual
          if (random() < 0.2) {
            node.targetActiveTransition = 0.0 // Desaparecer completamente
          } else {
            node.targetActiveTransition = Math.max(0, node.activeTransition - 0.1) // Ir desapareciendo gradualmente
          }
        }
      } else {
        // Los nodos de otras áreas permanecen visibles pero atenuados
        // No afectar a otros ejes temáticos
        node.targetActiveTransition = 0.3
        node.targetScale = 1.0 // Mantener tamaño normal
      }
    } else if (node.nodeType === "neutral") {
      // Los nodos neutros siempre permanecen visibles
      node.targetActiveTransition = 0.7
      node.targetScale = 1.0 // Mantener tamaño normal
    }
  }
}

// Función para generar nuevos nodos
function generateNewNode(areaId, pathType, sourceNode) {
  // Encontrar la información del área
  const area = thematicAreas.find((a) => a.id === areaId)
  if (!area) return

  // Encontrar la información del camino
  const paths = sensoryPaths[areaId]
  const path = paths.find((p) => p.id.includes(pathType))
  if (!path) return

  // Generar una posición cerca del nodo fuente
  const angle = random(TWO_PI)
  const distance = random(50, 150)
  const x = sourceNode.x + cos(angle) * distance
  const y = sourceNode.y + sin(angle) * distance

  // Calcular intensidad de color
  const distanceFactor = 0.7 // Intensidad media

  // Seleccionar características aleatorias del camino
  const sectionIndex = floor(random(3))
  const texture = path.textures[min(sectionIndex, path.textures.length - 1)]
  const nodeSound = path.sounds[min(sectionIndex, path.sounds.length - 1)]
  const word = path.words[floor(random(path.words.length))]
  const nodeColor = path.colors[min(sectionIndex, path.colors.length - 1)]

  // Crear el nuevo nodo
  const newNode = {
    x: x,
    y: y,
    baseX: x,
    baseY: y,
    vx: 0,
    vy: 0,
    radius: random(12, 18),
    color: color(
      red(color(nodeColor)) * distanceFactor,
      green(color(nodeColor)) * distanceFactor,
      blue(color(nodeColor)) * distanceFactor,
      200,
    ),
    nodeType: "sensory",
    pathId: path.id,
    pathType: pathType,
    mainNodeId: areaId,
    thematicArea: thematicAreas.findIndex((a) => a.id === areaId),
    name: `${path.name} - Nodo Nuevo`,
    noiseOffsetX: random(1000),
    noiseOffsetY: random(1000),
    noiseScale: random(0.01, 0.03),
    screenX: 0,
    screenY: 0,
    visible: true,
    active: true,
    activeTransition: 0.0, // Comenzar invisible y aparecer gradualmente
    targetActiveTransition: 1.0,
    labelOpacity: 0,
    scale: 0.1, // Comenzar pequeño
    targetScale: 1.0, // Crecer a tamaño normal
    pulseOffset: random(TWO_PI),
    texture: texture,
    sound: nodeSound,
    word: word,
    rhythm: path.rhythm,
    pathColor: nodeColor,
    distanceFactor: distanceFactor,
    transitionOffsetX: random(-5, 5),
    transitionOffsetY: random(-5, 5),
  }

  // Agregar el nuevo nodo al array de nodos
  nodes.push(newNode)

  // Crear enlaces para el nuevo nodo
  createLinksForNewNode(nodes.length - 1)
}

// Función para reiniciar todos los nodos a su estado activo
function resetAllNodes() {
  for (const node of nodes) {
    node.targetActiveTransition = 1.0
    node.targetScale = 1.0 // Tamaño normal para todos

    if (node.nodeType === "sensory") {
      node.color = color(red(node.pathColor), green(node.pathColor), blue(node.pathColor), 200)
    }
  }
}

function emphasizeSelectedPath() {
  // Hacer más visibles los nodos de la ruta seleccionada
  // y menos visibles los demás, pero sin cambiar tamaño
  for (let i = 0; i < nodes.length; i++) {
    const node = nodes[i]
    if (node.nodeType === "sensory") {
      if (node.pathId === selectedPath) {
        // Mantener tamaño normal pero reforzar color
        node.targetScale = 1.0
        // Reforzar color original
        node.color = color(red(node.pathColor), green(node.pathColor), blue(node.pathColor), 230)
      } else {
        // Mantener tamaño normal pero atenuar color
        node.targetScale = 1.0
        // Atenuar color
        node.color = color(red(node.pathColor) * 0.7, green(node.pathColor) * 0.7, blue(node.pathColor) * 0.7, 100)
      }
    } else if (node.nodeType === "neutral") {
      // Nodos neutros mantienen tamaño normal
      node.targetScale = 1.0
      node.color = color(100, 100, 100, 80)
    }
  }

  // Ajustar visibilidad de enlaces
  for (const link of links) {
    if (link.pathId === selectedPath) {
      link.opacity = random(0.7, 0.9) // Más visibles
      link.pulseAmount = random(0.2, 0.4) // Más pulsación
    } else if (link.pathId !== "neutral") {
      link.opacity = random(0.1, 0.3) // Menos visibles
      link.pulseAmount = random(0.05, 0.1) // Menos pulsación
    } else {
      link.opacity = random(0.05, 0.15) // Casi invisibles
    }
  }
}
