import { useState } from 'react'
import { useApp } from '../context/AppContext'

const STICKER_EMOJIS = ['🌟', '✝️', '🙏', '💛', '📖', '✨', '🌸', '🕊️', '🌈', '🎁', '💎', '🌿', '⭐', '🏆', '❤️']

function getWeekFromDate(dateStr) {
  const d = new Date(dateStr)
  const start = new Date(d)
  start.setDate(start.getDate() - start.getDay())
  return start.toISOString().split('T')[0]
}

function formatDate(dateStr) {
  const months = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic']
  const d = new Date(dateStr)
  return `${d.getDate()} ${months[d.getMonth()]}`
}

export default function Passport() {
  const { passportStamps, childName, addPassportStamp, getToday } = useApp()
  const [justStamped, setJustStamped] = useState(null)
  const today = getToday()
  const hasStampToday = passportStamps.includes(today)

  const handleStampToday = () => {
    if (!hasStampToday) {
      addPassportStamp(today)
      setJustStamped(today)
      setTimeout(() => setJustStamped(null), 2000)
    }
  }

  const getStickerForDate = (dateStr) => {
    const hash = dateStr.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0)
    return STICKER_EMOJIS[hash % STICKER_EMOJIS.length]
  }

  // Build a 10-week grid (70 slots)
  const totalDays = 70
  const slots = Array.from({ length: totalDays }, (_, i) => {
    const d = new Date()
    d.setDate(d.getDate() - (today ? 0 : 0) + i - totalDays + 1)
    return d.toISOString().split('T')[0]
  })

  return (
    <div className="px-4 py-5 space-y-5">
      {/* Passport cover */}
      <div className="bg-forest-gradient rounded-4xl p-6 shadow-green-lg text-white relative overflow-hidden">
        {/* Decorative pattern */}
        <div className="absolute inset-0 opacity-10">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full border-2 border-white"
              style={{
                width: `${60 + i * 30}px`,
                height: `${60 + i * 30}px`,
                top: '50%', left: '50%',
                transform: 'translate(-50%, -50%)',
              }}
            />
          ))}
        </div>

        <div className="relative">
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="font-body text-forest-100 text-xs font-bold uppercase tracking-widest mb-1">
                Pasaporte Espiritual
              </p>
              <h1 className="font-display text-2xl font-bold leading-tight">
                Pasaporte<br />con Jesús
              </h1>
            </div>
            <div className="w-14 h-14 bg-white/20 rounded-3xl flex items-center justify-center text-3xl">
              ✝️
            </div>
          </div>

          <div className="bg-white/15 rounded-2xl px-4 py-3">
            <p className="font-body text-forest-100 text-xs">Titular</p>
            <p className="font-display font-semibold text-white text-lg">
              {childName || 'Mi Niño/a'} 🌟
            </p>
          </div>

          <div className="flex items-center justify-between mt-4">
            <div className="text-center">
              <p className="font-display font-bold text-3xl text-gold-300">{passportStamps.length}</p>
              <p className="font-body text-forest-200 text-xs">días con Dios</p>
            </div>
            <div className="text-center">
              <p className="font-display font-bold text-3xl text-gold-300">
                {Math.round((passportStamps.length / 70) * 100)}%
              </p>
              <p className="font-body text-forest-200 text-xs">del programa</p>
            </div>
            <div className="text-center">
              <p className="font-display font-bold text-3xl text-gold-300">10</p>
              <p className="font-body text-forest-200 text-xs">semanas</p>
            </div>
          </div>
        </div>
      </div>

      {/* Stamp today button */}
      {!hasStampToday ? (
        <button
          onClick={handleStampToday}
          className="w-full bg-gold-gradient text-white font-body font-bold py-4 rounded-2xl shadow-warm-lg flex items-center justify-center gap-2 active:scale-95 transition-all"
        >
          <span className="text-xl">⭐</span>
          Marcar mi culto de hoy
          <span className="text-xl">⭐</span>
        </button>
      ) : (
        <div className="w-full bg-forest-100 border-2 border-forest-300 text-forest-600 font-body font-bold py-4 rounded-2xl flex items-center justify-center gap-2">
          <span className="text-xl">✅</span>
          ¡Ya marcaste tu culto de hoy!
        </div>
      )}

      {/* Just stamped animation */}
      {justStamped && (
        <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
          <div className="bg-white rounded-4xl px-8 py-6 shadow-warm-lg text-center animate-scale-in">
            <div className="text-6xl mb-2 animate-stamp">{getStickerForDate(justStamped)}</div>
            <p className="font-display font-bold text-forest-700 text-xl">¡Sellado!</p>
            <p className="font-body text-forest-500 text-sm">Hoy buscaste a Dios</p>
          </div>
        </div>
      )}

      {/* 10-week passport pages */}
      <div>
        <p className="font-body text-forest-500 text-xs font-bold uppercase tracking-wider mb-3">
          Mis páginas del pasaporte — 10 semanas
        </p>
        <div className="space-y-3">
          {Array.from({ length: 10 }, (_, weekIndex) => {
            const weekStamps = passportStamps.filter((_, i) => {
              const weekStart = weekIndex * 7
              const weekEnd = weekStart + 7
              const sortedStamps = [...passportStamps].sort()
              const si = sortedStamps.indexOf(passportStamps[i])
              return si >= weekStart && si < weekEnd
            })
            const weekSortedStamps = [...passportStamps].sort().slice(weekIndex * 7, weekIndex * 7 + 7)

            return (
              <div key={weekIndex} className="bg-white rounded-3xl border-2 border-cream-300 p-4 shadow-card">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className={`w-7 h-7 rounded-xl flex items-center justify-center text-sm font-bold
                      ${weekSortedStamps.length >= 5 ? 'bg-forest-500 text-white' : 'bg-cream-300 text-forest-500'}`}>
                      {weekIndex + 1}
                    </div>
                    <span className="font-body font-semibold text-forest-700 text-sm">Semana {weekIndex + 1}</span>
                  </div>
                  <span className="font-body text-xs text-forest-400 font-semibold">
                    {weekSortedStamps.length}/7 días
                  </span>
                </div>

                {/* 7 stamp slots */}
                <div className="flex gap-2 flex-wrap">
                  {Array.from({ length: 7 }, (_, dayIndex) => {
                    const dateStr = weekSortedStamps[dayIndex]
                    const hasStamp = !!dateStr
                    return (
                      <div
                        key={dayIndex}
                        className={`w-10 h-10 rounded-2xl flex items-center justify-center text-xl transition-all
                          ${hasStamp
                            ? 'bg-gold-100 border-2 border-gold-300 shadow-warm'
                            : 'bg-cream-200 border-2 border-cream-300'
                          }`}
                      >
                        {hasStamp ? (
                          <span title={formatDate(dateStr)}>{getStickerForDate(dateStr)}</span>
                        ) : (
                          <span className="text-cream-400 text-xs font-body font-bold">{dayIndex + 1}</span>
                        )}
                      </div>
                    )
                  })}
                </div>

                {/* Week completion badge */}
                {weekSortedStamps.length >= 4 && (
                  <div className="mt-2 flex items-center gap-1.5">
                    <span className="text-sm">🏆</span>
                    <span className="font-body text-forest-500 text-xs font-semibold">
                      {weekSortedStamps.length >= 7 ? '¡Semana perfecta!' : 'Meta mínima alcanzada'}
                    </span>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* Motivation */}
      <div className="bg-cream-200 rounded-3xl p-4 text-center">
        <p className="font-display italic text-forest-600 text-sm">
          "Este sticker nos recuerda que hoy tuvimos un momento con Dios."
        </p>
      </div>
    </div>
  )
}
