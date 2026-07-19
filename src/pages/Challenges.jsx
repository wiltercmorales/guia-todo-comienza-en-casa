import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, Lock, Sparkles, Award, Star, Gift } from 'lucide-react'
import { useApp } from '../context/AppContext'
import { getAvatarPath, getAvatarFallback } from '../data/assets'
import { playBell, playCoin } from '../utils/audio'
import confetti from 'canvas-confetti'

export default function Challenges() {
  const {
    getChallengeProgress,
    claimedChests,
    claimChest,
    stars
  } = useApp()

  const challenges = getChallengeProgress()
  const [openedChest, setOpenedChest] = useState(null) // challengeId of opened chest in modal

  const handleClaimReward = (id) => {
    playBell()
    confetti({
      particleCount: 120,
      spread: 60,
      origin: { y: 0.6 }
    })
    claimChest(id)
    setOpenedChest(id)
  }

  const cofrePath = '/assets-duo/shop.svg'

  return (
    <div className="px-4 py-5 space-y-6 pb-24">
      {/* Header Banner */}
      <div className="bg-white border-4 border-cream-200 rounded-[2.2rem] p-5 shadow-warm-lg">
        <h1 className="font-display text-2xl font-black text-forest-700 flex items-center gap-2">
          <span>🏆</span> Mis Logros y Desafíos
        </h1>
        <p className="font-body text-forest-500 text-sm mt-1 leading-normal">
          ¡Cumple las metas diarias de tu devocional y abre cofres con increíbles premios de estrellas!
        </p>
      </div>

      {/* Challenges Grid List */}
      <div className="grid gap-4">
        {challenges.map((ch) => {
          const isDone = ch.completed
          const isClaimed = claimedChests.includes(ch.id)
          const isClaimable = isDone && !isClaimed

          // Calculate percent progress toward target
          const pct = Math.min(100, Math.round((ch.current / ch.target) * 100))

          return (
            <motion.div
              key={ch.id}
              layout
              className={`bg-white border-4 rounded-3xl p-4.5 flex gap-4 items-center transition-all ${
                isClaimable
                  ? 'border-gold-400 shadow-warm animate-pulse-slow'
                  : isClaimed
                  ? 'border-green-200 shadow-sm opacity-90'
                  : 'border-cream-200 shadow-sm'
              }`}
            >
              {/* Left Column: Chest Image & Status */}
              <div className="flex-shrink-0 flex flex-col items-center justify-center">
                {isClaimed ? (
                  <div className="relative">
                    {/* Open / Claimed state */}
                    <div className="w-14 h-14 bg-green-50 rounded-2xl flex items-center justify-center border-2 border-green-200">
                      <span className="text-3xl">🎁</span>
                    </div>
                    <span className="absolute -bottom-1 -right-1 bg-green-500 text-white rounded-full p-0.5 border border-white">
                      <CheckCircle size={10} strokeWidth={3} />
                    </span>
                  </div>
                ) : (
                  <motion.div
                    animate={isClaimable ? { scale: [1, 1.08, 1], rotate: [0, -3, 3, 0] } : {}}
                    transition={{ repeat: Infinity, duration: 1.8 }}
                    onClick={() => isClaimable && handleClaimReward(ch.id)}
                    className={`w-14 h-14 rounded-2xl flex items-center justify-center border-2 p-1 cursor-pointer ${
                      isClaimable
                        ? 'bg-gold-50 border-gold-300 shadow-gold-sm'
                        : 'bg-slate-100 border-slate-200 opacity-60'
                    }`}
                  >
                    <img
                      src={cofrePath}
                      alt="Cofre"
                      className="w-full h-full object-contain"
                    />
                  </motion.div>
                )}
                
                <span className={`text-[8.5px] font-black uppercase mt-1 leading-none tracking-wider ${
                  isClaimed ? 'text-green-500' : isClaimable ? 'text-gold-500' : 'text-slate-400'
                }`}>
                  {isClaimed ? 'Abierto' : isClaimable ? '¡Listo!' : 'Cerrado'}
                </span>
              </div>

              {/* Right Column: Challenge Info & Progress Bar */}
              <div className="flex-1 min-w-0 space-y-1.5">
                <div className="min-w-0">
                  <h3 className="font-display font-black text-forest-800 text-sm leading-tight truncate">
                    {ch.title}
                  </h3>
                  <p className="font-body text-xs text-forest-500 leading-tight pr-1 mt-0.5">
                    {ch.desc}
                  </p>
                </div>

                {/* Progress bar */}
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-3.5 bg-cream-100 rounded-full border-2 border-cream-200 overflow-hidden relative">
                    <div
                      className={`h-full rounded-full ${isDone ? 'bg-forest-gradient' : 'bg-gold-500'}`}
                      style={{ width: `${pct}%` }}
                    />
                    <span className="absolute inset-0 flex items-center justify-center text-[9px] font-black text-forest-800 leading-none">
                      {ch.current} / {ch.target}
                    </span>
                  </div>
                  
                  {/* Claim Button for complete but unclaimed reward */}
                  {isClaimable && (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleClaimReward(ch.id)}
                      className="bg-gold-gradient text-white text-[10px] font-body font-black px-3 py-1.5 rounded-xl shadow-warm border border-gold-400 leading-none flex-shrink-0 animate-bounce"
                    >
                      ABRIR
                    </motion.button>
                  )}
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Chest Opened Celebration Modal Overlay */}
      <AnimatePresence>
        {openedChest && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 lg:pl-64">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpenedChest(null)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />

            <motion.div
              initial={{ scale: 0.9, y: 55, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 55, opacity: 0 }}
              className="relative bg-white border-4 border-gold-400 rounded-[2.5rem] p-6 max-w-sm w-full text-center shadow-warm-lg z-10 flex flex-col items-center gap-4"
            >
              {/* Chest Animation visual */}
              <div className="relative w-28 h-28 bg-gold-50 border-2 border-gold-200 rounded-full flex items-center justify-center">
                <img src="/assets-duo/shop.svg" alt="Cofre Abierto" className="w-16 h-16 object-contain animate-bounce" />
                <div className="absolute -top-1 -right-1 bg-gold-400 border border-white rounded-full p-1 shadow-sm">
                  <Star size={12} className="text-white fill-white animate-pulse" />
                </div>
              </div>

              {/* Reward Header */}
              <div className="space-y-1">
                <h3 className="font-display font-black text-gold-600 text-lg leading-tight uppercase tracking-tight">
                  🎁 ¡Cofre Abierto!
                </h3>
                <h2 className="font-display font-black text-slate-800 text-2xl leading-none">
                  +15 Estrellas
                </h2>
                <p className="font-body text-xs text-slate-400 font-bold px-3 pt-1 leading-normal">
                  ¡Impresionante! Has reclamado tu recompensa por completar este desafío. Sigue acumulando estrellas para brillar.
                </p>
              </div>

              {/* Close / Confirm Claim */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  playCoin()
                  setOpenedChest(null)
                }}
                className="w-full bg-forest-gradient text-white font-body font-black py-3 rounded-2xl shadow-green border border-forest-400 text-sm"
              >
                ¡Genial! 🌟
              </motion.button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
