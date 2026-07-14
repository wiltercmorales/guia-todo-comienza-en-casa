import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronLeft, Flame, Star, X, Sparkles } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useApp } from '../context/AppContext'
import { AVATARS, getAvatarPath, getAvatarFallback } from '../data/assets'

export default function Header({ title, showBack }) {
  const navigate = useNavigate()
  const { childName, childAvatar, setChildAvatar, streak, earnedStickers } = useApp()
  const [showAvatarSelector, setShowAvatarSelector] = useState(false)

  const activeAvatarPath = getAvatarPath(childAvatar)
  const activeAvatarFallback = getAvatarFallback(childAvatar)

  return (
    <>
      <header className="bg-white/90 backdrop-blur-md border-b-2 border-cream-200 px-4 py-3 flex items-center justify-between sticky top-0 z-30 shadow-sm rounded-b-3xl">
        <div className="flex items-center gap-2">
          {showBack ? (
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => navigate(-1)}
              className="p-2 rounded-2xl bg-cream-200 text-forest-600 hover:bg-cream-300 transition-colors flex-shrink-0"
            >
              <ChevronLeft size={20} strokeWidth={2.5} />
            </motion.button>
          ) : (
            <motion.div
              whileHover={{ rotate: 10 }}
              className="w-9 h-9 rounded-2xl bg-forest-100 flex items-center justify-center text-lg flex-shrink-0 border border-forest-200"
            >
              🚀
            </motion.div>
          )}
          
          <div className="min-w-0 max-w-[150px]">
            <h1 className="font-display font-bold text-forest-800 text-sm md:text-base leading-tight truncate">
              {title || 'Camino al Cielo'}
            </h1>
            <p className="font-body text-[10px] text-forest-400 font-bold uppercase tracking-wider truncate">
              {childName || 'Mi Camino'}
            </p>
          </div>
        </div>

        {/* Stats and Avatar Selector */}
        <div className="flex items-center gap-2">
          {/* Streak Counter */}
          {streak > 0 && (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-1 bg-orange-50 border-2 border-orange-200 rounded-2xl px-2 py-1 shadow-sm"
            >
              <motion.span
                animate={{ y: [0, -3, 0] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
              >
                <Flame size={14} className="text-orange-500 fill-orange-400" />
              </motion.span>
              <span className="font-body text-xs font-black text-orange-600">{streak}</span>
            </motion.div>
          )}

          {/* Stickers count */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-1 bg-gold-50 border-2 border-gold-200 rounded-2xl px-2 py-1 shadow-sm cursor-pointer"
            onClick={() => navigate('/pasaporte')}
          >
            <motion.span
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 10, ease: 'linear' }}
            >
              <Star size={14} className="text-gold-500 fill-gold-300" />
            </motion.span>
            <span className="font-body text-xs font-black text-gold-600">
              {earnedStickers.length}
            </span>
          </motion.div>

          {/* Tap-to-Change Avatar Icon */}
          <motion.button
            whileHover={{ scale: 1.1, rotate: -5 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setShowAvatarSelector(true)}
            className="w-10 h-10 rounded-2xl border-2 border-forest-300 bg-forest-50 p-0.5 overflow-hidden flex items-center justify-center shadow-md relative group flex-shrink-0"
          >
            <img
              src={activeAvatarPath}
              alt="Avatar"
              className="w-full h-full object-contain"
              onError={(e) => {
                e.target.src = activeAvatarFallback
              }}
            />
            <div className="absolute -bottom-0.5 -right-0.5 bg-gold-400 border border-white rounded-full p-0.5 shadow-sm">
              <Sparkles size={8} className="text-white fill-white" />
            </div>
          </motion.button>
        </div>
      </header>

      {/* Interactive Avatar Selection Modal */}
      <AnimatePresence>
        {showAvatarSelector && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
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

              {/* Grid list of 22 avatars */}
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
