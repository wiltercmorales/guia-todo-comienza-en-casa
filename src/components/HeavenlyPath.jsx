import { motion } from 'framer-motion'
import DayNode from './DayNode'
import { getAvatarPath, getAvatarFallback, getStickerForDay } from '../data/assets'
import { playBell } from '../utils/audio'

// Geometry Constants
const VB_W = 390
const VB_H = 2750

const STATIONS = [
  { weekId: 2,  x: 158, y: 2460, icon: '🎁', label: 'El Regalo',     color: '#f59e0b', dark: '#92400e', fill: '#fef3c7' },
  { weekId: 3,  x: 232, y: 2240, icon: '🙏', label: 'Adoración',     color: '#22c55e', dark: '#14532d', fill: '#dcfce7' },
  { weekId: 4,  x: 152, y: 2020, icon: '🛡️', label: 'Cuidado',      color: '#6366f1', dark: '#312e81', fill: '#ede9fe' },
  { weekId: 5,  x: 238, y: 1800, icon: '🏠', label: 'Nazaret',      color: '#f43f5e', dark: '#881337', fill: '#ffe4e6' },
  { weekId: 6,  x: 150, y: 1580, icon: '💧', label: 'El Jordán',     color: '#f97316', dark: '#7c2d12', fill: '#ffedd5' },
  { weekId: 7,  x: 240, y: 1360, icon: '🏆', label: 'El Desierto',   color: '#14b8a6', dark: '#134e4a', fill: '#ccfbf1' },
  { weekId: 8,  x: 148, y: 1140, icon: '👣', label: 'Seguidores',    color: '#a855f7', dark: '#581c87', fill: '#f3e8ff' },
  { weekId: 9,  x: 242, y: 920,  icon: '🍇', label: 'Caná',          color: '#ef4444', dark: '#7f1d1d', fill: '#fee2e2' },
  { weekId: 10, x: 146, y: 700,  icon: '🍞', label: 'Multiplicación',color: '#0ea5e9', dark: '#0c4a6e', fill: '#e0f2fe' },
  { weekId: 11, x: 195, y: 440,  icon: '🌿', label: 'Discípulos',    color: '#f59e0b', dark: '#78350f', fill: '#fef9c3' },
]

const HOME = { x: 195, y: 2680 }
const HEAVEN = { x: 195, y: 160 }

const MAIN_PATH = [
  'M 195,2680',
  'C 195,2570 158,2570 158,2460',
  'C 158,2350 232,2350 232,2240',
  'C 232,2130 152,2130 152,2020',
  'C 152,1910 238,1910 238,1800',
  'C 238,1690 150,1690 150,1580',
  'C 150,1470 240,1470 240,1360',
  'C 240,1250 148,1250 148,1140',
  'C 148,1030 242,1030 242,920',
  'C 242,810  146,810  146,700',
  'C 146,570  195,570  195,440',
  'C 195,300  195,280  195,160',
].join(' ')

// Cubic-bezier segments mirroring MAIN_PATH exactly, used to place day nodes
// directly on the road (Duolingo-style) instead of in a floating cluster.
const SEGMENTS = [
  [HOME,                { x: 195, y: 2570 }, { x: 158, y: 2570 }, { x: 158, y: 2460 }], // Home -> Wk2
  [{ x: 158, y: 2460 }, { x: 158, y: 2350 }, { x: 232, y: 2350 }, { x: 232, y: 2240 }], // Wk2 -> Wk3
  [{ x: 232, y: 2240 }, { x: 232, y: 2130 }, { x: 152, y: 2130 }, { x: 152, y: 2020 }], // Wk3 -> Wk4
  [{ x: 152, y: 2020 }, { x: 152, y: 1910 }, { x: 238, y: 1910 }, { x: 238, y: 1800 }], // Wk4 -> Wk5
  [{ x: 238, y: 1800 }, { x: 238, y: 1690 }, { x: 150, y: 1690 }, { x: 150, y: 1580 }], // Wk5 -> Wk6
  [{ x: 150, y: 1580 }, { x: 150, y: 1470 }, { x: 240, y: 1470 }, { x: 240, y: 1360 }], // Wk6 -> Wk7
  [{ x: 240, y: 1360 }, { x: 240, y: 1250 }, { x: 148, y: 1250 }, { x: 148, y: 1140 }], // Wk7 -> Wk8
  [{ x: 148, y: 1140 }, { x: 148, y: 1030 }, { x: 242, y: 1030 }, { x: 242, y: 920 }],  // Wk8 -> Wk9
  [{ x: 242, y: 920 },  { x: 242, y: 810 },  { x: 146, y: 810 },  { x: 146, y: 700 }],  // Wk9 -> Wk10
  [{ x: 146, y: 700 },  { x: 146, y: 570 },  { x: 195, y: 570 },  { x: 195, y: 440 }],  // Wk10 -> Wk11
  [{ x: 195, y: 440 },  { x: 195, y: 300 },  { x: 195, y: 280 },  { x: 195, y: 160 }],  // Wk11 -> Heaven
]

function cubicPoint([p0, p1, p2, p3], t) {
  const mt = 1 - t
  const x = mt ** 3 * p0.x + 3 * mt * mt * t * p1.x + 3 * mt * t * t * p2.x + t ** 3 * p3.x
  const y = mt ** 3 * p0.y + 3 * mt * mt * t * p1.y + 3 * mt * t * t * p2.y + t ** 3 * p3.y
  return { x, y }
}

// Samples `n` points evenly spaced by arc length (not by t) so nodes never
// bunch up on the curviest part of a segment, keeping `marginPx` clearance
// from the station circles at both ends.
function sampleEvenPoints(seg, n, marginPx) {
  const STEPS = 300
  const table = [{ len: 0, pt: cubicPoint(seg, 0) }]
  let prev = table[0].pt
  let len = 0
  for (let i = 1; i <= STEPS; i++) {
    const pt = cubicPoint(seg, i / STEPS)
    len += Math.hypot(pt.x - prev.x, pt.y - prev.y)
    table.push({ len, pt })
    prev = pt
  }
  const total = len
  const usable = Math.max(total - marginPx * 2, total * 0.4)
  const points = []
  for (let i = 0; i < n; i++) {
    const targetLen = marginPx + (usable * i) / (n - 1)
    let lo = 0, hi = table.length - 1
    while (lo < hi) {
      const mid = (lo + hi) >> 1
      if (table[mid].len < targetLen) lo = mid + 1
      else hi = mid
    }
    points.push(table[lo].pt)
  }
  return points
}

// Gentle alternating sideways jitter so consecutive days don't overlap while
// still visually tracking the road (like Duolingo's zig-zagging lesson dots).
const ZIGZAG = [-19, 19, -19, 19, -19, 19, -19]
// Generous clearance so the first/last day node of each stretch never
// overlaps the station's icon or its label chip (was 46 — too tight, caused
// the "day7 star sits on top of the next station's name" overlap bug).
const STATION_MARGIN = 64

const DAY_POSITIONS = STATIONS.reduce((acc, station, idx) => {
  const seg = SEGMENTS[idx + 1]
  const base = sampleEvenPoints(seg, 7, STATION_MARGIN)
  acc[station.weekId] = base.map((p, i) => ({ x: p.x + ZIGZAG[i], y: p.y }))
  return acc
}, {})

function getStation(weekId) {
  return STATIONS.find(s => s.weekId === weekId)
}

export function getDayNodePos(weekId, dayId) {
  const positions = DAY_POSITIONS[weekId]
  if (!positions) return { x: 195, y: 1000 }
  return positions[dayId - 1] || positions[0]
}

function MapBackground() {
  return (
    <>
      <defs>
        {/* Sky gradient */}
        <linearGradient id="bgSky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#93c5fd"/>
          <stop offset="100%" stopColor="#c084fc"/>
        </linearGradient>
        <linearGradient id="bgMontana" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#c084fc"/>
          <stop offset="100%" stopColor="#86efac"/>
        </linearGradient>
        <linearGradient id="bgBosque" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#86efac"/>
          <stop offset="100%" stopColor="#a3e635"/>
        </linearGradient>
        <linearGradient id="bgJardin" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#a3e635"/>
          <stop offset="100%" stopColor="#fef08a"/>
        </linearGradient>
        <linearGradient id="bgCasa" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#fef08a"/>
          <stop offset="100%" stopColor="#fef3c7"/>
        </linearGradient>

        {/* Glow filter */}
        <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="6" result="blur"/>
          <feMerge>
            <feMergeNode in="blur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>

        <radialGradient id="sunGlow" cx="50%" cy="0%" r="70%">
          <stop offset="0%"   stopColor="#fef08a" stopOpacity="0.85"/>
          <stop offset="100%" stopColor="#fef08a" stopOpacity="0"/>
        </radialGradient>

        <pattern id="riverPattern" width="120" height="60" patternUnits="userSpaceOnUse">
          <image
            href={getAvatarPath('rio')}
            x={0} y={0} width={120} height={60}
            onError={(e) => e.target.setAttribute('href', getAvatarFallback('rio'))}
          />
        </pattern>

        <style>{`
          @keyframes riverFlow {
            0% { transform: translateX(0); }
            100% { transform: translateX(-120px); }
          }
          @keyframes pulseSlow {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.06); }
          }
          @keyframes particleFloat {
            0% { transform: translateY(0px) translateX(0px); opacity: 0; }
            30% { opacity: 0.75; }
            100% { transform: translateY(-40px) translateX(12px); opacity: 0; }
          }
          @keyframes cloudDrift {
            0%, 100% { transform: translateX(0); }
            50% { transform: translateX(18px); }
          }
          @keyframes blinkEyes {
            0%, 88%, 94%, 100% { opacity: 0; }
            90%, 92% { opacity: 1; }
          }
          @keyframes bubbleBounce {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-6px); }
          }
          .animate-river { animation: riverFlow 6.5s linear infinite; }
          .animate-pulse-slow { animation: pulseSlow 4.5s ease-in-out infinite; transform-origin: center; }
          .gold-particle {
            fill: #fef08a;
            filter: drop-shadow(0 0 3px #fbbf24);
            animation: particleFloat 6s ease-in-out infinite;
          }
          .animate-cloud-slow-1 { animation: cloudDrift 28s ease-in-out infinite; }
          .animate-cloud-slow-2 { animation: cloudDrift 34s ease-in-out infinite reverse; }
          .animate-blink { animation: blinkEyes 4.5s infinite; }
          .animate-bubble { animation: bubbleBounce 1.8s ease-in-out infinite; }
        `}</style>
      </defs>

      {/* Zone backgrounds — flat gradients only, no scattered stickers */}
      <rect x={0} y={0}    width={VB_W} height={600}  fill="url(#bgSky)"/>
      <rect x={0} y={600}  width={VB_W} height={500}  fill="url(#bgMontana)"/>
      <rect x={0} y={1100} width={VB_W} height={500}  fill="url(#bgBosque)"/>
      <rect x={0} y={1600} width={VB_W} height={500}  fill="url(#bgJardin)"/>
      <rect x={0} y={2100} width={VB_W} height={650}  fill="url(#bgCasa)"/>

      {/* Soft depth hills */}
      <g>
        <path d="M -20,1360 Q 90,1290 190,1360 T 410,1330 L 410,1610 L -20,1610 Z" fill="#166534" opacity={0.15} />
        <path d="M -20,1860 Q 100,1760 220,1860 T 410,1810 L 410,2110 L -20,2110 Z" fill="#65a30d" opacity={0.16} />
      </g>

      {/* One calm meadow accent, not a repeating pattern */}
      <image
        href={getAvatarPath('pradera')}
        x={-30} y={2350} width={140} height={140} opacity={0.75}
        onError={(e) => e.target.setAttribute('href', getAvatarFallback('pradera'))}
      />

      {/* Sky sun glow (kept subtle, behind everything) */}
      <ellipse cx={195} cy={80} rx={180} ry={140} fill="url(#sunGlow)"/>

      {/* A handful of drifting clouds, not a crowd */}
      {[[45,130],[280,180],[80,350],[300,420],[140,540],[250,900]].map(([cx, cy], i) => (
        <g key={i} opacity={0.85} className={i % 2 === 0 ? 'animate-cloud-slow-1' : 'animate-cloud-slow-2'}>
          <ellipse cx={cx}    cy={cy}    rx={34} ry={15} fill="white"/>
          <ellipse cx={cx+17} cy={cy-6}  rx={22} ry={13} fill="white"/>
          <ellipse cx={cx-17} cy={cy-4}  rx={19} ry={11} fill="white"/>
        </g>
      ))}

      {/* A few gold sparkles for a touch of magic, not a blizzard of them */}
      {[
        { x: 195, y: 140, delay: '0s',   dur: '5s' },
        { x: 300, y: 380, delay: '2.5s', dur: '6.2s' },
        { x: 100, y: 700,  delay: '1.1s', dur: '6.6s' },
        { x: 260, y: 1050, delay: '3.2s', dur: '5.9s' },
        { x: 120, y: 1450, delay: '0.6s', dur: '6.8s' },
        { x: 280, y: 1850, delay: '2.1s', dur: '5.4s' },
        { x: 90,  y: 2200, delay: '1.7s', dur: '6.3s' },
      ].map((p, idx) => (
        <circle
          key={idx} cx={p.x} cy={p.y} r={2.4} className="gold-particle"
          style={{ animationDelay: p.delay, animationDuration: p.dur, transformOrigin: `${p.x}px ${p.y}px` }}
        />
      ))}

      {/* Rainbow, single & subtle */}
      <g opacity={0.3} transform="translate(195, 480)">
        <path d="M -140,0 A 140,140 0 0,1 140,0" fill="none" stroke="#f87171" strokeWidth="6" />
        <path d="M -128,0 A 128,128 0 0,1 128,0" fill="none" stroke="#facc15" strokeWidth="6" />
        <path d="M -116,0 A 116,116 0 0,1 116,0" fill="none" stroke="#60a5fa" strokeWidth="6" />
      </g>

      {/* Mountains */}
      <polygon points="195,620 15,1080 375,1080" fill="#a78bfa" opacity={0.7}/>
      <polygon points="65,680  -40,1080 200,1080" fill="#8b5cf6" opacity={0.55}/>
      <polygon points="325,640 180,1080 470,1080" fill="#7c3aed" opacity={0.4}/>
      <polygon points="195,620 172,685 218,685" fill="white" opacity={0.95}/>

      {/* Forest silhouette, thinned out */}
      {[35,150,255,355].map((tx, i) => {
        const ty = 1130 + (i % 2) * 40
        return (
          <image
            key={i}
            href={getAvatarPath('bosque')}
            x={tx - 32} y={ty} width={64} height={64} opacity={0.9}
            onError={(e) => e.target.setAttribute('href', getAvatarFallback('bosque'))}
          />
        )
      })}

      {/* One river crossing with a single bridge */}
      <g className="animate-river" style={{ transformOrigin: '0px 1470px' }}>
        <rect x={-170} y={1455} width={610} height={40} fill="url(#riverPattern)" />
      </g>
      <g>
        <ellipse cx={195} cy={1485} rx={30} ry={9} fill="#1e293b" opacity={0.25} />
        <image
          href={getAvatarPath('puente_madera')}
          x={162} y={1452} width={66} height={38}
          onError={(e) => e.target.setAttribute('href', getAvatarFallback('puente_madera'))}
        />
      </g>

      {/* Simple garden dots, trimmed down */}
      {[70,195,320].map((fx, i) => {
        const fy = 1700 + (i % 2) * 60
        const color = ['#ec4899', '#eab308', '#3b82f6'][i]
        return (
          <g key={i} transform={`translate(${fx},${fy})`} opacity={0.8}>
            {[0, 72, 144, 216, 288].map(a => (
              <ellipse key={a}
                cx={Math.cos(a * Math.PI / 180) * 7}
                cy={Math.sin(a * Math.PI / 180) * 7}
                rx={5} ry={4} fill={color} opacity={0.85}
                transform={`rotate(${a})`}
              />
            ))}
            <circle r={3} fill="#fef08a"/>
          </g>
        )
      })}

      {/* Cozy house landmark */}
      <ellipse cx={195} cy={2700} rx={220} ry={24} fill="#4ade80" opacity={0.45}/>
      <g transform="translate(195, 2620)">
        <rect x={-45} y={-55} width={90} height={60} fill="#fef08a" stroke="#ca8a04" strokeWidth={1.5} rx={6}/>
        <polygon points="0,-92 -58,-54 58,-54" fill="#f87171" stroke="#dc2626" strokeWidth={1.5}/>
        <rect x={-12} y={-35} width={24} height={35} fill="#78350f" rx={2}/>
        <rect x={-36} y={-42} width={18} height={16} fill="#bae6fd" stroke="#38bdf8" strokeWidth={1} rx={2}/>
        <rect x={18}  y={-42} width={18} height={16} fill="#bae6fd" stroke="#38bdf8" strokeWidth={1} rx={2}/>
        <rect x={18} y={-92} width={12} height={28} fill="#b45309"/>
      </g>
      {[45,345].map((tx, i) => (
        <g key={i}>
          <rect x={tx-4} y={2580} width={8} height={30} fill="#78350f" rx={1}/>
          <ellipse cx={tx} cy={2565} rx={24} ry={18} fill="#22c55e" opacity={0.85}/>
        </g>
      ))}
    </>
  )
}

function Track() {
  return (
    <>
      {/* Drop shadow - 3D raised road board game style */}
      <path d={MAIN_PATH} fill="none" stroke="rgba(0,0,0,0.18)" strokeWidth={26}
        strokeLinecap="round" strokeLinejoin="round" transform="translate(4,8)"/>
      {/* Main road fill */}
      <path d={MAIN_PATH} fill="none" stroke="#d97706" strokeWidth={20}
        strokeLinecap="round" strokeLinejoin="round"/>
      {/* Inner stone path fill */}
      <path d={MAIN_PATH} fill="none" stroke="#fef3c7" strokeWidth={14}
        strokeLinecap="round" strokeLinejoin="round"/>
    </>
  )
}

function HeavenNode() {
  const { x, y } = HEAVEN
  return (
    <g>
      <circle cx={x} cy={y} r={72} fill="url(#sunGlow)" opacity={0.8} />
      <g filter="url(#glow)">
        <circle cx={x} cy={y} r={56} fill="#fef08a" opacity={0.25}/>
        <circle cx={x} cy={y} r={44} fill="#fef9c3" opacity={0.5}/>
      </g>

      <image
        href={getAvatarPath('puerta_celestial')}
        x={x - 45} y={y - 50} width={90} height={90}
        onError={(e) => e.target.setAttribute('href', getAvatarFallback('puerta_celestial'))}
      />

      <g className="animate-pulse-slow">
        <circle cx={x} cy={y + 10} r={24} fill="#fef9c3" opacity={0.9} filter="url(#glow)" />
        <image
          href={getAvatarPath('jesus')}
          x={x - 22} y={y - 15} width={44} height={50}
          onError={(e) => e.target.setAttribute('href', getAvatarFallback('jesus'))}
        />
      </g>

      <text x={x} y={y+54} textAnchor="middle"
        style={{ fontSize:'10px', fontWeight:'900', fill:'#78350f', fontFamily:'Lora,serif', userSelect:'none', letterSpacing:'1px' }}>
        JESÚS TE ESPERA
      </text>
    </g>
  )
}

function HomeNode() {
  const { x, y } = HOME
  return (
    <g>
      <circle cx={x+2} cy={y+5} r={32} fill="rgba(0,0,0,0.15)"/>
      <circle cx={x} cy={y} r={32} fill="#fef3c7" stroke="#d97706" strokeWidth={3.5}/>
      <text x={x} y={y+2} textAnchor="middle" dominantBaseline="central" style={{ fontSize:'22px', userSelect:'none' }}>🏠</text>
      <text x={x} y={y+50} textAnchor="middle"
        style={{ fontSize:'9px', fontWeight:'800', fill:'#78350f', fontFamily:'Nunito,sans-serif', userSelect:'none' }}>
        INICIO
      </text>
    </g>
  )
}

// Clean, consistent unit marker — same treatment for every station, no
// one-off special cases, so the eye reads them as a single repeating rhythm.
function StationNode({ station, status }) {
  const { x, y, icon, label, color, dark, fill } = station
  const isCompleted = status === 'completed'
  const isCurrent   = status === 'current'
  const isLocked    = !isCompleted && !isCurrent

  const R = 32

  return (
    <g>
      {isCurrent && (
        <circle cx={x} cy={y} r={R + 12} fill={color} opacity={0.16}>
          <animate attributeName="r" values={`${R+8};${R+20};${R+8}`} dur="2.5s" repeatCount="indefinite"/>
          <animate attributeName="opacity" values="0.2;0.05;0.2" dur="2.5s" repeatCount="indefinite"/>
        </circle>
      )}

      <circle cx={x+2} cy={y+6} r={R} fill={dark} opacity={0.22}/>

      <circle cx={x} cy={y} r={R}
        fill={isLocked ? '#e5e7eb' : fill}
        stroke={isLocked ? '#9ca3af' : color}
        strokeWidth={3.5}/>

      {isCompleted && (
        <circle cx={x} cy={y} r={R-5} fill="none" stroke={color} strokeWidth={1.5} opacity={0.4}/>
      )}

      <ellipse cx={x-10} cy={y-12} rx={12} ry={7} fill={isLocked ? '#f9fafb' : 'white'} opacity={0.3}/>

      <text x={x} y={y+1} textAnchor="middle" dominantBaseline="central"
        style={{ fontSize: isLocked ? '17px' : '22px', userSelect:'none', opacity: isLocked ? 0.4 : 1 }}>
        {isLocked ? '🔒' : icon}
      </text>

      {/* Label on a small readable chip instead of bare text on varying backgrounds */}
      <g>
        <rect x={x - 52} y={y + R + 6} width={104} height={17} rx={8.5}
          fill="white" opacity={isLocked ? 0.55 : 0.92} stroke={isLocked ? '#cbd5e1' : color} strokeWidth={1}/>
        <text x={x} y={y + R + 14.7} textAnchor="middle" dominantBaseline="central"
          style={{ fontSize:'8px', fontWeight:'900', fill: isLocked ? '#94a3b8' : dark,
            fontFamily:'Nunito,sans-serif', userSelect:'none', letterSpacing: '0.2px' }}>
          {label.toUpperCase()}
        </text>
      </g>

      {isCompleted && (
        <g>
          <circle cx={x+R-3} cy={y-R+3} r={11} fill="#22c55e" stroke="white" strokeWidth={2} filter="drop-shadow(0px 2px 3px rgba(0,0,0,0.15))"/>
          <text x={x+R-3} y={y-R+4} textAnchor="middle" dominantBaseline="central"
            style={{ fontSize:'10px', fill:'white', fontWeight:'bold', userSelect:'none' }}>✓</text>
        </g>
      )}
    </g>
  )
}

// "¡EMPIEZA AQUÍ!" callout, the signature Duolingo cue that tells a child
// exactly where to tap next — bouncing gently so it can't be missed.
function StartHereBubble({ x, y }) {
  return (
    <g style={{ transformOrigin: `${x}px ${y}px` }} className="animate-bubble">
      <rect x={x - 46} y={y - 30} width={92} height={26} rx={13} fill="#ffffff" stroke="#F0B823" strokeWidth={2.5} />
      <polygon points={`${x-7},${y-5} ${x+7},${y-5} ${x},${y+5}`} fill="#ffffff" stroke="#F0B823" strokeWidth={2.5} strokeLinejoin="round"/>
      <rect x={x - 44} y={y - 28} width={88} height={22} rx={11} fill="#ffffff" />
      <text x={x} y={y - 16} textAnchor="middle" dominantBaseline="central"
        style={{ fontSize:'10px', fontWeight:'900', fill:'#C88820', fontFamily:'Nunito,sans-serif', userSelect:'none' }}>
        ¡EMPIEZA AQUÍ!
      </text>
    </g>
  )
}

function PlayerAvatar({ weekId, dayId, avatarId }) {
  const pos = getDayNodePos(weekId, dayId)
  const { x, y } = pos
  const avatarPath = getAvatarPath(avatarId)
  const avatarFallback = getAvatarFallback(avatarId)

  return (
    <g>
      <motion.g
        animate={{
          y: [0, -8, 0],
          scaleY: [1, 1.04, 0.98, 1],
          scaleX: [1, 0.97, 1.02, 1],
          rotate: [0, 1, -1, 0]
        }}
        transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}
        style={{ transformOrigin: `${x}px ${y + 13}px` }}
      >
        <ellipse cx={x} cy={y + 13} rx={13} ry={4.5} fill="#475569" opacity={0.35} />

        <image
          href={avatarPath}
          x={x - 22} y={y - 44} width={44} height={44}
          onError={(e) => e.target.setAttribute('href', avatarFallback)}
        />

        <ellipse cx={x} cy={y - 48} rx={12} ry={3.5} fill="none" stroke="#eab308" strokeWidth={2} opacity={0.85} filter="url(#glow)" />

        <g className="animate-blink">
          <ellipse cx={x - 5} cy={y - 25} rx={3.5} ry={3.5} fill="#fed7aa" />
          <ellipse cx={x + 5} cy={y - 25} rx={3.5} ry={3.5} fill="#fed7aa" />
          <path d={`M ${x - 8.5} ${y - 26} Q ${x - 5} ${y - 23.5} ${x - 1.5} ${y - 26}`} fill="none" stroke="#7c2d12" strokeWidth={1.5} strokeLinecap="round" />
          <path d={`M ${x + 1.5} ${y - 26} Q ${x + 5} ${y - 23.5} ${x + 8.5} ${y - 26}`} fill="none" stroke="#7c2d12" strokeWidth={1.5} strokeLinecap="round" />
        </g>
      </motion.g>

      <StartHereBubble x={x + 50} y={y - 50} />
    </g>
  )
}

export default function HeavenlyPath({
  mapCurrentWeek,
  mapCurrentDay,
  earnedMedals,
  getDayStatus,
  openDay,
  childAvatar,
}) {
  return (
    <svg
      viewBox={`0 0 ${VB_W} ${VB_H}`}
      width="100%"
      style={{ display: 'block' }}
      xmlns="http://www.w3.org/2000/svg"
    >
      <MapBackground />
      <Track />
      <HeavenNode />

      {/* Stations and Day Nodes */}
      {[...STATIONS].reverse().map((station) => {
        const { weekId } = station
        const isCurrentWeek = weekId === mapCurrentWeek
        const weekDays = Array.from({ length: 7 }, (_, i) =>
          getDayStatus(weekId, i + 1) === 'completed'
        )
        const weekAllDone = weekDays.every(Boolean)

        const stationStatus = weekAllDone
          ? 'completed'
          : isCurrentWeek
          ? 'current'
          : weekId > mapCurrentWeek
          ? 'locked'
          : 'completed'

        return (
          <g key={weekId}>
            {/* Render 7 day nodes for this station, laid directly on the road */}
            {[1, 2, 3, 4, 5, 6, 7].map((dayId) => {
              const status = getDayStatus(weekId, dayId)
              const pos = getDayNodePos(weekId, dayId)
              const sticker = getStickerForDay(weekId, dayId)
              return (
                <DayNode
                  key={dayId}
                  x={pos.x}
                  y={pos.y}
                  dayId={dayId}
                  status={status}
                  color={station.color}
                  dark={station.dark}
                  stickerPath={sticker.path}
                  stickerFallback={sticker.fallback}
                  onClick={() => {
                    playBell()
                    openDay(weekId, dayId)
                  }}
                />
              )
            })}

            {/* Unit marker for this station */}
            <StationNode station={station} status={stationStatus} />
          </g>
        )
      })}

      {/* Animated player avatar + "start here" cue on the active day */}
      <PlayerAvatar
        weekId={mapCurrentWeek}
        dayId={mapCurrentDay}
        avatarId={childAvatar}
      />

      <HomeNode />

      {/* Handheld game console viewport frame */}
      <rect x={2} y={2} width={VB_W - 4} height={VB_H - 4} rx={16} fill="none" stroke="#ca8a04" strokeWidth={4} opacity={0.8} />
      <rect x={5} y={5} width={VB_W - 10} height={VB_H - 10} rx={13} fill="none" stroke="#fef3c7" strokeWidth={1.5} opacity={0.5} />
    </svg>
  )
}
