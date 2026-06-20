import { useApp } from '../context/AppContext'
import { weeks, STAGES } from '../data/weeks'
import WeekCard from '../components/WeekCard'
import ProgressRing from '../components/ProgressRing'

const stageGroups = [
  { key: 'preparation', weeks: [0], emoji: '🌱' },
  { key: 'model', weeks: [1, 2], emoji: '👁️' },
  { key: 'guide', weeks: [3, 4], emoji: '🤝' },
  { key: 'accompany', weeks: [5, 6, 7], emoji: '💪' },
  { key: 'independent', weeks: [8, 9, 10], emoji: '✨' },
]

export default function WeeklyPlan() {
  const { completedWeeks, currentWeek } = useApp()
  const progress = Math.round((completedWeeks.length / 11) * 100)

  return (
    <div className="px-4 py-5 space-y-5">
      {/* Header summary */}
      <div className="bg-forest-gradient rounded-4xl p-5 text-white shadow-green-lg flex items-center gap-4">
        <ProgressRing
          percent={progress}
          size={80}
          strokeWidth={8}
          trackColor="rgba(255,255,255,0.2)"
          fillColor="#F0B823"
        >
          <span className="font-display font-bold text-white text-sm">{progress}%</span>
        </ProgressRing>
        <div>
          <p className="font-body text-forest-100 text-xs font-semibold uppercase tracking-wider">Tu avance</p>
          <p className="font-display text-2xl font-bold">{completedWeeks.length}/11</p>
          <p className="font-body text-forest-200 text-xs">semanas completadas</p>
        </div>
      </div>

      {/* Stage groups */}
      {stageGroups.map((group) => {
        const stage = STAGES[group.key]
        const groupWeeks = weeks.filter(w => group.weeks.includes(w.id))
        return (
          <div key={group.key}>
            <div className="flex items-center gap-2 mb-2.5">
              <span className="text-lg">{group.emoji}</span>
              <span className={`text-xs font-body font-bold px-2.5 py-1 rounded-full ${stage.color}`}>
                {stage.label}
              </span>
            </div>
            <div className="space-y-2">
              {groupWeeks.map((week) => (
                <WeekCard
                  key={week.id}
                  week={week}
                  completed={completedWeeks.includes(week.id)}
                  locked={false}
                />
              ))}
            </div>
          </div>
        )
      })}

      {/* Progression guide */}
      <div className="bg-white rounded-3xl border-2 border-cream-300 p-4 shadow-card">
        <p className="font-display text-forest-700 font-semibold mb-3 text-center text-sm">
          Progresión del acompañamiento
        </p>
        <div className="space-y-2">
          {weeks.map((w) => (
            <div key={w.id} className="flex items-center gap-2">
              <span className="font-body text-[10px] text-forest-400 w-4 text-right flex-shrink-0">
                {w.id}
              </span>
              <div className="flex-1 flex gap-0.5 h-3 rounded-full overflow-hidden">
                <div
                  className="bg-sky-400 rounded-l-full transition-all"
                  style={{ width: `${w.parentPercent}%` }}
                  title={`Padres: ${w.parentPercent}%`}
                />
                <div
                  className="bg-forest-400 rounded-r-full transition-all"
                  style={{ width: `${w.childPercent}%` }}
                  title={`Niño: ${w.childPercent}%`}
                />
              </div>
              <span className="font-body text-[10px] text-forest-400 w-8 flex-shrink-0">
                {w.icon}
              </span>
            </div>
          ))}
          <div className="flex items-center gap-4 mt-3 pt-2.5 border-t border-cream-300 justify-center">
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-full bg-sky-400" />
              <span className="font-body text-[10px] text-forest-500">Padres</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-full bg-forest-400" />
              <span className="font-body text-[10px] text-forest-500">Niño</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
