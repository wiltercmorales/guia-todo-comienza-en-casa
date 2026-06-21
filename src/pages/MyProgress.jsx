import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { MAP_WEEKS } from '../data/dailyContent'

function StatCard({ icon, value, label, color = 'forest' }) {
  const bg = {
    forest: 'bg-forest-100 border-forest-200',
    gold: 'bg-gold-100 border-gold-200',
    sky: 'bg-sky-100 border-sky-200',
    rose: 'bg-rose-100 border-rose-200',
  }[color]
  const text = {
    forest: 'text-forest-700',
    gold: 'text-gold-700',
    sky: 'text-sky-700',
    rose: 'text-rose-700',
  }[color]

  return (
    <div className={`flex flex-col items-center justify-center p-4 rounded-3xl border-2 ${bg}`}>
      <span className="text-3xl mb-1">{icon}</span>
      <p className={`font-display font-bold text-2xl ${text}`}>{value}</p>
      <p className="font-body text-xs text-gray-500 text-center leading-tight mt-0.5">{label}</p>
    </div>
  )
}

export default function MyProgress() {
  const navigate = useNavigate()
  const {
    childName, mapCurrentWeek, mapCurrentDay,
    completedDays, earnedMedals, earnedStickers, streak,
    getWeekDayCount, getTotalCompletedDays, getMapProgress,
    lastActiveDate,
  } = useApp()

  const { done, total, percent } = getMapProgress()
  const totalDays = getTotalCompletedDays()

  // Recent activity: last 7 completed days
  const recentDays = Object.entries(completedDays)
    .filter(([, v]) => v?.completed)
    .sort((a, b) => (b[1].date || '').localeCompare(a[1].date || ''))
    .slice(0, 5)

  return (
    <div className="px-4 py-5 space-y-5">
      {/* Header */}
      <div>
        <h1 className="font-display text-2xl font-bold text-forest-700">
          📊 Mi Avance
        </h1>
        {childName && (
          <p className="font-body text-forest-500 text-sm">
            Progreso de <strong>{childName}</strong>
          </p>
        )}
      </div>

      {/* Overall progress ring */}
      <div className="bg-gradient-to-br from-forest-100 to-gold-100 border-2 border-forest-200 rounded-4xl p-5">
        <div className="flex items-center gap-4">
          {/* Circular progress */}
          <div className="relative flex-shrink-0" style={{ width: 80, height: 80 }}>
            <svg viewBox="0 0 80 80" className="w-full h-full -rotate-90">
              <circle cx={40} cy={40} r={33} fill="none" stroke="#d1fae5" strokeWidth={7} />
              <circle
                cx={40} cy={40} r={33} fill="none"
                stroke="#16a34a" strokeWidth={7}
                strokeLinecap="round"
                strokeDasharray={`${2 * Math.PI * 33}`}
                strokeDashoffset={`${2 * Math.PI * 33 * (1 - percent / 100)}`}
                style={{ transition: 'stroke-dashoffset 1s ease' }}
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <p className="font-display font-bold text-forest-700 text-lg">{percent}%</p>
            </div>
          </div>

          <div className="flex-1">
            <p className="font-display font-bold text-forest-800 text-lg leading-tight mb-1">
              Camino al Cielo
            </p>
            <p className="font-body text-forest-600 text-sm">
              <strong>{done}</strong> de <strong>{total}</strong> días completados
            </p>
            <p className="font-body text-forest-500 text-xs mt-0.5">
              Semana actual: {mapCurrentWeek}/10 · Día: {mapCurrentDay}/7
            </p>
          </div>
        </div>

        {/* Full progress bar */}
        <div className="mt-4">
          <div className="flex justify-between mb-1">
            <span className="font-body text-xs text-forest-500">🏠 Mi Casa</span>
            <span className="font-body text-xs text-gold-600">✝️ El Cielo</span>
          </div>
          <div className="h-3 bg-green-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-forest-400 via-gold-400 to-gold-500 rounded-full transition-all duration-700"
              style={{ width: `${percent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Stat grid */}
      <div className="grid grid-cols-2 gap-3">
        <StatCard icon="⭐" value={earnedStickers.length} label="Stickers ganados" color="gold" />
        <StatCard icon="🏅" value={earnedMedals.length} label="Medallas de semana" color="rose" />
        <StatCard icon="🔥" value={streak} label="Días seguidos" color="sky" />
        <StatCard icon="✅" value={totalDays} label="Días completados" color="forest" />
      </div>

      {/* Week-by-week progress */}
      <div>
        <h2 className="font-display font-bold text-forest-700 text-base mb-3">
          Progreso por semana
        </h2>
        <div className="space-y-2">
          {MAP_WEEKS.map(week => {
            const daysDone = getWeekDayCount(week.id)
            const hasMedal = earnedMedals.includes(week.id)
            const isCurrent = week.id === mapCurrentWeek
            const isLocked = week.id > mapCurrentWeek

            return (
              <div
                key={week.id}
                onClick={() => !isLocked && navigate(`/mapa`)}
                className={`
                  flex items-center gap-3 p-3.5 rounded-2xl border-2 transition-all
                  ${hasMedal ? 'bg-gold-100 border-gold-200' :
                    isCurrent ? 'bg-forest-100 border-forest-200' :
                    isLocked ? 'bg-gray-50 border-gray-100 opacity-50' :
                    'bg-white border-cream-200'}
                `}
              >
                <span className="text-2xl">{isLocked ? '🔒' : week.icon}</span>
                <div className="flex-1 min-w-0">
                  <p className="font-body font-bold text-sm text-forest-800 truncate">
                    Sem. {week.id}: {week.name}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="flex-1 h-1.5 bg-green-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${hasMedal ? 'bg-gold-400' : 'bg-forest-400'}`}
                        style={{ width: `${Math.round((daysDone / 7) * 100)}%` }}
                      />
                    </div>
                    <span className="font-body text-xs text-forest-500 flex-shrink-0">
                      {daysDone}/7
                    </span>
                  </div>
                </div>
                {hasMedal && <span className="text-lg flex-shrink-0">🏅</span>}
                {isCurrent && !hasMedal && (
                  <span className="text-[10px] font-body font-bold text-forest-500 bg-forest-100 px-2 py-0.5 rounded-xl flex-shrink-0">
                    Actual
                  </span>
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* Recent activity */}
      {recentDays.length > 0 && (
        <div>
          <h2 className="font-display font-bold text-forest-700 text-base mb-3">
            Actividad reciente
          </h2>
          <div className="space-y-2">
            {recentDays.map(([key, data]) => {
              const [, wStr, dStr] = key.match(/w(\d+)d(\d+)/) || []
              const wId = Number(wStr)
              const dId = Number(dStr)
              const week = MAP_WEEKS.find(w => w.id === wId)
              return (
                <div
                  key={key}
                  onClick={() => navigate(`/dia/${wId}/${dId}`)}
                  className="flex items-center gap-3 bg-white border border-cream-200 rounded-2xl p-3 cursor-pointer hover:bg-cream-50 transition-colors"
                >
                  <span className="text-xl">{week?.icon || '⭐'}</span>
                  <div className="flex-1">
                    <p className="font-body font-bold text-sm text-forest-700">
                      Sem. {wId} · Día {dId}
                    </p>
                    {data.response && (
                      <p className="font-body text-xs text-forest-400 truncate mt-0.5">
                        "{data.response}"
                      </p>
                    )}
                  </div>
                  <div className="text-right">
                    <p className="font-body text-xs text-gray-400">{data.date}</p>
                    <span className="text-base">⭐</span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* Certificate hint */}
      {percent === 100 && (
        <div className="bg-gold-100 border-2 border-gold-300 rounded-3xl p-5 text-center">
          <p className="text-4xl mb-2">🏆</p>
          <p className="font-display font-bold text-gold-700 text-lg">¡Completaste el programa!</p>
          <p className="font-body text-gold-600 text-sm mt-1 mb-3">
            Recibe tu certificado y carta de gratitud.
          </p>
          <button
            onClick={() => navigate('/cierre')}
            className="bg-gold-500 text-white font-body font-bold px-5 py-2.5 rounded-2xl shadow-warm active:scale-95 transition-transform"
          >
            Ver mi certificado 🎓
          </button>
        </div>
      )}

      {/* Last active */}
      {lastActiveDate && (
        <p className="font-body text-xs text-gray-300 text-center pb-2">
          Última actividad: {lastActiveDate}
        </p>
      )}
    </div>
  )
}
