import { dailyRoutine } from '../data/weeks'

const colorMap = {
  sky: { bg: 'bg-sky-100', border: 'border-sky-200', num: 'bg-sky-500', text: 'text-sky-700', icon: 'bg-sky-200' },
  gold: { bg: 'bg-gold-100', border: 'border-gold-200', num: 'bg-gold-500', text: 'text-gold-700', icon: 'bg-gold-200' },
  forest: { bg: 'bg-forest-100', border: 'border-forest-200', num: 'bg-forest-500', text: 'text-forest-700', icon: 'bg-forest-200' },
  rose: { bg: 'bg-rose-100', border: 'border-rose-200', num: 'bg-rose-400', text: 'text-rose-600', icon: 'bg-rose-200' },
  sand: { bg: 'bg-sand-100', border: 'border-sand-200', num: 'bg-sand-400', text: 'text-sand-700', icon: 'bg-sand-200' },
}

const durations = {
  'Semanas 1-2': '5-7 min',
  'Semanas 3-4': '7-8 min',
  'Semanas 5-7': '8-10 min',
  'Semanas 8-10': '10-12 min',
}

export default function DailyRoutine() {
  return (
    <div className="px-4 py-5 space-y-5">
      {/* Header */}
      <div className="text-center">
        <div className="w-16 h-16 bg-forest-gradient rounded-3xl flex items-center justify-center text-3xl mx-auto mb-3 shadow-green">
          📅
        </div>
        <h1 className="font-display text-2xl font-bold text-forest-700 mb-1">Rutina Diaria</h1>
        <p className="font-body text-forest-500 text-sm">7 pasos para el culto personal infantil</p>
      </div>

      {/* Duration guide */}
      <div className="bg-gold-100 border-2 border-gold-200 rounded-3xl p-4">
        <p className="font-body text-gold-700 font-bold text-xs uppercase tracking-wider mb-2.5">⏱ Duración recomendada</p>
        <div className="grid grid-cols-2 gap-2">
          {Object.entries(durations).map(([label, time]) => (
            <div key={label} className="bg-white rounded-2xl px-3 py-2 flex items-center gap-2">
              <span className="text-xs font-body font-bold text-gold-600">{time}</span>
              <span className="text-xs font-body text-forest-500">{label}</span>
            </div>
          ))}
        </div>
        <p className="font-body text-gold-600 text-xs mt-2.5">
          💡 Si el niño está cansado, un culto breve con alegría vale más que uno largo con tensión.
        </p>
      </div>

      {/* Steps */}
      <div className="space-y-3">
        {dailyRoutine.map((item, i) => {
          const c = colorMap[item.color]
          const isLast = i === dailyRoutine.length - 1
          return (
            <div key={item.step} className="relative">
              {/* Connector line */}
              {!isLast && (
                <div className="absolute left-[1.6rem] top-16 w-0.5 h-4 bg-cream-300 z-0" />
              )}
              <div className={`relative z-10 rounded-3xl border-2 ${c.bg} ${c.border} p-4 flex items-start gap-4`}>
                {/* Step number */}
                <div className={`flex-shrink-0 w-10 h-10 ${c.num} rounded-2xl flex items-center justify-center text-white font-display font-bold text-sm shadow-sm`}>
                  {item.step}
                </div>
                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xl">{item.icon}</span>
                    <h3 className={`font-display font-bold ${c.text} text-base`}>{item.title}</h3>
                    <span className={`ml-auto text-xs font-body font-semibold ${c.text} bg-white/60 px-2 py-0.5 rounded-full flex-shrink-0`}>
                      {item.time}
                    </span>
                  </div>
                  <p className="font-body text-forest-600 text-sm leading-relaxed">{item.description}</p>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Key principle */}
      <div className="bg-white rounded-3xl border-2 border-cream-300 p-4 shadow-card">
        <p className="font-display text-forest-700 font-semibold text-center mb-3">La clave del hábito</p>
        <div className="space-y-2">
          {[
            { icon: '🔔', label: 'Señal', desc: 'El momento que recuerda que es la hora del culto' },
            { icon: '🔄', label: 'Rutina', desc: 'Los 7 pasos que se repiten cada día' },
            { icon: '⭐', label: 'Refuerzo', desc: 'El sticker y el afecto que motivan a repetirlo' },
          ].map((item) => (
            <div key={item.label} className="flex items-start gap-3 bg-cream-100 rounded-2xl px-3 py-2.5">
              <span className="text-lg flex-shrink-0">{item.icon}</span>
              <div>
                <span className="font-body font-bold text-forest-700 text-sm">{item.label}: </span>
                <span className="font-body text-forest-500 text-sm">{item.desc}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
