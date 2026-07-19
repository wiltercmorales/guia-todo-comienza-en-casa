import { getAvatarPath, getAvatarFallback } from '../data/assets'
import { FRAMES } from '../data/shopItems'

export default function AvatarFrame({ avatarId, frameId = 'none', size = 44, className = '' }) {
  const frame = FRAMES.find(f => f.id === frameId) || FRAMES[0]

  return (
    <div
      className={`rounded-2xl p-[3px] flex-shrink-0 ${frame.className} ${className}`}
      style={{ width: size, height: size }}
    >
      <div className="w-full h-full rounded-[13px] bg-white p-0.5 overflow-hidden flex items-center justify-center">
        <img
          src={getAvatarPath(avatarId)}
          alt="Avatar"
          className="w-full h-full object-contain"
          onError={(e) => { e.target.src = getAvatarFallback(avatarId) }}
        />
      </div>
    </div>
  )
}
