import { Outlet, NavLink, useNavigate, useLocation } from 'react-router-dom'
import { Map, BarChart2, BookOpen, Star, Heart, ChevronLeft, MoreHorizontal, CheckSquare } from 'lucide-react'
import { useState } from 'react'
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion'

const NAV_ITEMS = [
  { to: '/mapa',      icon: Map,         label: 'Mapa'      },
  { to: '/hoy',       icon: CheckSquare, label: 'Día'       },
  { to: '/mi-avance', icon: BarChart2,   label: 'Avance'    },
  { to: '/pasaporte', icon: BookOpen,    label: 'Pasaporte' },
  { to: '/desafios',  icon: Star,        label: 'Desafíos'  },
]

const PAGE_TITLES = {
  '/mapa':       'Camino al Cielo',
  '/mi-avance':  'Mi Avance',
  '/hoy':        'Mi Culto de Hoy',
  '/dashboard':  'Inicio',
  '/semanas':    'Plan de Semanas',
  '/pasaporte':  'Mi Pasaporte',
  '/desafios':   'Desafíos',
  '/padres':     'Para Padres',
  '/rutina':     'Rutina Diaria',
  '/cierre':     'Cierre del Programa',
}

const MORE_LINKS = [
  { to: '/dashboard', label: '🏠 Inicio / Resumen'   },
  { to: '/semanas',   label: '📅 Plan de semanas'     },
  { to: '/rutina',    label: '📋 Rutina diaria'       },
  { to: '/padres',    label: '💛 Para padres'         },
  { to: '/cierre',    label: '🌟 Cierre del programa' },
]

function MoreMenu({ onClose }) {
  const navigate = useNavigate()
  return (
    <AnimatePresence>
      <motion.div
        key="backdrop"
        className="fixed inset-0 bg-black/30 z-30"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />
      <motion.div
        key="menu"
        className="fixed left-1/2 -translate-x-1/2 w-full max-w-2xl bg-white border border-cream-200 rounded-t-2xl z-40 shadow-warm-lg"
        style={{ bottom: 68 }}
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 80, opacity: 0 }}
        transition={{ type: 'spring', damping: 28, stiffness: 320 }}
      >
        <div className="w-8 h-1 bg-gray-200 rounded-full mx-auto mt-2.5 mb-1"/>
        <p className="font-body text-xs text-gray-400 text-center mb-1.5">Más opciones</p>
        {MORE_LINKS.map(({ to, label }) => (
          <button
            key={to}
            onClick={() => { navigate(to); onClose() }}
            className="w-full text-left px-5 py-3.5 font-body text-sm text-forest-700
              hover:bg-cream-100 transition-colors border-b border-cream-100 last:border-0"
          >
            {label}
          </button>
        ))}
      </motion.div>
    </AnimatePresence>
  )
}

export default function Layout() {
  const navigate = useNavigate()
  const location = useLocation()
  const [showMore, setShowMore] = useState(false)

  const isMapPage  = location.pathname === '/mapa'
  const isDayPage  = location.pathname.startsWith('/dia/')
  const isSubPage  = location.pathname.startsWith('/semana/')
  const showBack   = isDayPage || isSubPage

  const title = isDayPage ? 'Mi Culto del Día'
    : isSubPage ? 'Detalle de Semana'
    : (PAGE_TITLES[location.pathname] || 'Todo Comienza en Casa')

  return (
    <div className="min-h-screen bg-cream-100 flex flex-col max-w-2xl mx-auto">

      {/* Top bar — hidden on map (PathMap has its own header) */}
      {!isMapPage && (
        <header className="bg-white/90 backdrop-blur-sm border-b border-cream-300 px-4 py-3
          flex items-center gap-3 sticky top-0 z-20">
          {showBack ? (
            <button
              onClick={() => navigate(-1)}
              className="p-1.5 rounded-xl text-forest-500 hover:bg-forest-100 transition-colors"
            >
              <ChevronLeft size={22}/>
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
            <Heart size={20}/>
          </NavLink>
        </header>
      )}

      {/* Page content
          Map page: overflow-hidden + flex so PathMap fills exactly the remaining space.
          Other pages: overflow-y-auto + pb-24 (normal scroll). */}
      <main className={
        isMapPage
          ? 'flex-1 overflow-hidden flex flex-col min-h-0'
          : 'flex-1 overflow-y-auto pb-24 animate-fade-in'
      }>
        <Outlet/>

        {!isMapPage && (
          <footer className="mt-12 py-6 border-t border-amber-100 text-center">
            <p className="text-sm font-medium text-slate-700">
              © 2026 Todo Comienza en Casa • Todos los derechos reservados
            </p>
            <p className="mt-2 text-sm text-slate-600">
              Desarrollado por <strong>Pr. Charmin Morales</strong>
            </p>
            <p className="mt-1 text-xs text-slate-400">
              Iglesia Adventista del Séptimo Día • Distrito Misionero Villa Unión
            </p>
          </footer>
        )}
      </main>

      {/* Bottom nav */}
      <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-2xl
        bg-white/95 backdrop-blur-md border-t border-cream-200 z-20 shadow-warm">
        <LayoutGroup id="bottomNav">
          <div className="flex items-center justify-around px-1 py-1.5">
            {NAV_ITEMS.map(({ to, icon: Icon, label }) => (
              <NavLink
                key={to}
                to={to}
                className="flex flex-col items-center gap-0.5 px-2 py-1.5 rounded-2xl
                  transition-colors duration-200 min-w-[52px] relative"
              >
                {({ isActive }) => (
                  <>
                    {isActive && (
                      <motion.div
                        layoutId="navPill"
                        className="absolute inset-0 bg-forest-100 rounded-2xl"
                        transition={{ type: 'spring', damping: 26, stiffness: 300 }}
                      />
                    )}
                    <Icon
                      size={20}
                      strokeWidth={2}
                      className={`relative z-[1] ${isActive ? 'text-forest-600' : 'text-gray-400'}`}
                    />
                    <span className={`text-[9px] font-body font-bold leading-tight relative z-[1]
                      ${isActive ? 'text-forest-600' : 'text-gray-400'}`}>
                      {label}
                    </span>
                  </>
                )}
              </NavLink>
            ))}

            <button
              onClick={() => setShowMore(v => !v)}
              className={`flex flex-col items-center gap-0.5 px-2 py-1.5 rounded-2xl
                transition-all duration-200 min-w-[52px]
                ${showMore ? 'text-forest-600 bg-forest-100' : 'text-gray-400 hover:text-forest-500'}`}
            >
              <MoreHorizontal size={20} strokeWidth={2}/>
              <span className="text-[9px] font-body font-bold leading-tight">Más</span>
            </button>
          </div>
        </LayoutGroup>
      </nav>

      {showMore && <MoreMenu onClose={() => setShowMore(false)}/>}
    </div>
  )
}
