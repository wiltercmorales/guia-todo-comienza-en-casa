import { Check, BookOpen, Smile, Sparkles, MessageCircle } from 'lucide-react'
import { motion } from 'framer-motion'
import { playCoin, playClick, playFanfare } from '../utils/audio'

const DAILY_STEPS = [
  { id: 1, icon: '🌅', label: 'Abrí mi corazón a Dios',   desc: 'Oración de apertura — habla con Dios de corazón.' },
  { id: 2, icon: '📖', label: 'Leí el versículo del día',  desc: 'Lee el versículo en voz alta o en silencio.' },
  { id: 3, icon: '📚', label: 'Escuché la lectura',        desc: 'Presta atención a la historia o lectura del día.' },
  { id: 4, icon: '🤔', label: 'Respondí la pregunta',      desc: 'Reflexiona y responde la pregunta central.' },
  { id: 5, icon: '🎯', label: 'Hice la actividad',         desc: 'Realiza la actividad práctica del día.' },
  { id: 6, icon: '🙏', label: 'Oré con mi familia',        desc: 'Cierra con una oración familiar o personal.' },
  { id: 7, icon: '✅', label: 'Me comprometí a algo',      desc: 'Identifica un compromiso concreto para el día.' },
]

export default function DailyActivity({
  dayContent,
  weekData,
  checkedSteps,
  onToggleStep,
  response,
  onResponseChange,
  onComplete,
  allChecked,
  isLocked,
  isAlreadyDone,
  c,
}) {
  const completedCount = Object.values(checkedSteps).filter(Boolean).length
  const progressPct = Math.round((completedCount / 7) * 100)

  return (
    <div className="space-y-5">
      {/* Lesson Details Card */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className={`bg-white border-4 ${c.border} rounded-4xl p-5 shadow-warm relative overflow-hidden`}
      >
        <div className="absolute top-0 right-0 w-24 h-24 bg-cream-100 rounded-full translate-x-8 -translate-y-8 opacity-40 pointer-events-none" />
        
        <div className="relative">
          {isAlreadyDone && (
            <div className="flex items-center gap-1 bg-gold-100 border border-gold-300 text-gold-700 font-body font-bold text-xs px-3 py-1 rounded-xl w-max mb-3 animate-bounce">
              <Sparkles size={12} className="fill-gold-400 text-gold-500" />
              ¡Día completado!
            </div>
          )}

          <h2 className="font-display font-black text-xl md:text-2xl text-forest-800 leading-snug mb-2">
            {dayContent.title}
          </h2>
          <p className="font-body text-forest-600 text-sm leading-relaxed mb-4">
            {dayContent.objective}
          </p>

          {/* Golden/Thematic Verse Panel */}
          <div className="bg-cream-100/70 border-2 border-cream-200 rounded-3xl p-4 shadow-inner">
            <div className="flex items-center gap-1.5 mb-1.5">
              <BookOpen size={14} className="text-forest-400" />
              <span className="font-body text-[10px] text-forest-400 font-black uppercase tracking-widest">
                Versículo de hoy
              </span>
            </div>
            <p className="font-display italic text-sm text-forest-800 leading-relaxed pl-1">
              {dayContent.verse}
            </p>
          </div>
        </div>
      </motion.div>

      {/* Accordion reading panels */}
      <div className="space-y-3">
        <div className="bg-white border-2 border-cream-300/80 rounded-3xl p-4 shadow-sm hover:border-cream-400 transition-colors">
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-xl">📚</span>
            <h3 className="font-display font-bold text-forest-700 text-sm uppercase tracking-wide">
              Historia a leer
            </h3>
          </div>
          <p className="font-body text-slate-600 text-sm pl-7 leading-relaxed">
            {dayContent.reading}
          </p>
        </div>

        <div className="bg-white border-2 border-cream-300/80 rounded-3xl p-4 shadow-sm hover:border-cream-400 transition-colors">
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-xl">❓</span>
            <h3 className="font-display font-bold text-forest-700 text-sm uppercase tracking-wide">
              Conversamos en familia
            </h3>
          </div>
          <p className="font-body text-slate-600 text-sm pl-7 leading-relaxed">
            {dayContent.question}
          </p>
        </div>

        <div className="bg-white border-2 border-cream-300/80 rounded-3xl p-4 shadow-sm hover:border-cream-400 transition-colors">
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-xl">🎯</span>
            <h3 className="font-display font-bold text-forest-700 text-sm uppercase tracking-wide">
              Actividad divertida
            </h3>
          </div>
          <p className="font-body text-slate-600 text-sm pl-7 leading-relaxed">
            {dayContent.activity}
          </p>
        </div>
      </div>

      {/* Progress track */}
      <div className="bg-white border-2 border-cream-200 rounded-3xl p-4 shadow-sm">
        <div className="flex justify-between items-center mb-2 px-1">
          <span className="font-body text-xs font-bold text-forest-500">
            Tus pasos de hoy: {completedCount} de 7 completados
          </span>
          <span className="font-body text-xs font-black text-forest-600">{progressPct}%</span>
        </div>
        <div className="h-3 bg-cream-200 rounded-full overflow-hidden shadow-inner">
          <motion.div
            className="h-full bg-gradient-to-r from-forest-400 to-gold-400 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progressPct}%` }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
          />
        </div>
      </div>

      {/* Checklist section */}
      <div className="space-y-2">
        <h3 className="font-display font-black text-forest-700 text-base mb-3 px-1 flex items-center gap-1.5">
          <span>✅</span> Pasos a realizar:
        </h3>
        
        {DAILY_STEPS.map((step) => {
          const isDone = !!checkedSteps[step.id]
          return (
            <motion.button
              key={step.id}
              disabled={isLocked}
              whileTap={!isLocked ? { scale: 0.98 } : {}}
              onClick={() => {
                playCoin() // play Mario coin chiptune sound!
                onToggleStep(step.id)
              }}
              className={`
                w-full flex items-start gap-3.5 p-3.5 rounded-3xl border-2 text-left transition-all
                ${isDone 
                  ? 'bg-forest-50/75 border-forest-300 shadow-sm' 
                  : 'bg-white border-cream-300 hover:border-cream-400'}
              `}
            >
              {/* Checkbox indicator */}
              <div className={`
                flex-shrink-0 w-6 h-6 rounded-xl border-2 flex items-center justify-center mt-0.5 transition-all
                ${isDone ? 'bg-forest-500 border-forest-500' : 'bg-cream-100 border-cream-300'}
              `}>
                {isDone && (
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
                    <Check size={12} className="text-white" strokeWidth={4} />
                  </motion.div>
                )}
              </div>

              {/* Text detail */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-lg">{step.icon}</span>
                  <p className={`font-body font-black text-xs md:text-sm leading-tight transition-all
                    ${isDone ? 'text-forest-600 line-through opacity-70' : 'text-slate-800'}`}>
                    {step.label}
                  </p>
                </div>
                <p className="font-body text-[11px] text-slate-400 mt-1 pl-1 leading-snug">
                  {step.desc}
                </p>
              </div>
            </motion.button>
          )
        })}
      </div>

      {/* Reflection feedback Box */}
      <div className="bg-white border-2 border-cream-200 rounded-3xl p-4 shadow-sm">
        <label className="font-display font-bold text-xs text-forest-500 uppercase tracking-wide mb-2 block pl-1 flex items-center gap-1.5">
          <MessageCircle size={14} />
          Mi cuaderno de reflexión:
        </label>
        <textarea
          disabled={isLocked}
          value={response}
          onFocus={playClick} // Pop sound on focus
          onChange={(e) => {
            onResponseChange(e.target.value)
          }}
          placeholder="¿Qué aprendiste hoy de Dios? Escribe aquí tus pensamientos o dibujos hablados..."
          rows={3}
          className="w-full bg-cream-50/50 border-2 border-cream-200 rounded-2xl px-4 py-3 font-body text-sm text-forest-800 placeholder-forest-300/80 focus:outline-none focus:border-forest-300 resize-none transition-colors"
        />
        {response.trim().length > 0 && (
          <p className="font-body text-[9px] text-forest-300 text-right mt-1 font-bold">
            ✓ Guardado automáticamente
          </p>
        )}
      </div>

      {/* Progress Action trigger */}
      {!isAlreadyDone && (
        <motion.button
          whileTap={{ scale: allChecked ? 0.95 : 1 }}
          onClick={() => {
            playFanfare() // play major arpeggio fanfare sound!
            onComplete()
          }}
          disabled={!allChecked || isLocked}
          className={`
            w-full py-4 rounded-3xl font-body font-black text-base text-white shadow-md transition-all flex items-center justify-center gap-2
            ${allChecked && !isLocked
              ? 'bg-gradient-to-r from-forest-500 to-green-500 shadow-green hover:from-forest-600 hover:to-green-600'
              : 'bg-slate-200 text-slate-400 border border-slate-300 cursor-not-allowed'}
          `}
        >
          <Smile size={18} className="animate-bounce" />
          {allChecked ? '🌟 ¡Completar mi Día!' : `Realiza los ${7 - completedCount} pasos restantes`}
        </motion.button>
      )}
    </div>
  )
}
