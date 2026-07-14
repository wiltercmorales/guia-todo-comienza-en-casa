// Asset configuration registering all 37 images.
// Connects /assets/avatar-clean/ as primary with fallback to /assets/avatar/

const BASE_CLEAN = '/assets/avatar-clean/'
const BASE_FALLBACK = '/assets/avatar/'

export const AVATARS = [
  // Original Avatars & Stickers
  { id: 'nino', name: 'Niño', path: `${BASE_CLEAN}nino.png`, fallback: `${BASE_FALLBACK}nino.png` },
  { id: 'nina', name: 'Niña', path: `${BASE_CLEAN}nina.png`, fallback: `${BASE_FALLBACK}nina.png` },
  { id: 'angel', name: 'Ángel', path: `${BASE_CLEAN}angel.png`, fallback: `${BASE_FALLBACK}angel.png` },
  { id: 'jesus', name: 'Jesús', path: `${BASE_CLEAN}jesus.png`, fallback: `${BASE_FALLBACK}jesus.png` },
  { id: 'paloma', name: 'Palomita', path: `${BASE_CLEAN}paloma.png`, fallback: `${BASE_FALLBACK}paloma.png` },
  { id: 'sol', name: 'Sol Alegre', path: `${BASE_CLEAN}sol.png`, fallback: `${BASE_FALLBACK}sol.png` },
  { id: 'arcoiris', name: 'Arcoíris', path: `${BASE_CLEAN}arcoiris.png`, fallback: `${BASE_FALLBACK}arcoiris.png` },
  { id: 'estrella', name: 'Estrella', path: `${BASE_CLEAN}estrella.png`, fallback: `${BASE_FALLBACK}estrella.png` },
  { id: 'oracion', name: 'Oración', path: `${BASE_CLEAN}oracion.png`, fallback: `${BASE_FALLBACK}oracion.png` },
  { id: 'biblia', name: 'Biblia', path: `${BASE_CLEAN}biblia.png`, fallback: `${BASE_FALLBACK}biblia.png` },
  { id: 'casa', name: 'Casita', path: `${BASE_CLEAN}casa.png`, fallback: `${BASE_FALLBACK}casa.png` },
  { id: 'familia', name: 'Familia', path: `${BASE_CLEAN}familia.png`, fallback: `${BASE_FALLBACK}familia.png` },
  { id: 'arbol', name: 'Árbol de Vida', path: `${BASE_CLEAN}arbol.png`, fallback: `${BASE_FALLBACK}arbol.png` },
  { id: 'flores', name: 'Flores', path: `${BASE_CLEAN}flores.png`, fallback: `${BASE_FALLBACK}flores.png` },
  { id: 'montana', name: 'Montaña', path: `${BASE_CLEAN}montana.png`, fallback: `${BASE_FALLBACK}montana.png` },
  { id: 'cielo', name: 'Cielo Celeste', path: `${BASE_CLEAN}cielo.png`, fallback: `${BASE_FALLBACK}cielo.png` },
  { id: 'puerta_celestial', name: 'Puerta de Oro', path: `${BASE_CLEAN}puerta_celestial.png`, fallback: `${BASE_FALLBACK}puerta_celestial.png` },
  { id: 'cruz', name: 'Cruz de Amor', path: `${BASE_CLEAN}cruz.png`, fallback: `${BASE_FALLBACK}cruz.png` },
  { id: 'medalla', name: 'Medalla', path: `${BASE_CLEAN}medalla.png`, fallback: `${BASE_FALLBACK}medalla.png` },
  { id: 'corona', name: 'Corona', path: `${BASE_CLEAN}corona.png`, fallback: `${BASE_FALLBACK}corona.png` },
  { id: 'cofre', name: 'Cofre Tesoro', path: `${BASE_CLEAN}cofre.png`, fallback: `${BASE_FALLBACK}cofre.png` },
  { id: 'nube', name: 'Nube', path: `${BASE_CLEAN}nube.png`, fallback: `${BASE_FALLBACK}nube.png` },

  // New visual elements & stickers
  { id: 'arca', name: 'Arca de Noé', path: `${BASE_CLEAN}arca.png`, fallback: `${BASE_FALLBACK}arca.png` },
  { id: 'bosque', name: 'Bosque Verde', path: `${BASE_CLEAN}bosque.png`, fallback: `${BASE_FALLBACK}bosque.png` },
  { id: 'cascada', name: 'Cascada Brillo', path: `${BASE_CLEAN}cascada.png`, fallback: `${BASE_FALLBACK}cascada.png` },
  { id: 'mariposa', name: 'Mariposa', path: `${BASE_CLEAN}mariposa.png`, fallback: `${BASE_FALLBACK}mariposa.png` },
  { id: 'oveja', name: 'Ovejita', path: `${BASE_CLEAN}oveja.png`, fallback: `${BASE_FALLBACK}oveja.png` },
  { id: 'pan', name: 'Pan de Vida', path: `${BASE_CLEAN}pan.png`, fallback: `${BASE_FALLBACK}pan.png` },
  { id: 'pergamino', name: 'Pergamino', path: `${BASE_CLEAN}pergamino.png`, fallback: `${BASE_FALLBACK}pergamino.png` },
  { id: 'piedras_camino', name: 'Piedras del Camino', path: `${BASE_CLEAN}piedras_camino.png`, fallback: `${BASE_FALLBACK}piedras_camino.png` },
  { id: 'pradera', name: 'Pradera', path: `${BASE_CLEAN}pradera.png`, fallback: `${BASE_FALLBACK}pradera.png` },
  { id: 'puente_madera', name: 'Puente de Madera', path: `${BASE_CLEAN}puente_madera.png`, fallback: `${BASE_FALLBACK}puente_madera.png` },
  { id: 'pwz', name: 'PWZ', path: `${BASE_CLEAN}pwz.png`, fallback: `${BASE_FALLBACK}pwz.png` },
  { id: 'rio', name: 'Río Azul', path: `${BASE_CLEAN}rio.png`, fallback: `${BASE_FALLBACK}rio.png` },
  { id: 'sendero', name: 'Sendero', path: `${BASE_CLEAN}sendero.png`, fallback: `${BASE_FALLBACK}sendero.png` },
  { id: 'tabla_ley', name: 'Tabla de la Ley', path: `${BASE_CLEAN}tabla_ley.png`, fallback: `${BASE_FALLBACK}tabla_ley.png` },
  { id: 'uvas', name: 'Uvas', path: `${BASE_CLEAN}uvas.png`, fallback: `${BASE_FALLBACK}uvas.png` },
]

// Thematic stickers mapping including the new elements
const STICKER_WEEKS = {
  1: ['jesus', 'nino', 'nina', 'estrella', 'sol', 'arcoiris', 'nube'],
  2: ['oracion', 'paloma', 'angel', 'cruz', 'biblia', 'sol', 'estrella'],
  3: ['biblia', 'pergamino', 'arbol', 'montana', 'flores', 'paloma', 'sol'],
  4: ['tabla_ley', 'sol', 'arcoiris', 'nino', 'nina', 'casa', 'familia'],
  5: ['pan', 'uvas', 'cofre', 'corona', 'paloma', 'flores', 'sol'],
  6: ['familia', 'casa', 'arbol', 'flores', 'sol', 'estrella', 'nube'],
  7: ['paloma', 'oveja', 'cruz', 'jesus', 'biblia', 'sol', 'estrella'],
  8: ['arca', 'corona', 'cruz', 'medalla', 'estrella', 'sol', 'arcoiris'],
  9: ['montana', 'mariposa', 'arbol', 'cielo', 'sol', 'estrella', 'paloma'],
  10: ['puerta_celestial', 'cielo', 'sol', 'jesus', 'corona', 'medalla', 'estrella']
}

export function getStickerForDay(weekId, dayId) {
  const weekList = STICKER_WEEKS[weekId] || STICKER_WEEKS[1]
  const avatarId = weekList[(dayId - 1) % 7] || 'estrella'
  const found = AVATARS.find(a => a.id === avatarId) || AVATARS[7] // fallback to estrella
  return {
    id: found.id,
    name: found.name,
    path: found.path,
    fallback: found.fallback
  }
}

export function getAvatarPath(avatarId) {
  const found = AVATARS.find(a => a.id === avatarId)
  return found ? found.path : `${BASE_CLEAN}nino.png`
}

export function getAvatarFallback(avatarId) {
  const found = AVATARS.find(a => a.id === avatarId)
  return found ? found.fallback : `${BASE_FALLBACK}nino.png`
}
