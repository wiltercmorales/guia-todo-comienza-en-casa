import { useState } from 'react'
import { useApp } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'
import ProgressRing from '../components/ProgressRing'

const letterParts = [
  { key: 'learned', label: '¿Qué aprendiste de Dios?', placeholder: 'Aprendí que Dios...' },
  { key: 'liked', label: '¿Qué fue lo que más te gustó?', placeholder: 'Lo que más me gustó fue...' },
  { key: 'felt', label: '¿Cómo te sentiste?', placeholder: 'Me sentí... cuando orábamos juntos' },
  { key: 'thanks', label: '¿Qué quieres agradecer a tus padres?', placeholder: 'Gracias porque...' },
  { key: 'continue', label: '¿Cómo seguirás con Dios?', placeholder: 'Quiero seguir buscando a Dios...' },
]

const continuityPlan = [
  { icon: '⏰', label: 'Mi horario', placeholder: 'Ej: Después del baño, antes de dormir...' },
  { icon: '📍', label: 'Mi lugar', placeholder: 'Ej: En mi cuarto, en la sala...' },
  { icon: '📖', label: 'Lo que usaré', placeholder: 'Ej: Mi Biblia ilustrada, cuaderno...' },
]

export default function Closing() {
  const navigate = useNavigate()
  const { childName, completedWeeks, passportStamps, completedChallenges, getOverallProgress } = useApp()
  const [letter, setLetter] = useState({})
  const [plan, setPlan] = useState({})
  const [showCertificate, setShowCertificate] = useState(false)
  const overall = getOverallProgress()

  const isReady = overall.percent >= 50

  if (showCertificate) {
    return (
      <div className="px-4 py-5 space-y-5">
        <div className="bg-gold-gradient rounded-4xl p-6 shadow-warm-lg text-center relative overflow-hidden">
          {/* Decorative */}
          <div className="absolute top-0 left-0 w-full h-full opacity-10">
            <div className="absolute top-4 left-4 text-4xl">✝️</div>
            <div className="absolute top-4 right-4 text-4xl">🌟</div>
            <div className="absolute bottom-4 left-4 text-4xl">🙏</div>
            <div className="absolute bottom-4 right-4 text-4xl">💛</div>
          </div>
          <div className="relative">
            <p className="font-body text-gold-800 text-xs font-bold uppercase tracking-widest mb-2">Certificado de participación</p>
            <div className="text-5xl mb-3">🏆</div>
            <h2 className="font-display text-2xl font-bold text-gold-900 mb-1">
              {childName || 'Mi Niño/a'}
            </h2>
            <p className="font-body text-gold-800 text-sm mb-4">
              Por haber participado en el programa
            </p>
            <div className="bg-white/60 rounded-2xl px-4 py-3 mb-4">
              <p className="font-display italic text-gold-900 text-base">
                "Todo Comienza en Casa"
              </p>
              <p className="font-body text-gold-700 text-xs mt-1">
                e iniciar con alegría el hábito de su culto personal con Dios.
              </p>
            </div>
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="bg-white/50 rounded-2xl py-2">
                <p className="font-display font-bold text-gold-900 text-xl">{completedWeeks.length}</p>
                <p className="font-body text-gold-700 text-[10px]">semanas</p>
              </div>
              <div className="bg-white/50 rounded-2xl py-2">
                <p className="font-display font-bold text-gold-900 text-xl">{passportStamps.length}</p>
                <p className="font-body text-gold-700 text-[10px]">días con Dios</p>
              </div>
              <div className="bg-white/50 rounded-2xl py-2">
                <p className="font-display font-bold text-gold-900 text-xl">{completedChallenges.length}</p>
                <p className="font-body text-gold-700 text-[10px]">desafíos</p>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-forest-100 border-2 border-forest-200 rounded-3xl p-4 text-center">
          <p className="font-display italic text-forest-700">
            "No termina un programa;<br />comienza tu camino diario con Dios."
          </p>
        </div>
        <button
          onClick={() => setShowCertificate(false)}
          className="w-full bg-forest-gradient text-white font-body font-bold py-3.5 rounded-2xl shadow-green active:scale-95 transition-all"
        >
          ← Volver al cierre
        </button>
      </div>
    )
  }

  return (
    <div className="px-4 py-5 space-y-5">
      {/* Header */}
      <div className="text-center">
        <div className="text-5xl mb-3">🌟</div>
        <h1 className="font-display text-2xl font-bold text-forest-700 mb-1">Cierre del programa</h1>
        <p className="font-body text-forest-500 text-sm">No termina un programa; comienza un camino</p>
      </div>

      {/* Summary */}
      <div className="bg-forest-gradient rounded-4xl p-5 text-white shadow-green-lg">
        <p className="font-body text-forest-100 text-xs font-bold uppercase tracking-wider mb-3">Tu recorrido</p>
        <div className="flex items-center gap-4">
          <ProgressRing
            percent={overall.percent}
            size={80}
            strokeWidth={8}
            trackColor="rgba(255,255,255,0.2)"
            fillColor="#F0B823"
          >
            <span className="font-display font-bold text-white text-sm">{overall.percent}%</span>
          </ProgressRing>
          <div className="flex-1 grid grid-cols-2 gap-2">
            {[
              { label: 'Semanas', value: `${completedWeeks.length}/11`, icon: '📅' },
              { label: 'Días con Dios', value: passportStamps.length, icon: '🎖' },
              { label: 'Desafíos', value: `${completedChallenges.length}/10`, icon: '⭐' },
              { label: 'Hábito', value: '¡Formado!', icon: '💛' },
            ].map((s, i) => (
              <div key={i} className="bg-white/15 rounded-2xl px-2 py-1.5 text-center">
                <p className="text-base">{s.icon}</p>
                <p className="font-display font-bold text-white text-sm">{s.value}</p>
                <p className="font-body text-forest-200 text-[10px]">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Certificate button */}
      <button
        onClick={() => setShowCertificate(true)}
        className="w-full bg-gold-gradient text-white font-body font-bold py-4 rounded-2xl shadow-warm-lg flex items-center justify-center gap-2 active:scale-95 transition-all"
      >
        🏆 Ver mi certificado de participación
      </button>

      {/* Gratitude letter */}
      <div className="bg-white rounded-3xl border-2 border-cream-300 shadow-card p-4">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-2xl">💌</span>
          <div>
            <p className="font-display font-semibold text-forest-700 text-base">Carta de gratitud</p>
            <p className="font-body text-forest-400 text-xs">Del niño a sus padres</p>
          </div>
        </div>

        <div className="bg-cream-100 rounded-2xl p-3 mb-4">
          <p className="font-display italic text-forest-600 text-sm text-center">Queridos papá y mamá:</p>
        </div>

        <div className="space-y-3">
          {letterParts.map((part) => (
            <div key={part.key}>
              <label className="font-body text-forest-500 text-xs font-bold block mb-1">{part.label}</label>
              <textarea
                value={letter[part.key] || ''}
                onChange={e => setLetter(l => ({ ...l, [part.key]: e.target.value }))}
                placeholder={part.placeholder}
                className="w-full bg-cream-50 border-2 border-cream-300 rounded-2xl px-3 py-2 font-body text-sm text-forest-700 placeholder-forest-300 focus:border-forest-400 focus:outline-none resize-none"
                rows={2}
              />
            </div>
          ))}
          <div className="bg-cream-100 rounded-2xl p-3 text-center">
            <p className="font-display italic text-forest-600 text-sm">Los quiero mucho,</p>
            <p className="font-body text-forest-400 text-xs mt-1">{childName || '___________'}</p>
          </div>
        </div>
      </div>

      {/* Continuity plan */}
      <div className="bg-sky-100 border-2 border-sky-200 rounded-3xl p-4">
        <p className="font-body text-sky-700 font-bold text-xs uppercase tracking-wider mb-3">
          🗺 Mi plan de continuidad
        </p>
        <div className="space-y-3">
          {continuityPlan.map((item) => (
            <div key={item.label} className="flex items-start gap-3">
              <span className="text-xl flex-shrink-0">{item.icon}</span>
              <div className="flex-1">
                <label className="font-body text-sky-700 font-semibold text-xs block mb-1">{item.label}</label>
                <input
                  type="text"
                  value={plan[item.label] || ''}
                  onChange={e => setPlan(p => ({ ...p, [item.label]: e.target.value }))}
                  placeholder={item.placeholder}
                  className="w-full bg-white border-2 border-sky-200 rounded-xl px-3 py-2 font-body text-sm text-forest-700 placeholder-forest-300 focus:border-sky-400 focus:outline-none"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Final message */}
      <div className="bg-white rounded-3xl border-2 border-cream-300 p-5 text-center shadow-card">
        <div className="text-4xl mb-3">🌟</div>
        <h2 className="font-display text-xl font-bold text-forest-700 mb-2">
          El camino continúa
        </h2>
        <p className="font-body text-forest-600 text-sm leading-relaxed mb-3">
          No termina un programa; comienza tu camino diario con Dios. Las 10 semanas fueron solo el inicio.
          Lo mejor está por venir.
        </p>
        <div className="bg-forest-100 rounded-2xl px-4 py-3">
          <p className="font-display italic text-forest-600 text-sm">
            "Instruye al niño en su camino, y aun cuando fuere viejo no se apartará de él."
          </p>
          <p className="font-body text-forest-400 text-xs mt-1">Proverbios 22:6</p>
        </div>
      </div>

      {/* Navigation */}
      <button
        onClick={() => navigate('/dashboard')}
        className="w-full bg-forest-gradient text-white font-body font-bold py-3.5 rounded-2xl shadow-green active:scale-95 transition-all"
      >
        🏠 Volver al inicio
      </button>
    </div>
  )
}
