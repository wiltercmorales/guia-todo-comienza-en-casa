import { createContext, useContext, useState, useEffect } from 'react'

const AppContext = createContext(null)

export function getToday() {
  return new Date().toISOString().split('T')[0]
}

function getYesterday() {
  const d = new Date()
  d.setDate(d.getDate() - 1)
  return d.toISOString().split('T')[0]
}

const DEFAULT_STATE = {
  // Existing fields (preserved for backwards compatibility)
  started: false,
  currentWeek: 0,
  completedWeeks: [],
  dailyChecklists: {},
  passportStamps: [],
  completedChallenges: [],
  childName: '',
  childAvatar: 'nino', // New field for premium character avatar
  // New gamification fields
  mapCurrentWeek: 1,  // 1-10
  mapCurrentDay: 1,   // 1-7
  completedDays: {},  // { 'w1d1': { completed: true, date: '...', response: '...' } }
  earnedMedals: [],   // [1, 2, 3, ...]  week IDs with earned medal
  earnedStickers: [], // ['w1d1', 'w1d2', ...]  day keys
  streak: 0,
  lastActiveDate: null,
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

  // ── Legacy actions (preserved) ──────────────────────────────────────────────

  const startProgram = (name = '', avatar = 'nino') =>
    setState(s => ({ ...s, started: true, childName: name || s.childName, childAvatar: avatar || s.childAvatar }))

  const setChildName = (name) =>
    setState(s => ({ ...s, childName: name }))

  const setChildAvatar = (avatar) =>
    setState(s => ({ ...s, childAvatar: avatar }))

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

  // ── New gamification actions ─────────────────────────────────────────────────

  const completeDay = (weekId, dayId, response = '') => {
    const key = `w${weekId}d${dayId}`
    const today = getToday()
    setState(s => {
      // Don't double-complete
      if (s.completedDays[key]?.completed) return s

      const newCompletedDays = {
        ...s.completedDays,
        [key]: { completed: true, date: today, response },
      }

      // Award sticker
      const newStickers = [...new Set([...s.earnedStickers, key])]

      // Count days done in this week
      const weekDays = Array.from({ length: 7 }, (_, i) =>
        newCompletedDays[`w${weekId}d${i + 1}`]?.completed
      )
      const allDone = weekDays.every(Boolean)

      // Award medal for completing the full week
      const newMedals = allDone
        ? [...new Set([...s.earnedMedals, weekId])]
        : s.earnedMedals

      // Advance current week/day on map
      let newMapWeek = s.mapCurrentWeek
      let newMapDay = s.mapCurrentDay

      if (weekId === s.mapCurrentWeek && dayId === s.mapCurrentDay) {
        if (dayId < 7) {
          newMapDay = dayId + 1
        } else if (weekId < 10) {
          newMapWeek = weekId + 1
          newMapDay = 1
        }
      }

      // Streak calculation
      const streak = s.lastActiveDate === getYesterday()
        ? s.streak + 1
        : s.lastActiveDate === today
        ? s.streak
        : 1

      // Also stamp passport
      const newStamps = [...new Set([...s.passportStamps, today])]

      return {
        ...s,
        completedDays: newCompletedDays,
        earnedStickers: newStickers,
        earnedMedals: newMedals,
        mapCurrentWeek: newMapWeek,
        mapCurrentDay: newMapDay,
        completedWeeks: allDone
          ? [...new Set([...s.completedWeeks, weekId])]
          : s.completedWeeks,
        currentWeek: allDone
          ? Math.max(s.currentWeek, weekId + 1)
          : s.currentWeek,
        streak,
        lastActiveDate: today,
        passportStamps: newStamps,
      }
    })
  }

  const saveDayResponse = (weekId, dayId, response) => {
    const key = `w${weekId}d${dayId}`
    setState(s => ({
      ...s,
      completedDays: {
        ...s.completedDays,
        [key]: { ...s.completedDays[key], response },
      },
    }))
  }

  const resetDayProgress = (weekId, dayId) => {
    const key = `w${weekId}d${dayId}`
    setState(s => {
      const { [key]: _removed, ...rest } = s.completedDays
      return {
        ...s,
        completedDays: rest,
        earnedStickers: s.earnedStickers.filter(k => k !== key),
        earnedMedals: s.earnedMedals.filter(m => m !== weekId),
        completedWeeks: s.completedWeeks.filter(w => w !== weekId),
      }
    })
  }

  const getDayStatus = (weekId, dayId) => {
    const key = `w${weekId}d${dayId}`
    if (state.completedDays[key]?.completed) return 'completed'
    if (weekId === state.mapCurrentWeek && dayId === state.mapCurrentDay) return 'current'
    if (weekId < state.mapCurrentWeek) return 'unlocked'
    if (weekId === state.mapCurrentWeek && dayId < state.mapCurrentDay) return 'unlocked'
    return 'locked'
  }

  const getWeekDayCount = (weekId) => {
    let done = 0
    for (let d = 1; d <= 7; d++) {
      if (state.completedDays[`w${weekId}d${d}`]?.completed) done++
    }
    return done
  }

  const getTotalCompletedDays = () =>
    Object.values(state.completedDays).filter(d => d?.completed).length

  const getMapProgress = () => {
    const total = 70
    const done = getTotalCompletedDays()
    return { done, total, percent: Math.round((done / total) * 100) }
  }

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
      setChildAvatar,
      // New gamification
      completeDay,
      saveDayResponse,
      resetDayProgress,
      getDayStatus,
      getWeekDayCount,
      getTotalCompletedDays,
      getMapProgress,
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
