import { useState } from 'react'
import { parentTips } from '../data/challenges'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const bibleVerses = [
  { verse: 'Deuteronomio 6:6-7', text: 'Las palabras de Dios deben estar en tu corazón y las enseñarás a tus hijos: al estar en casa, al caminar, al acostarte y al levantarte.' },
  { verse: 'Proverbios 22:6', text: 'Instruye al niño en su camino, y aun cuando fuere viejo no se apartará de él.' },
  { verse: 'Efesios 6:4', text: 'Padres, críen a sus hijos en la instrucción y consejo del Señor.' },
]

const faqs = [
  {
    q: '¿Qué hago si mi hijo no quiere participar?',
    a: 'No lo obligues. Dile con calma: "Está bien. Hoy lo hago yo y mañana te cuento." Reduce el tiempo, cambia el enfoque o espera un momento mejor del día. La constancia amable vale más que la obediencia forzada.',
  },
  {
    q: '¿Qué pasa si fallamos varios días seguidos?',
    a: 'No importa. Retomen sin culpa ni drama. Di: "Ayer fue difícil, pero hoy empezamos de nuevo." Un culto breve con amor hoy vale más que uno largo ayer. Dios siempre espera con los brazos abiertos.',
  },
  {
    q: '¿El culto tiene que ser a la misma hora siempre?',
    a: 'Lo ideal es una señal estable (después del baño, antes de dormir, etc.) para que el hábito se forme. Pero si un día el horario cambia, es completamente válido adaptarse. La flexibilidad es parte de la gracia.',
  },
  {
    q: '¿Qué hago si no sé explicar bien la Biblia?',
    a: 'No necesitas ser teólogo. Puedes decir: "No sé exactamente qué significa todo esto, pero sé que Dios nos ama y podemos aprender juntos." Tu honestidad es más poderosa que una explicación perfecta.',
  },
  {
    q: '¿Cómo sé si mi hijo realmente está aprendiendo?',
    a: 'Observa actitudes más que conocimientos: ¿busca a Dios espontáneamente? ¿Ora sin que lo pidas? ¿Menciona algo de la Biblia en su vida diaria? ¿Elige acciones más amables? Esas son las señales de crecimiento espiritual real.',
  },
  {
    q: '¿Puedo adaptar el programa a mis tiempos?',
    a: 'Absolutamente. El programa es una guía, no una camisa de fuerza. Si tu familia necesita más tiempo en una etapa, tómalo. Si pueden avanzar más rápido en otra, adelante. El objetivo es el hábito, no cumplir una agenda exacta.',
  },
]

function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="bg-white rounded-3xl border-2 border-cream-300 shadow-card overflow-hidden">
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-start gap-3 px-4 py-3.5 text-left"
      >
        <span className="text-forest-400 font-display font-bold text-lg flex-shrink-0 mt-0.5">?</span>
        <span className="font-body font-semibold text-forest-700 text-sm flex-1 leading-snug">{q}</span>
        {open
          ? <ChevronUp size={18} className="text-forest-400 flex-shrink-0 mt-0.5" />
          : <ChevronDown size={18} className="text-forest-400 flex-shrink-0 mt-0.5" />
        }
      </button>
      {open && (
        <div className="px-4 pb-4 border-t border-cream-300">
          <p className="font-body text-forest-600 text-sm leading-relaxed pt-3">{a}</p>
        </div>
      )}
    </div>
  )
}

export default function Parents() {
  const navigate = useNavigate()
  const [tab, setTab] = useState('tips')

  return (
    <div className="px-4 py-5 space-y-5">
      {/* Header */}
      <div className="text-center">
        <div className="w-16 h-16 bg-rose-100 rounded-3xl flex items-center justify-center text-3xl mx-auto mb-3">
          💛
        </div>
        <h1 className="font-display text-2xl font-bold text-forest-700 mb-1">Para Padres</h1>
        <p className="font-body text-forest-500 text-sm">Guía de acompañamiento espiritual</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 bg-cream-200 rounded-2xl p-1">
        {[
          { key: 'tips', label: '💡 Consejos' },
          { key: 'faq', label: '❓ Preguntas' },
          { key: 'bible', label: '📖 Versículos' },
        ].map(t => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`flex-1 py-2 rounded-xl font-body font-bold text-xs transition-all
              ${tab === t.key
                ? 'bg-white text-forest-700 shadow-card'
                : 'text-forest-400 hover:text-forest-600'
              }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Tips */}
      {tab === 'tips' && (
        <div className="space-y-3">
          {/* Avoid section */}
          <div>
            <p className="font-body text-rose-600 font-bold text-xs uppercase tracking-wider mb-2">🚫 Qué evitar</p>
            <div className="space-y-2">
              {parentTips.filter(t => t.category === 'Evita esto').map((tip, i) => (
                <div key={i} className="bg-rose-50 border-2 border-rose-200 rounded-3xl p-4">
                  <div className="flex items-start gap-3">
                    <span className="text-2xl flex-shrink-0">{tip.icon}</span>
                    <div>
                      <p className="font-body font-bold text-rose-700 text-sm mb-1">{tip.tip}</p>
                      <p className="font-body text-forest-600 text-xs leading-relaxed">{tip.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Do section */}
          <div>
            <p className="font-body text-forest-600 font-bold text-xs uppercase tracking-wider mb-2 mt-4">✨ Qué hacer</p>
            <div className="space-y-2">
              {parentTips.filter(t => t.category === 'Haz esto').map((tip, i) => (
                <div key={i} className="bg-forest-50 border-2 border-forest-200 rounded-3xl p-4">
                  <div className="flex items-start gap-3">
                    <span className="text-2xl flex-shrink-0">{tip.icon}</span>
                    <div>
                      <p className="font-body font-bold text-forest-700 text-sm mb-1">{tip.tip}</p>
                      <p className="font-body text-forest-600 text-xs leading-relaxed">{tip.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Affirming phrases */}
          <div className="bg-gold-100 border-2 border-gold-200 rounded-3xl p-4">
            <p className="font-body text-gold-700 font-bold text-xs uppercase tracking-wider mb-3">💬 Frases de afirmación</p>
            <div className="space-y-2">
              {[
                'Me alegra que estés aprendiendo.',
                'Gracias por compartir lo que pensaste.',
                'Hoy diste un paso importante.',
                'Dios escucha tu oración.',
                'Me gusta tener este momento contigo.',
                'Tu esfuerzo es lo que más importa.',
                'No importa si no fue perfecto. Lo intentaste.',
                'Te quiero y Dios también te quiere.',
              ].map((phrase, i) => (
                <div key={i} className="bg-white/60 rounded-2xl px-3 py-2 flex gap-2 items-start">
                  <span className="text-gold-500 font-display">"</span>
                  <p className="font-body italic text-forest-700 text-xs">{phrase}"</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* FAQ */}
      {tab === 'faq' && (
        <div className="space-y-2">
          {faqs.map((item, i) => (
            <FAQItem key={i} q={item.q} a={item.a} />
          ))}
        </div>
      )}

      {/* Bible verses */}
      {tab === 'bible' && (
        <div className="space-y-3">
          <p className="font-body text-forest-500 text-sm text-center">
            El fundamento bíblico del programa
          </p>
          {bibleVerses.map((v, i) => (
            <div key={i} className="bg-white rounded-3xl border-2 border-cream-300 p-4 shadow-card">
              <p className="font-body text-forest-400 text-xs font-bold mb-2">{v.verse}</p>
              <p className="font-display italic text-forest-700 text-sm leading-relaxed">"{v.text}"</p>
            </div>
          ))}

          <div className="bg-forest-100 border-2 border-forest-200 rounded-3xl p-4">
            <p className="font-body text-forest-600 font-bold text-xs uppercase tracking-wider mb-2">La visión del programa</p>
            <p className="font-body text-forest-600 text-sm leading-relaxed">
              El hogar es el primer lugar de formación espiritual. Los padres no son solo transmisores de información bíblica —
              son modelos vivos de fe. El niño aprende cuando observa a sus padres orar, pedir perdón, agradecer, confiar en Dios
              y hablar de la fe con naturalidad en la vida diaria.
            </p>
          </div>

          <button
            onClick={() => navigate('/rutina')}
            className="w-full bg-forest-gradient text-white font-body font-bold py-3.5 rounded-2xl flex items-center justify-center gap-2 shadow-green active:scale-95 transition-all"
          >
            📅 Ver rutina diaria completa
          </button>
        </div>
      )}
    </div>
  )
}
