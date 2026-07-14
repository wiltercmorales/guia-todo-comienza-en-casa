import { motion } from 'framer-motion'
import DayNode from './DayNode'
import { getAvatarPath, getAvatarFallback } from '../data/assets'
import { playBell } from '../utils/audio'

// Geometry Constants
const VB_W = 390
const VB_H = 2750

const STATIONS = [
  { weekId: 1,  x: 158, y: 2460, icon: '🏠', label: 'Mi Casa',       color: '#f59e0b', dark: '#92400e', fill: '#fef3c7' },
  { weekId: 2,  x: 232, y: 2240, icon: '🌸', label: 'El Jardín',     color: '#22c55e', dark: '#14532d', fill: '#dcfce7' },
  { weekId: 3,  x: 152, y: 2020, icon: '📖', label: 'La Biblia',     color: '#6366f1', dark: '#312e81', fill: '#ede9fe' },
  { weekId: 4,  x: 238, y: 1800, icon: '🙏', label: 'Oración',       color: '#f43f5e', dark: '#881337', fill: '#ffe4e6' },
  { weekId: 5,  x: 150, y: 1580, icon: '🎁', label: 'Compartir',     color: '#f97316', dark: '#7c2d12', fill: '#ffedd5' },
  { weekId: 6,  x: 240, y: 1360, icon: '👨‍👩‍👧', label: 'Familia',       color: '#14b8a6', dark: '#134e4a', fill: '#ccfbf1' },
  { weekId: 7,  x: 148, y: 1140, icon: '🌿', label: 'Discípulo',     color: '#a855f7', dark: '#581c87', fill: '#f3e8ff' },
  { weekId: 8,  x: 242, y: 920,  icon: '✨', label: 'Identidad',     color: '#ef4444', dark: '#7f1d1d', fill: '#fee2e2' },
  { weekId: 9,  x: 146, y: 700,  icon: '💪', label: 'Perseverancia', color: '#0ea5e9', dark: '#0c4a6e', fill: '#e0f2fe' },
  { weekId: 10, x: 195, y: 440,  icon: '🌟', label: 'Con Jesús',     color: '#f59e0b', dark: '#78350f', fill: '#fef9c3' },
]

// Spaced out DAY_OFFSETS to separate the stars more
const DAY_OFFSETS = [
  { dx: -66, dy: -62 },
  { dx: -22, dy: -62 },
  { dx:  22, dy: -62 },
  { dx:  66, dy: -62 },
  { dx: -44, dy: -116 },
  { dx:   0, dy: -116 },
  { dx:  44, dy: -116 },
]

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

const HOME = { x: 195, y: 2680 }
const HEAVEN = { x: 195, y: 160 }

function getStation(weekId) {
  return STATIONS.find(s => s.weekId === weekId)
}

export function getDayNodePos(weekId, dayId) {
  const s = getStation(weekId)
  if (!s) return { x: 195, y: 1000 }
  const off = DAY_OFFSETS[dayId - 1] || { dx: 0, dy: -56 }
  return { x: s.x + off.dx, y: s.y + off.dy }
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

        {/* Seamless River Pattern to avoid stretching */}
        <pattern id="riverPattern" width="120" height="60" patternUnits="userSpaceOnUse">
          <image
            href={getAvatarPath('rio')}
            x={0}
            y={0}
            width={120}
            height={60}
            onError={(e) => e.target.setAttribute('href', getAvatarFallback('rio'))}
          />
        </pattern>

        <style>{`
          @keyframes riverFlow {
            0% { transform: translateX(0); }
            100% { transform: translateX(-120px); }
          }
          @keyframes riverFlowReverse {
            0% { transform: translateX(0); }
            100% { transform: translateX(120px); }
          }
          @keyframes cascadaGlow {
            0%, 100% { filter: brightness(1) drop-shadow(0 0 1px rgba(255,255,255,0.4)); opacity: 0.95; }
            50% { filter: brightness(1.3) drop-shadow(0 0 10px rgba(191,219,254,0.95)); opacity: 1; }
          }
          @keyframes flutterOuter {
            0% { transform: translate(0, 0) rotate(0deg); }
            25% { transform: translate(6px, -10px) rotate(6deg); }
            50% { transform: translate(12px, -2px) rotate(-6deg); }
            75% { transform: translate(6px, 8px) rotate(4deg); }
            100% { transform: translate(0, 0) rotate(0deg); }
          }
          @keyframes butterflyFlap {
            0%, 100% { transform: scaleX(1); }
            50% { transform: scaleX(0.2); }
          }
          @keyframes sheepWalk1 {
            0%, 100% { transform: translate(0, 0) scaleX(1); }
            45% { transform: translate(18px, -2px) scaleX(1); }
            50% { transform: translate(18px, -2px) scaleX(-1); }
            95% { transform: translate(0, 0) scaleX(-1); }
          }
          @keyframes sheepWalk2 {
            0%, 100% { transform: translate(0, 0) scaleX(-1); }
            45% { transform: translate(-14px, 3px) scaleX(-1); }
            50% { transform: translate(-14px, 3px) scaleX(1); }
            95% { transform: translate(0, 0) scaleX(1); }
          }
          @keyframes pulseSlow {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.06); }
          }
          @keyframes particleFloat {
            0% { transform: translateY(0px) translateX(0px); opacity: 0; }
            30% { opacity: 0.8; }
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
          .animate-river {
            animation: riverFlow 6.5s linear infinite;
          }
          .animate-river-reverse {
            animation: riverFlowReverse 7s linear infinite;
          }
          .animate-cascada {
            animation: cascadaGlow 2.5s ease-in-out infinite;
          }
          .animate-butterfly-outer-1 {
            animation: flutterOuter 4.5s ease-in-out infinite;
            transform-origin: center;
          }
          .animate-butterfly-outer-2 {
            animation: flutterOuter 5.5s ease-in-out infinite;
            animation-delay: 1.8s;
            transform-origin: center;
          }
          .animate-butterfly-inner {
            animation: butterflyFlap 0.16s ease-in-out infinite;
            transform-origin: center;
          }
          .animate-sheep-1 {
            animation: sheepWalk1 13s ease-in-out infinite;
            transform-origin: bottom center;
          }
          .animate-sheep-2 {
            animation: sheepWalk2 15s ease-in-out infinite;
            animation-delay: 3s;
            transform-origin: bottom center;
          }
          .animate-pulse-slow {
            animation: pulseSlow 4.5s ease-in-out infinite;
            transform-origin: center;
          }
          .animate-cloud-slow-1 {
            animation: cloudDrift 28s ease-in-out infinite;
          }
          .animate-cloud-slow-2 {
            animation: cloudDrift 34s ease-in-out infinite reverse;
          }
          .gold-particle {
            fill: #fef08a;
            filter: drop-shadow(0 0 3px #fbbf24);
            animation: particleFloat 6s ease-in-out infinite;
          }
          .animate-blink {
            animation: blinkEyes 4.5s infinite;
          }
        `}</style>
      </defs>

      {/* Zone backgrounds */}
      <rect x={0} y={0}    width={VB_W} height={600}  fill="url(#bgSky)"/>
      <rect x={0} y={600}  width={VB_W} height={500}  fill="url(#bgMontana)"/>
      <rect x={0} y={1100} width={VB_W} height={500}  fill="url(#bgBosque)"/>
      <rect x={0} y={1600} width={VB_W} height={500}  fill="url(#bgJardin)"/>
      <rect x={0} y={2100} width={VB_W} height={650}  fill="url(#bgCasa)"/>

      {/* Depth Hills for landscape depth/parallax */}
      <g>
        {/* Forest hills */}
        <path d="M -20,1360 Q 90,1290 190,1360 T 410,1330 L 410,1610 L -20,1610 Z" fill="#166534" opacity={0.15} />
        <path d="M 410,1460 Q 300,1390 200,1460 T -20,1430 L -20,1610 L 410,1610 Z" fill="#14532d" opacity={0.12} />
        {/* Garden hills */}
        <path d="M -20,1860 Q 100,1760 220,1860 T 410,1810 L 410,2110 L -20,2110 Z" fill="#65a30d" opacity={0.16} />
        <path d="M 410,1960 Q 280,1890 150,1960 T -20,1910 L -20,2110 L 410,2110 Z" fill="#4d7c0f" opacity={0.12} />
      </g>

      {/* Praderas / campos decorativos en la parte inferior (variados para no repetirse) */}
      <g opacity={0.85}>
        {/* Pradera 1: Left bottom */}
        <image
          href={getAvatarPath('pradera')}
          x={-30}
          y={2350}
          width={150}
          height={150}
          onError={(e) => e.target.setAttribute('href', getAvatarFallback('pradera'))}
        />
        {/* Pradera 2: Right bottom (flipped horizontally using scaleX(-1) and correct origin) */}
        <image
          href={getAvatarPath('pradera')}
          x={270}
          y={2420}
          width={120}
          height={110}
          style={{ transform: 'scaleX(-1)', transformOrigin: '330px 2475px' }}
          onError={(e) => e.target.setAttribute('href', getAvatarFallback('pradera'))}
        />
        {/* Pradera 3: Right mid (scaled and slightly rotated) */}
        <image
          href={getAvatarPath('pradera')}
          x={250}
          y={2120}
          width={150}
          height={130}
          style={{ transform: 'rotate(5deg)', transformOrigin: '325px 2185px' }}
          onError={(e) => e.target.setAttribute('href', getAvatarFallback('pradera'))}
        />
      </g>

      {/* ── Sky (cielo) ── */}
      <ellipse cx={195} cy={80} rx={180} ry={140} fill="url(#sunGlow)"/>
      {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((a, i) => (
        <line key={i}
          x1={195} y1={80}
          x2={195 + Math.cos((a - 90) * Math.PI / 180) * 340}
          y2={80  + Math.sin((a - 90) * Math.PI / 180) * 340}
          stroke="#fef08a" strokeWidth="6" opacity="0.16"
        />
      ))}

      {/* Clouds slowly drifting (increased count to 12 for high video game look) */}
      {[
        [45,130],[180,95],[310,120],
        [30,260],[270,220],[130,340],
        [300,370],[60,440],[210,480],
        [80,200],[220,160],[340,290],
      ].map(([cx, cy], i) => (
        <g key={i} opacity={0.88} className={i % 2 === 0 ? "animate-cloud-slow-1" : "animate-cloud-slow-2"}>
          <ellipse cx={cx}    cy={cy}    rx={36} ry={16} fill="white"/>
          <ellipse cx={cx+18} cy={cy-6}  rx={24} ry={14} fill="white"/>
          <ellipse cx={cx-18} cy={cy-4}  rx={20} ry={12} fill="white"/>
        </g>
      ))}

      {/* 25 Golden Sparkles / Particles floating in heaven sky & path */}
      {[
        { x: 195, y: 140, delay: '0s', dur: '5s' },
        { x: 120, y: 220, delay: '1.2s', dur: '6s' },
        { x: 280, y: 180, delay: '2.5s', dur: '5.5s' },
        { x: 80,  y: 350, delay: '0.8s', dur: '7s' },
        { x: 320, y: 380, delay: '3.1s', dur: '6.2s' },
        { x: 195, y: 480, delay: '1.9s', dur: '5.8s' },
        { x: 150, y: 680, delay: '0.4s', dur: '6.4s' },
        { x: 250, y: 880, delay: '2.7s', dur: '7.2s' },
        { x: 100, y: 1100, delay: '4.2s', dur: '6.6s' },
        { x: 300, y: 1300, delay: '1.5s', dur: '5.9s' },
        { x: 120, y: 1500, delay: '3.5s', dur: '6.8s' },
        { x: 260, y: 1700, delay: '0.9s', dur: '7.5s' },
        { x: 90,  y: 1900, delay: '2.2s', dur: '5.4s' },
        { x: 280, y: 2100, delay: '4.8s', dur: '6.1s' },
        { x: 150, y: 2300, delay: '1.1s', dur: '7.0s' },
        { x: 210, y: 300, delay: '0.5s', dur: '5.2s' },
        { x: 160, y: 380, delay: '2.2s', dur: '6.3s' },
        { x: 250, y: 550, delay: '1.7s', dur: '5.7s' },
        { x: 130, y: 790, delay: '3.4s', dur: '7.1s' },
        { x: 280, y: 1000, delay: '0.2s', dur: '6.5s' },
        { x: 80,  y: 1250, delay: '2.9s', dur: '5.3s' },
        { x: 310, y: 1450, delay: '4.1s', dur: '6.9s' },
        { x: 170, y: 1650, delay: '1.3s', dur: '7.3s' },
        { x: 220, y: 1850, delay: '3.8s', dur: '5.6s' },
        { x: 110, y: 2050, delay: '2.0s', dur: '6.7s' },
      ].map((p, idx) => (
        <circle
          key={idx}
          cx={p.x}
          cy={p.y}
          r={2.2}
          className="gold-particle"
          style={{
            animationDelay: p.delay,
            animationDuration: p.dur,
            transformOrigin: `${p.x}px ${p.y}px`,
          }}
        />
      ))}

      {/* Decorative small flowers scattered on grass turf */}
      {[
        { x: 50, y: 2200, type: '🌸' }, { x: 340, y: 2250, type: '🌼' },
        { x: 80, y: 2350, type: '🌷' }, { x: 320, y: 2450, type: '🌸' },
        { x: 120, y: 2550, type: '🌼' }, { x: 270, y: 2600, type: '🌷' },
        { x: 30, y: 1650, type: '🌸' }, { x: 350, y: 1720, type: '🌼' },
        { x: 90, y: 1800, type: '🌷' }, { x: 310, y: 1870, type: '🌸' },
        { x: 130, y: 1950, type: '🌼' }, { x: 280, y: 2020, type: '🌷' },
        { x: 40, y: 1200, type: '🌸' }, { x: 330, y: 1280, type: '🌼' },
        { x: 70, y: 1380, type: '🌷' }, { x: 320, y: 1480, type: '🌸' }
      ].map((f, idx) => (
        <text
          key={idx}
          x={f.x}
          y={f.y}
          style={{ fontSize: '10px', opacity: 0.8, userSelect: 'none' }}
          className="animate-pulse-slow"
        >
          {f.type}
        </text>
      ))}

      {/* Rainbow in background sky */}
      <g opacity={0.35} transform="translate(195, 480)">
        <path d="M -140,0 A 140,140 0 0,1 140,0" fill="none" stroke="#f87171" strokeWidth="6" />
        <path d="M -134,0 A 134,134 0 0,1 134,0" fill="none" stroke="#fb923c" strokeWidth="6" />
        <path d="M -128,0 A 128,128 0 0,1 128,0" fill="none" stroke="#facc15" strokeWidth="6" />
        <path d="M -122,0 A 122,122 0 0,1 122,0" fill="none" stroke="#4ade80" strokeWidth="6" />
        <path d="M -116,0 A 116,116 0 0,1 116,0" fill="none" stroke="#60a5fa" strokeWidth="6" />
        <path d="M -110,0 A 110,110 0 0,1 110,0" fill="none" stroke="#c084fc" strokeWidth="6" />
      </g>

      {/* ── Mountains (montaña) ── */}
      <polygon points="195,620 15,1080 375,1080" fill="#a78bfa" opacity={0.7}/>
      <polygon points="65,680  -40,1080 200,1080" fill="#8b5cf6" opacity={0.55}/>
      <polygon points="325,640 180,1080 470,1080" fill="#7c3aed" opacity={0.4}/>
      <polygon points="195,620 172,685 218,685" fill="white" opacity={0.95}/>

      {/* Little SVG sheep on mountains */}
      {[[80,1040],[290,1030],[130,980],[250,960]].map(([sx,sy], i) => (
        <g key={i}>
          {/* Fluffy body */}
          <ellipse cx={sx} cy={sy} rx={10} ry={7} fill="white" />
          <circle cx={sx+8} cy={sy-2} r={4.5} fill="#1e293b" /> {/* Head */}
          <rect x={sx-6} y={sy+5} width={1.5} height={4} fill="#1e293b" />
          <rect x={sx-2} y={sy+5} width={1.5} height={4} fill="#1e293b" />
          <rect x={sx+2} y={sy+5} width={1.5} height={4} fill="#1e293b" />
          <rect x={sx+6} y={sy+5} width={1.5} height={4} fill="#1e293b" />
        </g>
      ))}

      {/* ── Forest (bosque.png instead of simple green SVG trees) ── */}
      {[25,95,160,240,315,365].map((tx, i) => {
        const ty = 1120 + (i % 2) * 45
        return (
          <g key={i} className="animate-pulse-slow" style={{ animationDelay: `${i * 0.4}s` }}>
            <image
              href={getAvatarPath('bosque')}
              x={tx - 35}
              y={ty}
              width={70}
              height={70}
              onError={(e) => e.target.setAttribute('href', getAvatarFallback('bosque'))}
            />
          </g>
        )
      })}

      {/* 6 Butterflies (mariposa.png) with flapping wings and fluttering motion */}
      <g className="animate-butterfly-outer-1" style={{ transformOrigin: '80px 1750px' }}>
        <image
          href={getAvatarPath('mariposa')}
          x={65}
          y={1735}
          width={30}
          height={30}
          className="animate-butterfly-inner"
          style={{ transformOrigin: '80px 1750px' }}
          onError={(e) => e.target.setAttribute('href', getAvatarFallback('mariposa'))}
        />
      </g>
      <g className="animate-butterfly-outer-2" style={{ transformOrigin: '300px 1950px' }}>
        <image
          href={getAvatarPath('mariposa')}
          x={286}
          y={1936}
          width={28}
          height={28}
          className="animate-butterfly-inner"
          style={{ transformOrigin: '300px 1950px' }}
          onError={(e) => e.target.setAttribute('href', getAvatarFallback('mariposa'))}
        />
      </g>
      <g className="animate-butterfly-outer-1" style={{ transformOrigin: '100px 1250px' }}>
        <image
          href={getAvatarPath('mariposa')}
          x={86}
          y={1236}
          width={28}
          height={28}
          className="animate-butterfly-inner"
          style={{ transformOrigin: '100px 1250px' }}
          onError={(e) => e.target.setAttribute('href', getAvatarFallback('mariposa'))}
        />
      </g>
      <g className="animate-butterfly-outer-2" style={{ transformOrigin: '270px 1350px' }}>
        <image
          href={getAvatarPath('mariposa')}
          x={254}
          y={1334}
          width={32}
          height={32}
          className="animate-butterfly-inner"
          style={{ transformOrigin: '270px 1350px' }}
          onError={(e) => e.target.setAttribute('href', getAvatarFallback('mariposa'))}
        />
      </g>
      <g className="animate-butterfly-outer-1" style={{ transformOrigin: '70px 2200px' }}>
        <image
          href={getAvatarPath('mariposa')}
          x={55}
          y={2185}
          width={28}
          height={28}
          className="animate-butterfly-inner"
          style={{ transformOrigin: '70px 2200px' }}
          onError={(e) => e.target.setAttribute('href', getAvatarFallback('mariposa'))}
        />
      </g>
      <g className="animate-butterfly-outer-2" style={{ transformOrigin: '310px 750px' }}>
        <image
          href={getAvatarPath('mariposa')}
          x={295}
          y={735}
          width={30}
          height={30}
          className="animate-butterfly-inner"
          style={{ transformOrigin: '310px 750px' }}
          onError={(e) => e.target.setAttribute('href', getAvatarFallback('mariposa'))}
        />
      </g>

      {/* Sheep (oveja.png) - Positioned safely in the grass so they NEVER step on nodes or characters */}
      {/* Sheep 1: Left bottom pasture */}
      <g className="animate-sheep-1" style={{ transformOrigin: '35px 2525px' }}>
        <image
          href={getAvatarPath('oveja')}
          x={15}
          y={2500}
          width={40}
          height={35}
          onError={(e) => e.target.setAttribute('href', getAvatarFallback('oveja'))}
        />
      </g>
      {/* Sheep 2: Far right bottom pasture (Moved completely away from the week 2 garden node) */}
      <g className="animate-sheep-2" style={{ transformOrigin: '325px 2292px' }}>
        <image
          href={getAvatarPath('oveja')}
          x={307}
          y={2270}
          width={36}
          height={32}
          onError={(e) => e.target.setAttribute('href', getAvatarFallback('oveja'))}
        />
      </g>
      {/* Sheep 3: Left middle pasture */}
      <g className="animate-sheep-1" style={{ transformOrigin: '30px 1544px' }}>
        <image
          href={getAvatarPath('oveja')}
          x={11}
          y={1520}
          width={38}
          height={34}
          onError={(e) => e.target.setAttribute('href', getAvatarFallback('oveja'))}
        />
      </g>

      {/* Decorative Path Stones / Trails */}
      <g opacity={0.9}>
        <image
          href={getAvatarPath('sendero')}
          x={165}
          y={2645}
          width={60}
          height={50}
          onError={(e) => e.target.setAttribute('href', getAvatarFallback('sendero'))}
        />
        <image
          href={getAvatarPath('piedras_camino')}
          x={170}
          y={2360}
          width={40}
          height={30}
          onError={(e) => e.target.setAttribute('href', getAvatarFallback('piedras_camino'))}
        />
        <image
          href={getAvatarPath('piedras_camino')}
          x={190}
          y={1910}
          width={40}
          height={30}
          onError={(e) => e.target.setAttribute('href', getAvatarFallback('piedras_camino'))}
        />
        <image
          href={getAvatarPath('piedras_camino')}
          x={190}
          y={1030}
          width={40}
          height={30}
          onError={(e) => e.target.setAttribute('href', getAvatarFallback('piedras_camino'))}
        />
      </g>

      {/* ── River 1 (Infinite loop pattern flow) ── */}
      <g className="animate-river" style={{ transformOrigin: '0px 2330px' }}>
        <rect
          x={-50}
          y={2315}
          width={510}
          height={50}
          fill="url(#riverPattern)"
        />
      </g>

      {/* ── River 2 (Infinite loop pattern flow reverse) ── */}
      <g className="animate-river-reverse" style={{ transformOrigin: '0px 1470px' }}>
        <rect
          x={-170}
          y={1455}
          width={610}
          height={50}
          fill="url(#riverPattern)"
        />
      </g>

      {/* ── Waterfall (cascada.png near River 2) ── */}
      <g className="animate-cascada">
        <image
          href={getAvatarPath('cascada')}
          x={330}
          y={1400}
          width={60}
          height={70}
          onError={(e) => e.target.setAttribute('href', getAvatarFallback('cascada'))}
        />
      </g>

      {/* ── Wooden Bridge 1 (Cruce en y: 2345) ── */}
      <g className="bridge-container">
        {/* Bridge Shadow */}
        <ellipse cx={195} cy={2355} rx={32} ry={10} fill="#1e293b" opacity={0.3} />
        {/* Wooden Bridge PNG */}
        <image
          href={getAvatarPath('puente_madera')}
          x={160}
          y={2320}
          width={70}
          height={40}
          onError={(e) => e.target.setAttribute('href', getAvatarFallback('puente_madera'))}
        />
      </g>

      {/* ── Wooden Bridge 2 (Cruce en y: 1475) ── */}
      <g className="bridge-container">
        {/* Bridge Shadow */}
        <ellipse cx={195} cy={1485} rx={32} ry={10} fill="#1e293b" opacity={0.3} />
        {/* Wooden Bridge PNG */}
        <image
          href={getAvatarPath('puente_madera')}
          x={160}
          y={1450}
          width={70}
          height={40}
          onError={(e) => e.target.setAttribute('href', getAvatarFallback('puente_madera'))}
        />
      </g>

      {/* ── Jardín (1600–2100) ── */}
      {[40,110,180,250,320].map((fx, i) => {
        const fy = 1680 + (i % 3) * 50
        const color = ['#ec4899', '#f43f5e', '#eab308', '#3b82f6', '#10b981'][i]
        return (
          <g key={i} transform={`translate(${fx},${fy})`}>
            {[0, 72, 144, 216, 288].map(a => (
              <ellipse key={a}
                cx={Math.cos(a * Math.PI / 180) * 8}
                cy={Math.sin(a * Math.PI / 180) * 8}
                rx={6} ry={4.5}
                fill={color} opacity={0.85}
                transform={`rotate(${a})`}
              />
            ))}
            <circle r={3.5} fill="#fef08a"/>
            <line x1={0} y1={3} x2={0} y2={18} stroke="#22c55e" strokeWidth={2.5}/>
          </g>
        )
      })}
      
      {/* ── Casa (2100–2750) ── */}
      <ellipse cx={195} cy={2700} rx={220} ry={24} fill="#4ade80" opacity={0.45}/>
      
      {/* Cozy House */}
      <g transform={`translate(195, 2620)`}>
        <rect x={-45} y={-55} width={90} height={60} fill="#fef08a" stroke="#ca8a04" strokeWidth={1.5} rx={6}/>
        <polygon points="0,-92 -58,-54 58,-54" fill="#f87171" stroke="#dc2626" strokeWidth={1.5}/>
        <rect x={-12} y={-35} width={24} height={35} fill="#78350f" rx={2}/>
        <rect x={-36} y={-42} width={18} height={16} fill="#bae6fd" stroke="#38bdf8" strokeWidth={1} rx={2}/>
        <rect x={18}  y={-42} width={18} height={16} fill="#bae6fd" stroke="#38bdf8" strokeWidth={1} rx={2}/>
        {/* Chimney */}
        <rect x={18} y={-92} width={12} height={28} fill="#b45309"/>
        <circle cx={24} cy={-100} r={6} fill="white" opacity={0.55} />
        <circle cx={28} cy={-110} r={5} fill="white" opacity={0.4} />
      </g>
      
      {/* Trees near house */}
      {[45,345].map((tx, i) => (
        <g key={i}>
          <rect x={tx-4} y={2580} width={8} height={30} fill="#78350f" rx={1}/>
          <ellipse cx={tx} cy={2565} rx={24} ry={18} fill="#22c55e" opacity={0.85}/>
        </g>
      ))}

      {/* Estaciones Bíblicas Decorativas */}
      {/* Noah's Ark near Week 8 */}
      <g className="animate-pulse-slow">
        <image
          href={getAvatarPath('arca')}
          x={295}
          y={900}
          width={60}
          height={50}
          onError={(e) => e.target.setAttribute('href', getAvatarFallback('arca'))}
        />
      </g>

      {/* Ten Commandments Tablets near Week 4 */}
      <g className="animate-pulse-slow">
        <image
          href={getAvatarPath('tabla_ley')}
          x={290}
          y={1775}
          width={45}
          height={45}
          onError={(e) => e.target.setAttribute('href', getAvatarFallback('tabla_ley'))}
        />
      </g>

      {/* Scroll/Pergamino near Week 3 */}
      <g className="animate-pulse-slow">
        <image
          href={getAvatarPath('pergamino')}
          x={85}
          y={1995}
          width={45}
          height={45}
          onError={(e) => e.target.setAttribute('href', getAvatarFallback('pergamino'))}
        />
      </g>

      {/* Bread & Grapes near Week 5 */}
      <g className="animate-pulse-slow">
        <image
          href={getAvatarPath('pan')}
          x={90}
          y={1550}
          width={35}
          height={35}
          onError={(e) => e.target.setAttribute('href', getAvatarFallback('pan'))}
        />
      </g>
      <g className="animate-pulse-slow" style={{ animationDelay: '1.2s' }}>
        <image
          href={getAvatarPath('uvas')}
          x={90}
          y={1600}
          width={35}
          height={35}
          onError={(e) => e.target.setAttribute('href', getAvatarFallback('uvas'))}
        />
      </g>
    </>
  )
}

function Track({ completedWeeks }) {
  return (
    <>
      {/* Drop shadow - 3D raised road board game style */}
      <path d={MAIN_PATH} fill="none" stroke="rgba(0,0,0,0.18)" strokeWidth={28}
        strokeLinecap="round" strokeLinejoin="round" transform="translate(4,8)"/>
      {/* Main road fill (brown soil path border for Mario feel) */}
      <path d={MAIN_PATH} fill="none" stroke="#d97706" strokeWidth={22}
        strokeLinecap="round" strokeLinejoin="round"/>
      {/* Inner stone path fill */}
      <path d={MAIN_PATH} fill="none" stroke="#fef3c7" strokeWidth={16}
        strokeLinecap="round" strokeLinejoin="round"/>
      {/* Dashed stepping markings */}
      <path d={MAIN_PATH} fill="none" stroke="#fbcfe8" strokeWidth={6}
        strokeLinecap="round" strokeLinejoin="round" opacity={0.4} strokeDasharray="14 18"/>
    </>
  )
}

function HeavenNode() {
  const { x, y } = HEAVEN
  return (
    <g>
      {/* Resplandor / Rays background */}
      <circle cx={x} cy={y} r={72} fill="url(#sunGlow)" opacity={0.8} />
      <g filter="url(#glow)">
        <circle cx={x} cy={y} r={56} fill="#fef08a" opacity={0.25}/>
        <circle cx={x} cy={y} r={44} fill="#fef9c3" opacity={0.5}/>
      </g>

      {/* Puerta Celestial (Celestial Gate) as background */}
      <image
        href={getAvatarPath('puerta_celestial')}
        x={x - 45}
        y={y - 50}
        width={90}
        height={90}
        onError={(e) => e.target.setAttribute('href', getAvatarFallback('puerta_celestial'))}
      />

      {/* Jesus with Halo and shine */}
      <g className="animate-pulse-slow">
        {/* Soft yellow backing circle under Jesus */}
        <circle cx={x} cy={y + 10} r={24} fill="#fef9c3" opacity={0.9} filter="url(#glow)" />
        <image
          href={getAvatarPath('jesus')}
          x={x - 22}
          y={y - 15}
          width={44}
          height={50}
          onError={(e) => e.target.setAttribute('href', getAvatarFallback('jesus'))}
        />
        {/* Glowing Halo above Jesus */}
        <ellipse cx={x} cy={y - 18} rx={12} ry={3.5} fill="none" stroke="#fef08a" strokeWidth={2.5} filter="url(#glow)" />
      </g>

      <text x={x} y={y+54} textAnchor="middle"
        style={{ fontSize:'10px', fontWeight:'900', fill:'#78350f',
          fontFamily:'Lora,serif', userSelect:'none', letterSpacing:'1px' }}>
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
      <text x={x} y={y+2} textAnchor="middle" dominantBaseline="central"
        style={{ fontSize:'22px', userSelect:'none' }}>🏠</text>
      <text x={x} y={y+50} textAnchor="middle"
        style={{ fontSize:'9px', fontWeight:'800', fill:'#78350f',
          fontFamily:'Nunito,sans-serif', userSelect:'none' }}>
        INICIO
      </text>
    </g>
  )
}

function StationNode({ station, status }) {
  const { x, y, icon, label, color, dark, fill, weekId } = station
  const isCompleted = status === 'completed'
  const isCurrent   = status === 'current'
  const isLocked    = !isCompleted && !isCurrent
  const isJardin    = weekId === 2

  const R = 32

  return (
    <g>
      {/* Pulse rings for active week station */}
      {isCurrent && (
        <circle cx={x} cy={y} r={R+14} fill={color} opacity={0.16}>
          <animate attributeName="r" values={`${R+10};${R+24};${R+10}`} dur="2.5s" repeatCount="indefinite"/>
          <animate attributeName="opacity" values="0.2;0.05;0.2" dur="2.5s" repeatCount="indefinite"/>
        </circle>
      )}

      {/* Special Jardin Halo Verde */}
      {isJardin && (
        <circle cx={x} cy={y} r={R + 10} fill="none" stroke="#22c55e" strokeWidth={3.5} opacity={0.65} filter="url(#glow)">
          <animate attributeName="stroke-width" values="2.5;5.5;2.5" dur="3s" repeatCount="indefinite" />
        </circle>
      )}

      {/* Shadow */}
      <circle cx={x+2} cy={y+6} r={R} fill={dark} opacity={0.25}/>

      {/* Station core */}
      <circle cx={x} cy={y} r={R}
        fill={isLocked ? '#e5e7eb' : fill}
        stroke={isLocked ? '#9ca3af' : isJardin ? '#eab308' : color} // Gold border for Jardin
        strokeWidth={isJardin ? 5 : 3.5}/>

      {/* Internal highlight ring */}
      {isCompleted && (
        <circle cx={x} cy={y} r={R-5} fill="none" stroke={isJardin ? '#eab308' : color} strokeWidth={1.5} opacity={0.4}/>
      )}

      <ellipse cx={x-10} cy={y-12} rx={12} ry={7} fill={isLocked ? '#f9fafb' : 'white'} opacity={0.3}/>

      {/* Symbol */}
      <text x={x} y={y+1} textAnchor="middle" dominantBaseline="central"
        style={{ fontSize: isLocked ? '16px' : '22px', userSelect:'none', opacity: isLocked ? 0.35 : 1 }}>
        {isLocked ? '🔒' : icon}
      </text>

      {/* Text label */}
      <text x={x} y={y+R+15} textAnchor="middle"
        style={{ fontSize:'9px', fontWeight:'900', fill: isLocked ? '#9ca3af' : isJardin ? '#b45309' : dark,
          fontFamily:'Nunito,sans-serif', userSelect:'none' }}>
        {label.toUpperCase()}
      </text>

      {/* Special Jardin Flores wrapper */}
      {isJardin && (
        <g opacity={0.9} className="animate-pulse-slow">
          <text x={x - 28} y={y - 20} style={{ fontSize: '10px', userSelect: 'none' }}>🌸</text>
          <text x={x + 20} y={y - 20} style={{ fontSize: '10px', userSelect: 'none' }}>🌸</text>
          <text x={x - 26} y={y + 26} style={{ fontSize: '10px', userSelect: 'none' }}>🌼</text>
          <text x={x + 22} y={y + 24} style={{ fontSize: '10px', userSelect: 'none' }}>🌼</text>
        </g>
      )}

      {/* Medal/Tick badge */}
      {isCompleted && !isJardin && (
        <g>
          <circle cx={x+R-3} cy={y-R+3} r={11} fill="#22c55e" stroke="white" strokeWidth={2} filter="drop-shadow(0px 2px 3px rgba(0,0,0,0.15))"/>
          <text x={x+R-3} y={y-R+4} textAnchor="middle" dominantBaseline="central"
            style={{ fontSize:'10px', fill:'white', fontWeight:'bold', userSelect:'none' }}>✓</text>
        </g>
      )}

      {/* If Jardin completed, draw a gold badge! */}
      {isCompleted && isJardin && (
        <g>
          <circle cx={x+R-3} cy={y-R+3} r={11} fill="#eab308" stroke="white" strokeWidth={2} filter="drop-shadow(0px 2px 3px rgba(0,0,0,0.15))"/>
          <text x={x+R-3} y={y-R+4} textAnchor="middle" dominantBaseline="central"
            style={{ fontSize:'10px', fill:'white', fontWeight:'bold', userSelect:'none' }}>⭐</text>
        </g>
      )}
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
        transition={{ 
          repeat: Infinity, 
          duration: 2.2, 
          ease: 'easeInOut' 
        }}
        style={{ transformOrigin: `${x}px ${y + 13}px` }}
      >
        {/* Floating shadow */}
        <ellipse cx={x} cy={y + 13} rx={13} ry={4.5} fill="#475569" opacity={0.35} />

        {/* Floating Avatar Face Image */}
        <image
          href={avatarPath}
          x={x - 22}
          y={y - 44}
          width={44}
          height={44}
          onError={(e) => {
            e.target.setAttribute('href', avatarFallback)
          }}
        />

        {/* Sparkling Halo on top of avatar */}
        <ellipse
          cx={x}
          cy={y - 48}
          rx={12}
          ry={3.5}
          fill="none"
          stroke="#eab308"
          strokeWidth={2}
          opacity={0.85}
          filter="url(#glow)"
        />

        {/* Eyelids overlay for blinking cartoon effect */}
        <g className="animate-blink">
          {/* Eyelid background patches covering normal eyes briefly */}
          <ellipse cx={x - 5} cy={y - 25} rx={3.5} ry={3.5} fill="#fed7aa" />
          <ellipse cx={x + 5} cy={y - 25} rx={3.5} ry={3.5} fill="#fed7aa" />
          {/* Closed eyelids lines */}
          <path d={`M ${x - 8.5} ${y - 26} Q ${x - 5} ${y - 23.5} ${x - 1.5} ${y - 26}`} fill="none" stroke="#7c2d12" strokeWidth={1.5} strokeLinecap="round" />
          <path d={`M ${x + 1.5} ${y - 26} Q ${x + 5} ${y - 23.5} ${x + 8.5} ${y - 26}`} fill="none" stroke="#7c2d12" strokeWidth={1.5} strokeLinecap="round" />
        </g>
      </motion.g>
    </g>
  )
}

function DayConnectors({ station }) {
  const { x, y, color } = station
  return (
    <>
      {DAY_OFFSETS.map((off, i) => (
        <line key={i}
          x1={x} y1={y - 32}
          x2={x + off.dx} y2={y + off.dy}
          stroke={color} strokeWidth={1.5} opacity={0.25}
          strokeDasharray="4 4"
        />
      ))}
    </>
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
      <Track completedWeeks={earnedMedals.length} />
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
            {/* Dashed connector links */}
            <DayConnectors station={station} />

            {/* Render 7 day nodes for this station */}
            {[1, 2, 3, 4, 5, 6, 7].map((dayId) => {
              const status = getDayStatus(weekId, dayId)
              const pos = getDayNodePos(weekId, dayId)
              return (
                <DayNode
                  key={dayId}
                  x={pos.x}
                  y={pos.y}
                  dayId={dayId}
                  status={status}
                  color={station.color}
                  dark={station.dark}
                  onClick={() => {
                    playBell() // play retro bell sound on tap
                    openDay(weekId, dayId)
                  }}
                />
              )
            })}

            {/* Central Station indicator */}
            <StationNode station={station} status={stationStatus} />
          </g>
        )
      })}

      {/* Animated player avatar showing selected character */}
      <PlayerAvatar
        weekId={mapCurrentWeek}
        dayId={mapCurrentDay}
        avatarId={childAvatar}
      />

      <HomeNode />

      {/* Handheld Game Console Screen Viewport Frame */}
      <rect x={2} y={2} width={VB_W - 4} height={VB_H - 4} rx={16} fill="none" stroke="#ca8a04" strokeWidth={4} opacity={0.8} />
      <rect x={5} y={5} width={VB_W - 10} height={VB_H - 10} rx={13} fill="none" stroke="#fef3c7" strokeWidth={1.5} opacity={0.5} />
    </svg>
  )
}
