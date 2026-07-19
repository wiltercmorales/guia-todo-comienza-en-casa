import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronLeft, X, Sparkles, Flame } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useApp } from '../context/AppContext'
import { AVATARS } from '../data/assets'
import AvatarFrame from './AvatarFrame'

export default function Header({ showBack }) {
  const navigate = useNavigate()
  const {
    childName,
    childAvatar,
    setChildAvatar,
    activeFrame,
    streak,
    stars,
    mapCurrentWeek,
    mapCurrentDay,
    getWeekDayCount,
  } = useApp()
  const [showAvatarSelector, setShowAvatarSelector] = useState(false)

  // Current weekly progress percentage (days completed in mapCurrentWeek / 7)
  const completedInCurrentWeek = getWeekDayCount(mapCurrentWeek)
  const weeklyProgressPercent = Math.min(100, Math.round((completedInCurrentWeek / 7) * 100))

  return (
    <>
      <header className="bg-white/95 backdrop-blur-md border-b-4 border-cream-200 px-4 py-3 sticky top-0 z-30 shadow-md rounded-b-[2rem] flex flex-col gap-2">
        <div className="flex items-center justify-between">
          {/* Child Profile & Name */}
          <div className="flex items-center gap-2.5">
            {showBack ? (
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => navigate(-1)}
                className="p-2 rounded-2xl bg-cream-200 text-forest-600 hover:bg-cream-300 transition-colors flex-shrink-0"
              >
                <ChevronLeft size={20} strokeWidth={3} />
              </motion.button>
            ) : (
              <motion.button
                whileHover={{ scale: 1.1, rotate: -5 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setShowAvatarSelector(true)}
                className="relative flex-shrink-0 shadow-md rounded-2xl"
              >
                <AvatarFrame avatarId={childAvatar} frameId={activeFrame} size={44} />
                <div className="absolute -bottom-0.5 -right-0.5 bg-gold-400 border border-white rounded-full p-0.5 shadow-sm">
                  <Sparkles size={8} className="text-white fill-white" />
                </div>
              </motion.button>
            )}

            <div className="min-w-0">
              <h2 className="font-display font-black text-forest-800 text-sm leading-tight truncate">
                {childName || 'Mi Camino'}
              </h2>
              <p className="font-body text-[11px] text-forest-500 font-bold leading-none mt-0.5">
                Semana {mapCurrentWeek} • Día {mapCurrentDay}
              </p>
            </div>
          </div>

          {/* Stats Bar — just streak + stars, kept simple and legible */}
          <div className="flex items-center gap-2 flex-shrink-0">
            {/* Streak */}
            {streak > 0 && (
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-1 bg-orange-50 border-2 border-orange-200 rounded-2xl px-2.5 py-1.5 shadow-sm"
              >
                <Flame size={16} className="text-orange-500 fill-orange-400" />
                <span className="font-body text-sm font-black text-orange-600">{streak}</span>
              </motion.div>
            )}

            {/* Stars — tap to open the Shop */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.92 }}
              onClick={() => navigate('/tienda')}
              className="flex items-center gap-1.5 bg-gold-50 border-2 border-gold-200 rounded-2xl px-2.5 py-1.5 shadow-sm"
              title="Ir a la Tienda de Estrellas"
            >
              <img src="/assets-duo/points.svg" alt="Estrellas" className="w-4.5 h-4.5 object-contain" />
              <span className="font-body text-sm font-black text-gold-600">{stars}</span>
            </motion.button>
          </div>
        </div>

        {/* Weekly Progress Bar */}
        <div className="flex items-center gap-2 px-1 py-0.5">
          <span className="text-[10px] font-bold text-forest-500 font-body flex-shrink-0">
            Progreso Semanal:
          </span>
          <div className="flex-1 h-3.5 bg-cream-100 rounded-full border-2 border-cream-200 overflow-hidden relative progress-gloss-bar">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${weeklyProgressPercent}%` }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="h-full bg-forest-gradient rounded-full"
            />
            <span className="absolute inset-0 flex items-center justify-center text-[9px] font-black text-forest-800 leading-none">
              {completedInCurrentWeek} / 7 días
            </span>
          </div>
        </div>
      </header>

      {/* Interactive Avatar Selection Modal */}
      <AnimatePresence>
        {showAvatarSelector && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4 lg:pl-64">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowAvatarSelector(false)}
              className="absolute inset-0 bg-black/55 backdrop-blur-sm"
            />
            
            <motion.div
              initial={{ scale: 0.9, y: 30, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 30, opacity: 0 }}
              className="relative w-full max-w-md bg-white border-4 border-forest-300 rounded-5xl shadow-warm-lg p-5 z-10 max-h-[85vh] flex flex-col"
            >
              {/* Header inside modal */}
              <div className="flex items-center justify-between mb-4 border-b-2 border-cream-200 pb-3">
                <div className="flex items-center gap-1.5">
                  <span className="text-2xl">🎭</span>
                  <div>
                    <h2 className="font-display font-bold text-forest-700 text-lg leading-tight">
                      Elige tu Personaje
                    </h2>
                    <p className="font-body text-[11px] font-semibold text-forest-400">
                      ¡Aparecerá en tu mapa del camino!
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setShowAvatarSelector(false)}
                  className="p-1.5 rounded-xl bg-cream-200 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Grid list of 37 avatars */}
              <div className="flex-1 overflow-y-auto pr-1 grid grid-cols-4 gap-3 py-2 scroll-smooth">
                {AVATARS.map((avatar) => {
                  const isSelected = childAvatar === avatar.id
                  return (
                    <motion.button
                      key={avatar.id}
                      whileHover={{ scale: 1.08 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        setChildAvatar(avatar.id)
                        setShowAvatarSelector(false)
                      }}
                      className={`
                        relative flex flex-col items-center justify-center p-2 rounded-3xl border-2 transition-all
                        aspect-square
                        ${isSelected
                          ? 'bg-gold-100 border-gold-400 shadow-warm'
                          : 'bg-cream-50 border-cream-300 hover:border-forest-200'}
                      `}
                    >
                      <img
                        src={avatar.path}
                        alt={avatar.name}
                        className="w-11 h-11 object-contain mb-1"
                        onError={(e) => {
                          e.target.src = avatar.fallback
                        }}
                      />
                      <span className="font-body text-[9px] font-bold text-forest-600 tracking-tight leading-none text-center">
                        {avatar.name}
                      </span>
                      {isSelected && (
                        <div className="absolute -top-1 -right-1 bg-green-500 text-white rounded-full w-4 h-4 border border-white flex items-center justify-center text-[9px] font-bold">
                          ✓
                        </div>
                      )}
                    </motion.button>
                  )
                })}
              </div>

              <div className="mt-4 pt-3 border-t-2 border-cream-200 text-center">
                <button
                  onClick={() => setShowAvatarSelector(false)}
                  className="bg-forest-500 text-white font-body font-bold px-6 py-2.5 rounded-2xl shadow-green hover:bg-forest-600 transition-colors text-sm"
                >
                  ¡Listo! ✨
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  )
}
