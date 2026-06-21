import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { Lock, Star, CheckCircle, ChevronRight, X, Map } from 'lucide-react'
import { useApp } from '../context/AppContext'
import { MAP_WEEKS, getDayContent } from '../data/dailyContent'

// ── Map geometry ─────────────────────────────────────────────────────────────
// Container: 375px wide × 2200px tall (SVG viewBox)
const VB_W = 375
const VB_H = 2200
const R_NODE = 36   // week node radius
const R_DAY = 10    // day dot radius

const NODE_POS = {
  heaven: { x: 187, y: 90 },
  10:     { x: 270, y: 260 },
  9:      { x: 105, y: 445 },
  8:      { x: 270, y: 630 },
  7:      { x: 105, y: 815 },
  6:      { x: 270, y: 1000 },
  5:      { x: 105, y: 1185 },
  4:      { x: 270, y: 1370 },
  3:      { x: 105, y: 1555 },
  2:      { x: 270, y: 1740 },
  1:      { x: 105, y: 1925 },
  home:   { x: 187, y: 2110 },
}

// Bezier path connecting heaven → w10 → w9 → ... → w1 → home
const WINDING_PATH =
  `M 187,90` +
  ` C 187,175 270,175 270,260` +
  ` C 270,352 105,352 105,445` +
  ` C 105,537 270,537 270,630` +
  ` C 270,722 105,722 105,815` +
  ` C 105,907 270,907 270,1000` +
  ` C 270,1092 105,1092 105,1185` +
  ` C 105,1277 270,1277 270,1370` +
  ` C 270,1462 105,1462 105,1555` +
  ` C 105,1647 270,1647 270,1740` +
  ` C 270,1832 105,1832 105,1925` +
  ` C 105,2017 187,2017 187,2110`

// 7 day dots arranged in a 4+3 grid around a node center
function getDayDotPositions(nodeX) {
  const isLeft = nodeX < 187
  const sign = isLeft ? 1 : -1   // dots extend toward center
  const startX = nodeX + sign * (R_NODE + 14)
  const row1 = [0, 1, 2, 3].map(i => ({ dx: startX + sign * i * 24, dy: -12 }))
  const row2 = [0, 1, 2].map(i => ({ dx: startX + sign * 12 + sign * i * 24, dy: 12 }))
  return [...row1, ...row2]
}

// Color maps
const COLOR = {
  sky:    { bg: '#bae6fd', ring: '#0284c7', text: '#0c4a6e', glow: '#7dd3fc' },
  gold:   { bg: '#fde68a', ring: '#d97706', text: '#78350f', glow: '#fcd34d' },
  forest: { bg: '#bbf7d0', ring: '#16a34a', text: '#14532d', glow: '#86efac' },
  rose:   { bg: '#fecdd3', ring: '#e11d48', text: '#881337', glow: '#fda4af' },
}

// Biblical encouragement phrases shown on day completion
const PHRASES = [
  'Todo lo puedo en Cristo que me fortalece.',
  '¡Bien hecho! Sigue caminando con Jesús.',
  'El Señor está contigo en cada paso.',
  'Tu constancia agrada a Dios.',
  '¡Hoy fue un día de crecimiento espiritual!',
  'Dios ve tu corazón y sonríe.',
  'Cada día más cerca del cielo.',
]

function WeekBadge({ week, status, daysDone, onClick }) {
  const { x, y } = NODE_POS[week.id]
  const c = COLOR[week.color] || COLOR.forest
  const isCompleted = status === 'completed'
  const isCurrent = status === 'current'
  const isLocked = status === 'locked'

  return (
    <g onClick={!isLocked ? onClick : undefined} style={{ cursor: isLocked ? 'default' : 'pointer' }}>
      {/* Glow ring for current week */}
      {isCurrent && (
        <circle cx={x} cy={y} r={R_NODE + 10} fill={c.glow} opacity={0.4}>
          <animate attributeName="r" values={`${R_NODE+8};${R_NODE+14};${R_NODE+8}`} dur="2s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.4;0.15;0.4" dur="2s" repeatCount="indefinite" />
        </circle>
      )}

      {/* Gold shimmer ring for completed */}
      {isCompleted && (
        <circle cx={x} cy={y} r={R_NODE + 6} fill="none" stroke="#f59e0b" strokeWidth={3} opacity={0.6} />
      )}

      {/* Node circle */}
      <circle
        cx={x}
        cy={y}
        r={R_NODE}
        fill={isLocked ? '#e5e7eb' : c.bg}
        stroke={isLocked ? '#9ca3af' : c.ring}
        strokeWidth={isCompleted ? 3 : 2}
        opacity={isLocked ? 0.55 : 1}
      />

      {/* Week icon (emoji rendered as foreign object) */}
      <foreignObject x={x - 18} y={y - 22} width={36} height={36}>
        <div xmlns="http://www.w3.org/1999/xhtml" style={{
          fontSize: isLocked ? '18px' : '22px',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          width: '100%', height: '100%',
          filter: isLocked ? 'grayscale(1)' : 'none',
        }}>
          {isLocked ? '🔒' : week.icon}
        </div>
      </foreignObject>

      {/* Checkmark star for completed */}
      {isCompleted && (
        <circle cx={x + R_NODE - 2} cy={y - R_NODE + 2} r={10} fill="#f59e0b" stroke="white" strokeWidth={2} />
      )}
      {isCompleted && (
        <text x={x + R_NODE - 2} y={y - R_NODE + 2} textAnchor="middle" dominantBaseline="central"
          style={{ fontSize: '10px', fill: 'white', fontWeight: 'bold', userSelect: 'none' }}>✓</text>
      )}

      {/* Week label */}
      <text
        x={x}
        y={y + R_NODE + 14}
        textAnchor="middle"
        style={{ fontSize: '9px', fontWeight: '700', fill: isLocked ? '#9ca3af' : c.text,
          fontFamily: 'Nunito, sans-serif', userSelect: 'none' }}
      >
        {`Sem. ${week.id}`}
      </text>

      {/* Day progress bar (mini) */}
      {!isLocked && (
        <>
          <rect x={x - 22} y={y + R_NODE + 22} width={44} height={5} rx={2.5}
            fill={isLocked ? '#e5e7eb' : '#d1fae5'} />
          <rect x={x - 22} y={y + R_NODE + 22} width={Math.round((daysDone / 7) * 44)} height={5} rx={2.5}
            fill={isCompleted ? '#f59e0b' : '#16a34a'} />
        </>
      )}
    </g>
  )
}

function HeavenNode() {
  const { x, y } = NODE_POS.heaven
  return (
    <g>
      {/* Outer glow rings */}
      <circle cx={x} cy={y} r={56} fill="#fef9c3" opacity={0.35} />
      <circle cx={x} cy={y} r={44} fill="#fef08a" opacity={0.45} />
      {/* Main circle */}
      <circle cx={x} cy={y} r={34} fill="#fef3c7" stroke="#f59e0b" strokeWidth={3} />
      <foreignObject x={x - 20} y={y - 22} width={40} height={40}>
        <div xmlns="http://www.w3.org/1999/xhtml"
          style={{ fontSize: '26px', display: 'flex', alignItems: 'center', justifyContent: 'center',
            width: '100%', height: '100%' }}>
          ✝️
        </div>
      </foreignObject>
      <text x={x} y={y + 48} textAnchor="middle"
        style={{ fontSize: '10px', fontWeight: '800', fill: '#78350f',
          fontFamily: 'Lora, serif', userSelect: 'none' }}>
        EL CIELO
      </text>
      <text x={x} y={y + 61} textAnchor="middle"
        style={{ fontSize: '9px', fill: '#92400e', fontFamily: 'Nunito, sans-serif', userSelect: 'none' }}>
        Con Jesús
      </text>
    </g>
  )
}

function HomeNode() {
  const { x, y } = NODE_POS.home
  return (
    <g>
      <circle cx={x} cy={y} r={34} fill="#fef3c7" stroke="#d97706" strokeWidth={2.5} />
      <foreignObject x={x - 20} y={y - 22} width={40} height={40}>
        <div xmlns="http://www.w3.org/1999/xhtml"
          style={{ fontSize: '26px', display: 'flex', alignItems: 'center', justifyContent: 'center',
            width: '100%', height: '100%' }}>
          🏠
        </div>
      </foreignObject>
      <text x={x} y={y + 48} textAnchor="middle"
        style={{ fontSize: '10px', fontWeight: '700', fill: '#78350f',
          fontFamily: 'Lora, serif', userSelect: 'none' }}>
        MI CASA
      </text>
      <text x={x} y={y + 61} textAnchor="middle"
        style={{ fontSize: '9px', fill: '#92400e', fontFamily: 'Nunito, sans-serif', userSelect: 'none' }}>
        El viaje comienza aquí
      </text>
    </g>
  )
}

// Background decoration elements (clouds, stars)
function MapBackground() {
  return (
    <>
      {/* Sky gradient via rect */}
      <defs>
        <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0.25" />
          <stop offset="35%" stopColor="#bae6fd" stopOpacity="0.15" />
          <stop offset="65%" stopColor="#fef9c3" stopOpacity="0.1" />
          <stop offset="100%" stopColor="#fef3c7" stopOpacity="0.2" />
        </linearGradient>
        <linearGradient id="pathGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#22c55e" />
        </linearGradient>
      </defs>
      <rect x={0} y={0} width={VB_W} height={VB_H} fill="url(#skyGrad)" />

      {/* Stars near heaven */}
      {[[155, 50], [220, 40], [140, 120], [240, 110], [170, 150]].map(([x, y], i) => (
        <text key={i} x={x} y={y} style={{ fontSize: '12px', fill: '#f59e0b', opacity: 0.6, userSelect: 'none' }}>✦</text>
      ))}

      {/* Clouds */}
      {[
        [30, 190, 0.7],
        [280, 160, 0.6],
        [20, 680, 0.5],
        [290, 720, 0.55],
        [40, 1200, 0.45],
        [285, 1280, 0.4],
        [25, 1780, 0.5],
      ].map(([cx, cy, op], i) => (
        <g key={i} opacity={op}>
          <ellipse cx={cx + 14} cy={cy} rx={22} ry={12} fill="white" />
          <ellipse cx={cx + 28} cy={cy - 6} rx={16} ry={10} fill="white" />
          <ellipse cx={cx + 42} cy={cy} rx={18} ry={11} fill="white" />
        </g>
      ))}

      {/* Bible verse banners */}
      <rect x={55} y={390} width={265} height={26} rx={13} fill="#ecfdf5" opacity={0.7} />
      <text x={187} y={407} textAnchor="middle"
        style={{ fontSize: '8.5px', fill: '#166534', fontFamily: 'Lora, serif',
          fontStyle: 'italic', userSelect: 'none' }}>
        "Buscad primero el reino de Dios." — Mat 6:33
      </text>

      <rect x={55} y={950} width={265} height={26} rx={13} fill="#fffbeb" opacity={0.7} />
      <text x={187} y={967} textAnchor="middle"
        style={{ fontSize: '8.5px', fill: '#78350f', fontFamily: 'Lora, serif',
          fontStyle: 'italic', userSelect: 'none' }}>
        "Todo lo puedo en Cristo." — Fil 4:13
      </text>

      <rect x={55} y={1520} width={265} height={26} rx={13} fill="#fff1f2" opacity={0.7} />
      <text x={187} y={1537} textAnchor="middle"
        style={{ fontSize: '8.5px', fill: '#881337', fontFamily: 'Lora, serif',
          fontStyle: 'italic', userSelect: 'none' }}>
        "Yo soy el camino..." — Juan 14:6
      </text>
    </>
  )
}

export default function PathMap() {
  const navigate = useNavigate()
  const {
    started, childName, mapCurrentWeek, mapCurrentDay,
    completedDays, earnedMedals, streak, getWeekDayCount,
    getDayStatus, getMapProgress, startProgram,
  } = useApp()

  const [selectedWeek, setSelectedWeek] = useState(null)
  const [showDaySheet, setShowDaySheet] = useState(false)
  const mapRef = useRef(null)

  // Auto-scroll to current week on mount
  useEffect(() => {
    if (!mapRef.current) return
    const pos = NODE_POS[mapCurrentWeek]
    if (!pos) return
    const ratio = pos.y / VB_H
    const totalHeight = mapRef.current.scrollHeight
    const offset = ratio * totalHeight - 200
    mapRef.current.scrollTo({ top: Math.max(0, offset), behavior: 'smooth' })
  }, [mapCurrentWeek])

  const weekStatus = (id) => {
    if (earnedMedals.includes(id)) return 'completed'
    if (id === mapCurrentWeek) return 'current'
    if (id < mapCurrentWeek) return 'unlocked'
    return 'locked'
  }

  const handleWeekTap = (weekId) => {
    const status = weekStatus(weekId)
    if (status === 'locked') return
    setSelectedWeek(weekId)
    setShowDaySheet(true)
  }

  const handleDayTap = (weekId, dayId) => {
    const status = getDayStatus(weekId, dayId)
    if (status === 'locked') return
    setShowDaySheet(false)
    navigate(`/dia/${weekId}/${dayId}`)
  }

  const { done, total, percent } = getMapProgress()

  const selectedWeekData = selectedWeek
    ? MAP_WEEKS.find(w => w.id === selectedWeek)
    : null

  if (!started) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-6 py-10 text-center">
        <div className="text-6xl mb-4">🗺️</div>
        <h2 className="font-display text-2xl font-bold text-forest-700 mb-2">
          Tu Camino al Cielo
        </h2>
        <p className="font-body text-forest-500 text-sm mb-6">
          Comienza el programa para desbloquear tu mapa espiritual de 10 semanas.
        </p>
        <button
          onClick={() => navigate('/')}
          className="bg-forest-500 text-white font-body font-bold px-6 py-3 rounded-2xl shadow-green"
        >
          Comenzar el programa →
        </button>
      </div>
    )
  }

  return (
    <div className="relative flex flex-col">
      {/* Sticky "Continuar" bar */}
      <div className="sticky top-0 z-10 bg-white/95 backdrop-blur-sm border-b border-cream-200 px-4 py-2.5 flex items-center gap-3">
        <div className="flex-1">
          <p className="font-body text-xs text-forest-500">Tu progreso</p>
          <p className="font-display font-bold text-forest-700 text-sm">
            {childName ? `${childName} · ` : ''}Semana {mapCurrentWeek}, Día {mapCurrentDay}
          </p>
        </div>
        <div className="text-center px-3">
          <p className="font-body text-xs text-gold-600 font-bold">{done}/{total}</p>
          <p className="font-body text-[10px] text-gold-500">días</p>
        </div>
        {streak > 0 && (
          <div className="text-center">
            <p className="text-lg">🔥</p>
            <p className="font-body text-[10px] text-orange-500 font-bold">{streak}</p>
          </div>
        )}
        <button
          onClick={() => navigate(`/dia/${mapCurrentWeek}/${mapCurrentDay}`)}
          className="flex items-center gap-1 bg-forest-500 text-white font-body font-bold text-xs px-3 py-2 rounded-xl shadow-green active:scale-95 transition-transform"
        >
          Continuar <ChevronRight size={14} />
        </button>
      </div>

      {/* SVG Map */}
      <div ref={mapRef} className="overflow-y-auto" style={{ maxHeight: 'calc(100vh - 140px)' }}>
        <svg
          viewBox={`0 0 ${VB_W} ${VB_H}`}
          style={{ width: '100%', height: 'auto', display: 'block', background: 'linear-gradient(to bottom, #e0f2fe 0%, #f0fdf4 40%, #fffbeb 70%, #fef3c7 100%)' }}
          xmlns="http://www.w3.org/2000/svg"
        >
          <MapBackground />

          {/* Background path (gray) */}
          <path d={WINDING_PATH} fill="none" stroke="#e5e7eb" strokeWidth={12} strokeLinecap="round" />

          {/* Progress path (green/gold gradient) — filled up to current position */}
          {percent > 0 && (
            <path d={WINDING_PATH} fill="none" stroke="url(#pathGrad)"
              strokeWidth={8} strokeLinecap="round"
              strokeDasharray="2000"
              strokeDashoffset={Math.round(2000 * (1 - percent / 100))}
              opacity={0.8}
            />
          )}

          {/* Heaven and Home special nodes */}
          <HeavenNode />
          <HomeNode />

          {/* Week nodes */}
          {MAP_WEEKS.map(week => (
            <WeekBadge
              key={week.id}
              week={week}
              status={weekStatus(week.id)}
              daysDone={getWeekDayCount(week.id)}
              onClick={() => handleWeekTap(week.id)}
            />
          ))}
        </svg>

        {/* Extra padding at bottom */}
        <div className="h-8" />
      </div>

      {/* Bottom sheet: Week day picker */}
      {showDaySheet && selectedWeekData && (
        <>
          <div
            className="fixed inset-0 bg-black/40 z-30"
            onClick={() => setShowDaySheet(false)}
          />
          <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-2xl bg-white rounded-t-3xl z-40 p-5 pb-8 shadow-warm-lg animate-slide-up">
            {/* Handle */}
            <div className="w-10 h-1 bg-gray-200 rounded-full mx-auto mb-4" />

            {/* Header */}
            <div className="flex items-center gap-3 mb-4">
              <span className="text-3xl">{selectedWeekData.icon}</span>
              <div className="flex-1">
                <p className="font-body text-xs text-forest-400">Semana {selectedWeekData.id}</p>
                <p className="font-display font-bold text-forest-700 text-base leading-tight">
                  {selectedWeekData.name}
                </p>
              </div>
              {earnedMedals.includes(selectedWeek) && (
                <span className="text-2xl">🏅</span>
              )}
              <button
                onClick={() => setShowDaySheet(false)}
                className="p-1.5 text-gray-400 hover:text-gray-600"
              >
                <X size={18} />
              </button>
            </div>

            {/* Progress bar */}
            <div className="mb-4">
              <div className="flex justify-between mb-1">
                <span className="font-body text-xs text-forest-500">
                  {getWeekDayCount(selectedWeek)}/7 días completados
                </span>
                {earnedMedals.includes(selectedWeek) && (
                  <span className="font-body text-xs text-gold-600 font-bold">¡Semana completa! 🌟</span>
                )}
              </div>
              <div className="h-2.5 bg-green-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-forest-400 to-gold-400 rounded-full transition-all duration-500"
                  style={{ width: `${Math.round((getWeekDayCount(selectedWeek) / 7) * 100)}%` }}
                />
              </div>
            </div>

            {/* Day grid */}
            <div className="grid grid-cols-7 gap-2 mb-5">
              {Array.from({ length: 7 }, (_, i) => {
                const dayId = i + 1
                const status = getDayStatus(selectedWeek, dayId)
                const dayContent = getDayContent(selectedWeek, dayId)
                const isLocked = status === 'locked'
                const isCompleted = status === 'completed'
                const isCurrent = status === 'current'

                return (
                  <button
                    key={dayId}
                    onClick={() => handleDayTap(selectedWeek, dayId)}
                    disabled={isLocked}
                    className={`
                      flex flex-col items-center gap-1 py-2 rounded-2xl border-2 transition-all active:scale-95
                      ${isCompleted ? 'bg-gold-100 border-gold-300' :
                        isCurrent ? 'bg-forest-100 border-forest-300' :
                        isLocked ? 'bg-gray-50 border-gray-200 opacity-50' :
                        'bg-cream-100 border-cream-300'}
                    `}
                  >
                    <span className="text-[10px] font-body font-bold text-gray-500">D{dayId}</span>
                    {isCompleted ? (
                      <span className="text-sm">⭐</span>
                    ) : isCurrent ? (
                      <span className="text-sm">▶️</span>
                    ) : isLocked ? (
                      <span className="text-sm">🔒</span>
                    ) : (
                      <span className="text-sm">○</span>
                    )}
                    {dayContent && (
                      <span className="text-[8px] font-body text-gray-400 text-center leading-tight px-0.5 line-clamp-2">
                        {dayContent.title.split(' ').slice(0, 2).join(' ')}
                      </span>
                    )}
                  </button>
                )
              })}
            </div>

            {/* CTA Button */}
            {selectedWeek === mapCurrentWeek ? (
              <button
                onClick={() => {
                  setShowDaySheet(false)
                  navigate(`/dia/${mapCurrentWeek}/${mapCurrentDay}`)
                }}
                className="w-full bg-forest-500 text-white font-body font-bold py-3.5 rounded-2xl shadow-green text-base active:scale-95 transition-transform"
              >
                ▶ Continuar Día {mapCurrentDay}
              </button>
            ) : earnedMedals.includes(selectedWeek) ? (
              <button
                onClick={() => {
                  setShowDaySheet(false)
                  navigate(`/dia/${selectedWeek}/1`)
                }}
                className="w-full bg-gold-400 text-white font-body font-bold py-3.5 rounded-2xl shadow-warm text-base active:scale-95 transition-transform"
              >
                🔁 Repasar esta semana
              </button>
            ) : (
              <button
                onClick={() => {
                  setShowDaySheet(false)
                  navigate(`/dia/${selectedWeek}/1`)
                }}
                className="w-full bg-sky-500 text-white font-body font-bold py-3.5 rounded-2xl text-base active:scale-95 transition-transform"
              >
                ▶ Comenzar Semana {selectedWeek}
              </button>
            )}
          </div>
        </>
      )}
    </div>
  )
}
