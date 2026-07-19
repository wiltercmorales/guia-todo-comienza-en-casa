import { useEffect, useState } from 'react'
import { MAP_WEEKS } from '../data/dailyContent'

const STICKER_PHRASES = [
  'Todo lo puedo en Cristo que me fortalece.',
  '¡Dios ve tu corazón y sonríe!',
  'El Señor está contigo en cada paso.',
  'Tu constancia agrada a Dios.',
  '¡Hoy fue un gran día espiritual!',
  'Cada día más cerca del cielo.',
  'Jesús está orgulloso de ti.',
  '¡Eres un campeón del reino de Dios!',
  '"Bienaventurado el que persevera." — Santiago 1:12',
  '¡Sigue adelante! El cielo te espera.',
]

const MEDAL_PHRASES = [
  '¡Completaste una semana entera! 🏅',
  '¡Semana completa! Dios te sonríe desde el cielo.',
  '"El que comenzó en vosotros la buena obra, la perfeccionará." — Fil 1:6',
  '¡Una semana más cerca de Jesús!',
  '¡Eres un verdadero discípulo en formación!',
]

function Confetti() {
  const items = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    delay: Math.random() * 0.8,
    color: ['#f59e0b', '#22c55e', '#0ea5e9', '#e11d48', '#8b5cf6'][i % 5],
    size: 6 + Math.random() * 8,
    shape: i % 3 === 0 ? '★' : i % 3 === 1 ? '●' : '■',
  }))

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {items.map(p => (
        <div
          key={p.id}
          className="absolute animate-bounce"
          style={{
            left: `${p.x}%`,
            top: '-10px',
            color: p.color,
            fontSize: `${p.size}px`,
            animation: `fall ${1.5 + p.delay}s ease-in forwards`,
            animationDelay: `${p.delay}s`,
          }}
        >
          {p.shape}
        </div>
      ))}
      <style>{`
        @keyframes fall {
          0%   { transform: translateY(0) rotate(0deg);   opacity: 1; }
          100% { transform: translateY(400px) rotate(360deg); opacity: 0; }
        }
      `}</style>
    </div>
  )
}

export default function RewardModal({ type, weekId, dayId, onClose }) {
  const [phrase] = useState(() => {
    const list = type === 'medal' ? MEDAL_PHRASES : STICKER_PHRASES
    return list[Math.floor(Math.random() * list.length)]
  })

  const weekData = MAP_WEEKS.find(w => w.id === weekId)

  // Auto-close after 5 seconds
  useEffect(() => {
    const t = setTimeout(onClose, 5000)
    return () => clearTimeout(t)
  }, [onClose])

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-6 lg:pl-64">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />

      {/* Confetti */}
      <Confetti />

      {/* Card */}
      <div className="relative z-10 bg-white rounded-4xl p-7 text-center max-w-sm w-full shadow-warm-lg animate-scale-in">
        {type === 'medal' ? (
          <>
            <div className="text-7xl mb-3 animate-bounce">🏅</div>
            <h2 className="font-display text-2xl font-bold text-gold-700 mb-1">
              ¡Semana {weekId} completa!
            </h2>
            {weekData && (
              <p className="font-body text-forest-600 text-sm mb-2">
                {weekData.icon} {weekData.name}
              </p>
            )}
            <div className="flex justify-center gap-1 mb-3">
              {Array.from({ length: 7 }).map((_, i) => (
                <span key={i} className="text-xl">⭐</span>
              ))}
            </div>
          </>
        ) : (
          <>
            <div className="text-7xl mb-3 animate-stamp">⭐</div>
            <h2 className="font-display text-2xl font-bold text-forest-700 mb-1">
              ¡Día {dayId} completado!
            </h2>
            {weekData && (
              <p className="font-body text-forest-500 text-sm mb-2">
                Semana {weekId}: {weekData.name}
              </p>
            )}
          </>
        )}

        <div className="bg-cream-100 rounded-2xl px-4 py-3 mb-4">
          <p className="font-display italic text-forest-700 text-sm leading-relaxed">
            "{phrase}"
          </p>
        </div>

        <button
          onClick={onClose}
          className="w-full bg-forest-500 text-white font-body font-bold py-3 rounded-2xl shadow-green active:scale-95 transition-transform text-base"
        >
          {type === 'medal' ? '🌟 ¡Continuar el camino!' : '▶ Siguiente día'}
        </button>

        <p className="font-body text-[10px] text-gray-300 mt-3">
          Se cierra automáticamente en 5 segundos
        </p>
      </div>
    </div>
  )
}
