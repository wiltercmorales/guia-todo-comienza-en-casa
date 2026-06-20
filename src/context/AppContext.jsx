import { createContext, useContext, useState, useEffect } from 'react'

const AppContext = createContext(null)

const DEFAULT_STATE = {
  started: false,
  currentWeek: 0,
  completedWeeks: [],
  dailyChecklists: {},
  passportStamps: [],
  completedChallenges: [],
  childName: '',
}

function getToday() {
  return new Date().toISOString().split('T')[0]
}

export function AppProvider({ children }) {
  const [state, setState] = useState(() => {
    try {
      const saved = localStorage.getItem('tcec-app-v1')
      return saved ? { ...DEFAULT_STATE, ...JSON.parse(saved) } : DEFAULT_STATE
    } catch {
      return DEFAULT_STATE
    }
  })

  useEffect(() => {
    localStorage.setItem('tcec-app-v1', JSON.stringify(state))
  }, [state])

  const startProgram = (name = '') =>
    setState(s => ({ ...s, started: true, childName: name }))

  const setChildName = (name) =>
    setState(s => ({ ...s, childName: name }))

  const completeWeek = (weekId) =>
    setState(s => ({
      ...s,
      completedWeeks: [...new Set([...s.completedWeeks, weekId])],
      currentWeek: Math.max(s.currentWeek, weekId + 1),
    }))

  const uncompleteWeek = (weekId) =>
    setState(s => ({
      ...s,
      completedWeeks: s.completedWeeks.filter(w => w !== weekId),
    }))

  const toggleDailyStep = (step, date = getToday()) =>
    setState(s => ({
      ...s,
      dailyChecklists: {
        ...s.dailyChecklists,
        [date]: {
          ...s.dailyChecklists[date],
          [step]: !s.dailyChecklists[date]?.[step],
        },
      },
    }))

  const addPassportStamp = (date = getToday()) =>
    setState(s => ({
      ...s,
      passportStamps: [...new Set([...s.passportStamps, date])],
    }))

  const toggleChallenge = (id) =>
    setState(s => ({
      ...s,
      completedChallenges: s.completedChallenges.includes(id)
        ? s.completedChallenges.filter(c => c !== id)
        : [...s.completedChallenges, id],
    }))

  const getTodayChecklist = () => state.dailyChecklists[getToday()] || {}

  const getTodayProgress = () => {
    const checklist = getTodayChecklist()
    const completed = Object.values(checklist).filter(Boolean).length
    return { completed, total: 7, percent: Math.round((completed / 7) * 100) }
  }

  const getOverallProgress = () => {
    const total = 11
    return {
      completed: state.completedWeeks.length,
      total,
      percent: Math.round((state.completedWeeks.length / total) * 100),
    }
  }

  const getTotalStamps = () => state.passportStamps.length

  const resetProgress = () => setState(DEFAULT_STATE)

  return (
    <AppContext.Provider value={{
      ...state,
      startProgram,
      setChildName,
      completeWeek,
      uncompleteWeek,
      toggleDailyStep,
      addPassportStamp,
      toggleChallenge,
      getTodayChecklist,
      getTodayProgress,
      getOverallProgress,
      getTotalStamps,
      resetProgress,
      getToday,
    }}>
      {children}
    </AppContext.Provider>
  )
}

export const useApp = () => {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be inside AppProvider')
  return ctx
}
