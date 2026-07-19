import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useApp } from '../context/AppContext'
import { ArrowRight, BookOpen, Star, Heart, Users } from 'lucide-react'
import { playClick, playBell } from '../utils/audio'

export default function Home() {
  const navigate = useNavigate()
  const { started, startProgram } = useApp()
  const [name, setName] = useState('')
  const [age, setAge] = useState('8')
  const [showForm, setShowForm] = useState(false)
  const [selectedAvatar, setSelectedAvatar] = useState('nino')

  const handleStart = () => {
    if (!started) {
      setShowForm(true)
      playClick()
    } else {
      playBell()
      navigate('/mapa')
    }
  }

  const handleConfirm = () => {
    if (!name.trim()) return
    playBell()
    startProgram(name.trim(), age, selectedAvatar)
    navigate('/mapa')
  }

  return (
    <div className="min-h-screen bg-warm-gradient flex flex-col overflow-hidden relative">
      {/* Decorative background circles */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-gold-200/30 rounded-full -translate-y-1/3 translate-x-1/3 blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 left-0 w-48 h-48 bg-forest-200/30 rounded-full translate-y-1/3 -translate-x-1/3 blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-sky-100/20 rounded-full blur-3xl pointer-events-none" />

      <div className="relative flex-1 flex flex-col items-center justify-center text-center px-6 py-10">
        {/* Floating hero illustration with Duo mascot */}
        <div className="relative mb-6 animate-float">
          <div className="w-32 h-32 flex items-center justify-center">
            <img src="/assets-duo/mascot.svg" alt="Duo Mascota" className="w-full h-full object-contain" />
          </div>
          <div className="absolute -top-1 -right-1 w-10 h-10 rounded-2xl bg-gold-gradient shadow-warm flex items-center justify-center text-xl animate-float-slow">
            ✝️
          </div>
        </div>

        {/* Title */}
        <h1 className="font-display text-4xl font-bold text-forest-700 leading-tight mb-2">
          Todo Comienza<br />
          <span className="text-gradient-gold">en Casa</span>
        </h1>
        <p className="font-body text-forest-500 text-base leading-relaxed mb-8 max-w-xs">
          Guía interactiva para formar el hábito del culto personal infantil en familia
        </p>

        {/* Feature pills */}
        <div className="w-full max-w-sm space-y-2.5 mb-10">
          {[
            { icon: <BookOpen size={18} />, text: '10 semanas de guía paso a paso', color: 'sky' },
            { icon: <Users size={18} />, text: 'Padres e hijos de 8 y 9 años', color: 'forest' },
            { icon: <Star size={18} />, text: 'Oración, Biblia y acción diaria', color: 'gold' },
            { icon: <Heart size={18} />, text: 'Pasaporte con Jesús incluido', color: 'rose' },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-white/80 backdrop-blur-sm rounded-2xl px-4 py-3 flex items-center gap-3 shadow-card"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <div className={`w-8 h-8 rounded-xl bg-${item.color}-100 text-${item.color}-600 flex items-center justify-center flex-shrink-0`}>
                {item.icon}
              </div>
              <span className="font-body text-forest-700 text-sm font-semibold">{item.text}</span>
            </div>
          ))}
        </div>

        {/* CTA */}
        {!showForm ? (
          <div className="btn-3d-wrap w-full max-w-sm h-14">
            <div className="btn-3d-shadow bg-green-700" />
            <button
              onClick={handleStart}
              className="btn-3d-front w-full h-full bg-forest-gradient text-white font-body font-bold py-4 px-8 border border-forest-400 text-base flex items-center justify-center gap-2"
            >
              {started ? '✅ Continuar programa' : '🚀 Iniciar programa'}
              <ArrowRight size={20} />
            </button>
          </div>
        ) : (
          <div className="w-full max-w-sm space-y-3 animate-scale-in">
            <div className="bg-white rounded-3xl p-5 shadow-warm border-2 border-cream-200">
              <div className="mb-4">
                <p className="font-display text-forest-800 font-bold mb-1.5 text-center text-sm">
                  ¿Cómo te llamas?
                </p>
                <input
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="Tu nombre aquí..."
                  className="w-full bg-cream-50 rounded-2xl px-4 py-2.5 font-body text-forest-700 placeholder-forest-300 border-2 border-cream-200 focus:border-forest-400 focus:outline-none text-center font-bold text-sm mb-3"
                  maxLength={30}
                  autoFocus
                  onKeyDown={e => e.key === 'Enter' && handleConfirm()}
                />
              </div>

              <div className="mb-4">
                <p className="font-display text-forest-800 font-bold mb-1.5 text-center text-sm">
                  ¿Cuántos años tienes?
                </p>
                <select
                  value={age}
                  onChange={e => setAge(e.target.value)}
                  className="w-full bg-cream-50 rounded-2xl px-4 py-2.5 font-body text-forest-700 border-2 border-cream-200 focus:border-forest-400 focus:outline-none text-center font-bold text-sm"
                >
                  <option value="8">8 años</option>
                  <option value="9">9 años</option>
                </select>
              </div>

              <p className="font-display text-forest-800 font-bold mb-3.5 text-center text-xs md:text-sm">
                Elige tu personaje:
              </p>
              
              {/* Character selection buttons */}
              <div className="flex gap-4 justify-center mb-5">
                {[
                  { id: 'nino', name: 'Niño', path: './assets/avatar/nino.png' },
                  { id: 'nina', name: 'Niña', path: './assets/avatar/nina.png' },
                ].map((char) => {
                  const isSel = selectedAvatar === char.id
                  return (
                    <motion.button
                      key={char.id}
                      type="button"
                      whileHover={{ scale: 1.06 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        setSelectedAvatar(char.id)
                        playClick()
                      }}
                      className={`
                        flex-1 flex flex-col items-center p-3 rounded-2xl border-2 transition-all aspect-square justify-center relative
                        ${isSel 
                          ? 'bg-gold-50 border-gold-400 shadow-md' 
                          : 'bg-cream-50 border-cream-200'}
                      `}
                    >
                      <img src={char.path} alt={char.name} className="w-14 h-14 object-contain mb-1" />
                      <span className="font-body text-xs font-black text-forest-700">{char.name}</span>
                      
                      {isSel && (
                        <div className="absolute -top-1.5 -right-1.5 bg-green-500 text-white rounded-full w-5 h-5 border border-white flex items-center justify-center text-[10px] font-bold">
                          ✓
                        </div>
                      )}
                    </motion.button>
                  )
                })}
              </div>

              <div className="btn-3d-wrap w-full h-14">
                <div className="btn-3d-shadow bg-green-700" />
                <button
                  onClick={handleConfirm}
                  className="btn-3d-front w-full h-full bg-forest-gradient text-white font-body font-black py-4 border border-forest-400 text-base flex items-center justify-center gap-2"
                >
                  ¡Comenzamos! <ArrowRight size={18} />
                </button>
              </div>
              <button
                onClick={() => setShowForm(false)}
                className="w-full mt-2 text-forest-400 font-body text-xs py-2 hover:text-forest-600 transition-colors font-bold"
              >
                Volver
              </button>
            </div>
          </div>
        )}

        <p className="font-body text-forest-400 text-xs mt-4">
          Un momento especial con Dios, cada día
        </p>
      </div>

      {/* Bible verse footer */}
      <div className="relative mx-4 mb-8">
        <div className="bg-white/70 backdrop-blur-sm px-6 py-5 rounded-3xl shadow-warm border border-cream-300 text-center">
          <p className="font-display italic text-forest-600 text-sm leading-relaxed">
            "Instruye al niño en su camino, y aun cuando fuere viejo no se apartará de él."
          </p>
          <p className="font-body text-forest-400 text-xs mt-1.5 font-semibold">Proverbios 22:6</p>
        </div>
      </div>
    </div>
  )
}
