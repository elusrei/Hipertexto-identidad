// Función auxiliar para calcular distancia en 2D
function distance2D(x1, y1, x2, y2) {
  return Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1))
}

// Función para generar puntos intermedios para líneas orgánicas en 2D
function generateIntermediatePoints2D(x1, y1, x2, y2, numPoints) {
  const points = []

  for (let i = 0; i < numPoints; i++) {
    const t = (i + 1) / (numPoints + 1)

    // Línea base
    const baseX = x1 + (x2 - x1) * t
    const baseY = y1 + (y2 - y1) * t

    // Vector dirección
    const dirX = x2 - x1
    const dirY = y2 - y1

    // Vector perpendicular
    const perpX = -dirY
    const perpY = dirX

    // Normalizar
    const perpLength = Math.sqrt(perpX * perpX + perpY * perpY)
    let normPerpX = 0
    let normPerpY = 0

    if (perpLength > 0) {
      normPerpX = perpX / perpLength
      normPerpY = perpY / perpLength
    }

    // Aplicar desviación
    const deviation = random(-30, 30)

    points.push({
      x: baseX + normPerpX * deviation,
      y: baseY + normPerpY * deviation,
    })
  }

  return points
}

// Función para dibujar línea orgánica/quebrada en 2D
function drawOrganicLine2D(x1, y1, x2, y2, points) {
  noFill()
  beginShape()
  vertex(x1, y1)

  for (const point of points) {
    vertex(point.x, point.y)
  }

  vertex(x2, y2)
  endShape()
}

// Función auxiliar para crear imágenes de textura
function createTextureImage(name, baseColor) {
  // En una implementación real, cargarías imágenes reales
  // Esta es una función placeholder que crea una imagen con un patrón básico
  const img = createGraphics(100, 100)
  img.background(baseColor)

  // Dibujar un patrón básico basado en el nombre
  img.stroke(255, 100)
  img.strokeWeight(2)

  if (name.includes("lineas")) {
    // Dibujar varias líneas
    const numLines = name.includes("muchas") ? 20 : name.includes("menos") ? 5 : 10
    for (let i = 0; i < numLines; i++) {
      img.line(random(100), random(100), random(100), random(100))
    }
  } else if (name.includes("entrecruzadas") || name.includes("tela") || name.includes("entramados")) {
    // Dibujar líneas entrecruzadas
    for (let i = 0; i < 10; i++) {
      img.line(0, i * 10, 100, 100 - i * 10)
      img.line(i * 10, 0, 100 - i * 10, 100)
    }
  } else if (name.includes("3d") || name.includes("estructuras")) {
    // Dibujar formas que sugieran 3D
    img.push()
    img.noFill()
    for (let i = 0; i < 5; i++) {
      img.rect(20 + i * 5, 20 + i * 5, 60 - i * 10, 60 - i * 10)
    }
    img.pop()
  } else if (name.includes("granulado") || name.includes("texturado")) {
    // Dibujar puntos para textura granulada
    img.stroke(255, 150)
    img.strokeWeight(1)
    for (let i = 0; i < 200; i++) {
      img.point(random(100), random(100))
    }
  } else if (name.includes("liso") || name.includes("plano") || name.includes("simple")) {
    // Superficies más limpias con pocas líneas
    img.stroke(255, 50)
    img.line(0, 25, 100, 25)
    img.line(0, 50, 100, 50)
    img.line(0, 75, 100, 75)
  } else if (name.includes("mojado") || name.includes("fluido") || name.includes("humeda")) {
    // Textura que sugiere humedad
    img.noStroke()
    img.fill(255, 100)
    for (let i = 0; i < 20; i++) {
      const size = random(5, 15)
      img.ellipse(random(100), random(100), size, size)
    }
  } else {
    // Textura genérica para otros casos
    img.stroke(255, 120)
    for (let i = 0; i < 8; i++) {
      img.line(0, i * 12, 100, i * 12)
      img.line(i * 12, 0, i * 12, 100)
    }
  }

  return img
}
