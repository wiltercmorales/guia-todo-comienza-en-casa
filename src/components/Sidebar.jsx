import { NavLink } from 'react-router-dom'
import { Map, BarChart2, BookOpen, Star, CheckSquare, ShoppingBag, Trophy, Heart } from 'lucide-react'
import { useApp } from '../context/AppContext'
import AvatarFrame from './AvatarFrame'

export default function Sidebar() {
  const { childName, childAvatar, activeFrame, stars, mapCurrentWeek, mapCurrentDay } = useApp()

  const navItems = [
    { to: '/mapa', icon: Map, label: 'Camino al Cielo' },
    { to: `/dia/${mapCurrentWeek}/${mapCurrentDay}`, icon: CheckSquare, label: 'Mi Día' },
    { to: '/mi-avance', icon: BarChart2, label: 'Mi Avance' },
    { to: '/pasaporte', icon: BookOpen, label: 'Pasaporte' },
    { to: '/desafios', icon: Star, label: 'Desafíos' },
    { to: '/tienda', icon: ShoppingBag, label: 'Tienda' },
    { to: '/liga', icon: Trophy, label: 'Liga Familiar' },
    { to: '/padres', icon: Heart, label: 'Para Padres' },
  ]

  return (
    <aside className="hidden lg:flex flex-col fixed left-0 top-0 bottom-0 w-64 bg-white border-r-4 border-cream-200 px-4 py-6 z-20">
      <div className="flex items-center gap-2.5 px-2 mb-8">
        <div className="w-9 h-9 rounded-xl bg-forest-gradient flex items-center justify-center text-lg flex-shrink-0">
          ✝️
        </div>
        <span className="font-display font-black text-forest-700 text-sm leading-tight">
          Todo Comienza<br />en Casa
        </span>
      </div>

      <nav className="flex-1 flex flex-col gap-1 overflow-y-auto">
        {navItems.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={label}
            to={to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3.5 py-2.5 rounded-2xl font-body font-black text-sm transition-colors ${
                isActive ? 'bg-forest-100 text-forest-700' : 'text-forest-400 hover:bg-cream-100 hover:text-forest-600'
              }`
            }
          >
            <Icon size={19} strokeWidth={2.2} />
            {label}
          </NavLink>
        ))}
      </nav>

      <div className="flex items-center gap-2.5 border-t-2 border-cream-200 pt-4 px-1 mt-2">
        <AvatarFrame avatarId={childAvatar} frameId={activeFrame} size={40} />
        <div className="min-w-0 flex-1">
          <p className="font-body font-black text-forest-800 text-sm truncate">{childName || 'Mi Camino'}</p>
          <p className="font-body text-[11px] font-bold text-gold-600 flex items-center gap-1 mt-0.5">
            <img src="/assets-duo/points.svg" className="w-3 h-3" alt="" /> {stars}
          </p>
        </div>
      </div>
    </aside>
  )
}
