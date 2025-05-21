// Variables para manejo de media
let mediaPanel
let currentAudio = null
let audioPlaying = false
const sensoryPaths = {} // Declare sensoryPaths

// Función para mostrar media del nodo
function showNodeMedia(node) {
  if (node.nodeType !== "sensory") return

  // Buscar el camino sensorial correspondiente
  const paths = sensoryPaths[node.mainNodeId]
  const path = paths.find((p) => p.id === node.pathId)

  if (!path) return

  // Determinar qué tipo de media mostrar (prioridad: video > gif > imagen)
  let mediaHTML = ""
  let caption = ""
  let hasMedia = false

  // Verificar si hay videos
  if (path.videos && path.videos.length > 0) {
    const videoIndex = Math.floor(Math.random() * path.videos.length)
    const video = path.videos[videoIndex]
    mediaHTML = `<video autoplay loop muted><source src="${video.url}" type="video/mp4"></video>`
    caption = video.caption
    hasMedia = true
  }
  // Verificar si hay GIFs
  else if (path.gifs && path.gifs.length > 0) {
    const gifIndex = Math.floor(Math.random() * path.gifs.length)
    const gif = path.gifs[gifIndex]
    mediaHTML = `<img src="${gif.url}" alt="${gif.caption}">`
    caption = gif.caption
    hasMedia = true
  }
  // Verificar si hay imágenes
  else if (path.images && path.images.length > 0) {
    const imageIndex = Math.floor(Math.random() * path.images.length)
    const image = path.images[imageIndex]
    mediaHTML = `<img src="${image.url}" alt="${image.caption}">`
    caption = image.caption
    hasMedia = true
  }

  // Reproducir audio si está disponible
  if (path.audios && path.audios.length > 0 && !audioPlaying) {
    const audioIndex = Math.floor(Math.random() * path.audios.length)
    const audio = path.audios[audioIndex]
    playAudio(audio.url)
  }

  // Mostrar el panel de media si hay contenido
  if (hasMedia) {
    const mediaContent = document.getElementById("media-content")
    const mediaCaption = document.getElementById("media-caption")

    mediaContent.innerHTML = mediaHTML
    mediaCaption.textContent = caption

    // Posicionar el panel encima del nodo
    const panel = document.getElementById("media-panel")
    panel.style.left = node.screenX - 150 + "px" // Centrado horizontalmente
    panel.style.top = node.screenY - 320 + "px" // Encima del nodo
    panel.style.display = "block"
    panel.style.opacity = "1"
  } else {
    hideMediaPanel()
  }
}

// Función para ocultar el panel de media
function hideMediaPanel() {
  const panel = document.getElementById("media-panel")
  panel.style.opacity = "0"
  setTimeout(() => {
    if (panel.style.opacity === "0") {
      panel.style.display = "none"
    }
  }, 300)
}

// Función para reproducir audio
function playAudio(url) {
  stopAudio() // Detener audio anterior si existe

  currentAudio = new Audio(url)
  currentAudio.volume = 0.5 // Volumen moderado
  currentAudio
    .play()
    .then(() => {
      audioPlaying = true
    })
    .catch((error) => {
      console.error("Error al reproducir audio:", error)
    })

  // Establecer evento para cuando termine el audio
  currentAudio.onended = () => {
    audioPlaying = false
    currentAudio = null
  }
}

// Función para detener audio
function stopAudio() {
  if (currentAudio) {
    currentAudio.pause()
    currentAudio.currentTime = 0
    audioPlaying = false
    currentAudio = null
  }
}
