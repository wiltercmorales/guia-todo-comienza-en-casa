import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, Trophy, BookOpen, Heart, Calendar } from 'lucide-react'
import { getAvatarPath, getAvatarFallback, getStickerForDay } from '../data/assets'
import { MAP_WEEKS } from '../data/dailyContent'

export default function SpiritualPassport({
  childName,
  childAvatar,
  earnedStickers,
  earnedMedals,
}) {
  const [selectedSticker, setSelectedSticker] = useState(null) // { weekId, dayId, name, path }

  const totalDays = 70
  const completedCount = earnedStickers.length
  const progressPct = Math.round((completedCount / totalDays) * 100)
  const activeAvatarPath = getAvatarPath(childAvatar)

  return (
    <div className="space-y-6 select-none">
      {/* Passport Cover Card */}
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-forest-gradient border-4 border-white rounded-4xl p-6 shadow-green-lg text-white relative overflow-hidden"
      >
        {/* Sky / Golden rings deco */}
        <div className="absolute inset-0 opacity-10">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full border-2 border-white"
              style={{
                width: `${100 + i * 40}px`,
                height: `${100 + i * 40}px`,
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
              }}
            />
          ))}
        </div>

        <div className="relative">
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="font-body text-[10px] text-forest-200 font-black uppercase tracking-widest mb-1 pl-0.5">
                Pasaporte Celestial
              </p>
              <h2 className="font-display font-black text-2xl leading-none">
                Pasaporte<br />con Jesús
              </h2>
            </div>
            {/* Stamp Icon */}
            <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center text-2xl border border-white/30">
              ✈️
            </div>
          </div>

          {/* Child ID Section */}
          <div className="bg-white/15 border border-white/10 rounded-2xl p-3 flex items-center gap-3.5 mb-5">
            <div className="w-12 h-12 rounded-xl bg-white/95 border-2 border-gold-300 p-0.5 overflow-hidden flex-shrink-0 flex items-center justify-center">
              <img
                src={activeAvatarPath}
                alt="Avatar"
                className="w-full h-full object-contain"
                onError={(e) => {
                  e.target.src = getAvatarFallback(childAvatar)
                }}
              />
            </div>
            <div>
              <p className="font-body text-[9px] text-forest-200 font-bold uppercase tracking-wider">
                Explorador Celestial
              </p>
              <p className="font-display font-black text-base text-white">
                {childName || 'Pequeño Viajero'} 🌟
              </p>
            </div>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-3 gap-1.5 text-center">
            <div className="bg-white/10 border border-white/5 rounded-xl py-2">
              <p className="font-display font-black text-xl text-gold-300">{completedCount}</p>
              <p className="font-body text-[9px] text-forest-200 uppercase font-black tracking-wider">
                Stickers
              </p>
            </div>
            <div className="bg-white/10 border border-white/5 rounded-xl py-2">
              <p className="font-display font-black text-xl text-gold-300">{progressPct}%</p>
              <p className="font-body text-[9px] text-forest-200 uppercase font-black tracking-wider">
                Avance
              </p>
            </div>
            <div className="bg-white/10 border border-white/5 rounded-xl py-2">
              <p className="font-display font-black text-xl text-gold-300">{earnedMedals.length}</p>
              <p className="font-body text-[9px] text-forest-200 uppercase font-black tracking-wider">
                Medallas
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Album grid (10 Weeks pages) */}
      <div className="space-y-4">
        <h3 className="font-display font-black text-forest-700 text-base mb-3 px-1 flex items-center gap-1.5">
          <BookOpen size={16} />
          Mis páginas de sellos:
        </h3>

        {MAP_WEEKS.map((week, weekIdx) => {
          const isWeekFinished = earnedMedals.includes(week.id)

          return (
            <motion.div
              key={week.id}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: weekIdx * 0.05 }}
              className="bg-white border-2 border-cream-300 rounded-4xl p-4 shadow-sm relative overflow-hidden"
            >
              {/* Header inside week page */}
              <div className="flex items-center justify-between mb-3.5 border-b border-cream-200 pb-2.5">
                <div className="flex items-center gap-2">
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center text-base font-black
                    ${isWeekFinished ? 'bg-gold-400 text-white' : 'bg-cream-200 text-forest-600 border border-cream-300'}`}>
                    {week.id}
                  </div>
                  <div>
                    <h4 className="font-display font-black text-forest-800 text-xs md:text-sm leading-none">
                      Semana {week.id}
                    </h4>
                    <p className="font-body text-[10px] text-forest-400 font-bold uppercase mt-0.5">
                      {week.name}
                    </p>
                  </div>
                </div>

                {isWeekFinished && (
                  <div className="flex items-center gap-1 bg-gold-100/70 border border-gold-300 text-gold-700 font-body font-black text-[9px] px-2 py-0.5 rounded-full animate-bounce">
                    <Trophy size={10} className="fill-gold-300" />
                    ¡MEDALLA GANADA!
                  </div>
                )}
              </div>

              {/* Grid of 7 sticker spots */}
              <div className="grid grid-cols-7 gap-2">
                {Array.from({ length: 7 }, (_, dayIdx) => {
                  const dayId = dayIdx + 1
                  const key = `w${week.id}d${dayId}`
                  const hasSticker = earnedStickers.includes(key)
                  const sticker = getStickerForDay(week.id, dayId)

                  return (
                    <motion.div
                      key={dayIdx}
                      whileHover={hasSticker ? { scale: 1.1, rotate: 3 } : {}}
                      onClick={() => {
                        if (hasSticker) {
                          setSelectedSticker({
                            weekId: week.id,
                            dayId,
                            name: sticker.name,
                            path: sticker.path,
                            fallback: sticker.fallback,
                          })
                        }
                      }}
                      className={`
                        aspect-square rounded-2xl flex items-center justify-center p-1 relative transition-all duration-300
                        ${hasSticker
                          ? 'bg-gold-50 border-2 border-gold-300 shadow-sm cursor-pointer'
                          : 'bg-cream-100/80 border-2 border-dashed border-cream-300 text-cream-400'}
                      `}
                    >
                      {hasSticker ? (
                        <>
                          <img
                            src={sticker.path}
                            alt={sticker.name}
                            className="w-full h-full object-contain"
                            onError={(e) => {
                              e.target.src = sticker.fallback
                            }}
                          />
                          {/* Mini checkmark */}
                          <div className="absolute -bottom-0.5 -right-0.5 bg-green-500 text-white rounded-full w-3.5 h-3.5 border border-white flex items-center justify-center text-[7px] font-bold shadow-sm">
                            ✓
                          </div>
                        </>
                      ) : (
                        <span className="font-body text-[10px] font-black">{dayId}</span>
                      )}
                    </motion.div>
                  )
                })}
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Floating Sticker Inspection Dialog */}
      <AnimatePresence>
        {selectedSticker && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedSticker(null)}
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            />
            
            <motion.div
              initial={{ scale: 0.9, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 20, opacity: 0 }}
              className="relative w-full max-w-xs bg-white border-4 border-gold-300 rounded-5xl shadow-warm-lg p-5 z-10 text-center"
            >
              <div className="w-24 h-24 rounded-full bg-gold-50 border-2 border-gold-200 flex items-center justify-center p-2.5 mx-auto mb-3 shadow-inner">
                <img
                  src={selectedSticker.path}
                  alt={selectedSticker.name}
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    e.target.src = selectedSticker.fallback
                  }}
                />
              </div>
              <h4 className="font-body text-[10px] font-black text-gold-600 uppercase tracking-widest mb-0.5">
                Sticker Coleccionado
              </h4>
              <h3 className="font-display font-black text-xl text-forest-800 leading-tight mb-2">
                {selectedSticker.name}
              </h3>
              <p className="font-body text-xs text-slate-500 leading-relaxed mb-4">
                Ganado el día {selectedSticker.dayId} de la semana {selectedSticker.weekId} al tener tu momento con Dios.
              </p>

              <button
                onClick={() => setSelectedSticker(null)}
                className="bg-gold-500 text-white font-body font-bold px-6 py-2 rounded-2xl shadow-warm hover:bg-gold-600 transition-colors text-xs"
              >
                Cerrar 🌟
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
