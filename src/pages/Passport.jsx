import { useApp } from '../context/AppContext'
import Header from '../components/Header'
import SpiritualPassport from '../components/SpiritualPassport'

export default function Passport() {
  const { childName, childAvatar, earnedStickers, earnedMedals } = useApp()

  return (
    <div className="min-h-screen bg-cream-100 flex flex-col pb-20">
      {/* Playful top Header with selected avatar and stats */}
      <Header title="Mi Pasaporte" showBack={false} />
      
      {/* Sticker Album Content */}
      <div className="flex-1 overflow-y-auto px-4 py-5">
        <SpiritualPassport
          childName={childName}
          childAvatar={childAvatar}
          earnedStickers={earnedStickers}
          earnedMedals={earnedMedals}
        />
      </div>
    </div>
  )
}
