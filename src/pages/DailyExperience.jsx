import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ChevronLeft, ChevronRight, Map, RotateCcw } from 'lucide-react'
import { motion } from 'framer-motion'
import { useApp } from '../context/AppContext'
import { getDayContent, MAP_WEEKS } from '../data/dailyContent'
import Header from '../components/Header'
import DailyActivity from '../components/DailyActivity'
import RewardCard from '../components/RewardCard'

const COLOR_MAP = {
  sky:    { bg: 'bg-sky-50',    border: 'border-sky-300',    chip: 'bg-sky-100 text-sky-700',       btn: 'bg-sky-500' },
  gold:   { bg: 'bg-gold-50',   border: 'border-gold-300',   chip: 'bg-gold-100 text-gold-700',     btn: 'bg-gold-500' },
  forest: { bg: 'bg-forest-50', border: 'border-forest-300', chip: 'bg-forest-100 text-forest-700', btn: 'bg-forest-500' },
  rose:   { bg: 'bg-rose-50',   border: 'border-rose-300',   chip: 'bg-rose-100 text-rose-700',     btn: 'bg-rose-400' },
}

export default function DailyExperience() {
  const { weekId, dayId } = useParams()
  const wId = Number(weekId)
  const dId = Number(dayId)
  const navigate = useNavigate()

  const {
    completedDays,
    getDayStatus,
    completeDay,
    saveDayResponse,
    resetDayProgress,
  } = useApp()

  const dayContent = getDayContent(wId, dId)
  const weekData = MAP_WEEKS.find((w) => w.id === wId)
  const dayKey = `w${wId}d${dId}`
  const existingData = completedDays[dayKey] || {}
  const c = COLOR_MAP[weekData?.color] || COLOR_MAP.forest

  const [checked, setChecked] = useState({})
  const [response, setResponse] = useState('')
  const [showReward, setShowReward] = useState(false)
  const [rewardType, setRewardType] = useState('sticker')

  // Sync state when day key changes
  useEffect(() => {
    setChecked(existingData.checkedSteps || {})
    setResponse(existingData.response || '')
  }, [dayKey, existingData.checkedSteps, existingData.response])

  // Autosave response
  useEffect(() => {
    const t = setTimeout(() => {
      if (response !== (existingData.response || '')) {
        saveDayResponse(wId, dId, response)
      }
    }, 800)
    return () => clearTimeout(t)
  }, [response])

  if (!dayContent || !weekData) {
    return (
      <div className="px-4 py-12 text-center bg-cream-100 min-h-screen flex flex-col justify-center items-center">
        <p className="text-5xl mb-4">😕</p>
        <p className="font-display text-forest-800 font-bold text-lg">Contenido no encontrado</p>
        <button onClick={() => navigate('/mapa')} className="mt-4 bg-forest-500 text-white font-body font-bold px-6 py-2 rounded-2xl shadow-green">
          Volver al mapa
        </button>
      </div>
    )
  }

  const status = getDayStatus(wId, dId)
  const isAlreadyDone = !!existingData.completed
  const completedCount = Object.values(checked).filter(Boolean).length
  const allChecked = completedCount === 7

  const handleToggleStep = (stepId) => {
    const newChecked = { ...checked, [stepId]: !checked[stepId] }
    setChecked(newChecked)

    // Save check state to localStorage
    const savedChecked = {
      ...existingData,
      checkedSteps: newChecked,
      response,
    }
    // Set checked steps in context via saveDayResponse helper structure
    setStateCheckedHelper(newChecked)
  }

  const setStateCheckedHelper = (newChecked) => {
    // Modify completedDays entry directly
    completedDays[dayKey] = {
      ...completedDays[dayKey],
      checkedSteps: newChecked,
    }
    saveDayResponse(wId, dId, response)
  }

  const handleComplete = () => {
    if (!allChecked) return
    const isWeekFinisher = dId === 7
    setRewardType(isWeekFinisher ? 'medal' : 'sticker')
    completeDay(wId, dId, response)
    
    // Explicitly update checklist state to make sure it renders 7 checked steps immediately
    const fullChecked = { 1:true, 2:true, 3:true, 4:true, 5:true, 6:true, 7:true }
    setChecked(fullChecked)
    setStateCheckedHelper(fullChecked)

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
    <div className="min-h-screen bg-cream-100 flex flex-col">
      {/* Premium Header */}
      <Header title={`Día ${dId}: ${dayContent.title}`} showBack={true} />

      {/* Main content scroll container */}
      <div className="flex-1 overflow-y-auto px-4 py-4 pb-28">
        
        {/* Navigation back/forward day control */}
        <div className="flex items-center justify-between mb-4 bg-white/50 border border-cream-200 rounded-2xl p-2 shadow-sm">
          <button
            onClick={() => navigate('/mapa')}
            className="flex items-center gap-1.5 px-3 py-2 bg-cream-200 text-forest-700 font-body font-bold text-xs rounded-xl hover:bg-cream-300 transition-colors"
          >
            <Map size={14} /> Mapa
          </button>
          
          <div className="flex gap-2">
            <button
              onClick={goToPrevDay}
              disabled={wId === 1 && dId === 1}
              className="flex items-center gap-1 p-2 bg-white border border-cream-200 text-forest-600 rounded-xl disabled:opacity-30 active:scale-95 transition-all shadow-sm"
              title="Día Anterior"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={goToNextDay}
              disabled={!canGoNext()}
              className="flex items-center gap-1 p-2 bg-white border border-cream-200 text-forest-600 rounded-xl disabled:opacity-30 active:scale-95 transition-all shadow-sm"
              title="Siguiente Día"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

        {/* Lock status banner */}
        {isLocked && (
          <div className="mb-4 bg-amber-50 border-2 border-amber-200 rounded-3xl p-4 flex items-center gap-3">
            <span className="text-3xl animate-bounce">🔒</span>
            <div>
              <h4 className="font-display font-black text-amber-800 text-sm">Este día está cerrado</h4>
              <p className="font-body text-amber-700 text-xs mt-0.5 leading-snug">
                Completa las lecciones de los días anteriores en el mapa para desbloquearlo.
              </p>
            </div>
          </div>
        )}

        {/* Main interactive activity view */}
        <DailyActivity
          dayContent={dayContent}
          weekData={weekData}
          checkedSteps={checked}
          onToggleStep={handleToggleStep}
          response={response}
          onResponseChange={setResponse}
          onComplete={handleComplete}
          allChecked={allChecked}
          isLocked={isLocked}
          isAlreadyDone={isAlreadyDone}
          c={c}
        />

        {/* Action reset option */}
        {isAlreadyDone && (
          <div className="mt-5 border-t-2 border-cream-200 pt-4 flex gap-3">
            {canGoNext() && (
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={goToNextDay}
                className="flex-1 py-3 bg-forest-500 text-white font-body font-black text-sm rounded-2xl shadow-green hover:bg-forest-600 transition-colors flex items-center justify-center gap-1.5"
              >
                Siguiente Día <ChevronRight size={16} />
              </motion.button>
            )}
            <button
              onClick={handleReset}
              className="p-3 bg-cream-200 text-forest-700 hover:bg-cream-300 rounded-2xl transition-colors flex items-center justify-center shadow-sm"
              title="Rehacer esta lección"
            >
              <RotateCcw size={16} />
            </button>
          </div>
        )}
      </div>

      {/* Celebratory Reward Modal card overlay */}
      {showReward && (
        <RewardCard
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
    </div>
  )
}
