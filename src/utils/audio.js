// Sound synthesis utility using the native browser Web Audio API.
// This is 100% reliable offline, zero-dependency, and plays instantly.

let audioCtx = null

function getAudioContext() {
  if (!audioCtx) {
    // Standard AudioContext initialization
    const AudioContextClass = window.AudioContext || window.webkitAudioContext
    if (AudioContextClass) {
      audioCtx = new AudioContextClass()
    }
  }
  
  // Resume if suspended (browser security policies require user gesture)
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume()
  }
  return audioCtx
}

export function playClick() {
  try {
    const ctx = getAudioContext()
    if (!ctx) return

    const osc = ctx.createOscillator()
    const gainNode = ctx.createGain()

    osc.type = 'sine'
    // Plucky pop slide
    osc.frequency.setValueAtTime(400, ctx.currentTime)
    osc.frequency.exponentialRampToValueAtTime(120, ctx.currentTime + 0.08)

    gainNode.gain.setValueAtTime(0.25, ctx.currentTime)
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.08)

    osc.connect(gainNode)
    gainNode.connect(ctx.destination)

    osc.start()
    osc.stop(ctx.currentTime + 0.09)
  } catch (e) {
    console.warn('Audio play failed:', e)
  }
}

export function playCoin() {
  try {
    const ctx = getAudioContext()
    if (!ctx) return

    const now = ctx.currentTime
    const osc = ctx.createOscillator()
    const gainNode = ctx.createGain()

    osc.type = 'sine'
    // Ascent coin pitch: E5 (659Hz) to B5 (988Hz)
    osc.frequency.setValueAtTime(659.25, now)
    osc.frequency.setValueAtTime(987.77, now + 0.08)

    gainNode.gain.setValueAtTime(0.18, now)
    gainNode.gain.setValueAtTime(0.18, now + 0.08)
    gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.35)

    osc.connect(gainNode)
    gainNode.connect(ctx.destination)

    osc.start()
    osc.stop(now + 0.4)
  } catch (e) {
    console.warn('Audio play failed:', e)
  }
}

export function playBell() {
  try {
    const ctx = getAudioContext()
    if (!ctx) return

    const now = ctx.currentTime
    const osc = ctx.createOscillator()
    const gainNode = ctx.createGain()

    osc.type = 'triangle'
    osc.frequency.setValueAtTime(880, now) // A5 bell

    gainNode.gain.setValueAtTime(0.22, now)
    gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.8)

    osc.connect(gainNode)
    gainNode.connect(ctx.destination)

    osc.start()
    osc.stop(now + 0.9)
  } catch (e) {
    console.warn('Audio play failed:', e)
  }
}

export function playFanfare() {
  try {
    const ctx = getAudioContext()
    if (!ctx) return

    const now = ctx.currentTime
    const notes = [261.63, 329.63, 392.00, 523.25] // C4, E4, G4, C5 major arpeggio
    
    notes.forEach((freq, index) => {
      const osc = ctx.createOscillator()
      const gainNode = ctx.createGain()
      
      osc.type = 'sine'
      osc.frequency.setValueAtTime(freq, now + index * 0.08)
      
      gainNode.gain.setValueAtTime(0.15, now + index * 0.08)
      gainNode.gain.exponentialRampToValueAtTime(0.001, now + index * 0.08 + 0.4)
      
      osc.connect(gainNode)
      gainNode.connect(ctx.destination)
      
      osc.start(now + index * 0.08)
      osc.stop(now + index * 0.08 + 0.45)
    })
  } catch (e) {
    console.warn('Audio play failed:', e)
  }
}

export function playAmbient() {
  try {
    const ctx = getAudioContext()
    if (!ctx) return

    const now = ctx.currentTime
    const osc = ctx.createOscillator()
    const gainNode = ctx.createGain()

    osc.type = 'sine'
    // Bird tweet slide
    osc.frequency.setValueAtTime(1800, now)
    osc.frequency.exponentialRampToValueAtTime(2600, now + 0.08)
    osc.frequency.setValueAtTime(2000, now + 0.09)
    osc.frequency.exponentialRampToValueAtTime(2800, now + 0.17)

    gainNode.gain.setValueAtTime(0.08, now)
    gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.22)

    osc.connect(gainNode)
    gainNode.connect(ctx.destination)

    osc.start()
    osc.stop(now + 0.25)
  } catch (e) {
    console.warn('Audio play failed:', e)
  }
}
