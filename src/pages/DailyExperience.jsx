import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, Check, Lock, Sparkles, Trophy, Star } from 'lucide-react'
import confetti from 'canvas-confetti'
import { useApp, getStepsForDay } from '../context/AppContext'
import { getDayContent, MAP_WEEKS } from '../data/dailyContent'
import { getStickerForDay } from '../data/assets'
import { playCoin, playBell } from '../utils/audio'

export default function DailyExperience() {
  const { weekId, dayId } = useParams()
  const navigate = useNavigate()
  
  const wId = Number(weekId)
  const dId = Number(dayId)
  const dayKey = `w${wId}d${dId}`

  const {
    completedDays,
    toggleStepCheck,
    completeDay,
    saveDayResponse,
    getDayStatus
  } = useApp()

  const dayContent = getDayContent(wId, dId)
  const weekData = MAP_WEEKS.find(w => w.id === wId)
  const dayData = completedDays[dayKey] || { completed: false, checkedSteps: {}, response: '' }
  const checkedSteps = dayData.checkedSteps || {}
  const responseText = dayData.response || ''

  const [localResponse, setLocalResponse] = useState(responseText)
  const [showCompleteModal, setShowCompleteModal] = useState(false)

  // Load steps
  const steps = getStepsForDay(dayContent)

  // Sync text area response
  useEffect(() => {
    setLocalResponse(responseText)
  }, [responseText])

  // Save response on text input change
  const handleResponseChange = (text) => {
    setLocalResponse(text)
    saveDayResponse(wId, dId, text)
  }

  // Check if all steps of the day are completed
  const totalSteps = steps.length
  const completedStepsCount = steps.filter(s => checkedSteps[s.id]).length
  const isDayFullyChecked = totalSteps > 0 && completedStepsCount === totalSteps

  // Trigger confetti and completion modal when fully checked for the first time
  useEffect(() => {
    if (isDayFullyChecked && !dayData.completed && !showCompleteModal) {
      playBell()
      confetti({
        particleCount: 150,
        spread: 80,
        origin: { y: 0.6 }
      })
      setShowCompleteModal(true)
    }
  }, [isDayFullyChecked, dayData.completed])

  if (!dayContent || !weekData) {
    return (
      <div className="min-h-screen bg-cream-100 flex flex-col justify-center items-center p-6 text-center">
        <p className="text-6xl mb-4">😕</p>
        <h2 className="font-display font-black text-xl text-forest-800">Lección no encontrada</h2>
        <button onClick={() => navigate('/mapa')} className="mt-4 bg-forest-500 text-white font-body font-black px-6 py-2.5 rounded-2xl shadow-green">
          Volver al mapa
        </button>
      </div>
    )
  }

  const handleCheckboxClick = (stepId, isStepUnlocked) => {
    if (!isStepUnlocked) return
    playCoin()
    toggleStepCheck(wId, dId, stepId)
  }

  // Detect if finishing this day will complete the entire week (unit transition)
  const willCompleteWeek = Array.from({ length: 7 }, (_, i) => {
    const dKey = `w${wId}d${i + 1}`
    return (i + 1) === dId ? true : completedDays[dKey]?.completed
  }).every(Boolean)

  const earnedSticker = getStickerForDay(wId, dId)

  const handleFinishDay = () => {
    completeDay(wId, dId, localResponse)
    setShowCompleteModal(false)
    // Detour through the Passport to show the new stamp being "stuck in",
    // then come back to the map (with the unit-transition banner if earned).
    navigate('/pasaporte', {
      state: {
        newStamp: { weekId: wId, dayId: dId },
        unitCompleted: willCompleteWeek ? wId : null,
      },
    })
  }

  // Color mapping
  const colorSchemes = {
    sky: { primary: 'bg-sky-500 border-sky-400 shadow-sky-200 text-sky-600', fill: 'bg-sky-50', hover: 'hover:border-sky-300' },
    gold: { primary: 'bg-gold-500 border-gold-400 shadow-gold-200 text-gold-600', fill: 'bg-gold-50', hover: 'hover:border-gold-300' },
    rose: { primary: 'bg-rose-500 border-rose-400 shadow-rose-200 text-rose-600', fill: 'bg-rose-50', hover: 'hover:border-rose-300' },
    forest: { primary: 'bg-forest-500 border-forest-400 shadow-forest-200 text-forest-600', fill: 'bg-forest-50', hover: 'hover:border-forest-300' }
  }
  const colorClass = colorSchemes[weekData.color] || colorSchemes.forest

  return (
    <div className="min-h-screen bg-cream-50 flex flex-col">
      {/* Premium Subheader/Navbar */}
      <div className="bg-white px-4 py-3.5 border-b-2 border-cream-200 flex items-center gap-3 sticky top-0 z-20 shadow-sm">
        <button
          onClick={() => navigate('/mapa')}
          className="p-2 rounded-2xl bg-cream-100 text-forest-600 hover:bg-cream-200 transition-colors flex-shrink-0"
        >
          <ChevronLeft size={20} strokeWidth={2.5} />
        </button>
        <div className="min-w-0">
          <p className="font-body text-[10px] text-forest-400 font-bold uppercase tracking-wider leading-none">
            {weekData.name} • Día {dId}
          </p>
          <h1 className="font-display font-black text-forest-800 text-base leading-tight truncate mt-0.5">
            {dayContent.dayName === 'SÁBADO' ? `Sábado: ${dayContent.bibleStudy}` : dayContent.title}
          </h1>
        </div>
      </div>

      {/* Main Container */}
      <div className="flex-1 max-w-2xl w-full mx-auto px-4 py-6 pb-28 space-y-6">
        
        {/* Weekly Header Banner (Bible Study & Core Info) */}
        <div className="bg-white border-4 border-cream-200 rounded-[2.2rem] p-5 shadow-warm-lg space-y-4">
          <div className="flex items-center gap-2">
            <span className="text-2xl">{weekData.icon}</span>
            <div className="bg-cream-100 rounded-full px-3.5 py-1 text-[11px] font-black text-forest-700 font-body uppercase tracking-wider">
              Estudio: {dayContent.bibleStudy}
            </div>
          </div>

          {/* If Saturday/Introduction, highlight the bibleBase, verse and message */}
          {dayContent.dayName === 'SÁBADO' ? (
            <div className="space-y-4">
              <div className="bg-sky-50 border-2 border-sky-200 rounded-3xl p-4">
                <p className="font-body text-[10px] text-sky-600 font-black uppercase tracking-wider mb-1">📖 Base Bíblica:</p>
                <p className="font-display font-bold text-sky-900 text-sm">{dayContent.bibleBase}</p>
              </div>

              <div className="bg-gold-50 border-2 border-gold-200 rounded-3xl p-4">
                <p className="font-body text-[10px] text-gold-600 font-black uppercase tracking-wider mb-1">📜 Versículo de la Semana:</p>
                <p className="font-display italic font-bold text-gold-900 text-sm leading-relaxed">
                  "{dayContent.verse}"
                </p>
              </div>

              <div className="bg-forest-50 border-2 border-forest-200 rounded-3xl p-4">
                <p className="font-body text-[10px] text-forest-600 font-black uppercase tracking-wider mb-1">✨ Mensaje Principal:</p>
                <p className="font-body font-bold text-forest-900 text-sm leading-relaxed">
                  {dayContent.message}
                </p>
              </div>
            </div>
          ) : (
            /* For standard days, show a small intro verse & base helper at the top */
            <div className="flex justify-between items-center bg-cream-50 border-2 border-cream-100 rounded-2xl px-4 py-2.5 text-xs text-forest-700 font-body">
              <span className="font-black">📖 {dayContent.bibleStudy}</span>
              <span className="opacity-75">Día {dId}</span>
            </div>
          )}
        </div>

        {/* Step Progress Bar */}
        <div className="space-y-1.5 px-1">
          <div className="flex justify-between items-center text-xs font-black text-forest-600 font-body">
            <span>PASOS DEL DÍA</span>
            <span>{completedStepsCount} de {totalSteps} completados</span>
          </div>
          <div className="h-4 bg-cream-200 rounded-full border-2 border-cream-300 overflow-hidden relative shadow-inner progress-gloss-bar">
            <motion.div
              animate={{ width: `${(completedStepsCount / totalSteps) * 100}%` }}
              className={`h-full bg-forest-gradient rounded-full`}
            />
          </div>
        </div>

        {/* Sequential Step pipeline (Duolingo Style) */}
        <div className="space-y-5">
          {steps.map((step, index) => {
            const isChecked = !!checkedSteps[step.id]
            
            // A step is unlocked if it's the first step OR if the previous step is checked.
            const isUnlocked = index === 0 || !!checkedSteps[steps[index - 1].id]
            const isCurrent = isUnlocked && !isChecked

            return (
              <div key={step.id}>
                {/* Section break: everything from "Historia" onward is the
                    actual Sabbath School lesson content for the day, so it
                    gets its own heading + the day's title, separate from the
                    Bible Study reading step above it. */}
                {step.id === 'story' && (
                  <div className="mb-4 px-1">
                    <h3 className="font-display font-black text-forest-800 text-base mb-2">
                      Lección de escuela sabática
                    </h3>
                    {dayContent.title && (
                      <span className="inline-block bg-gold-100 border border-gold-300 text-gold-800 font-body font-bold text-xs px-3.5 py-1.5 rounded-full">
                        {dayContent.title}
                      </span>
                    )}
                  </div>
                )}

                <motion.div
                  layout
                  className={`transition-all duration-300 rounded-[2rem] border-4 ${
                    isChecked
                      ? 'bg-green-50 border-green-300 shadow-sm'
                      : isCurrent
                      ? 'bg-white border-forest-400 shadow-warm'
                      : 'bg-slate-50 border-slate-200 opacity-60'
                  }`}
                >
                {/* Step Header */}
                <div className="flex items-center justify-between p-4 border-b-2 border-cream-100">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-display font-black text-xs border-2 ${
                      isChecked
                        ? 'bg-green-500 border-green-600 text-white'
                        : isUnlocked
                        ? 'bg-forest-500 border-forest-600 text-white'
                        : 'bg-slate-300 border-slate-400 text-slate-500'
                    }`}>
                      {index + 1}
                    </div>
                    <span className="font-display font-black text-forest-800 text-sm">
                      {step.label}
                    </span>
                  </div>

                  {!isUnlocked && <Lock size={16} className="text-slate-400" />}
                </div>

                {/* Step Content */}
                {isUnlocked ? (
                  <div className="p-5 space-y-4">
                    {/* STEP 0: Bible Study reading (the actual scripture, read as a family) */}
                    {step.id === 'bibleStudy' && (
                      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 space-y-2">
                        <p className="font-body text-[10px] text-amber-600 font-black uppercase tracking-wider">
                          Hoy leeremos juntos:
                        </p>
                        <p className="font-display italic font-black text-amber-950 text-base leading-relaxed">
                          {dayContent.bibleStudy}
                        </p>
                        {dayContent.bibleBase && (
                          <p className="font-body text-xs text-amber-700 font-bold">
                            📍 {dayContent.bibleBase}
                          </p>
                        )}
                        <p className="font-body text-xs text-amber-700 leading-relaxed">
                          Abran la Biblia en familia y lean juntos esta historia antes de continuar.
                        </p>
                      </div>
                    )}

                    {/* STEP 1: History Content */}
                    {step.id === 'story' && (
                      <div className="max-h-64 overflow-y-auto bg-slate-50 border border-slate-200 rounded-2xl p-4 font-body text-slate-700 text-sm leading-relaxed scroll-smooth">
                        {dayContent.story}
                      </div>
                    )}

                    {/* STEP 2: Questions (Piensen) */}
                    {step.id === 'think' && (
                      <div className="bg-forest-50/50 border border-forest-100 rounded-2xl p-4 font-display font-bold text-forest-800 text-sm leading-relaxed">
                        {dayContent.think}
                      </div>
                    )}

                    {/* STEP 3: Para Hacer */}
                    {step.id === 'todo' && (
                      <div className="bg-gold-50 border border-gold-100 rounded-2xl p-4 font-body text-gold-900 text-sm leading-relaxed">
                        {dayContent.todo}
                      </div>
                    )}

                    {/* STEP 4: Comparte */}
                    {step.id === 'share' && (
                      <div className="bg-rose-50 border border-rose-100 rounded-2xl p-4 font-body text-rose-900 text-sm leading-relaxed">
                        {dayContent.share}
                      </div>
                    )}

                    {/* STEP 5: Diario */}
                    {step.id === 'journal' && (
                      <div className="space-y-2">
                        <div className="bg-sky-50 border border-sky-100 rounded-2xl p-4 font-body text-sky-900 text-xs md:text-sm leading-relaxed">
                          {dayContent.journal}
                        </div>
                        <textarea
                          value={localResponse}
                          onChange={e => handleResponseChange(e.target.value)}
                          placeholder="Escribe tus respuestas y reflexiones aquí..."
                          className="w-full h-24 bg-white border-2 border-cream-200 rounded-2xl p-3 font-body text-slate-800 text-sm placeholder-slate-400 focus:border-forest-400 focus:outline-none shadow-sm"
                        />
                      </div>
                    )}

                    {/* STEP 6: Oración */}
                    {step.id === 'prayer' && (
                      <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-4 font-display font-black italic text-indigo-900 text-sm leading-relaxed">
                        {dayContent.prayer}
                      </div>
                    )}

                    {/* Saturday Intro Steps */}
                    {step.id === 'verse' && (
                      <div className="bg-gold-50 border border-gold-200 rounded-2xl p-4 space-y-2">
                        <p className="font-body text-[10px] text-gold-600 font-black uppercase tracking-wider">Base Bíblica: {dayContent.bibleBase}</p>
                        <p className="font-display italic font-bold text-gold-950 text-sm leading-relaxed">
                          "{dayContent.verse}"
                        </p>
                      </div>
                    )}
                    {step.id === 'word' && (
                      <div className="bg-sky-50 border border-sky-200 rounded-2xl p-4">
                        <p className="font-display font-black text-sky-950 text-sm leading-relaxed">
                          {dayContent.word}
                        </p>
                      </div>
                    )}
                    {step.id === 'message' && (
                      <div className="bg-forest-50 border border-forest-200 rounded-2xl p-4">
                        <p className="font-body font-bold text-forest-950 text-sm leading-relaxed">
                          {dayContent.message}
                        </p>
                      </div>
                    )}

                    {/* Step Checkbox button (Tactile 3D) */}
                    <div className="btn-3d-wrap w-full h-12 mt-2">
                      <div className={`btn-3d-shadow ${isChecked ? 'bg-green-700' : 'bg-cream-300'}`} />
                      <button
                        onClick={() => handleCheckboxClick(step.id, isUnlocked)}
                        className={`btn-3d-front w-full h-full flex items-center justify-center gap-2 py-3 px-4 border-2 font-body font-black text-sm transition-all ${
                          isChecked
                            ? 'bg-green-500 border-green-600 text-white shadow-green-sm'
                            : 'bg-white border-cream-300 text-forest-700 hover:border-cream-400'
                        }`}
                      >
                        <div className={`w-5 h-5 rounded-lg border-2 flex items-center justify-center ${
                          isChecked ? 'bg-white border-white text-green-500' : 'bg-cream-100 border-cream-300'
                        }`}>
                          {isChecked && <Check size={14} strokeWidth={4} />}
                        </div>
                        <span>
                          {isChecked
                            ? '¡Completado! ⭐'
                            : step.id === 'bibleStudy'
                            ? '¡Ya la leímos en familia! (+1 ⭐)'
                            : step.id === 'story'
                            ? '¡Ya terminé de leer! (+1 ⭐)'
                            : step.id === 'think'
                            ? '¡Ya respondí! (+1 ⭐)'
                            : step.id === 'todo'
                            ? '¡Ya la hice! (+1 ⭐)'
                            : step.id === 'share'
                            ? '¡Ya compartí! (+1 ⭐)'
                            : step.id === 'journal'
                            ? '¡Ya escribí! (+1 ⭐)'
                            : step.id === 'prayer'
                            ? '¡Ya oré! (+1 ⭐)'
                            : '¡Listo! (+1 ⭐)'
                          }
                        </span>
                      </button>
                    </div>
                  </div>
                ) : (
                  /* Locked Step placeholder */
                  <div className="p-4 flex items-center justify-center text-slate-400 font-body text-xs gap-1.5 select-none py-6">
                    <Lock size={12} />
                    <span>Completa los pasos anteriores para desbloquear</span>
                  </div>
                )}
                </motion.div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Day Finished Celebration Modal (Duolingo Style Overlay) */}
      <AnimatePresence>
        {showCompleteModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 lg:pl-64">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />

            <motion.div
              initial={{ scale: 0.9, y: 50, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 50, opacity: 0 }}
              className="relative bg-white border-4 border-gold-400 rounded-[2.5rem] p-6 max-w-sm w-full text-center shadow-warm-lg z-10 flex flex-col items-center gap-5"
            >
              {/* The actual sticker just earned, front and center */}
              <div className="relative w-36 h-36 flex items-center justify-center mb-1 bg-gold-50 rounded-full border-4 border-gold-300 shadow-inner">
                <img
                  src={earnedSticker.path}
                  alt={earnedSticker.name}
                  className="w-24 h-24 object-contain animate-bounce-soft"
                  onError={(e) => { e.target.src = earnedSticker.fallback }}
                />
              </div>

              {/* Text Titles */}
              <div className="space-y-1">
                <h2 className="font-display font-black text-gold-600 text-2xl tracking-tight">
                  🏆 MISIÓN COMPLETADA
                </h2>
                <p className="font-body font-black text-slate-800 text-base">
                  ¡Ganaste la estampa "{earnedSticker.name}"!
                </p>
                <p className="font-body text-xs text-slate-400 font-bold px-4 leading-normal">
                  ¡Excelente trabajo! Ganaste todas las estrellas de este día y diste un paso más hacia el cielo.
                </p>
              </div>

              {/* Continue Button (Tactile 3D) */}
              <div className="btn-3d-wrap w-full h-14">
                <div className="btn-3d-shadow bg-green-700" />
                <button
                  onClick={handleFinishDay}
                  className="btn-3d-front w-full h-full bg-forest-gradient text-white font-body font-black py-4 border border-forest-400 text-base flex items-center justify-center gap-2"
                >
                  Pegarla en mi Pasaporte 📘
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
