import { useLocation, useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import SpiritualPassport from '../components/SpiritualPassport'

export default function Passport() {
  const location = useLocation()
  const navigate = useNavigate()

  const newStamp = location.state?.newStamp || null

  // When we arrived here right after finishing a day, "closing" the sticker
  // dialog should send the family back to the map (carrying along the unit
  // banner if a whole week was just completed) instead of just closing.
  const handleDismissHighlight = () => {
    const unitCompleted = location.state?.unitCompleted
    navigate('/mapa', unitCompleted ? { state: { unitCompleted } } : undefined)
  }

  return (
    <div className="min-h-screen bg-cream-100 flex flex-col pb-20">
      {/* Playful top Header with selected avatar and stats */}
      <Header showBack={false} />

      {/* Sticker Album Content */}
      <div className="px-4 py-5">
        <SpiritualPassport
          highlightStamp={newStamp}
          onDismissHighlight={newStamp ? handleDismissHighlight : null}
        />
      </div>
    </div>
  )
}
