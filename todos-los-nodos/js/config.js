// Configuración general
const TOTAL_NODES = 900 // Reducido de 1200 a 900
const NODES_PER_PATH = 30 // Reducido de 40 a 30
const NEUTRAL_NODES = TOTAL_NODES - NODES_PER_PATH * 9

// Variables para la cámara/vista
const viewX = 0
const viewY = 0
const targetViewX = 0
const targetViewY = 0
const initialViewX = 0
const initialViewY = 0

// Variables para interacción
const hoveredNode = null
const selectedNode = null
const selectedPath = null
const hoverScale = 1.0
const hoverTargetScale = 1.0

// Arreglos para almacenar nodos y enlaces
const nodes = []
const links = []

// Variable para el elemento de información del nodo
let nodeInfo
let pathCounters
const motherNodes = {}

// Área temática actualmente seleccionada
const currentArea = null

// Variables para efectos visuales
const noiseOffset = 0
const globalTime = 0

// Variables para almacenar precargas de imágenes
const textureImages = {}

// Áreas temáticas (centros y colores)
const thematicAreas = []
