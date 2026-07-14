import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, Trophy, Gift, ArrowRight } from 'lucide-react'
import confetti from 'canvas-confetti'
import { getStickerForDay } from '../data/assets'
import { playFanfare, playBell } from '../utils/audio'

export default function RewardCard({ type, weekId, dayId, onClose }) {
  const [flipped, setFlipped] = useState(false)

  const isMedal = type === 'medal'
  const sticker = getStickerForDay(weekId, dayId)

  // Auto flip and trigger celebration on mount
  useEffect(() => {
    // Play sound fanfare
    playFanfare()

    // Launch official canvas-confetti cannons
    confetti({
      particleCount: 120,
      spread: 70,
      origin: { y: 0.6 }
    })

    // Side cannon bursts for kids wow factor
    const end = Date.now() + 800
    const frame = () => {
      confetti({
        particleCount: 4,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.8 }
      })
      confetti({
        particleCount: 4,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.8 }
      })
      if (Date.now() < end) {
        requestAnimationFrame(frame)
      }
    }
    requestAnimationFrame(frame)

    // Flip card automatically
    const timer = setTimeout(() => {
      setFlipped(true)
      playBell() // ring bell when flipping
    }, 1200)
    
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
      {/* Dim backdrop overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/60 backdrop-blur-[2px]"
        onClick={onClose}
      />

      {/* Celebratory Content Container */}
      <div className="relative w-full max-w-sm flex flex-col items-center justify-center z-10">
        
        {/* Floating details icon above the card */}
        <div className="absolute -top-16 text-4xl animate-bounce flex gap-3 select-none">
          <span>✨</span>
          <span>🌈</span>
          <span>✨</span>
        </div>

        {/* 3D Flip Card Container */}
        <div
          className="w-full aspect-[3/4] cursor-pointer perspective-1000 mb-6"
          onClick={() => {
            playBell()
            setFlipped(!flipped)
          }}
        >
          <motion.div
            className="w-full h-full relative preserve-3d transition-transform duration-700"
            style={{ transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}
          >
            {/* CARD FRONT (Face Down - Mystery Gift Box) */}
            <div className="absolute inset-0 backface-hidden bg-gradient-to-br from-forest-500 to-green-600 border-4 border-white rounded-5xl p-6 flex flex-col items-center justify-center text-center shadow-warm-lg text-white">
              <div className="w-24 h-24 rounded-full bg-white/20 flex items-center justify-center mb-4 border-2 border-white/30 animate-pulse">
                <Gift size={48} className="text-white fill-white" />
              </div>
              <h3 className="font-display font-black text-xl mb-1">
                ¡Tienes una Recompensa!
              </h3>
              <p className="font-body text-xs text-forest-100 px-4">
                Has completado todos los pasos de hoy. ¡Toca la carta para revelarla!
              </p>
              
              <div className="absolute bottom-5 font-body text-[10px] font-bold text-forest-200 tracking-wider uppercase">
                Toca para abrir 🎁
              </div>
            </div>

            {/* CARD BACK (Face Up - Sticker/Medal Revealed) */}
            <div className="absolute inset-0 backface-hidden rotate-y-180 bg-gradient-to-br from-white to-cream-50 border-4 border-gold-400 rounded-5xl p-6 flex flex-col items-center justify-center text-center shadow-warm-lg">
              {/* Glossy top glass curve */}
              <div className="absolute top-1 left-1 right-1 h-32 bg-white/40 rounded-t-[2.2rem] pointer-events-none" />

              {isMedal ? (
                // Weekly Medal View
                <>
                  <div className="relative mb-4">
                    <div className="w-28 h-28 rounded-full bg-gold-100 border-2 border-gold-300 flex items-center justify-center p-1 relative shadow-inner">
                      <img
                        src="./assets/avatar/medalla.png"
                        alt="Medalla"
                        className="w-full h-full object-contain animate-bounce"
                        onError={(e) => {
                          e.target.src = './assets/avatar/medalla.png'
                        }}
                      />
                    </div>
                    <div className="absolute -top-1 -right-1 bg-yellow-400 border border-white rounded-full p-1 shadow-sm">
                      <Trophy size={14} className="text-white fill-white" />
                    </div>
                  </div>

                  <h4 className="font-body text-[10px] font-black text-gold-600 uppercase tracking-widest mb-1">
                    Medalla de Logro
                  </h4>
                  <h3 className="font-display font-black text-xl text-forest-800 leading-tight mb-2">
                    ¡Semana {weekId} Completada!
                  </h3>
                  <p className="font-body text-xs text-slate-500 px-4 leading-relaxed">
                    ¡Excelente esfuerzo! Has ganado la medalla dorada semanal.
                  </p>
                </>
              ) : (
                // Daily Sticker View
                <>
                  <div className="relative mb-4">
                    <div className="w-28 h-28 rounded-full bg-gold-100 border-2 border-gold-300 flex items-center justify-center p-3 relative shadow-inner">
                      <img
                        src={sticker.path}
                        alt={sticker.name}
                        className="w-full h-full object-contain animate-bounce-soft"
                        onError={(e) => {
                          e.target.src = sticker.fallback || './assets/avatar/estrella.png'
                        }}
                      />
                    </div>
                    <div className="absolute -top-1.5 -right-1.5 bg-gold-400 border border-white rounded-full p-1 shadow-sm animate-pulse">
                      <Sparkles size={14} className="text-white fill-white" />
                    </div>
                  </div>

                  <h4 className="font-body text-[10px] font-black text-gold-600 uppercase tracking-widest mb-1">
                    Sticker del Día
                  </h4>
                  <h3 className="font-display font-black text-2xl text-forest-800 leading-tight mb-2">
                    {sticker.name}
                  </h3>
                  <p className="font-body text-xs text-slate-500 px-4 leading-relaxed">
                    ¡Coleccionado en tu pasaporte! Sigue sumando stickers en tu camino con Dios.
                  </p>
                </>
              )}

              <div className="absolute bottom-4 text-[10px] font-body font-bold text-slate-400">
                Semana {weekId} · Día {dayId}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Action Button */}
        <AnimatePresence>
          {flipped && (
            <motion.button
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 15 }}
              onClick={onClose}
              className="bg-gold-gradient text-white font-body font-black px-8 py-3.5 rounded-2xl shadow-warm flex items-center justify-center gap-2 active:scale-95 transition-all text-sm md:text-base border border-gold-300 w-full"
            >
              Colocar en Pasaporte <ArrowRight size={16} />
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
