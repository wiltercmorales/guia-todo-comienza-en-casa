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

export default function DayNode({ x, y, dayId, status, onClick, color = '#f59e0b', dark = '#92400e', stickerPath, stickerFallback }) {
  const isCompleted = status === 'completed'
  const isCurrent   = status === 'current'
  const isUnlocked  = status === 'unlocked'
  const isLocked    = status === 'locked'

  // Locked days are drawn smaller and quieter so a long stretch of them
  // reads as a calm continuation of the road, not a wall of padlocks.
  const R = isCurrent ? 18 : isLocked ? 11 : 14
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
        // ── Quiet Locked Node — small & muted so a run of these reads as a
        // calm continuation of the road rather than a wall of padlocks ──
        <g opacity={0.7}>
          <circle cx={x} cy={y + depth * 0.6} r={R} fill="#cbd5e1" />
          <circle cx={x} cy={y} r={R} fill="#e9edf3" stroke="#a8b3c2" strokeWidth={1.25} />
          {/* Small SVG lock icon, scaled to the smaller node */}
          <g transform={`translate(${x - 5.5}, ${y - 7.5})`}>
            <rect x="0" y="4" width="11" height="7.5" rx="1.8" fill="#94a3b8" stroke="#7c8798" strokeWidth={0.75} />
            <path d="M 2,4 V 2.4 A 3.5,3.5 0 0,1 9,2.4 V 4" fill="none" stroke="#94a3b8" strokeWidth={1.2} strokeLinecap="round" />
          </g>
        </g>
      ) : (
        // ── Active or Unlocked Node — shows the day's themed sticker so the
        // path reads as varied stops, not identical numbered dots ──
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

          {stickerPath ? (
            <image
              href={stickerPath}
              x={x - R * 0.62}
              y={y - R * 0.62}
              width={R * 1.24}
              height={R * 1.24}
              onError={(e) => { if (stickerFallback) e.target.setAttribute('href', stickerFallback) }}
            />
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

          {isCurrent && (
            <g>
              <circle cx={x + R - 4} cy={y - R + 4} r={7} fill="#16a34a" stroke="white" strokeWidth={1.5} />
              <text x={x + R - 4} y={y - R + 5} textAnchor="middle" dominantBaseline="central"
                style={{ fontSize: '7px', fill: '#ffffff' }}>▶</text>
            </g>
          )}
        </g>
      )}
    </motion.g>
  )
}
