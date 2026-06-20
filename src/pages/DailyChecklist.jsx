import { useState } from 'react'
import { useApp } from '../context/AppContext'
import { dailyRoutine } from '../data/weeks'
import { CheckCircle2, Circle } from 'lucide-react'

const colorMap = {
  sky: { bg: 'bg-sky-50', border: 'border-sky-200', check: 'text-sky-500', icon: 'bg-sky-100' },
  gold: { bg: 'bg-gold-50', border: 'border-gold-200', check: 'text-gold-500', icon: 'bg-gold-100' },
  forest: { bg: 'bg-forest-50', border: 'border-forest-200', check: 'text-forest-500', icon: 'bg-forest-100' },
  rose: { bg: 'bg-rose-50', border: 'border-rose-200', check: 'text-rose-500', icon: 'bg-rose-100' },
  sand: { bg: 'bg-sand-50', border: 'border-sand-200', check: 'text-sand-500', icon: 'bg-sand-100' },
}

function getTodayLabel() {
  const days = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado']
  const months = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic']
  const now = new Date()
  return `${days[now.getDay()]}, ${now.getDate()} de ${months[now.getMonth()]}`
}

const stepKeys = ['prepare', 'pray1', 'read', 'discover', 'action', 'stamp', 'pray2']

export default function DailyChecklist() {
  const { toggleDailyStep, getTodayChecklist, addPassportStamp, getToday } = useApp()
  const checklist = getTodayChecklist()
  const [stamped, setStamped] = useState(!!checklist.stamp)

  const completed = stepKeys.filter(k => checklist[k]).length
  const percent = Math.round((completed / 7) * 100)
  const allDone = completed === 7

  const handleToggle = (key, index) => {
    toggleDailyStep(key)
    if (key === 'stamp' && !checklist.stamp) {
      addPassportStamp(getToday())
      setStamped(true)
    }
  }

  return (
    <div className="px-4 py-5 space-y-5">
      {/* Header */}
      <div>
        <p className="font-body text-forest-400 text-sm font-semibold">{getTodayLabel()}</p>
        <h1 className="font-display text-2xl font-bold text-forest-700">Mi culto de hoy</h1>
      </div>

      {/* Progress bar */}
      <div className={`rounded-4xl p-5 shadow-warm transition-all duration-500 ${allDone ? 'bg-forest-gradient text-white' : 'bg-white border-2 border-cream-300'}`}>
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className={`font-body text-xs font-bold uppercase tracking-wider ${allDone ? 'text-forest-100' : 'text-forest-400'}`}>
              Progreso de hoy
            </p>
            <p className={`font-display text-3xl font-bold ${allDone ? 'text-white' : 'text-forest-700'}`}>
              {completed} / 7
            </p>
          </div>
          <div className={`text-5xl ${allDone ? 'animate-bounce-gentle' : ''}`}>
            {allDone ? '🎉' : percent >= 50 ? '🌟' : '🙏'}
          </div>
        </div>
        <div className={`h-3 rounded-full overflow-hidden ${allDone ? 'bg-white/20' : 'bg-cream-300'}`}>
          <div
            className={`h-full rounded-full transition-all duration-700 ${allDone ? 'bg-gold-gradient' : 'bg-forest-gradient'}`}
            style={{ width: `${percent}%` }}
          />
        </div>
        {allDone && (
          <p className="font-body text-forest-100 text-sm text-center mt-3 font-semibold">
            ¡Completaste tu culto personal de hoy! 🌟
          </p>
        )}
      </div>

      {/* Steps checklist */}
      <div className="space-y-2.5">
        {dailyRoutine.map((item, i) => {
          const key = stepKeys[i]
          const done = !!checklist[key]
          const c = colorMap[item.color]
          return (
            <button
              key={key}
              onClick={() => handleToggle(key, i)}
              className={`w-full text-left rounded-3xl border-2 p-4 flex items-center gap-3 transition-all duration-200 active:scale-[0.98]
                ${done ? `${c.bg} ${c.border}` : 'bg-white border-cream-300 hover:border-cream-400'}
              `}
            >
              {/* Check icon */}
              <div className="flex-shrink-0">
                {done
                  ? <CheckCircle2 size={26} className={c.check} />
                  : <Circle size={26} className="text-cream-400" />
                }
              </div>
              {/* Step icon */}
              <div className={`w-10 h-10 ${done ? c.icon : 'bg-cream-200'} rounded-2xl flex items-center justify-center text-xl flex-shrink-0 transition-colors`}>
                {item.icon}
              </div>
              {/* Text */}
              <div className="flex-1 min-w-0">
                <p className={`font-body font-bold text-sm ${done ? 'text-forest-700' : 'text-forest-500'} leading-tight`}>
                  {item.step}. {item.title}
                </p>
                <p className="font-body text-forest-400 text-xs mt-0.5 leading-snug line-clamp-2">
                  {item.description}
                </p>
              </div>
              {/* Time badge */}
              <span className="font-body text-[10px] text-forest-300 font-semibold flex-shrink-0">{item.time}</span>
            </button>
          )
        })}
      </div>

      {/* Stamp notification */}
      {stamped && (
        <div className="bg-gold-100 border-2 border-gold-300 rounded-3xl p-4 flex items-center gap-3 animate-scale-in">
          <span className="text-3xl animate-stamp">⭐</span>
          <div>
            <p className="font-body font-bold text-gold-700 text-sm">¡Sticker colocado!</p>
            <p className="font-body text-gold-600 text-xs">Puedes verlo en tu Pasaporte con Jesús</p>
          </div>
        </div>
      )}

      {/* Encouragement */}
      <div className="bg-cream-200 rounded-3xl p-4 text-center">
        <p className="font-display italic text-forest-600 text-sm">
          {allDone
            ? '"¡Lo lograste! Dios escuchó tu corazón hoy."'
            : completed > 0
            ? '"Cada paso que das es importante. ¡Sigue!"'
            : '"Un momento con Dios puede cambiar tu día entero."'
          }
        </p>
      </div>

      {/* Reset hint */}
      <p className="text-center font-body text-forest-300 text-xs">
        Tu progreso de hoy se guarda automáticamente 💾
      </p>
    </div>
  )
}
