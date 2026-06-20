import { useState } from 'react'
import { useApp } from '../context/AppContext'
import { challenges } from '../data/challenges'
import { CheckCircle, RotateCcw } from 'lucide-react'

const colorMap = {
  sky: {
    front: 'from-sky-100 to-sky-200',
    back: 'from-sky-200 to-sky-300',
    badge: 'bg-sky-500',
    text: 'text-sky-700',
    border: 'border-sky-300',
    btn: 'bg-sky-500 hover:bg-sky-600',
  },
  gold: {
    front: 'from-gold-100 to-gold-200',
    back: 'from-gold-200 to-gold-300',
    badge: 'bg-gold-500',
    text: 'text-gold-700',
    border: 'border-gold-300',
    btn: 'bg-gold-500 hover:bg-gold-600',
  },
  rose: {
    front: 'from-rose-100 to-rose-200',
    back: 'from-rose-200 to-rose-300',
    badge: 'bg-rose-400',
    text: 'text-rose-600',
    border: 'border-rose-300',
    btn: 'bg-rose-400 hover:bg-rose-500',
  },
  forest: {
    front: 'from-forest-100 to-forest-200',
    back: 'from-forest-200 to-forest-300',
    badge: 'bg-forest-500',
    text: 'text-forest-600',
    border: 'border-forest-300',
    btn: 'bg-forest-500 hover:bg-forest-600',
  },
}

function ChallengeCard({ challenge, completed, onToggle }) {
  const [flipped, setFlipped] = useState(false)
  const c = colorMap[challenge.color] || colorMap.sky

  return (
    <div className="relative" style={{ perspective: '1000px', height: '220px' }}>
      <div
        className="flip-card-inner w-full h-full"
        style={{
          transition: 'transform 0.55s cubic-bezier(0.4,0,0.2,1)',
          transformStyle: 'preserve-3d',
          position: 'relative',
          transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
        }}
      >
        {/* Front */}
        <div
          className={`absolute inset-0 rounded-4xl bg-gradient-to-br ${c.front} border-2 ${c.border} p-5 flex flex-col items-center justify-center text-center cursor-pointer
            ${completed ? 'opacity-70' : ''}`}
          style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
          onClick={() => setFlipped(true)}
        >
          {completed && (
            <div className="absolute top-3 right-3">
              <CheckCircle size={22} className="text-forest-500" />
            </div>
          )}
          <div className="text-5xl mb-3">{challenge.icon}</div>
          <h3 className={`font-display font-bold ${c.text} text-xl mb-1`}>{challenge.title}</h3>
          <p className="font-body text-forest-500 text-xs">{challenge.description}</p>
          <p className="font-body text-forest-400 text-[10px] mt-2">Toca para ver el desafío →</p>
        </div>

        {/* Back */}
        <div
          className={`absolute inset-0 rounded-4xl bg-gradient-to-br ${c.back} border-2 ${c.border} p-4 flex flex-col cursor-pointer`}
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
          }}
        >
          <button
            onClick={(e) => { e.stopPropagation(); setFlipped(false) }}
            className="absolute top-3 right-3 p-1.5 bg-white/50 rounded-xl"
          >
            <RotateCcw size={14} className={c.text} />
          </button>

          <div className="flex items-center gap-2 mb-3">
            <span className="text-2xl">{challenge.icon}</span>
            <h3 className={`font-display font-bold ${c.text} text-base leading-tight`}>{challenge.title}</h3>
          </div>

          <div className="flex-1 space-y-2">
            <div className="bg-white/60 rounded-2xl px-3 py-2">
              <p className="font-body text-[10px] text-forest-500 font-bold uppercase tracking-wider mb-0.5">Ejemplo</p>
              <p className="font-body text-forest-700 text-xs leading-relaxed">{challenge.example}</p>
            </div>
            <div className="bg-white/60 rounded-2xl px-3 py-1.5">
              <p className={`font-display italic text-xs ${c.text} leading-relaxed`}>"{challenge.verse}"</p>
            </div>
          </div>

          <button
            onClick={(e) => { e.stopPropagation(); onToggle() }}
            className={`mt-3 w-full ${c.btn} text-white font-body font-bold py-2.5 rounded-2xl text-sm transition-all active:scale-95
              flex items-center justify-center gap-1.5`}
          >
            {completed ? <><CheckCircle size={16} /> ¡Completado!</> : '✅ Lo hice hoy'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default function Challenges() {
  const { completedChallenges, toggleChallenge } = useApp()
  const [filter, setFilter] = useState('all')

  const filtered = filter === 'done'
    ? challenges.filter(c => completedChallenges.includes(c.id))
    : filter === 'pending'
    ? challenges.filter(c => !completedChallenges.includes(c.id))
    : challenges

  return (
    <div className="px-4 py-5 space-y-5">
      {/* Header */}
      <div>
        <h1 className="font-display text-2xl font-bold text-forest-700">Desafíos espirituales</h1>
        <p className="font-body text-forest-500 text-sm">Toca una tarjeta para ver tu desafío del día</p>
      </div>

      {/* Progress */}
      <div className="bg-gold-100 border-2 border-gold-200 rounded-3xl p-4 flex items-center gap-4">
        <div className="text-center flex-shrink-0">
          <p className="font-display font-bold text-gold-700 text-3xl">{completedChallenges.length}</p>
          <p className="font-body text-gold-600 text-xs">de 10</p>
        </div>
        <div className="flex-1">
          <p className="font-body text-gold-700 font-semibold text-sm mb-1.5">Desafíos completados</p>
          <div className="h-2.5 bg-gold-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-gold-gradient rounded-full transition-all duration-700"
              style={{ width: `${(completedChallenges.length / 10) * 100}%` }}
            />
          </div>
        </div>
        <span className="text-3xl">⭐</span>
      </div>

      {/* Filter */}
      <div className="flex gap-2">
        {[
          { key: 'all', label: 'Todos' },
          { key: 'pending', label: 'Pendientes' },
          { key: 'done', label: 'Completados' },
        ].map(f => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            className={`flex-1 py-2 rounded-2xl font-body font-bold text-xs transition-all
              ${filter === f.key
                ? 'bg-forest-500 text-white shadow-green'
                : 'bg-cream-200 text-forest-500 hover:bg-cream-300'
              }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Cards */}
      <div className="space-y-4">
        {filtered.map(challenge => (
          <ChallengeCard
            key={challenge.id}
            challenge={challenge}
            completed={completedChallenges.includes(challenge.id)}
            onToggle={() => toggleChallenge(challenge.id)}
          />
        ))}
        {filtered.length === 0 && (
          <div className="text-center py-10">
            <p className="text-4xl mb-2">🎉</p>
            <p className="font-display text-forest-700 font-semibold">¡Los completaste todos!</p>
            <p className="font-body text-forest-400 text-sm mt-1">Dios ve tu corazón y tu esfuerzo</p>
          </div>
        )}
      </div>
    </div>
  )
}
