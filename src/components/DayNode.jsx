import { motion } from 'framer-motion'

// Helper to generate coordinates for a clean 5-point SVG star
function getStarPoints(cx, cy, rOuter, rInner) {
  const points = [];
  let angle = (Math.PI / 2) * 3; // Point straight up
  const step = Math.PI / 5;
  for (let i = 0; i < 10; i++) {
    const r = i % 2 === 0 ? rOuter : rInner;
    const px = cx + Math.cos(angle) * r;
    const py = cy + Math.sin(angle) * r;
    points.push(`${px},${py}`);
    angle += step;
  }
  return points.join(' ');
}

export default function DayNode({ x, y, dayId, status, onClick, color = '#f59e0b', dark = '#92400e' }) {
  const isCompleted = status === 'completed'
  const isCurrent   = status === 'current'
  const isUnlocked  = status === 'unlocked'
  const isLocked    = status === 'locked'

  const R = isCurrent ? 18 : 14
  const depth = 4 // 3D depth offset in pixels

  // Color maps for active/unlocked nodes
  const fill = isCurrent 
    ? color 
    : isUnlocked 
    ? '#ffffff' 
    : '#e2e8f0'

  const stroke = isCurrent 
    ? dark 
    : isUnlocked 
    ? '#cbd5e1' 
    : '#9ca3af'

  const fillDarkBase = isCurrent 
    ? dark 
    : isUnlocked 
    ? '#94a3b8' 
    : '#cbd5e1'

  const textFill = isLocked 
    ? '#9ca3af' 
    : '#475569'

  return (
    <motion.g
      onClick={!isLocked ? onClick : undefined}
      className={isLocked ? 'cursor-default' : 'cursor-pointer'}
      whileHover={!isLocked ? { scale: 1.12 } : {}}
      whileTap={!isLocked ? { y: depth - 1 } : {}}
      transition={{ type: 'spring', stiffness: 450, damping: 18 }}
    >
      {/* Radiant halo for current active day */}
      {isCurrent && (
        <circle cx={x} cy={y} r={R + 7} fill={color} opacity={0.2}>
          <animate
            attributeName="r"
            values={`${R + 5};${R + 13};${R + 5}`}
            dur="2.5s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="opacity"
            values="0.22;0.04;0.22"
            dur="2.5s"
            repeatCount="indefinite"
          />
        </circle>
      )}

      {isCompleted ? (
        // ── 3D Star Node for Completed Days ──
        <g>
          {/* Star 3D Base Shadow */}
          <polygon
            points={getStarPoints(x, y + depth, R * 0.95, R * 0.45)}
            fill="#d97706"
          />
          {/* Star Main Plate */}
          <polygon
            points={getStarPoints(x, y, R * 0.95, R * 0.45)}
            fill="#fef08a"
            stroke="#ca8a04"
            strokeWidth={1.5}
          />
          {/* Star Inner Gold Glow */}
          <polygon
            points={getStarPoints(x, y, R * 0.77, R * 0.36)}
            fill="#facc15"
            opacity={0.85}
          />
          {/* Star Glossy reflection */}
          <polygon
            points={`${x - R * 0.35},${y - R * 0.35} ${x},${y - R * 0.77} ${x + R * 0.35},${y - R * 0.35} ${x},${y - R * 0.14}`}
            fill="#ffffff"
            opacity={0.3}
          />
          {/* Cartoon Face: Left Eye */}
          <ellipse cx={x - R * 0.2} cy={y - R * 0.08} rx={R * 0.06} ry={R * 0.15} fill="#1e293b" />
          {/* Cartoon Face: Right Eye */}
          <ellipse cx={x + R * 0.2} cy={y - R * 0.08} rx={R * 0.06} ry={R * 0.15} fill="#1e293b" />
          {/* Cartoon Face: Smile */}
          <path
            d={`M ${x - R * 0.16} ${y + R * 0.14} Q ${x} ${y + R * 0.28} ${x + R * 0.16} ${y + R * 0.14}`}
            fill="none"
            stroke="#1e293b"
            strokeWidth={1.2}
            strokeLinecap="round"
          />
        </g>
      ) : isLocked ? (
        // ── Sleeping Locked Node ──
        <g>
          {/* Locked base */}
          <circle cx={x} cy={y + depth} r={R} fill="#cbd5e1" />
          <circle
            cx={x}
            cy={y}
            r={R}
            fill="#e2e8f0"
            stroke="#94a3b8"
            strokeWidth={1.5}
          />
          {/* Cute Sleeping Face on locked node */}
          <path
            d={`M ${x - R * 0.35} ${y + R * 0.15} Q ${x - R * 0.2} ${y + R * 0.32} ${x - R * 0.05} ${y + R * 0.15}`}
            fill="none"
            stroke="#94a3b8"
            strokeWidth={1.2}
            strokeLinecap="round"
          />
          <path
            d={`M ${x + R * 0.05} ${y + R * 0.15} Q ${x + R * 0.2} ${y + R * 0.32} ${x + R * 0.35} ${y + R * 0.15}`}
            fill="none"
            stroke="#94a3b8"
            strokeWidth={1.2}
            strokeLinecap="round"
          />
          {/* Custom SVG Lock Icon Overlay */}
          <g transform={`translate(${x - 8}, ${y - 12})`}>
            <rect x="0" y="6" width="16" height="11" rx="2.5" fill="#475569" stroke="#334155" strokeWidth={1} />
            <path d="M 3,6 V 3.5 A 5,5 0 0,1 13,3.5 V 6" fill="none" stroke="#475569" strokeWidth={1.8} strokeLinecap="round" />
            <circle cx={8} cy={11.5} r={1.5} fill="#1e293b" />
          </g>
        </g>
      ) : (
        // ── Active or Unlocked Node ──
        <g>
          {/* 3D Depth Base (Drawn shifted downwards) */}
          <circle cx={x} cy={y + depth} r={R} fill={fillDarkBase} />

          {/* Interactive top face plate */}
          <circle
            cx={x}
            cy={y}
            r={R}
            fill={fill}
            stroke={stroke}
            strokeWidth={2}
          />

          {/* Glossy top curvature bubble */}
          <ellipse
            cx={x - R * 0.3}
            cy={y - R * 0.4}
            rx={R * 0.4}
            ry={R * 0.22}
            fill="white"
            opacity={0.35}
          />

          {isCurrent ? (
            <text
              x={x}
              y={y + 1.5}
              textAnchor="middle"
              dominantBaseline="central"
              className="select-none text-[9px]"
              style={{ fill: '#ffffff' }}
            >
              ▶
            </text>
          ) : (
            <text
              x={x}
              y={y + 1}
              textAnchor="middle"
              dominantBaseline="central"
              className="select-none font-black text-[10px] font-body"
              style={{ fill: textFill }}
            >
              {dayId}
            </text>
          )}
        </g>
      )}
    </motion.g>
  )
}
