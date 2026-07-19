import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'

export default function DailyChecklist() {
  const navigate = useNavigate()
  const { mapCurrentWeek, mapCurrentDay } = useApp()

  useEffect(() => {
    navigate(`/dia/${mapCurrentWeek}/${mapCurrentDay}`, { replace: true })
  }, [mapCurrentWeek, mapCurrentDay, navigate])

  return null
}
