import { useParams, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useApp } from '../context/AppContext'
import { weeks, STAGES } from '../data/weeks'
import { CheckCircle, Circle, ChevronDown, ChevronUp } from 'lucide-react'

const colorMap = {
  sand: { bg: 'bg-sand-100', border: 'border-sand-300', badge: 'bg-sand-400', text: 'text-sand-700', light: 'bg-sand-50' },
  sky: { bg: 'bg-sky-100', border: 'border-sky-300', badge: 'bg-sky-500', text: 'text-sky-700', light: 'bg-sky-50' },
  gold: { bg: 'bg-gold-100', border: 'border-gold-300', badge: 'bg-gold-500', text: 'text-gold-700', light: 'bg-gold-50' },
  forest: { bg: 'bg-forest-100', border: 'border-forest-300', badge: 'bg-forest-500', text: 'text-forest-600', light: 'bg-forest-50' },
  rose: { bg: 'bg-rose-100', border: 'border-rose-300', badge: 'bg-rose-400', text: 'text-rose-600', light: 'bg-rose-50' },
}

function Section({ title, icon, children, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div className="bg-white rounded-3xl border-2 border-cream-300 shadow-card overflow-hidden">
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center gap-3 px-4 py-3.5 text-left"
      >
        <span className="text-xl">{icon}</span>
        <span className="font-display font-semibold text-forest-700 flex-1 text-sm">{title}</span>
        {open ? <ChevronUp size={18} className="text-forest-400" /> : <ChevronDown size={18} className="text-forest-400" />}
      </button>
      {open && <div className="px-4 pb-4 border-t border-cream-300">{children}</div>}
    </div>
  )
}

export default function WeekDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { completedWeeks, completeWeek, uncompleteWeek } = useApp()
  const weekId = parseInt(id, 10)
  const week = weeks.find(w => w.id === weekId)

  if (!week) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <p className="font-body text-forest-400">Semana no encontrada</p>
          <button onClick={() => navigate('/semanas')} className="text-forest-600 font-semibold mt-2">Volver</button>
        </div>
      </div>
    )
  }

  const colors = colorMap[week.color] || colorMap.sand
  const stage = STAGES[week.stage]
  const isCompleted = completedWeeks.includes(weekId)

  const toggleComplete = () => {
    if (isCompleted) uncompleteWeek(weekId)
    else completeWeek(weekId)
  }

  return (
    <div className="px-4 py-5 space-y-4">
      {/* Hero card */}
      <div className={`${colors.bg} ${colors.border} border-2 rounded-4xl p-5`}>
        <div className="flex items-start gap-3 mb-3">
          <div className={`w-16 h-16 ${colors.badge} rounded-3xl flex items-center justify-center text-3xl shadow-sm flex-shrink-0`}>
            {week.icon}
          </div>
          <div className="flex-1 min-w-0">
            <span className={`text-[10px] font-body font-bold px-2 py-0.5 rounded-full ${stage.color}`}>
              {stage.label}
            </span>
            <h1 className="font-display text-xl font-bold text-forest-700 mt-1 leading-tight">
              {week.id === 0 ? 'Semana 0: ' : `Semana ${week.id}: `}
              {week.title}
            </h1>
          </div>
        </div>

        {/* Participation bar */}
        <div className="bg-white/60 rounded-2xl p-3">
          <div className="flex justify-between items-center mb-1.5">
            <span className="font-body text-xs text-sky-600 font-bold">👨‍👩‍👧 Padres {week.parentPercent}%</span>
            <span className="font-body text-xs text-forest-600 font-bold">🧒 Niño {week.childPercent}%</span>
          </div>
          <div className="flex h-3 rounded-full overflow-hidden gap-0.5">
            <div className="bg-sky-400 rounded-l-full transition-all" style={{ width: `${week.parentPercent}%` }} />
            <div className="bg-forest-400 rounded-r-full transition-all" style={{ width: `${week.childPercent}%` }} />
          </div>
        </div>
      </div>

      {/* Objective */}
      <div className="bg-white rounded-3xl border-2 border-cream-300 p-4 shadow-card">
        <div className="flex items-start gap-3">
          <span className="text-2xl flex-shrink-0">🎯</span>
          <div>
            <p className="font-body text-xs text-forest-400 font-bold uppercase tracking-wider mb-1">Objetivo</p>
            <p className="font-body text-forest-700 text-sm leading-relaxed">{week.objective}</p>
          </div>
        </div>
      </div>

      {/* Central question */}
      <div className="bg-gold-100 border-2 border-gold-200 rounded-3xl p-4">
        <p className="font-body text-gold-600 font-bold text-xs uppercase tracking-wider mb-2">❓ Pregunta central</p>
        <p className="font-display italic text-gold-800 text-base leading-relaxed">"{week.centralQuestion}"</p>
      </div>

      {/* Steps */}
      <Section title="Paso a paso diario" icon="📋" defaultOpen={true}>
        <div className="pt-3 space-y-3">
          {week.steps.map((step, i) => (
            <div key={i} className="flex gap-3">
              <div className={`flex-shrink-0 w-7 h-7 ${colors.badge} rounded-xl flex items-center justify-center text-white font-display font-bold text-xs mt-0.5`}>
                {i + 1}
              </div>
              <div>
                <p className="font-body font-bold text-forest-700 text-sm">{step.title}</p>
                <p className="font-body text-forest-500 text-xs mt-0.5 leading-relaxed">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Foundation */}
      <Section title="Fundamento espiritual" icon="📖">
        <p className="font-body text-forest-600 text-sm leading-relaxed pt-3">{week.foundation}</p>
        <div className="mt-2.5 bg-cream-100 rounded-2xl px-3 py-2">
          <p className="font-body text-forest-500 text-xs font-semibold">🔧 Técnica: {week.technique}</p>
        </div>
      </Section>

      {/* Suggested phrases */}
      <Section title="Frases recomendadas" icon="💬">
        <div className="pt-3 space-y-2">
          {week.suggestedPhrases.map((phrase, i) => (
            <div key={i} className="bg-forest-50 border border-forest-100 rounded-2xl px-3 py-2.5 flex gap-2 items-start">
              <span className="text-forest-400 text-sm flex-shrink-0">"</span>
              <p className="font-body text-forest-700 text-sm italic leading-relaxed">{phrase}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* What to avoid */}
      <Section title="Qué evitar esta semana" icon="🚫">
        <div className="pt-3 space-y-2">
          {week.avoid.map((item, i) => (
            <div key={i} className="flex items-start gap-2.5">
              <div className="w-5 h-5 rounded-full bg-rose-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-rose-500 text-xs">✕</span>
              </div>
              <p className="font-body text-forest-600 text-sm leading-relaxed">{item}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Goal & close */}
      <div className="space-y-3">
        <div className="bg-sky-100 border-2 border-sky-200 rounded-3xl p-4">
          <p className="font-body text-sky-600 font-bold text-xs uppercase tracking-wider mb-1.5">🏆 Meta mínima</p>
          <p className="font-body text-sky-800 text-sm">{week.minimumGoal}</p>
        </div>
        <div className="bg-forest-100 border-2 border-forest-200 rounded-3xl p-4">
          <p className="font-body text-forest-600 font-bold text-xs uppercase tracking-wider mb-1.5">🌿 Cierre semanal</p>
          <p className="font-body text-forest-700 text-sm italic">"{week.weeklyClose}"</p>
        </div>
      </div>

      {/* Complete button */}
      <button
        onClick={toggleComplete}
        className={`w-full py-4 rounded-2xl font-body font-bold text-base flex items-center justify-center gap-2 transition-all duration-200 active:scale-95
          ${isCompleted
            ? 'bg-forest-100 text-forest-600 border-2 border-forest-300'
            : 'bg-forest-gradient text-white shadow-green-lg'
          }`}
      >
        {isCompleted ? (
          <><CheckCircle size={20} /> Semana completada ✓</>
        ) : (
          <><Circle size={20} /> Marcar como completada</>
        )}
      </button>
    </div>
  )
}
