import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, Trophy, BookOpen, Calendar, Flame, Star, Award, Clock, ArrowRight } from 'lucide-react'
import confetti from 'canvas-confetti'
import { useApp } from '../context/AppContext'
import { getAvatarPath, getAvatarFallback, getStickerForDay } from '../data/assets'
import { MAP_WEEKS } from '../data/dailyContent'
import { playBell } from '../utils/audio'

export default function SpiritualPassport({ highlightStamp = null, onDismissHighlight = null }) {
  const {
    childName,
    childAge,
    childAvatar,
    startDate,
    streak,
    stars,
    earnedMedals,
    earnedStickers,
    completedWeeks,
    getTotalCompletedDays,
    getChallengeProgress,
    timeStudied
  } = useApp()

  const [selectedSticker, setSelectedSticker] = useState(null)
  const weekRefs = useRef({})

  // Arriving fresh from finishing a day: auto-open the sticker that was just
  // earned and scroll its week page into view, so the child sees exactly
  // where it "got stuck in" the album before continuing.
  useEffect(() => {
    if (!highlightStamp) return
    const { weekId, dayId } = highlightStamp
    const sticker = getStickerForDay(weekId, dayId)

    const timer = setTimeout(() => {
      weekRefs.current[weekId]?.scrollIntoView({ behavior: 'smooth', block: 'center' })
      playBell()
      confetti({ particleCount: 100, spread: 70, origin: { y: 0.4 } })
      setSelectedSticker({
        weekId,
        dayId,
        name: sticker.name,
        path: sticker.path,
        fallback: sticker.fallback,
        isNew: true,
      })
    }, 350)

    return () => clearTimeout(timer)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const closeStickerDialog = () => {
    if (selectedSticker?.isNew && onDismissHighlight) {
      onDismissHighlight()
    } else {
      setSelectedSticker(null)
    }
  }

  const totalDays = 70
  const completedCount = getTotalCompletedDays()
  const progressPct = Math.round((completedCount / totalDays) * 100)
  const activeAvatarPath = getAvatarPath(childAvatar)
  const challenges = getChallengeProgress()
  const completedAchievements = challenges.filter(c => c.completed).length

  return (
    <div className="space-y-6 select-none">
      {/* Passport Book Design */}
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-forest-gradient border-4 border-white rounded-[2.5rem] p-6 shadow-green-lg text-white relative overflow-hidden"
      >
        {/* Decorative background vectors */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full border-2 border-white"
              style={{
                width: `${140 + i * 50}px`,
                height: `${140 + i * 50}px`,
                top: '40%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
              }}
            />
          ))}
        </div>

        <div className="relative space-y-6">
          {/* Header Title */}
          <div className="flex items-center justify-between border-b border-white/20 pb-3">
            <div>
              <p className="font-body text-[10px] text-forest-200 font-black uppercase tracking-widest pl-0.5">
                PASAPORTE CELESTIAL
              </p>
              <h2 className="font-display font-black text-2xl leading-tight">
                Mi Pasaporte
              </h2>
            </div>
            <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center text-2xl border border-white/30">
              ✈️
            </div>
          </div>

          {/* Child ID Info Block */}
          <div className="bg-white/10 backdrop-blur-md border border-white/25 rounded-3xl p-4 flex flex-col md:flex-row items-center gap-4">
            <div className="w-20 h-20 rounded-2xl bg-white border-4 border-gold-300 p-1 flex-shrink-0 flex items-center justify-center shadow-md relative">
              <img
                src={activeAvatarPath}
                alt="Avatar"
                className="w-full h-full object-contain"
                onError={(e) => {
                  e.target.src = getAvatarFallback(childAvatar)
                }}
              />
              <div className="absolute -bottom-2 -right-2 bg-gold-400 border border-white rounded-full p-1 shadow-sm">
                <Sparkles size={10} className="text-white fill-white" />
              </div>
            </div>

            <div className="flex-1 w-full text-center md:text-left space-y-2">
              <div>
                <p className="font-body text-[9px] text-forest-200 font-bold uppercase tracking-wider">
                  Explorador Oficial
                </p>
                <p className="font-display font-black text-lg text-white">
                  {childName || 'Pequeño Viajero'}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-left text-xs font-body text-forest-100">
                <div>
                  <span className="opacity-75">Edad:</span> <span className="font-black text-white">{childAge || '8'} años</span>
                </div>
                <div>
                  <span className="opacity-75">Inicio:</span> <span className="font-black text-white">{startDate || 'Hoy'}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Detailed Statistics stamps */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {[
              { label: 'Días Completados', val: completedCount, icon: <Calendar size={13} />, color: 'bg-white/15' },
              { label: 'Semanas Hechas', val: completedWeeks.length, icon: <Trophy size={13} />, color: 'bg-white/15' },
              { label: 'Estrellas Ganadas', val: stars, icon: <Star size={13} className="fill-gold-300 text-gold-300" />, color: 'bg-gold-500/20 border-gold-400/30' },
              { label: 'Medallas Oro', val: earnedMedals.length, icon: <Award size={13} />, color: 'bg-white/15' },
              { label: 'Racha Activa', val: `${streak} días`, icon: <Flame size={13} className="fill-orange-400 text-orange-400" />, color: 'bg-orange-500/20 border-orange-400/30' },
              { label: 'Tiempo Estudiado', val: `${timeStudied} min`, icon: <Clock size={13} />, color: 'bg-white/15' }
            ].map((stat, idx) => (
              <div key={idx} className={`border border-white/10 rounded-2xl p-2.5 flex items-center gap-2.5 ${stat.color}`}>
                <div className="p-2 rounded-xl bg-white/10 flex-shrink-0 text-white">
                  {stat.icon}
                </div>
                <div className="min-w-0">
                  <p className="font-display font-black text-sm md:text-base leading-none text-white">{stat.val}</p>
                  <p className="font-body text-[9px] text-forest-200 font-bold uppercase tracking-wider truncate mt-0.5">
                    {stat.label}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Progress Bar */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center text-[10px] text-forest-200 font-body font-black uppercase tracking-wider">
              <span>Progreso del Programa</span>
              <span>{progressPct}% ({completedCount}/70 días)</span>
            </div>
            <div className="h-3 bg-white/20 rounded-full border border-white/10 overflow-hidden">
              <div className="h-full bg-gold-gradient rounded-full" style={{ width: `${progressPct}%` }} />
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
              ref={(el) => { weekRefs.current[week.id] = el }}
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
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4 lg:pl-64">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeStickerDialog}
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            />

            <motion.div
              initial={{ scale: 0.9, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 20, opacity: 0 }}
              className="relative w-full max-w-xs bg-white border-4 border-gold-300 rounded-5xl shadow-warm-lg p-5 z-10 text-center"
            >
              <div className={`w-24 h-24 rounded-full bg-gold-50 border-2 border-gold-200 flex items-center justify-center p-2.5 mx-auto mb-3 shadow-inner ${selectedSticker.isNew ? 'stamp-animation' : ''}`}>
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
                {selectedSticker.isNew ? '¡Nueva Estampa Ganada!' : 'Sticker Coleccionado'}
              </h4>
              <h3 className="font-display font-black text-xl text-forest-800 leading-tight mb-2">
                {selectedSticker.name}
              </h3>
              <p className="font-body text-xs text-slate-500 leading-relaxed mb-4">
                {selectedSticker.isNew
                  ? `¡Se pegó en la página de la semana ${selectedSticker.weekId} de tu pasaporte!`
                  : `Ganado el día ${selectedSticker.dayId} de la semana ${selectedSticker.weekId} al tener tu momento con Dios.`}
              </p>

              <button
                onClick={closeStickerDialog}
                className="bg-gold-500 text-white font-body font-bold px-6 py-2.5 rounded-2xl shadow-warm hover:bg-gold-600 transition-colors text-xs inline-flex items-center gap-1.5"
              >
                {selectedSticker.isNew ? (
                  <>Volver a mi camino <ArrowRight size={13} /></>
                ) : (
                  'Cerrar 🌟'
                )}
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
