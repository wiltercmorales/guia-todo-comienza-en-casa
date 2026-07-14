import { motion } from 'framer-motion'

export default function ProgressBar({ percent, avatar, label }) {
  const safePercent = Math.max(0, Math.min(100, percent || 0))

  return (
    <div className="w-full bg-cream-50/60 border-2 border-cream-300/80 rounded-3xl p-3 shadow-sm select-none">
      {/* Labels */}
      <div className="flex justify-between items-center mb-2 px-1">
        <span className="font-body text-xs font-bold text-forest-600">
          {label || 'Progreso de mi camino'}
        </span>
        <span className="font-display font-black text-xs text-gold-600 bg-gold-100/60 px-2 py-0.5 rounded-full border border-gold-200">
          {safePercent}%
        </span>
      </div>

      {/* Progress Track Container */}
      <div className="relative pt-6 pb-2 px-2">
        {/* Sliding Avatar Container */}
        <div className="absolute top-0 left-0 right-0 h-8 pointer-events-none">
          <motion.div
            className="absolute -top-1 w-8 h-8 rounded-full bg-white border-2 border-gold-400 p-0.5 shadow-md flex items-center justify-center"
            style={{
              x: `${safePercent}%`,
              left: -16, // offset to center on the point
            }}
            transition={{ type: 'spring', damping: 20, stiffness: 120 }}
          >
            {avatar ? (
              <img
                src={avatar}
                alt="Avatar"
                className="w-full h-full object-contain"
                onError={(e) => {
                  e.target.src = './assets/avatar/nino.png'
                }}
              />
            ) : (
              <span className="text-sm">⭐</span>
            )}
          </motion.div>
        </div>

        {/* Outer track bar */}
        <div className="w-full h-5 bg-cream-200 rounded-full border border-cream-300 p-0.5 shadow-inner overflow-hidden">
          {/* Fills with gradient */}
          <motion.div
            className="h-full bg-gradient-to-r from-forest-400 via-gold-400 to-gold-500 rounded-full relative"
            initial={{ width: 0 }}
            animate={{ width: `${safePercent}%` }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
          >
            {/* Shimmer light effect inside fill */}
            <div className="absolute inset-0 bg-white/20 rounded-full overflow-hidden">
              <div className="w-1/2 h-full bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12 animate-pulse-soft" />
            </div>
            {/* Glossy top overlay */}
            <div className="absolute top-0.5 left-0 right-0 h-1.5 bg-white/30 rounded-t-full" />
          </motion.div>
        </div>
      </div>
    </div>
  )
}
