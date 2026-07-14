import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { X, ChevronRight } from 'lucide-react'
import { useApp } from '../context/AppContext'
import { getDayContent } from '../data/dailyContent'
import { getAvatarPath } from '../data/assets'
import Header from '../components/Header'
import HeavenlyPath, { getDayNodePos } from '../components/HeavenlyPath'
import ProgressBar from '../components/ProgressBar'

const STATIONS = [
  { weekId: 1,  x: 158, y: 2460, icon: '🌱', label: 'Mi Casa',       color: '#f59e0b', dark: '#92400e', fill: '#fef3c7' },
  { weekId: 2,  x: 232, y: 2240, icon: '🙏', label: 'El Jardín',     color: '#22c55e', dark: '#14532d', fill: '#dcfce7' },
  { weekId: 3,  x: 152, y: 2020, icon: '📖', label: 'La Biblia',     color: '#6366f1', dark: '#312e81', fill: '#ede9fe' },
  { weekId: 4,  x: 238, y: 1800, icon: '😊', label: 'Oración',       color: '#f43f5e', dark: '#881337', fill: '#ffe4e6' },
  { weekId: 5,  x: 150, y: 1580, icon: '🎁', label: 'Compartir',     color: '#f97316', dark: '#7c2d12', fill: '#ffedd5' },
  { weekId: 6,  x: 240, y: 1360, icon: '👨‍👩‍👧', label: 'Familia',       color: '#14b8a6', dark: '#134e4a', fill: '#ccfbf1' },
  { weekId: 7,  x: 148, y: 1140, icon: '🌿', label: 'Discípulo',     color: '#a855f7', dark: '#581c87', fill: '#f3e8ff' },
  { weekId: 8,  x: 242, y: 920,  icon: '✨', label: 'Identidad',     color: '#ef4444', dark: '#7f1d1d', fill: '#fee2e2' },
  { weekId: 9,  x: 146, y: 700,  icon: '💪', label: 'Perseverancia', color: '#0ea5e9', dark: '#0c4a6e', fill: '#e0f2fe' },
  { weekId: 10, x: 195, y: 440,  icon: '🌟', label: 'Con Jesús',     color: '#f59e0b', dark: '#78350f', fill: '#fef9c3' },
]

function getStation(weekId) {
  return STATIONS.find(s => s.weekId === weekId)
}

function DaySheet({ weekId, dayId, status, onClose, onStart }) {
  const content = getDayContent(weekId, dayId)
  const station = getStation(weekId)
  const isCompleted = status === 'completed'
  const isCurrent   = status === 'current'
  const isUnlocked  = status === 'unlocked'

  return (
    <AnimatePresence>
      {/* Background Dim Backdrop */}
      <motion.div
        key="overlay"
        className="fixed inset-0 bg-black/50 z-40 backdrop-blur-[2px]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />
      
      {/* Slide up panel */}
      <motion.div
        key="sheet"
        className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-2xl bg-white rounded-t-[2.5rem] border-t-4 border-forest-300 z-50 px-5 pt-4 pb-8 shadow-warm-lg"
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: 'spring', damping: 30, stiffness: 280 }}
      >
        {/* Drag line */}
        <div className="w-12 h-1.5 bg-slate-200 rounded-full mx-auto mb-4" />

        {/* Info header */}
        <div className="flex items-center gap-3 mb-4">
          <div
            className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0 shadow-sm border-2"
            style={{ backgroundColor: station?.fill || '#fef3c7', borderColor: station?.color || '#f59e0b' }}
          >
            {station?.icon || '⭐'}
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-body text-[10px] text-slate-400 uppercase tracking-widest font-black">
              {station?.label} · Día {dayId} de 7
            </p>
            <p className="font-display font-black text-forest-700 text-lg leading-tight truncate">
              {content?.title || `Semana ${weekId} · Día ${dayId}`}
            </p>
          </div>
          <button onClick={onClose} className="p-2 rounded-xl bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors">
            <X size={18} />
          </button>
        </div>

        {/* State Tag */}
        <div className="mb-4">
          {isCompleted && (
            <span className="inline-flex items-center gap-1.5 bg-green-100 text-green-700 border border-green-200 font-body font-black text-[10px] px-3.5 py-1 rounded-full uppercase tracking-wider">
              ✅ Completado
            </span>
          )}
          {isCurrent && (
            <span className="inline-flex items-center gap-1.5 bg-amber-100 text-amber-700 border border-amber-200 font-body font-black text-[10px] px-3.5 py-1 rounded-full uppercase tracking-wider animate-pulse">
              ▶ Día de Hoy
            </span>
          )}
          {isUnlocked && (
            <span className="inline-flex items-center gap-1.5 bg-sky-100 text-sky-700 border border-sky-200 font-body font-black text-[10px] px-3.5 py-1 rounded-full uppercase tracking-wider">
              🔓 Disponible
            </span>
          )}
        </div>

        {/* Objective */}
        {content?.objective && (
          <div className="bg-forest-100/50 border border-forest-200 rounded-3xl p-4 mb-4">
            <p className="font-body text-[9px] text-forest-500 font-black uppercase tracking-wider mb-1">
              Objetivo diario:
            </p>
            <p className="font-body text-forest-800 text-sm leading-relaxed">
              {content.objective}
            </p>
          </div>
        )}

        {/* Verse */}
        {content?.verse && (
          <div className="bg-gold-50 border border-gold-200 rounded-3xl p-4 mb-5">
            <p className="font-body text-[9px] text-gold-600 font-black uppercase tracking-wider mb-1">
              📖 Versículo:
            </p>
            <p className="font-display italic text-gold-900 text-sm leading-relaxed">
              {content.verse}
            </p>
          </div>
        )}

        {/* Continue Button */}
        <motion.button
          onClick={onStart}
          whileTap={{ scale: 0.96 }}
          className="w-full text-white font-body font-black py-4 rounded-3xl text-base flex items-center justify-center gap-2 shadow-md transition-all"
          style={{ backgroundColor: isCompleted ? '#16a34a' : (station?.color || '#22c55e') }}
        >
          {isCompleted ? '🔁 Repetir este día' : '▶ Comenzar este día'}
          <ChevronRight size={18} />
        </motion.button>
      </motion.div>
    </AnimatePresence>
  )
}

export default function PathMap() {
  const navigate = useNavigate()
  const {
    started,
    childName,
    childAvatar,
    mapCurrentWeek,
    mapCurrentDay,
    earnedMedals,
    getDayStatus,
    getMapProgress,
  } = useApp()

  const [selected, setSelected] = useState(null) // { weekId, dayId }
  const scrollRef = useRef(null)

  const { done, total, percent } = getMapProgress()
  const avatarPath = getAvatarPath(childAvatar)

  // Scroll to active day node on mount
  useEffect(() => {
    if (!scrollRef.current || !started) return
    const container = scrollRef.current
    const svgEl = container.querySelector('svg')
    if (!svgEl) return

    // Calculate position
    const rendered = svgEl.getBoundingClientRect()
    const pos = getDayNodePos(mapCurrentWeek, mapCurrentDay)
    const ratio = pos.y / 2750
    const pxY = ratio * rendered.height
    const halfVP = window.innerHeight * 0.45

    container.scrollTo({ top: pxY - halfVP, behavior: 'smooth' })
  }, [started, mapCurrentWeek, mapCurrentDay])

  const openDay = (weekId, dayId) => setSelected({ weekId, dayId })
  const closeSheet = () => setSelected(null)

  const startDay = () => {
    if (!selected) return
    const { weekId, dayId } = selected
    closeSheet()
    navigate(`/dia/${weekId}/${dayId}`)
  }

  if (!started) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] px-6 text-center">
        <motion.div
          animate={{ y: [0, -12, 0] }}
          transition={{ repeat: Infinity, duration: 2.5 }}
          className="text-7xl mb-6"
        >
          🗺️
        </motion.div>
        <h2 className="font-display font-black text-2xl text-forest-800 mb-2">
          Tu Camino al Cielo
        </h2>
        <p className="font-body text-forest-500 text-sm mb-6 max-w-xs leading-relaxed">
          Comienza el programa para desbloquear tu mapa interactivo y avanzar hacia la Puerta Celestial.
        </p>
        <motion.button
          onClick={() => navigate('/')}
          className="bg-forest-gradient text-white font-body font-black px-8 py-3.5 rounded-2xl shadow-green-lg text-base"
          whileTap={{ scale: 0.95 }}
        >
          Comenzar el programa →
        </motion.button>
      </div>
    )
  }

  const selectedStatus = selected ? getDayStatus(selected.weekId, selected.dayId) : null

  return (
    <div className="flex flex-col h-full min-h-0 bg-cream-100 relative">
      {/* Custom Child Header */}
      <div className="flex-shrink-0 z-10">
        <Header title="Camino al Cielo" showBack={false} />
        
        {/* Floating progress widget */}
        <div className="px-4 py-2 bg-white/70 border-b border-cream-200">
          <ProgressBar
            percent={percent}
            avatar={avatarPath}
            label={`Completado: ${done} de ${total} días`}
          />
        </div>
      </div>

      {/* Map Content */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto relative"
        style={{ overscrollBehavior: 'contain' }}
      >
        <HeavenlyPath
          mapCurrentWeek={mapCurrentWeek}
          mapCurrentDay={mapCurrentDay}
          earnedMedals={earnedMedals}
          getDayStatus={getDayStatus}
          openDay={openDay}
          childAvatar={childAvatar}
        />
        
        {/* Bottom space padding */}
        <div className="h-8 bg-[#fef3c7]" />
      </div>

      {/* Floating Continue floating action trigger */}
      <div className="absolute bottom-20 right-4 z-20">
        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate(`/dia/${mapCurrentWeek}/${mapCurrentDay}`)}
          className="flex items-center gap-2 bg-gradient-to-r from-forest-500 to-green-500 text-white font-body font-black px-5 py-3 rounded-full shadow-green-lg text-xs md:text-sm border border-white/20"
        >
          <span>▶</span> ¡Ir al Día de Hoy!
        </motion.button>
      </div>

      {/* Detail Bottom sheet */}
      {selected !== null && (
        <DaySheet
          weekId={selected.weekId}
          dayId={selected.dayId}
          status={selectedStatus}
          onClose={closeSheet}
          onStart={startDay}
        />
      )}
    </div>
  )
}
