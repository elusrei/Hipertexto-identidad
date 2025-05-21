// Definición de los nodos principales (centrales)
const mainNodes = [
  { name: "Arañas", id: "aranias" },
  { name: "Feliz/Motivación", id: "feliz" },
  { name: "Triste", id: "triste" },
]

// Contadores de caminos para cada área temática
const pathCounts = {
  aranias: {
    count: 0,
    maxCount: 10,
    rojo: 0,
    verde: 0,
    azul: 0,
  },
  feliz: {
    count: 0,
    maxCount: 10,
    rojo: 0,
    verde: 0,
    azul: 0,
  },
  triste: {
    count: 0,
    maxCount: 10,
    rojo: 0,
    verde: 0,
    azul: 0,
  },
}

// Definición de rutas sensoriales para cada nodo principal
const sensoryPaths = {
  aranias: [
    {
      id: "aranias_rojo",
      name: "Camino Rojo - Arañas",
      textures: ["muchas_lineas", "lineas_entrecruzadas", "tela_araña"],
      sounds: ["alarma_punzante", "zumbido_agudo", "chasquidos"],
      words: ["peligro", "alerta", "cuidado", "advertencia", "amenaza"],
      colors: ["#FF0000", "#CC0000", "#990000"], // Tonos de rojo
      rhythm: "pulso_constante",
    },
    {
      id: "aranias_verde",
      name: "Camino Verde - Arañas",
      textures: ["lineas_que_se_acercan", "estructuras_3d", "entramados"],
      sounds: ["wosh_estilo_jumpscare", "susurro_acercandose", "crujidos"],
      words: ["trampa", "emboscada", "enredo", "captura", "cazador"],
      colors: ["#00FF00", "#00CC00", "#009900"], // Tonos de verde
      rhythm: "iiiiiiiiiiiiiiiiiiiiiip", // Ritmo entrecortado o irregular
    },
    {
      id: "aranias_azul",
      name: "Camino Azul - Arañas",
      textures: ["menos_lineas", "rotas", "endebles"],
      sounds: ["pad_tranquilo", "ambiente_suave", "goteo"],
      words: ["observación", "paciencia", "espera", "estrategia", "sigilo", "plan", "táctica", "inteligencia"],
      colors: ["#0000FF", "#0000CC", "#000099"], // Tonos de azul
      rhythm: "oscilacion_lenta",
    },
  ],
  feliz: [
    {
      id: "feliz_rojo",
      name: "Camino Rojo - Feliz",
      textures: ["granulado", "vibrante", "texturado"],
      sounds: ["paraguas", "cascabeles", "risas"],
      words: ["éxito", "victoria", "logro", "triunfo", "celebración"],
      colors: ["#FF9999", "#FF6666", "#FF3333"], // Rojo pastel
      rhythm: "desvanece",
    },
    {
      id: "feliz_verde",
      name: "Camino Verde - Feliz",
      textures: ["mojado", "brillante", "fluido"],
      sounds: ["estadio", "multitud", "aplausos"],
      words: ["energía", "vitalidad", "fuerza", "poder", "impulso"],
      colors: ["#99FF99", "#66FF66", "#33FF33"], // Verde pastel
      rhythm: "constante",
    },
    {
      id: "feliz_azul",
      name: "Camino Azul - Feliz",
      textures: ["amarillo", "dorado", "luminoso"],
      sounds: ["melodía", "armónico", "musical"],
      words: ["calma", "serenidad", "paz", "tranquilidad", "armonía"],
      colors: ["#9999FF", "#6666FF", "#3333FF"], // Azul pastel
      rhythm: "continuo_suave",
    },
  ],
  triste: [
    {
      id: "triste_rojo",
      name: "Camino Rojo - Triste",
      textures: ["liso_y_frio", "plano", "simple"],
      sounds: ["lento_y_constante", "monótono", "grave"],
      words: ["pérdida", "ausencia", "vacío", "soledad", "abandono"],
      colors: ["#CC9999", "#BB7777", "#AA5555"], // Rojo apagado
      rhythm: "muy_lento",
    },
    {
      id: "triste_verde",
      name: "Camino Verde - Triste",
      textures: ["humeda", "fría", "brumosa"],
      sounds: ["llanto", "lamento", "suspiro"],
      words: ["melancolía", "nostalgia", "añoranza", "tristeza", "recuerdo"],
      colors: ["#99CC99", "#77BB77", "#55AA55"], // Verde apagado
      rhythm: "gotas_espaciadas",
    },
    {
      id: "triste_azul",
      name: "Camino Azul - Triste",
      textures: ["pegajosa", "viscosa", "densa"],
      sounds: ["nostalgia", "eco", "distante"],
      words: ["resignación", "aceptación", "rendición", "final", "despedida"],
      colors: ["#9999CC", "#7777BB", "#5555AA"], // Azul apagado
      rhythm: "apagandose",
    },
  ],
}

// Añadir propiedades de media a las rutas sensoriales
function initializeMediaPaths() {
  for (const areaId in sensoryPaths) {
    for (const path of sensoryPaths[areaId]) {
      // Añadir propiedades de media
      path.images = []
      path.videos = []
      path.gifs = []
      path.audios = []

      // Ejemplos de media para cada camino (puedes personalizar estas rutas)
      if (path.id.includes("rojo")) {
        path.images.push({
          url: "media/" + areaId + "/rojo_imagen1.jpg",
          caption: "Imagen sensorial roja",
        })
        path.videos.push({
          url: "media/" + areaId + "/rojo_video1.mp4",
          caption: "Video sensorial rojo",
        })
        path.audios.push({
          url: "media/" + areaId + "/rojo_audio1.mp3",
          caption: "Audio sensorial rojo",
        })
      } else if (path.id.includes("verde")) {
        path.images.push({
          url: "media/" + areaId + "/verde_imagen1.jpg",
          caption: "Imagen sensorial verde",
        })
        path.gifs.push({
          url: "media/" + areaId + "/verde_gif1.gif",
          caption: "GIF sensorial verde",
        })
        path.audios.push({
          url: "media/" + areaId + "/verde_audio1.mp3",
          caption: "Audio sensorial verde",
        })
      } else if (path.id.includes("azul")) {
        path.images.push({
          url: "media/" + areaId + "/azul_imagen1.jpg",
          caption: "Imagen sensorial azul",
        })
        path.videos.push({
          url: "media/" + areaId + "/azul_video1.mp4",
          caption: "Video sensorial azul",
        })
        path.audios.push({
          url: "media/" + areaId + "/azul_audio1.mp3",
          caption: "Audio sensorial azul",
        })
      }
    }
  }
}
