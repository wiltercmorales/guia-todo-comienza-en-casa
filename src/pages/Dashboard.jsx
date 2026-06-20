import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import ProgressRing from '../components/ProgressRing'
import { weeks } from '../data/weeks'
import { Calendar, CheckSquare, BookOpen, Star, ArrowRight } from 'lucide-react'

const motivationalMessages = [
  '¡Cada momento con Dios cuenta! Sigue adelante con amor.',
  'El hábito se forma paso a paso. ¡Tú puedes hacerlo!',
  'Dios ve tu esfuerzo y tu corazón. ¡Bien hecho!',
  'No importa si un día fue difícil. Hoy es un nuevo comienzo.',
  '¡La constancia es más poderosa que la perfección!',
  'Cada sticker en el pasaporte es un momento con Dios. ¡Sigue!',
  'Tu hijo aprende viendo tu ejemplo. ¡Eres un gran modelo!',
  'Pequeños pasos diarios forman un camino de por vida.',
]

export default function Dashboard() {
  const navigate = useNavigate()
  const { childName, completedWeeks, currentWeek, getOverallProgress, getTodayProgress, getTotalStamps } = useApp()
  const overall = getOverallProgress()
  const today = getTodayProgress()
  const stamps = getTotalStamps()
  const message = motivationalMessages[Math.floor(Date.now() / 86400000) % motivationalMessages.length]

  const currentWeekData = weeks[Math.min(currentWeek, 10)]

  return (
    <div className="px-4 py-5 space-y-5">
      {/* Greeting */}
      <div>
        <p className="font-body text-forest-400 text-sm font-semibold">Bienvenido,</p>
        <h1 className="font-display text-2xl font-bold text-forest-700">
          {childName ? `Familia de ${childName}` : 'Familia'} 👋
        </h1>
      </div>

      {/* Overall progress card */}
      <div className="bg-forest-gradient rounded-4xl p-5 text-white shadow-green-lg">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-body text-forest-100 text-xs font-semibold uppercase tracking-wider mb-1">Progreso total</p>
            <p className="font-display text-3xl font-bold">{overall.percent}%</p>
            <p className="font-body text-forest-200 text-sm mt-1">
              {overall.completed} de {overall.total} semanas completadas
            </p>
            <div className="mt-3 h-2 bg-white/20 rounded-full overflow-hidden">
              <div
                className="h-full bg-gold-gradient rounded-full transition-all duration-1000"
                style={{ width: `${overall.percent}%` }}
              />
            </div>
          </div>
          <ProgressRing
            percent={overall.percent}
            size={90}
            strokeWidth={9}
            trackColor="rgba(255,255,255,0.2)"
            fillColor="#F0B823"
          >
            <span className="font-display font-bold text-white text-base">{overall.percent}%</span>
          </ProgressRing>
        </div>
      </div>

      {/* Today's progress + stats row */}
      <div className="grid grid-cols-3 gap-3">
        <button
          onClick={() => navigate('/hoy')}
          className="bg-white rounded-3xl p-3.5 shadow-card text-center col-span-1 card-lift border-2 border-cream-300"
        >
          <div className="text-2xl mb-1">✅</div>
          <div className="font-display font-bold text-forest-700 text-lg">{today.completed}/7</div>
          <div className="font-body text-forest-400 text-[10px] font-semibold">Hoy</div>
        </button>
        <button
          onClick={() => navigate('/pasaporte')}
          className="bg-white rounded-3xl p-3.5 shadow-card text-center col-span-1 card-lift border-2 border-cream-300"
        >
          <div className="text-2xl mb-1">🎖</div>
          <div className="font-display font-bold text-gold-600 text-lg">{stamps}</div>
          <div className="font-body text-forest-400 text-[10px] font-semibold">Sellos</div>
        </button>
        <button
          onClick={() => navigate('/desafios')}
          className="bg-white rounded-3xl p-3.5 shadow-card text-center col-span-1 card-lift border-2 border-cream-300"
        >
          <div className="text-2xl mb-1">⭐</div>
          <div className="font-display font-bold text-sky-600 text-lg">{completedWeeks.length}</div>
          <div className="font-body text-forest-400 text-[10px] font-semibold">Semanas</div>
        </button>
      </div>

      {/* Motivational message */}
      <div className="bg-gold-100 border-2 border-gold-200 rounded-3xl px-4 py-3.5 flex items-start gap-3">
        <span className="text-2xl flex-shrink-0 mt-0.5">💛</span>
        <div>
          <p className="font-body text-gold-700 text-sm font-semibold leading-snug">{message}</p>
        </div>
      </div>

      {/* Current week highlight */}
      {currentWeekData && (
        <div>
          <p className="font-body text-forest-500 text-xs font-bold uppercase tracking-wider mb-2.5">Semana actual</p>
          <button
            onClick={() => navigate(`/semana/${currentWeekData.id}`)}
            className="w-full bg-white rounded-3xl p-4 shadow-card border-2 border-cream-300 text-left card-lift"
          >
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 bg-forest-100 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0">
                {currentWeekData.icon}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-body text-xs text-forest-400 font-semibold mb-0.5">
                  Semana {currentWeekData.id}
                </p>
                <p className="font-display font-semibold text-forest-700 text-base leading-tight">
                  {currentWeekData.title}
                </p>
                <p className="font-body text-forest-500 text-xs mt-1 line-clamp-1">
                  {currentWeekData.technique}
                </p>
              </div>
              <ArrowRight size={18} className="text-forest-300 flex-shrink-0" />
            </div>
          </button>
        </div>
      )}

      {/* Quick actions */}
      <div>
        <p className="font-body text-forest-500 text-xs font-bold uppercase tracking-wider mb-2.5">Accesos rápidos</p>
        <div className="grid grid-cols-2 gap-3">
          {[
            { icon: <Calendar size={20} />, label: 'Ver todas las semanas', to: '/semanas', color: 'sky' },
            { icon: <CheckSquare size={20} />, label: 'Checklist de hoy', to: '/hoy', color: 'forest' },
            { icon: <BookOpen size={20} />, label: 'Mi Pasaporte', to: '/pasaporte', color: 'gold' },
            { icon: <Star size={20} />, label: 'Rutina diaria', to: '/rutina', color: 'rose' },
          ].map((item) => (
            <button
              key={item.to}
              onClick={() => navigate(item.to)}
              className={`bg-${item.color}-100 border-2 border-${item.color}-200 rounded-3xl p-3.5 flex items-center gap-2.5 text-left card-lift`}
            >
              <div className={`text-${item.color}-600`}>{item.icon}</div>
              <span className={`font-body font-bold text-${item.color}-700 text-xs leading-tight`}>{item.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Week grid mini */}
      <div>
        <div className="flex items-center justify-between mb-2.5">
          <p className="font-body text-forest-500 text-xs font-bold uppercase tracking-wider">Mapa de semanas</p>
          <button onClick={() => navigate('/semanas')} className="font-body text-forest-500 text-xs font-semibold">
            Ver todo →
          </button>
        </div>
        <div className="flex gap-2 flex-wrap">
          {weeks.map((w) => (
            <button
              key={w.id}
              onClick={() => navigate(`/semana/${w.id}`)}
              className={`w-10 h-10 rounded-2xl flex items-center justify-center text-sm font-display font-bold transition-all
                ${completedWeeks.includes(w.id)
                  ? 'bg-forest-500 text-white shadow-green'
                  : w.id === currentWeek
                  ? 'bg-gold-400 text-white shadow-warm ring-2 ring-gold-300 ring-offset-1'
                  : 'bg-cream-300 text-forest-500'
                }`}
            >
              {completedWeeks.includes(w.id) ? '✓' : w.id}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
