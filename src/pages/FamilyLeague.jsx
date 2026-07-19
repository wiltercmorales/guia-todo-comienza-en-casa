import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, X, Trash2, Flame } from 'lucide-react'
import { useApp } from '../context/AppContext'
import { AVATARS } from '../data/assets'
import { playClick, playBell } from '../utils/audio'
import AvatarFrame from '../components/AvatarFrame'

const RANK_MEDALS = ['🥇', '🥈', '🥉']

function AddProfileModal({ onClose, onCreate }) {
  const [name, setName] = useState('')
  const [avatar, setAvatar] = useState('nino')

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 lg:pl-64">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/55 backdrop-blur-sm"
      />
      <motion.div
        initial={{ scale: 0.9, y: 30, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.9, y: 30, opacity: 0 }}
        className="relative w-full max-w-md bg-white border-4 border-forest-300 rounded-5xl shadow-warm-lg p-5 z-10 max-h-[85vh] flex flex-col"
      >
        <div className="flex items-center justify-between mb-4 border-b-2 border-cream-200 pb-3">
          <h2 className="font-display font-bold text-forest-700 text-lg">Añadir hermano/a</h2>
          <button onClick={onClose} className="p-1.5 rounded-xl bg-cream-200 text-gray-400 hover:text-gray-600 transition-colors">
            <X size={18} />
          </button>
        </div>

        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="¿Cómo se llama?"
          maxLength={24}
          className="w-full bg-cream-50 border-2 border-cream-300 rounded-2xl px-4 py-3 font-body text-forest-800 font-bold placeholder:text-forest-300 placeholder:font-semibold focus:outline-none focus:border-forest-400 mb-4"
        />

        <p className="font-body text-[11px] font-black text-forest-500 uppercase tracking-wider mb-2">Elige su personaje</p>
        <div className="flex-1 overflow-y-auto pr-1 grid grid-cols-4 gap-2.5 py-1">
          {AVATARS.map((av) => {
            const isSelected = avatar === av.id
            return (
              <button
                key={av.id}
                onClick={() => setAvatar(av.id)}
                className={`relative flex flex-col items-center justify-center p-2 rounded-2xl border-2 transition-all aspect-square ${
                  isSelected ? 'bg-gold-100 border-gold-400 shadow-warm' : 'bg-cream-50 border-cream-300 hover:border-forest-200'
                }`}
              >
                <img src={av.path} alt={av.name} className="w-9 h-9 object-contain" onError={(e) => { e.target.src = av.fallback }} />
              </button>
            )
          })}
        </div>

        <button
          onClick={() => name.trim() && onCreate(name.trim(), avatar)}
          disabled={!name.trim()}
          className={`mt-4 w-full font-body font-black py-3 rounded-2xl text-sm transition-colors ${
            name.trim() ? 'bg-forest-500 text-white shadow-green' : 'bg-slate-100 text-slate-400 cursor-not-allowed'
          }`}
        >
          Crear perfil ✨
        </button>
      </motion.div>
    </div>
  )
}

export default function FamilyLeague() {
  const { getProfilesSummary, switchProfile, createProfile, deleteProfile } = useApp()
  const [showAdd, setShowAdd] = useState(false)
  const [confirmDelete, setConfirmDelete] = useState(null)

  const profiles = getProfilesSummary()
  const canDelete = profiles.length > 1

  const handleCreate = (name, avatar) => {
    playBell()
    createProfile(name, avatar)
    setShowAdd(false)
  }

  const handleSwitch = (id) => {
    playClick()
    switchProfile(id)
  }

  const handleDelete = (id) => {
    if (confirmDelete === id) {
      deleteProfile(id)
      setConfirmDelete(null)
    } else {
      setConfirmDelete(id)
    }
  }

  return (
    <div className="px-4 py-5 space-y-5 pb-24">
      <div className="bg-white border-4 border-cream-200 rounded-[2.2rem] p-5 shadow-warm-lg">
        <h1 className="font-display text-2xl font-black text-forest-700 flex items-center gap-2">
          <span>👨‍👩‍👧‍👦</span> Liga Familiar
        </h1>
        <p className="font-body text-forest-500 text-sm mt-1 leading-normal">
          Compara el avance de cada hermano/a en este dispositivo. Los perfiles se guardan solo aquí, sin internet.
        </p>
      </div>

      <div className="space-y-2.5">
        {profiles.map((p, index) => {
          const medal = RANK_MEDALS[index]
          return (
            <motion.div
              layout
              key={p.id}
              className={`flex items-center gap-3 p-3.5 rounded-3xl border-4 transition-all ${
                p.isActive ? 'bg-forest-100 border-forest-300 shadow-warm' : 'bg-white border-cream-200'
              }`}
            >
              <span className="w-6 text-center font-display font-black text-forest-500 text-sm flex-shrink-0">
                {medal || index + 1}
              </span>
              <AvatarFrame avatarId={p.avatar} frameId={p.activeFrame} size={48} />

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <p className="font-display font-black text-forest-800 text-sm truncate">{p.name}</p>
                  {p.isActive && (
                    <span className="bg-forest-500 text-white text-[9px] font-body font-black px-2 py-0.5 rounded-full uppercase tracking-wide flex-shrink-0">
                      Activo
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-3 mt-1 flex-wrap">
                  <span className="flex items-center gap-1 text-[11px] font-body font-black text-gold-600">
                    <img src="/assets-duo/points.svg" alt="" className="w-3.5 h-3.5" /> {p.stars}
                  </span>
                  <span className="flex items-center gap-1 text-[11px] font-body font-black text-orange-500">
                    <Flame size={12} className="fill-orange-400" /> {p.streak}
                  </span>
                  <span className="flex items-center gap-1 text-[11px] font-body font-black text-sky-600">
                    🏅 {p.medals}
                  </span>
                  <span className="text-[11px] font-body font-bold text-forest-400">
                    {p.completedDays} días
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-1.5 flex-shrink-0">
                {!p.isActive && (
                  <button
                    onClick={() => handleSwitch(p.id)}
                    className="bg-forest-500 text-white font-body font-black text-[11px] px-3 py-2 rounded-xl active:scale-95 transition-transform"
                  >
                    Usar
                  </button>
                )}
                {canDelete && (
                  <button
                    onClick={() => handleDelete(p.id)}
                    className={`p-2 rounded-xl transition-colors ${
                      confirmDelete === p.id ? 'bg-rose-500 text-white' : 'bg-cream-100 text-forest-300 hover:text-rose-400'
                    }`}
                    title={confirmDelete === p.id ? 'Toca de nuevo para confirmar' : 'Eliminar perfil'}
                  >
                    <Trash2 size={14} />
                  </button>
                )}
              </div>
            </motion.div>
          )
        })}
      </div>

      <button
        onClick={() => setShowAdd(true)}
        className="w-full flex items-center justify-center gap-2 border-4 border-dashed border-forest-200 text-forest-500 font-body font-black text-sm py-4 rounded-3xl hover:bg-forest-50 transition-colors"
      >
        <Plus size={18} /> Añadir hermano/a
      </button>

      <AnimatePresence>
        {showAdd && (
          <AddProfileModal onClose={() => setShowAdd(false)} onCreate={handleCreate} />
        )}
      </AnimatePresence>
    </div>
  )
}
