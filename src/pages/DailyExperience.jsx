import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ChevronLeft, ChevronRight, Map, RotateCcw, Check, BookOpen, Star } from 'lucide-react'
import { useApp } from '../context/AppContext'
import { getDayContent } from '../data/dailyContent'
import { MAP_WEEKS } from '../data/dailyContent'
import RewardModal from '../components/RewardModal'

const DAILY_STEPS = [
  { id: 1, icon: '🌅', label: 'Abrí mi corazón a Dios',   desc: 'Oración de apertura — habla con Dios de corazón.' },
  { id: 2, icon: '📖', label: 'Leí el versículo del día',  desc: 'Lee el versículo en voz alta o en silencio.' },
  { id: 3, icon: '📚', label: 'Escuché la lectura',        desc: 'Presta atención a la historia o lectura del día.' },
  { id: 4, icon: '🤔', label: 'Respondí la pregunta',      desc: 'Reflexiona y responde la pregunta central.' },
  { id: 5, icon: '🎯', label: 'Hice la actividad',         desc: 'Realiza la actividad práctica del día.' },
  { id: 6, icon: '🙏', label: 'Oré con mi familia',        desc: 'Cierra con una oración familiar o personal.' },
  { id: 7, icon: '✅', label: 'Me comprometí a algo',      desc: 'Identifica un compromiso concreto para el día.' },
]

const COLOR_MAP = {
  sky:    { bg: 'bg-sky-100',    border: 'border-sky-200',    chip: 'bg-sky-100 text-sky-700',       btn: 'bg-sky-500' },
  gold:   { bg: 'bg-gold-100',   border: 'border-gold-200',   chip: 'bg-gold-100 text-gold-700',     btn: 'bg-gold-500' },
  forest: { bg: 'bg-forest-100', border: 'border-forest-200', chip: 'bg-forest-100 text-forest-700', btn: 'bg-forest-500' },
  rose:   { bg: 'bg-rose-100',   border: 'border-rose-200',   chip: 'bg-rose-100 text-rose-700',     btn: 'bg-rose-400' },
}

export default function DailyExperience() {
  const { weekId, dayId } = useParams()
  const wId = Number(weekId)
  const dId = Number(dayId)
  const navigate = useNavigate()

  const {
    completedDays, getDayStatus, completeDay,
    saveDayResponse, resetDayProgress, mapCurrentWeek, mapCurrentDay,
  } = useApp()

  const dayContent = getDayContent(wId, dId)
  const weekData = MAP_WEEKS.find(w => w.id === wId)
  const dayKey = `w${wId}d${dId}`
  const existingData = completedDays[dayKey] || {}
  const c = COLOR_MAP[weekData?.color] || COLOR_MAP.forest

  const [checked, setChecked] = useState(
    existingData.checkedSteps || {}
  )
  const [response, setResponse] = useState(existingData.response || '')
  const [showReward, setShowReward] = useState(false)
  const [rewardType, setRewardType] = useState('sticker')

  const status = getDayStatus(wId, dId)
  const isAlreadyDone = existingData.completed
  const completedCount = Object.values(checked).filter(Boolean).length
  const allChecked = completedCount === 7
  const progressPct = Math.round((completedCount / 7) * 100)

  // Auto-save response
  useEffect(() => {
    const t = setTimeout(() => {
      if (response !== (existingData.response || '')) {
        saveDayResponse(wId, dId, response)
      }
    }, 1000)
    return () => clearTimeout(t)
  }, [response])

  if (!dayContent || !weekData) {
    return (
      <div className="px-4 py-10 text-center">
        <p className="text-4xl mb-3">😕</p>
        <p className="font-display text-forest-700 font-bold">Contenido no encontrado</p>
        <button onClick={() => navigate('/mapa')} className="mt-4 text-forest-500 font-body text-sm underline">
          Volver al mapa
        </button>
      </div>
    )
  }

  const handleCheck = (stepId) => {
    const newChecked = { ...checked, [stepId]: !checked[stepId] }
    setChecked(newChecked)
    // Save checkedSteps to existing day data
    saveDayResponse(wId, dId, response)
  }

  const handleComplete = () => {
    if (!allChecked) return
    const isWeekFinisher = dId === 7
    setRewardType(isWeekFinisher ? 'medal' : 'sticker')
    completeDay(wId, dId, response)
    setShowReward(true)
  }

  const handleReset = () => {
    resetDayProgress(wId, dId)
    setChecked({})
    setResponse('')
  }

  const goToPrevDay = () => {
    if (dId > 1) navigate(`/dia/${wId}/${dId - 1}`)
    else if (wId > 1) navigate(`/dia/${wId - 1}/7`)
  }

  const goToNextDay = () => {
    if (dId < 7) navigate(`/dia/${wId}/${dId + 1}`)
    else if (wId < 10) navigate(`/dia/${wId + 1}/1`)
  }

  const canGoNext = () => {
    const nextStatus = dId < 7
      ? getDayStatus(wId, dId + 1)
      : wId < 10 ? getDayStatus(wId + 1, 1) : null
    return nextStatus && nextStatus !== 'locked'
  }

  const isLocked = status === 'locked'

  return (
    <>
      <div className="pb-6">
        {/* Header navigation */}
        <div className="flex items-center gap-2 px-4 pt-4 pb-3">
          <button
            onClick={() => navigate('/mapa')}
            className="p-2 rounded-xl bg-cream-200 text-forest-500 hover:bg-cream-300 transition-colors"
          >
            <Map size={18} />
          </button>
          <div className="flex-1 text-center">
            <p className="font-body text-xs text-forest-400">
              Semana {wId} · Día {dId} de 7
            </p>
            <p className="font-display font-bold text-forest-700 text-sm leading-tight">
              {weekData.icon} {weekData.name}
            </p>
          </div>
          <div className="flex gap-1">
            <button
              onClick={goToPrevDay}
              disabled={wId === 1 && dId === 1}
              className="p-2 rounded-xl bg-cream-200 text-forest-500 disabled:opacity-30 hover:bg-cream-300 transition-colors"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={goToNextDay}
              disabled={!canGoNext()}
              className="p-2 rounded-xl bg-cream-200 text-forest-500 disabled:opacity-30 hover:bg-cream-300 transition-colors"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        {/* Locked notice */}
        {isLocked && (
          <div className="mx-4 mb-3 bg-gray-100 border border-gray-200 rounded-2xl px-4 py-3 flex items-center gap-2">
            <span className="text-xl">🔒</span>
            <p className="font-body text-gray-600 text-sm">
              Completa los días anteriores para desbloquear este día.
            </p>
          </div>
        )}

        {/* Day title card */}
        <div className={`mx-4 mb-4 rounded-3xl ${c.bg} border-2 ${c.border} p-5`}>
          {isAlreadyDone && (
            <div className="flex items-center gap-1.5 mb-2">
              <Star size={14} className="text-gold-500 fill-gold-400" />
              <span className="font-body text-xs text-gold-600 font-bold">¡Día completado!</span>
            </div>
          )}
          <h1 className="font-display text-xl font-bold text-forest-800 mb-1">
            {dayContent.title}
          </h1>
          <p className="font-body text-forest-600 text-sm leading-relaxed mb-3">
            {dayContent.objective}
          </p>

          {/* Verse */}
          <div className={`rounded-2xl px-4 py-3 bg-white/60 border ${c.border}`}>
            <div className="flex items-center gap-1.5 mb-1">
              <BookOpen size={12} className="text-forest-400" />
              <span className="font-body text-[10px] text-forest-400 font-bold uppercase tracking-wider">
                Versículo del día
              </span>
            </div>
            <p className={`font-display italic text-sm ${c.chip.split(' ')[1]} leading-relaxed`}>
              {dayContent.verse}
            </p>
          </div>
        </div>

        {/* Reading & Question */}
        <div className="mx-4 mb-4 space-y-3">
          <div className="bg-white rounded-2xl border border-cream-200 px-4 py-3 shadow-card">
            <p className="font-body text-xs text-forest-400 font-bold uppercase tracking-wider mb-1">
              📚 Lectura
            </p>
            <p className="font-body text-forest-700 text-sm">{dayContent.reading}</p>
          </div>
          <div className="bg-white rounded-2xl border border-cream-200 px-4 py-3 shadow-card">
            <p className="font-body text-xs text-forest-400 font-bold uppercase tracking-wider mb-1">
              🤔 Pregunta central
            </p>
            <p className="font-body text-forest-700 text-sm">{dayContent.question}</p>
          </div>
          <div className="bg-white rounded-2xl border border-cream-200 px-4 py-3 shadow-card">
            <p className="font-body text-xs text-forest-400 font-bold uppercase tracking-wider mb-1">
              🎯 Actividad del día
            </p>
            <p className="font-body text-forest-700 text-sm">{dayContent.activity}</p>
          </div>
        </div>

        {/* Progress bar */}
        <div className="mx-4 mb-4">
          <div className="flex justify-between mb-1.5">
            <span className="font-body text-xs text-forest-500">
              Pasos completados: {completedCount}/7
            </span>
            <span className="font-body text-xs text-forest-500 font-bold">{progressPct}%</span>
          </div>
          <div className="h-2.5 bg-green-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-forest-400 to-gold-400 rounded-full transition-all duration-500"
              style={{ width: `${progressPct}%` }}
            />
          </div>
        </div>

        {/* 7-step checklist */}
        <div className="mx-4 mb-5 space-y-2">
          <h2 className="font-display font-bold text-forest-700 text-base mb-3">
            ✅ Los 7 pasos del día
          </h2>
          {DAILY_STEPS.map(step => {
            const done = checked[step.id]
            return (
              <button
                key={step.id}
                onClick={() => !isLocked && handleCheck(step.id)}
                disabled={isLocked}
                className={`
                  w-full flex items-start gap-3 p-3.5 rounded-2xl border-2 text-left transition-all active:scale-[0.98]
                  ${done
                    ? 'bg-forest-100 border-forest-300'
                    : 'bg-white border-cream-200 hover:border-cream-300'}
                `}
              >
                <div className={`
                  flex-shrink-0 w-7 h-7 rounded-xl border-2 flex items-center justify-center mt-0.5
                  ${done ? 'bg-forest-500 border-forest-500' : 'border-cream-300 bg-cream-100'}
                `}>
                  {done && <Check size={14} className="text-white" strokeWidth={3} />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-base">{step.icon}</span>
                    <p className={`font-body font-bold text-sm ${done ? 'text-forest-700 line-through opacity-70' : 'text-forest-800'}`}>
                      {step.label}
                    </p>
                  </div>
                  <p className="font-body text-xs text-forest-400 mt-0.5 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </button>
            )
          })}
        </div>

        {/* Reflection textarea */}
        <div className="mx-4 mb-5">
          <label className="font-body text-xs text-forest-500 font-bold uppercase tracking-wider mb-2 block">
            📝 Mi reflexión de hoy
          </label>
          <textarea
            value={response}
            onChange={e => setResponse(e.target.value)}
            disabled={isLocked}
            placeholder="¿Qué aprendí hoy? ¿Cómo me sentí? ¿Qué quiero recordar?..."
            rows={3}
            className="w-full bg-cream-50 border-2 border-cream-200 rounded-2xl px-4 py-3 font-body text-sm text-forest-700
              placeholder-forest-300 focus:outline-none focus:border-forest-400 resize-none transition-colors"
          />
          {response.length > 0 && (
            <p className="font-body text-[10px] text-forest-300 mt-1 text-right">
              Guardado automáticamente ✓
            </p>
          )}
        </div>

        {/* Action buttons */}
        {!isAlreadyDone ? (
          <div className="mx-4 space-y-2">
            <button
              onClick={handleComplete}
              disabled={!allChecked || isLocked}
              className={`
                w-full py-4 rounded-2xl font-body font-bold text-base text-white transition-all active:scale-95
                ${allChecked && !isLocked
                  ? `${c.btn} shadow-green`
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'}
              `}
            >
              {allChecked ? '🌟 ¡Completar Día!' : `Completa los ${7 - completedCount} pasos restantes`}
            </button>
          </div>
        ) : (
          <div className="mx-4 space-y-2">
            <div className="bg-gold-100 border-2 border-gold-200 rounded-2xl p-4 text-center">
              <p className="text-2xl mb-1">⭐</p>
              <p className="font-display font-bold text-gold-700">¡Día completado!</p>
              <p className="font-body text-gold-600 text-xs mt-0.5">
                Completado el {existingData.date || '—'}
              </p>
            </div>
            <div className="flex gap-2">
              {canGoNext() && (
                <button
                  onClick={goToNextDay}
                  className={`flex-1 py-3 rounded-2xl font-body font-bold text-sm text-white ${c.btn} active:scale-95 transition-transform`}
                >
                  Siguiente día →
                </button>
              )}
              <button
                onClick={handleReset}
                className="p-3 rounded-2xl bg-cream-200 text-forest-500 hover:bg-cream-300 transition-colors"
                title="Rehacer este día"
              >
                <RotateCcw size={18} />
              </button>
            </div>
          </div>
        )}

        {/* Back to map */}
        <div className="mx-4 mt-3">
          <button
            onClick={() => navigate('/mapa')}
            className="w-full py-3 rounded-2xl bg-cream-100 border border-cream-200 text-forest-500 font-body font-bold text-sm hover:bg-cream-200 transition-colors flex items-center justify-center gap-2"
          >
            <Map size={16} /> Volver al mapa
          </button>
        </div>
      </div>

      {/* Reward Modal */}
      {showReward && (
        <RewardModal
          type={rewardType}
          weekId={wId}
          dayId={dId}
          onClose={() => {
            setShowReward(false)
            if (canGoNext()) {
              goToNextDay()
            } else {
              navigate('/mapa')
            }
          }}
        />
      )}
    </>
  )
}
