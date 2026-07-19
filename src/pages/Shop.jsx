import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Snowflake, Check, Lock } from 'lucide-react'
import confetti from 'canvas-confetti'
import { useApp } from '../context/AppContext'
import { FRAMES, STREAK_FREEZE_COST, MAX_STREAK_FREEZES } from '../data/shopItems'
import { playCoin, playBell } from '../utils/audio'
import AvatarFrame from '../components/AvatarFrame'

function FrameCard({ frame, avatarId, isOwned, isActive, canAfford, onBuy, onEquip }) {
  return (
    <motion.div
      layout
      className={`bg-white border-4 rounded-3xl p-4 flex flex-col items-center gap-2.5 text-center transition-all ${
        isActive ? 'border-forest-400 shadow-warm' : 'border-cream-200'
      }`}
    >
      <AvatarFrame avatarId={avatarId} frameId={frame.id} size={64} />
      <div>
        <p className="font-display font-black text-forest-800 text-sm leading-tight">{frame.name}</p>
        <p className="font-body text-[10px] text-forest-400 leading-snug mt-1">{frame.desc}</p>
      </div>

      {isActive ? (
        <span className="mt-1 inline-flex items-center gap-1 bg-forest-100 text-forest-600 font-body font-black text-[10px] px-3 py-1.5 rounded-full uppercase tracking-wide">
          <Check size={12} /> Equipado
        </span>
      ) : isOwned ? (
        <button
          onClick={onEquip}
          className="mt-1 bg-forest-500 text-white font-body font-black text-xs px-4 py-1.5 rounded-full active:scale-95 transition-transform"
        >
          Equipar
        </button>
      ) : (
        <button
          onClick={onBuy}
          disabled={!canAfford}
          className={`mt-1 flex items-center gap-1.5 font-body font-black text-xs px-4 py-1.5 rounded-full active:scale-95 transition-transform ${
            canAfford
              ? 'bg-gold-400 text-gold-900 shadow-warm'
              : 'bg-slate-100 text-slate-400 cursor-not-allowed'
          }`}
        >
          {canAfford ? <img src="/assets-duo/points.svg" alt="" className="w-3.5 h-3.5" /> : <Lock size={12} />}
          {frame.cost}
        </button>
      )}
    </motion.div>
  )
}

export default function Shop() {
  const {
    stars,
    childAvatar,
    ownedFrames,
    activeFrame,
    streakFreezes,
    purchaseFrame,
    equipFrame,
    buyStreakFreeze,
  } = useApp()

  const [toast, setToast] = useState(null)

  const handleBuyFrame = (frame) => {
    if (stars < frame.cost) return
    playBell()
    confetti({ particleCount: 90, spread: 55, origin: { y: 0.6 } })
    purchaseFrame(frame.id, frame.cost)
    setToast(`¡Desbloqueaste el ${frame.name}! 🎉`)
    setTimeout(() => setToast(null), 2200)
  }

  const handleEquip = (frameId) => {
    playCoin()
    equipFrame(frameId)
  }

  const handleBuyFreeze = () => {
    if (stars < STREAK_FREEZE_COST || streakFreezes >= MAX_STREAK_FREEZES) return
    playBell()
    confetti({ particleCount: 60, spread: 45, origin: { y: 0.6 } })
    buyStreakFreeze(STREAK_FREEZE_COST, MAX_STREAK_FREEZES)
    setToast('¡Congelador de Racha añadido! 🧊')
    setTimeout(() => setToast(null), 2200)
  }

  const freezeAffordable = stars >= STREAK_FREEZE_COST
  const freezeMaxed = streakFreezes >= MAX_STREAK_FREEZES

  return (
    <div className="px-4 py-5 space-y-6 pb-24">
      {/* Header banner */}
      <div className="bg-white border-4 border-cream-200 rounded-[2.2rem] p-5 shadow-warm-lg flex items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-black text-forest-700 flex items-center gap-2">
            <span>🛍️</span> Tienda de Estrellas
          </h1>
          <p className="font-body text-forest-500 text-sm mt-1 leading-normal">
            Usa tus estrellas ganadas para personalizar tu camino.
          </p>
        </div>
        <div className="flex items-center gap-1.5 bg-gold-50 border-2 border-gold-200 rounded-2xl px-3 py-2 shadow-sm flex-shrink-0">
          <img src="/assets-duo/points.svg" alt="Estrellas" className="w-5 h-5 object-contain" />
          <span className="font-body text-base font-black text-gold-600">{stars}</span>
        </div>
      </div>

      {/* Power-ups */}
      <div>
        <h2 className="font-display font-bold text-forest-700 text-base mb-3">Poderes</h2>
        <div className="bg-white border-4 border-sky-200 rounded-3xl p-4 flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-sky-100 border-2 border-sky-300 flex items-center justify-center flex-shrink-0">
            <Snowflake className="text-sky-500" size={26} />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-display font-black text-forest-800 text-sm">Congelador de Racha</p>
            <p className="font-body text-[11px] text-forest-400 leading-snug mt-0.5">
              Si un día olvidas tu devocional, un congelador protege tu racha automáticamente.
            </p>
            <p className="font-body text-[11px] font-black text-sky-600 mt-1">
              Tienes {streakFreezes} / {MAX_STREAK_FREEZES}
            </p>
          </div>
          <button
            onClick={handleBuyFreeze}
            disabled={!freezeAffordable || freezeMaxed}
            className={`flex-shrink-0 flex items-center gap-1.5 font-body font-black text-xs px-4 py-2 rounded-full active:scale-95 transition-transform ${
              freezeMaxed
                ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                : freezeAffordable
                ? 'bg-sky-400 text-white shadow-sm'
                : 'bg-slate-100 text-slate-400 cursor-not-allowed'
            }`}
          >
            {freezeMaxed ? 'Máximo' : (
              <>
                <img src="/assets-duo/points.svg" alt="" className="w-3.5 h-3.5" />
                {STREAK_FREEZE_COST}
              </>
            )}
          </button>
        </div>
      </div>

      {/* Frames */}
      <div>
        <h2 className="font-display font-bold text-forest-700 text-base mb-3">Marcos de avatar</h2>
        <div className="grid grid-cols-2 gap-3">
          {FRAMES.map(frame => (
            <FrameCard
              key={frame.id}
              frame={frame}
              avatarId={childAvatar}
              isOwned={ownedFrames.includes(frame.id)}
              isActive={activeFrame === frame.id}
              canAfford={stars >= frame.cost}
              onBuy={() => handleBuyFrame(frame)}
              onEquip={() => handleEquip(frame.id)}
            />
          ))}
        </div>
      </div>

      {/* Toast */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            className="fixed bottom-24 left-1/2 lg:left-[calc(50%_+_8rem)] -translate-x-1/2 bg-forest-700 text-white font-body font-black text-sm px-5 py-3 rounded-2xl shadow-warm-lg z-50 whitespace-nowrap"
          >
            {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
