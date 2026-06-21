import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { X, ChevronRight, Flame, Star } from 'lucide-react'
import { useApp } from '../context/AppContext'
import { getDayContent, MAP_WEEKS } from '../data/dailyContent'

// ─── Map geometry ─────────────────────────────────────────────────────────────
const VB_W   = 390
const ROWS   = 14
const COLS   = 5
const ROW_H  = 136
const PAD_X  = 52
const COL_GAP = (VB_W - 2 * PAD_X) / (COLS - 1)   // ≈ 71.5
const R      = 30   // node radius
const HOME_Y = VB_W * (2200 / 390) - 90            // bottom
const VB_H   = 2240

const ROW_TOP_Y = VB_H - 220   // center-y of row-0 nodes

function nodePos(dayIdx) {
  const row = Math.floor(dayIdx / COLS)
  const col = dayIdx % COLS
  const rtl  = row % 2 === 1
  const xCol = rtl ? (COLS - 1 - col) : col
  return { x: PAD_X + xCol * COL_GAP, y: ROW_TOP_Y - row * ROW_H }
}

const ALL_POS = Array.from({ length: 70 }, (_, i) => nodePos(i))

// SVG winding path string
function buildPath() {
  let d = `M ${VB_W / 2},${VB_H - 90}`   // home
  d += ` L ${ALL_POS[0].x},${ALL_POS[0].y}`

  for (let i = 0; i < 69; i++) {
    const currRow = Math.floor(i / COLS)
    const nextRow = Math.floor((i + 1) / COLS)
    const { x: cx, y: cy } = ALL_POS[i]
    const { x: nx, y: ny } = ALL_POS[i + 1]

    if (currRow === nextRow) {
      d += ` L ${nx},${ny}`
    } else {
      const isRTL = currRow % 2 === 1
      const bendX = isRTL ? PAD_X - 40 : VB_W - PAD_X + 40
      d += ` C ${bendX},${cy} ${bendX},${ny} ${nx},${ny}`
    }
  }

  // last day → heaven
  d += ` L ${VB_W / 2},${100}`
  return d
}

const PATH_D = buildPath()

// Zone y-boundaries (top edge, in SVG coords — origin top-left)
// CASA:    rows 0-1  → y ~2020-1884
// JARDÍN:  rows 2-4  → y ~1748-1476
// BOSQUE:  rows 5-7  → y ~1340-1068
// MONTAÑA: rows 8-10 → y ~932-660
// CIELO:   rows 11-13→ y ~524-252
const ZONE_Y = {
  cielo:  { top: 0,    bot: 570  },
  mont:   { top: 570,  bot: 1020 },
  bosq:   { top: 1020, bot: 1470 },
  jard:   { top: 1470, bot: 1910 },
  casa:   { top: 1910, bot: VB_H },
}

// Day-index → weekId + dayId
function toDayIds(idx) {
  return { weekId: Math.floor(idx / 7) + 1, dayId: (idx % 7) + 1 }
}

// ─── SVG Background ────────────────────────────────────────────────────────────
function MapBackground() {
  return (
    <>
      <defs>
        <linearGradient id="bgFull" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#0ea5e9" stopOpacity="0.18"/>
          <stop offset="25%"  stopColor="#bae6fd" stopOpacity="0.20"/>
          <stop offset="50%"  stopColor="#d1fae5" stopOpacity="0.22"/>
          <stop offset="75%"  stopColor="#fef9c3" stopOpacity="0.25"/>
          <stop offset="100%" stopColor="#fef3c7" stopOpacity="0.35"/>
        </linearGradient>
        <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="2" dy="4" stdDeviation="4" floodColor="#000" floodOpacity="0.2"/>
        </filter>
        <filter id="glow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="8" result="blur"/>
          <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
        <radialGradient id="sunGlow" cx="50%" cy="0%" r="50%">
          <stop offset="0%"   stopColor="#fef08a" stopOpacity="0.6"/>
          <stop offset="100%" stopColor="#fef08a" stopOpacity="0"/>
        </radialGradient>
      </defs>

      {/* Full background */}
      <rect x={0} y={0} width={VB_W} height={VB_H} fill="url(#bgFull)"/>

      {/* CIELO zone */}
      <rect x={0} y={0} width={VB_W} height={570} fill="#e0f2fe" opacity={0.55}/>
      {/* Sun glow from top */}
      <ellipse cx={VB_W/2} cy={60} rx={160} ry={140} fill="url(#sunGlow)"/>
      {/* Light rays */}
      {[0,28,56,84,112,140,168,196,224].map((angle, i) => (
        <line key={i}
          x1={VB_W/2} y1={60}
          x2={VB_W/2 + Math.cos((angle-90)*Math.PI/180)*300}
          y2={60 + Math.sin((angle-90)*Math.PI/180)*300}
          stroke="#fef08a" strokeWidth="8" opacity="0.12"
        />
      ))}
      {/* Clouds */}
      {[
        [55,  155], [170, 120], [300, 170],
        [30,  300], [260, 280], [130, 380],
        [320, 400], [70,  470], [220, 500],
      ].map(([cx, cy], i) => (
        <g key={i} opacity={0.88}>
          <ellipse cx={cx}    cy={cy}    rx={36} ry={18} fill="white"/>
          <ellipse cx={cx+22} cy={cy-8}  rx={26} ry={15} fill="white"/>
          <ellipse cx={cx-22} cy={cy-4}  rx={22} ry={13} fill="white"/>
        </g>
      ))}

      {/* MONTAÑA zone */}
      <rect x={0} y={570} width={VB_W} height={450} fill="#ede9fe" opacity={0.4}/>
      {/* Mountain silhouettes */}
      <polygon points="195,590 30,1010 360,1010"  fill="#c4b5fd" opacity={0.55}/>
      <polygon points="70,660  -20,1010 180,1010" fill="#a78bfa" opacity={0.45}/>
      <polygon points="320,620  180,1010 460,1010" fill="#8b5cf6" opacity={0.35}/>
      {/* Snow peaks */}
      <polygon points="195,590 165,660 225,660" fill="white" opacity={0.85}/>
      <polygon points="70,660  50,710  90,710"  fill="white" opacity={0.75}/>
      <polygon points="320,620 298,680 342,680" fill="white" opacity={0.75}/>

      {/* BOSQUE zone */}
      <rect x={0} y={1020} width={VB_W} height={450} fill="#d1fae5" opacity={0.35}/>
      {/* Trees */}
      {[35,100,185,270,350].map((tx, i) => {
        const ty = 1030 + (i%2)*30
        return (
          <g key={i}>
            <rect x={tx-5} y={ty+40} width={10} height={35} fill="#7a5c3a" rx={3}/>
            <ellipse cx={tx} cy={ty+25} rx={28} ry={22} fill="#22c55e" opacity={0.9}/>
            <ellipse cx={tx-12} cy={ty+38} rx={20} ry={16} fill="#16a34a" opacity={0.85}/>
            <ellipse cx={tx+12} cy={ty+38} rx={20} ry={16} fill="#16a34a" opacity={0.85}/>
            <ellipse cx={tx} cy={ty+15} rx={18} ry={14} fill="#4ade80" opacity={0.8}/>
          </g>
        )
      })}
      {/* Ground line */}
      <ellipse cx={VB_W/2} cy={1460} rx={200} ry={20} fill="#86efac" opacity={0.35}/>

      {/* JARDÍN zone */}
      <rect x={0} y={1470} width={VB_W} height={440} fill="#ecfccb" opacity={0.35}/>
      {/* Flowers */}
      {[55,120,190,260,330].map((fx, i) => {
        const fy = 1600 + (i%3)*40
        const petal = ['#f9a8d4','#fca5a5','#fde68a','#86efac','#93c5fd'][i]
        return (
          <g key={i} transform={`translate(${fx},${fy})`}>
            {[0,72,144,216,288].map(a => (
              <ellipse key={a}
                cx={Math.cos(a*Math.PI/180)*8} cy={Math.sin(a*Math.PI/180)*8}
                rx={6} ry={4}
                fill={petal} opacity={0.8}
                transform={`rotate(${a})`}
              />
            ))}
            <circle r={4} fill="#fef08a"/>
            <line x1={0} y1={0} x2={0} y2={18} stroke="#22c55e" strokeWidth={2}/>
          </g>
        )
      })}

      {/* CASA zone */}
      <rect x={0} y={1910} width={VB_W} height={VB_H - 1910} fill="#fef3c7" opacity={0.55}/>
      {/* Path/road behind house */}
      <ellipse cx={VB_W/2} cy={VB_H - 60} rx={60} ry={14} fill="#d97706" opacity={0.25}/>
      {/* House */}
      <g transform={`translate(${VB_W/2}, ${VB_H - 130})`}>
        <rect x={-38} y={-50} width={76} height={54} fill="#fde68a" rx={4}/>
        <polygon points="0,-82 -48,-48 48,-48" fill="#ef4444" opacity={0.85}/>
        <rect x={-10} y={-28} width={20} height={28} fill="#92400e" rx={3}/>
        <rect x={-32} y={-38} width={18} height={14} fill="#bae6fd" rx={2}/>
        <rect x={14}  y={-38} width={18} height={14} fill="#bae6fd" rx={2}/>
        <rect x={12}  y={-80} width={10} height={28} fill="#b45309"/>
        <ellipse cx={17} cy={-84} rx={6} ry={5} fill="white" opacity={0.6}/>
        <ellipse cx={19} cy={-92} rx={5} ry={4} fill="white" opacity={0.45}/>
      </g>
    </>
  )
}

// ─── Winding track ────────────────────────────────────────────────────────────
function Track({ completedCount }) {
  return (
    <>
      {/* Shadow */}
      <path d={PATH_D} fill="none" stroke="rgba(0,0,0,0.12)" strokeWidth={22}
        strokeLinecap="round" strokeLinejoin="round"
        transform="translate(3,5)"
      />
      {/* Gray base */}
      <path d={PATH_D} fill="none" stroke="#e5e7eb" strokeWidth={20}
        strokeLinecap="round" strokeLinejoin="round"
      />
      {/* White center line (makes it look like a road) */}
      <path d={PATH_D} fill="none" stroke="white" strokeWidth={10}
        strokeLinecap="round" strokeLinejoin="round" opacity={0.7}
      />
    </>
  )
}

// ─── Heaven & Home nodes ──────────────────────────────────────────────────────
function HeavenNode() {
  const cx = VB_W / 2, cy = 100
  return (
    <g filter="url(#glow)">
      <circle cx={cx} cy={cy} r={50} fill="#fef08a" opacity={0.35}/>
      <circle cx={cx} cy={cy} r={38} fill="#fef9c3" opacity={0.65}/>
      <circle cx={cx} cy={cy} r={28} fill="#fef3c7" stroke="#f59e0b" strokeWidth={3}/>
      <text x={cx} y={cy+2} textAnchor="middle" dominantBaseline="central"
        style={{ fontSize: '22px', userSelect: 'none' }}>✝️</text>
      <text x={cx} y={cy+42} textAnchor="middle"
        style={{ fontSize: '10px', fontWeight: '800', fill: '#78350f',
          fontFamily: 'Lora, serif', userSelect: 'none' }}>
        JESÚS TE ESPERA
      </text>
      {[0,60,120,180,240,300].map((a,i) => (
        <circle key={i}
          cx={cx + Math.cos(a*Math.PI/180)*44}
          cy={cy + Math.sin(a*Math.PI/180)*44}
          r={3} fill="#f59e0b" opacity={0.7}/>
      ))}
    </g>
  )
}

function HomeNode() {
  const cx = VB_W / 2, cy = VB_H - 90
  return (
    <g>
      <circle cx={cx+2} cy={cy+4} r={30} fill="rgba(0,0,0,0.18)"/>
      <circle cx={cx} cy={cy} r={30} fill="#fef3c7" stroke="#d97706" strokeWidth={3}/>
      <text x={cx} y={cy+2} textAnchor="middle" dominantBaseline="central"
        style={{ fontSize: '22px', userSelect: 'none' }}>🏠</text>
      <text x={cx} y={cy+46} textAnchor="middle"
        style={{ fontSize: '9px', fontWeight: '700', fill: '#78350f',
          fontFamily: 'Nunito, sans-serif', userSelect: 'none' }}>
        MI CASA
      </text>
    </g>
  )
}

// ─── Avatar ───────────────────────────────────────────────────────────────────
function Avatar({ pos }) {
  return (
    <motion.g
      animate={{ y: [0, -7, 0] }}
      transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}
    >
      {/* Shadow */}
      <ellipse cx={pos.x} cy={pos.y + 8} rx={18} ry={6} fill="rgba(0,0,0,0.2)"/>
      {/* Halo */}
      <ellipse cx={pos.x} cy={pos.y - 52} rx={15} ry={4.5}
        fill="none" stroke="#f59e0b" strokeWidth={2.5} opacity={0.8}/>
      {/* Head */}
      <circle cx={pos.x} cy={pos.y - 42} r={14} fill="#fbbf24" stroke="#d97706" strokeWidth={1.5}/>
      {/* Eyes */}
      <circle cx={pos.x - 5} cy={pos.y - 44} r={2.5} fill="#1e293b"/>
      <circle cx={pos.x + 5} cy={pos.y - 44} r={2.5} fill="#1e293b"/>
      {/* Gleam */}
      <circle cx={pos.x - 4} cy={pos.y - 45.5} r={1} fill="white"/>
      <circle cx={pos.x + 6} cy={pos.y - 45.5} r={1} fill="white"/>
      {/* Smile */}
      <path d={`M ${pos.x-5},${pos.y-38} Q ${pos.x},${pos.y-34} ${pos.x+5},${pos.y-38}`}
        fill="none" stroke="#92400e" strokeWidth={1.8} strokeLinecap="round"/>
      {/* Body */}
      <ellipse cx={pos.x} cy={pos.y - 20} rx={11} ry={13} fill="#3b82f6" stroke="#1d4ed8" strokeWidth={1}/>
      {/* Arms */}
      <path d={`M ${pos.x-11},${pos.y-24} Q ${pos.x-22},${pos.y-18} ${pos.x-18},${pos.y-10}`}
        fill="none" stroke="#fbbf24" strokeWidth={4} strokeLinecap="round"/>
      <path d={`M ${pos.x+11},${pos.y-24} Q ${pos.x+22},${pos.y-18} ${pos.x+18},${pos.y-10}`}
        fill="none" stroke="#fbbf24" strokeWidth={4} strokeLinecap="round"/>
      {/* Legs */}
      <path d={`M ${pos.x-5},${pos.y-8} L ${pos.x-8},${pos.y+8}`}
        stroke="#1d4ed8" strokeWidth={4.5} strokeLinecap="round"/>
      <path d={`M ${pos.x+5},${pos.y-8} L ${pos.x+8},${pos.y+8}`}
        stroke="#1d4ed8" strokeWidth={4.5} strokeLinecap="round"/>
    </motion.g>
  )
}

// ─── Day node ─────────────────────────────────────────────────────────────────
function DayNode({ dayIdx, status, onClick }) {
  const { x, y } = ALL_POS[dayIdx]
  const { weekId, dayId } = toDayIds(dayIdx)
  const isCompleted = status === 'completed'
  const isCurrent   = status === 'current'
  const isUnlocked  = status === 'unlocked'
  const isLocked    = status === 'locked'
  const isWeekEnd   = dayId === 7

  const fill   = isCompleted ? '#22c55e' : isCurrent ? '#f59e0b' : isUnlocked ? '#f1f5f9' : '#9ca3af'
  const stroke = isCompleted ? '#16a34a' : isCurrent ? '#b45309' : isUnlocked ? '#cbd5e1' : '#6b7280'
  const shade  = isCompleted ? '#15803d' : isCurrent ? '#92400e' : isUnlocked ? '#94a3b8' : '#4b5563'
  const hilite = isCompleted ? '#86efac' : isCurrent ? '#fde68a' : isUnlocked ? 'white' : '#d1d5db'

  return (
    <g onClick={!isLocked ? onClick : undefined}
       style={{ cursor: isLocked ? 'default' : 'pointer' }}>

      {/* Week badge border */}
      {isWeekEnd && !isLocked && (
        <circle cx={x} cy={y} r={R + 7}
          fill="none" stroke="#f59e0b" strokeWidth={2.5} opacity={0.5}
          strokeDasharray="6 3"
        />
      )}

      {/* Pulse ring for current */}
      {isCurrent && (
        <circle cx={x} cy={y} r={R + 10} fill="#f59e0b" opacity={0.22}>
          <animate attributeName="r" values={`${R+8};${R+18};${R+8}`} dur="2s" repeatCount="indefinite"/>
          <animate attributeName="opacity" values="0.22;0.05;0.22" dur="2s" repeatCount="indefinite"/>
        </circle>
      )}

      {/* 3-D shadow */}
      <circle cx={x + 2} cy={y + 5} r={R} fill={shade} opacity={0.5}/>

      {/* Main circle */}
      <circle cx={x} cy={y} r={R} fill={fill} stroke={stroke} strokeWidth={2.5}/>

      {/* Highlight (top-left gleam) */}
      <ellipse cx={x - 8} cy={y - 10} rx={10} ry={7} fill={hilite} opacity={0.4}/>

      {/* Content */}
      {isCompleted ? (
        <text x={x} y={y + 1.5} textAnchor="middle" dominantBaseline="central"
          style={{ fontSize: '20px', userSelect: 'none' }}>⭐</text>
      ) : isCurrent ? (
        <text x={x} y={y + 1.5} textAnchor="middle" dominantBaseline="central"
          style={{ fontSize: '18px', userSelect: 'none' }}>▶️</text>
      ) : isLocked ? (
        <text x={x} y={y + 1.5} textAnchor="middle" dominantBaseline="central"
          style={{ fontSize: '16px', userSelect: 'none' }}>🔒</text>
      ) : (
        <text x={x} y={y + 1.5} textAnchor="middle" dominantBaseline="central"
          style={{ fontSize: '11px', fontWeight: '800', fill: '#475569',
            fontFamily: 'Nunito, sans-serif', userSelect: 'none' }}>
          {dayId}
        </text>
      )}

      {/* Week-end medal badge */}
      {isWeekEnd && isCompleted && (
        <>
          <circle cx={x + R - 2} cy={y - R + 2} r={11} fill="#f59e0b" stroke="white" strokeWidth={2}/>
          <text x={x + R - 2} y={y - R + 3} textAnchor="middle" dominantBaseline="central"
            style={{ fontSize: '10px', userSelect: 'none' }}>🏅</text>
        </>
      )}
    </g>
  )
}

// ─── Day bottom sheet ─────────────────────────────────────────────────────────
function DaySheet({ dayIdx, onClose, onStart }) {
  const { weekId, dayId } = toDayIds(dayIdx)
  const content = getDayContent(weekId, dayId)
  const week = MAP_WEEKS.find(w => w.id === weekId)

  return (
    <AnimatePresence>
      <motion.div
        key="overlay"
        className="fixed inset-0 bg-black/40 z-40"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />
      <motion.div
        key="sheet"
        className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-2xl bg-white rounded-t-3xl z-50 px-5 pt-4 pb-8 shadow-warm-lg"
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: 'spring', damping: 28, stiffness: 300 }}
      >
        {/* Drag handle */}
        <div className="w-10 h-1.5 bg-gray-200 rounded-full mx-auto mb-4"/>

        {/* Week/day chip */}
        <div className="flex items-center gap-2 mb-3">
          <span className="text-2xl">{week?.icon}</span>
          <div>
            <p className="font-body text-[10px] text-gray-400 uppercase tracking-wider font-bold">
              Semana {weekId} · Día {dayId} de 7
            </p>
            <p className="font-display font-bold text-forest-700 text-base leading-tight">
              {content?.title}
            </p>
          </div>
          <button onClick={onClose} className="ml-auto p-1.5 text-gray-400">
            <X size={18}/>
          </button>
        </div>

        {/* Objective */}
        {content?.objective && (
          <div className="bg-forest-100 rounded-2xl px-4 py-2.5 mb-3">
            <p className="font-body text-xs text-forest-500 font-bold uppercase tracking-wider mb-0.5">Objetivo</p>
            <p className="font-body text-forest-700 text-sm leading-snug">{content.objective}</p>
          </div>
        )}

        {/* Verse */}
        {content?.verse && (
          <div className="bg-gold-100 rounded-2xl px-4 py-2.5 mb-4">
            <p className="font-body text-xs text-gold-600 font-bold uppercase tracking-wider mb-0.5">📖 Versículo</p>
            <p className="font-display italic text-gold-800 text-sm leading-snug">{content.verse}</p>
          </div>
        )}

        {/* Question */}
        {content?.question && (
          <p className="font-body text-xs text-gray-500 mb-4 italic px-1">💬 {content.question}</p>
        )}

        {/* CTA */}
        <motion.button
          onClick={onStart}
          className="w-full bg-forest-500 text-white font-body font-bold py-4 rounded-2xl shadow-green text-base flex items-center justify-center gap-2"
          whileTap={{ scale: 0.97 }}
        >
          ▶ Comenzar este día <ChevronRight size={18}/>
        </motion.button>
      </motion.div>
    </AnimatePresence>
  )
}

// ─── Main component ────────────────────────────────────────────────────────────
export default function PathMap() {
  const navigate = useNavigate()
  const {
    started, childName,
    mapCurrentWeek, mapCurrentDay,
    earnedMedals, earnedStickers, streak,
    getDayStatus, getMapProgress, getTotalCompletedDays,
  } = useApp()

  const [selectedDay, setSelectedDay] = useState(null)
  const scrollRef = useRef(null)

  const { done, total, percent } = getMapProgress()

  // Current day index (0-based)
  const currentIdx = (mapCurrentWeek - 1) * 7 + (mapCurrentDay - 1)
  const currentPos = ALL_POS[Math.min(currentIdx, 69)]

  // Scroll to current position on mount
  useEffect(() => {
    if (!scrollRef.current || !currentPos) return
    const svgEl = scrollRef.current.querySelector('svg')
    if (!svgEl) return
    const rendered = svgEl.getBoundingClientRect()
    const ratio = currentPos.y / VB_H
    const pxY = ratio * rendered.height
    const halfVP = window.innerHeight * 0.45
    scrollRef.current.scrollTo({ top: pxY - halfVP, behavior: 'smooth' })
  }, [started])

  const openDay = (idx) => setSelectedDay(idx)
  const closeSheet = () => setSelectedDay(null)

  const startDay = () => {
    if (selectedDay == null) return
    const { weekId, dayId } = toDayIds(selectedDay)
    closeSheet()
    navigate(`/dia/${weekId}/${dayId}`)
  }

  if (!started) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] px-6 text-center">
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 3 }}
          className="text-7xl mb-5"
        >🗺️</motion.div>
        <h2 className="font-display text-2xl font-bold text-forest-700 mb-2">Tu Camino al Cielo</h2>
        <p className="font-body text-forest-500 text-sm mb-7 max-w-xs">
          Comienza el programa para desbloquear tu mapa espiritual de 10 semanas, 70 días.
        </p>
        <motion.button
          onClick={() => navigate('/')}
          className="bg-forest-500 text-white font-body font-bold px-8 py-3.5 rounded-2xl shadow-green text-base"
          whileTap={{ scale: 0.95 }}
        >
          Comenzar el programa →
        </motion.button>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full min-h-0">

      {/* ── Header ─────────────────────────────────────────────────────────── */}
      <div className="flex-shrink-0 bg-white/95 backdrop-blur-sm border-b border-cream-200 px-4 py-2 z-10">
        <div className="flex items-center gap-2">
          {/* Avatar emoji + name */}
          <div className="flex items-center gap-2 flex-1 min-w-0">
            <div className="w-9 h-9 rounded-2xl bg-gold-100 flex items-center justify-center text-xl flex-shrink-0">
              {childName ? childName[0].toUpperCase() : '✨'}
            </div>
            <div className="min-w-0">
              <p className="font-display font-bold text-forest-800 text-sm truncate leading-tight">
                {childName || 'Mi camino'}
              </p>
              <p className="font-body text-[10px] text-forest-500">
                Sem. {mapCurrentWeek} · Día {mapCurrentDay}
              </p>
            </div>
          </div>

          {/* Stats row */}
          <div className="flex items-center gap-2">
            {streak > 0 && (
              <div className="flex flex-col items-center bg-orange-50 border border-orange-200 rounded-xl px-2 py-0.5">
                <Flame size={12} className="text-orange-500"/>
                <span className="font-body text-[10px] font-bold text-orange-600">{streak}</span>
              </div>
            )}
            <div className="flex flex-col items-center bg-gold-100 border border-gold-200 rounded-xl px-2 py-0.5">
              <Star size={12} className="text-gold-500"/>
              <span className="font-body text-[10px] font-bold text-gold-600">{earnedStickers.length}</span>
            </div>
            <div className="flex flex-col items-center bg-forest-100 border border-forest-200 rounded-xl px-2 py-0.5">
              <span className="text-[10px]">📊</span>
              <span className="font-body text-[10px] font-bold text-forest-700">{done}/{total}</span>
            </div>

            <motion.button
              onClick={() => navigate(`/dia/${mapCurrentWeek}/${mapCurrentDay}`)}
              className="flex items-center gap-1 bg-forest-500 text-white font-body font-bold text-xs px-3 py-2 rounded-xl shadow-green"
              whileTap={{ scale: 0.95 }}
            >
              ▶ Continuar
            </motion.button>
          </div>
        </div>

        {/* Progress bar */}
        <div className="mt-1.5 flex items-center gap-2">
          <div className="flex-1 h-2 bg-green-100 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-forest-400 to-gold-400 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${percent}%` }}
              transition={{ duration: 1.2, ease: 'easeOut' }}
            />
          </div>
          <span className="font-body text-[10px] text-forest-600 font-bold flex-shrink-0">{percent}%</span>
        </div>
      </div>

      {/* ── Scrollable SVG map ─────────────────────────────────────────────── */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto" style={{ overscrollBehavior: 'contain' }}>
        <svg
          viewBox={`0 0 ${VB_W} ${VB_H}`}
          width="100%"
          style={{ display: 'block', background: 'linear-gradient(to bottom, #bfdbfe 0%, #d1fae5 30%, #fef9c3 65%, #fef3c7 100%)' }}
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
        >
          <MapBackground/>
          <Track completedCount={done}/>

          {/* Heaven */}
          <HeavenNode/>

          {/* Day nodes (rendered bottom to top, so lower days appear in front) */}
          {Array.from({ length: 70 }, (_, i) => 69 - i).map(i => {
            const { weekId, dayId } = toDayIds(i)
            const status = getDayStatus(weekId, dayId)
            return (
              <DayNode
                key={i}
                dayIdx={i}
                status={status}
                onClick={() => openDay(i)}
              />
            )
          })}

          {/* Avatar on current day */}
          {currentPos && <Avatar pos={currentPos}/>}

          {/* Home */}
          <HomeNode/>
        </svg>

        {/* Extra bottom padding */}
        <div className="h-6 bg-amber-50"/>
      </div>

      {/* ── Day detail bottom sheet ────────────────────────────────────────── */}
      {selectedDay !== null && (
        <DaySheet
          dayIdx={selectedDay}
          onClose={closeSheet}
          onStart={startDay}
        />
      )}
    </div>
  )
}
