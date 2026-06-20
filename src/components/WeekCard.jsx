import { useNavigate } from 'react-router-dom'
import { CheckCircle, Lock, ChevronRight } from 'lucide-react'
import { STAGES } from '../data/weeks'

const colorMap = {
  sand: { bg: 'bg-sand-100', border: 'border-sand-300', num: 'bg-sand-400 text-white', icon: 'bg-sand-200' },
  sky: { bg: 'bg-sky-100', border: 'border-sky-300', num: 'bg-sky-500 text-white', icon: 'bg-sky-200' },
  gold: { bg: 'bg-gold-100', border: 'border-gold-300', num: 'bg-gold-500 text-white', icon: 'bg-gold-200' },
  forest: { bg: 'bg-forest-100', border: 'border-forest-300', num: 'bg-forest-500 text-white', icon: 'bg-forest-200' },
  rose: { bg: 'bg-rose-100', border: 'border-rose-300', num: 'bg-rose-400 text-white', icon: 'bg-rose-200' },
}

export default function WeekCard({ week, completed, locked, compact = false }) {
  const navigate = useNavigate()
  const colors = colorMap[week.color] || colorMap.sand
  const stage = STAGES[week.stage]

  return (
    <button
      onClick={() => !locked && navigate(`/semana/${week.id}`)}
      disabled={locked}
      className={`w-full text-left rounded-3xl border-2 transition-all duration-200 ${colors.bg} ${colors.border}
        ${locked ? 'opacity-40 cursor-not-allowed' : 'hover:-translate-y-0.5 hover:shadow-card-hover active:scale-[0.98]'}
        ${compact ? 'p-3' : 'p-4'}
      `}
    >
      <div className="flex items-center gap-3">
        {/* Week number / status */}
        <div className={`relative flex-shrink-0 w-12 h-12 rounded-2xl ${colors.num} flex items-center justify-center text-xl font-display font-bold shadow-sm`}>
          {completed
            ? <CheckCircle size={22} className="text-white" />
            : locked
            ? <Lock size={18} className="text-white/70" />
            : week.id === 0 ? '0' : week.id
          }
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-0.5">
            <span className="text-sm font-body font-bold text-forest-700 truncate">{week.title}</span>
          </div>
          {!compact && (
            <div className="flex items-center gap-2">
              <span className={`text-[10px] font-body font-semibold px-2 py-0.5 rounded-full ${stage.color}`}>
                {stage.label}
              </span>
              <span className="text-[10px] text-forest-400 font-body">
                👨‍👩‍👧 {week.parentPercent}% · 🧒 {week.childPercent}%
              </span>
            </div>
          )}
        </div>

        {/* Icon + arrow */}
        <div className="flex items-center gap-1 flex-shrink-0">
          <span className="text-xl">{week.icon}</span>
          {!locked && <ChevronRight size={16} className="text-forest-300" />}
        </div>
      </div>
    </button>
  )
}
