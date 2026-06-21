import { Outlet, NavLink, useNavigate, useLocation } from 'react-router-dom'
import { Map, BarChart2, BookOpen, Star, Heart, ChevronLeft, MoreHorizontal } from 'lucide-react'
import { useState } from 'react'

const navItems = [
  { to: '/mapa',      icon: Map,       label: 'Mapa'    },
  { to: '/mi-avance', icon: BarChart2,  label: 'Avance'  },
  { to: '/pasaporte', icon: BookOpen,   label: 'Pasaporte' },
  { to: '/desafios',  icon: Star,       label: 'Desafíos' },
]

const pageTitles = {
  '/mapa':       'Camino al Cielo',
  '/mi-avance':  'Mi Avance',
  '/dashboard':  'Inicio',
  '/semanas':    'Plan de Semanas',
  '/hoy':        'Mi Culto de Hoy',
  '/pasaporte':  'Mi Pasaporte',
  '/desafios':   'Desafíos',
  '/padres':     'Para Padres',
  '/rutina':     'Rutina Diaria',
  '/cierre':     'Cierre del Programa',
}

const MORE_LINKS = [
  { to: '/dashboard',  label: '🏠 Inicio / Resumen'  },
  { to: '/hoy',        label: '✅ Checklist diario'   },
  { to: '/semanas',    label: '📅 Plan de semanas'    },
  { to: '/rutina',     label: '📋 Rutina diaria'      },
  { to: '/padres',     label: '💛 Para padres'        },
  { to: '/cierre',     label: '🌟 Cierre del programa' },
]

function MoreMenu({ onClose }) {
  const navigate = useNavigate()
  return (
    <>
      <div className="fixed inset-0 bg-black/30 z-30" onClick={onClose} />
      <div className="fixed bottom-[72px] left-1/2 -translate-x-1/2 w-full max-w-2xl bg-white border border-cream-200 rounded-t-2xl z-40 shadow-warm-lg pb-2 animate-slide-up">
        <div className="w-8 h-1 bg-gray-200 rounded-full mx-auto mt-2 mb-1" />
        <p className="font-body text-xs text-gray-400 text-center mb-2">Más opciones</p>
        {MORE_LINKS.map(({ to, label }) => (
          <button
            key={to}
            onClick={() => { navigate(to); onClose() }}
            className="w-full text-left px-5 py-3 font-body text-sm text-forest-700 hover:bg-cream-100 transition-colors border-b border-cream-100 last:border-0"
          >
            {label}
          </button>
        ))}
      </div>
    </>
  )
}

export default function Layout() {
  const navigate = useNavigate()
  const location = useLocation()
  const [showMore, setShowMore] = useState(false)

  const isDayPage = location.pathname.startsWith('/dia/')
  const isSubPage = location.pathname.startsWith('/semana/')
  const isMapPage = location.pathname === '/mapa'

  const title = isDayPage
    ? 'Mi Culto del Día'
    : isSubPage
    ? 'Detalle de Semana'
    : (pageTitles[location.pathname] || 'Todo Comienza en Casa')

  const showBack = isDayPage || isSubPage

  return (
    <div className="min-h-screen bg-cream-100 flex flex-col max-w-2xl mx-auto">
      {/* Top bar — hidden on map page to give more space */}
      {!isMapPage && (
        <header className="bg-white/90 backdrop-blur-sm border-b border-cream-300 px-4 py-3 flex items-center gap-3 sticky top-0 z-20">
          {showBack ? (
            <button
              onClick={() => navigate(-1)}
              className="p-1.5 rounded-xl text-forest-500 hover:bg-forest-100 transition-colors"
            >
              <ChevronLeft size={22} />
            </button>
          ) : (
            <div className="w-8 h-8 rounded-xl bg-forest-gradient flex items-center justify-center text-base">
              ✝️
            </div>
          )}
          <span className="font-display font-semibold text-forest-700 text-base flex-1">{title}</span>
          <NavLink
            to="/padres"
            className={({ isActive }) =>
              `p-2 rounded-xl transition-colors ${isActive ? 'text-rose-500 bg-rose-100' : 'text-forest-400 hover:text-rose-400'}`
            }
          >
            <Heart size={20} />
          </NavLink>
        </header>
      )}

      {/* Page content */}
      <main className={`flex-1 overflow-y-auto animate-fade-in ${isMapPage ? '' : 'pb-24'}`}>
        <Outlet />

        {!isMapPage && (
          <footer className="mt-12 py-6 border-t border-amber-100 text-center">
            <p className="text-sm font-medium text-slate-700">
              © 2026 Todo Comienza en Casa • Todos los derechos reservados
            </p>
            <p className="mt-2 text-sm text-slate-600">
              Desarrollado por <strong>Pr. Charmin Morales</strong>
            </p>
            <p className="mt-1 text-xs text-slate-400">
              Iglesia Adventista del Séptimo Día • Iglesia Villa Unión
            </p>
          </footer>
        )}
      </main>

      {/* Bottom nav */}
      <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-2xl bg-white/95 backdrop-blur-sm border-t border-cream-300 z-20">
        <div className="flex items-center justify-around py-2 px-2">
          {navItems.map(({ to, icon: Icon, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-2xl transition-all duration-200 min-w-[56px] ${
                  isActive
                    ? 'text-forest-600 bg-forest-100'
                    : 'text-gray-400 hover:text-forest-500 hover:bg-cream-200'
                }`
              }
            >
              <Icon size={21} strokeWidth={2} />
              <span className="text-[10px] font-body font-bold leading-tight">{label}</span>
            </NavLink>
          ))}

          {/* More menu button */}
          <button
            onClick={() => setShowMore(v => !v)}
            className={`flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-2xl transition-all duration-200 min-w-[56px]
              ${showMore ? 'text-forest-600 bg-forest-100' : 'text-gray-400 hover:text-forest-500 hover:bg-cream-200'}`}
          >
            <MoreHorizontal size={21} strokeWidth={2} />
            <span className="text-[10px] font-body font-bold leading-tight">Más</span>
          </button>
        </div>
      </nav>

      {/* More menu */}
      {showMore && <MoreMenu onClose={() => setShowMore(false)} />}
    </div>
  )
}
