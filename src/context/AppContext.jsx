import { createContext, useContext, useState, useEffect } from 'react'

const AppContext = createContext(null)

const PROFILES_KEY = 'tcec-profiles-v1'
const LEGACY_KEY = 'tcec-app-v2'

export function getToday() {
  return new Date().toISOString().split('T')[0]
}

function getDaysAgo(n) {
  const d = new Date()
  d.setDate(d.getDate() - n)
  return d.toISOString().split('T')[0]
}

// Unified step helper function to get available steps for a day content
export function getStepsForDay(dayContent) {
  if (!dayContent) return []
  if (dayContent.dayName === 'SÁBADO') {
    const sat = []
    if (dayContent.bibleStudy) sat.push({ id: 'bibleStudy', label: '📖 Estudio de la Biblia' })
    sat.push(
      { id: 'verse', label: '📖 Base Bíblica y Versículo' },
      { id: 'word', label: '💎 Palabra del Día' },
      { id: 'message', label: '✨ Mensaje Semanal' }
    )
    return sat
  }
  const list = []
  if (dayContent.bibleStudy) list.push({ id: 'bibleStudy', label: '📖 Estudio de la Biblia' })
  if (dayContent.story) list.push({ id: 'story', label: '📖 Historia' })
  if (dayContent.think) list.push({ id: 'think', label: '🤔 Piensen' })
  if (dayContent.todo) list.push({ id: 'todo', label: '🎯 Para hacer' })
  if (dayContent.share) list.push({ id: 'share', label: '🤝 Comparte' })
  if (dayContent.journal) list.push({ id: 'journal', label: '📓 Diario' })
  if (dayContent.prayer) list.push({ id: 'prayer', label: '🙏 Oración' })
  return list
}

const DEFAULT_PROFILE_STATE = {
  started: false,
  currentWeek: 2, // Starts at Week 2 per the new content
  completedWeeks: [],
  dailyChecklists: {}, // Legacy
  passportStamps: [],
  completedChallenges: [],
  childName: '',
  childAge: '', // Stored as number/string
  childAvatar: 'nino',

  // New gamification fields
  mapCurrentWeek: 2,  // 2-11
  mapCurrentDay: 1,   // 1-7 (1=Sábado, 2=Domingo, etc.)
  completedDays: {},  // { 'w2d1': { completed: true, date: '...', checkedSteps: { verse: true... }, response: '...' } }
  earnedMedals: [],   // [2, 3, ...] week IDs
  earnedStickers: [], // ['w2d1', 'w2d2', ...]
  streak: 0,
  lastActiveDate: null,

  stars: 0,
  timeStudied: 0, // In minutes
  claimedChests: [], // Array of chest IDs claimed (e.g. 'week2', 'week3', 'challenge1', etc.)
  startDate: null,

  // Shop (Tienda de Estrellas)
  ownedFrames: ['none'],
  activeFrame: 'none',
  streakFreezes: 0,
}

function makeProfileId() {
  return 'p_' + Date.now().toString(36) + Math.random().toString(36).slice(2, 6)
}

function loadInitialProfilesState() {
  try {
    const saved = localStorage.getItem(PROFILES_KEY)
    if (saved) {
      const parsed = JSON.parse(saved)
      if (parsed?.profiles && parsed?.activeProfileId && parsed.profiles[parsed.activeProfileId]) {
        const profiles = {}
        Object.entries(parsed.profiles).forEach(([id, p]) => {
          profiles[id] = { ...DEFAULT_PROFILE_STATE, ...p }
        })
        return { activeProfileId: parsed.activeProfileId, profiles }
      }
    }

    // Migrate legacy single-profile storage
    const legacy = localStorage.getItem(LEGACY_KEY)
    if (legacy) {
      const parsedLegacy = JSON.parse(legacy)
      if (!parsedLegacy.started) {
        parsedLegacy.mapCurrentWeek = 2
        parsedLegacy.currentWeek = 2
      }
      const id = makeProfileId()
      return {
        activeProfileId: id,
        profiles: { [id]: { ...DEFAULT_PROFILE_STATE, ...parsedLegacy } },
      }
    }
  } catch {
    // fall through to fresh state
  }

  const id = makeProfileId()
  return { activeProfileId: id, profiles: { [id]: { ...DEFAULT_PROFILE_STATE } } }
}

export function AppProvider({ children }) {
  const [profilesState, setProfilesState] = useState(loadInitialProfilesState)

  const state = profilesState.profiles[profilesState.activeProfileId] || DEFAULT_PROFILE_STATE

  // Save to localStorage whenever profiles state changes
  useEffect(() => {
    localStorage.setItem(PROFILES_KEY, JSON.stringify(profilesState))
  }, [profilesState])

  // Applies an updater function to the currently active profile only
  const updateActive = (updater) => {
    setProfilesState(ps => ({
      ...ps,
      profiles: {
        ...ps.profiles,
        [ps.activeProfileId]: updater(ps.profiles[ps.activeProfileId]),
      },
    }))
  }

  // Study time increment timer (ticks every 1 minute if started)
  useEffect(() => {
    if (!state.started) return
    const interval = setInterval(() => {
      updateActive(s => ({ ...s, timeStudied: s.timeStudied + 1 }))
    }, 60000)
    return () => clearInterval(interval)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.started, profilesState.activeProfileId])

  const startProgram = (name = '', age = '', avatar = 'nino') => {
    updateActive(s => ({
      ...s,
      started: true,
      childName: name || s.childName,
      childAge: age || s.childAge,
      childAvatar: avatar || s.childAvatar,
      startDate: s.startDate || getToday(),
      mapCurrentWeek: 2,
      mapCurrentDay: 1,
    }))
  }

  const setChildName = (name) =>
    updateActive(s => ({ ...s, childName: name }))

  const setChildAvatar = (avatar) =>
    updateActive(s => ({ ...s, childAvatar: avatar }))

  // Claim a reward chest (challenge chest or weekly completion chest)
  const claimChest = (chestId) => {
    updateActive(s => {
      if (s.claimedChests.includes(chestId)) return s
      return {
        ...s,
        claimedChests: [...s.claimedChests, chestId],
        stars: s.stars + 15, // Claims award 15 stars!
      }
    })
  }

  // Toggle a step check state (stars update in real-time)
  const toggleStepCheck = (weekId, dayId, stepId) => {
    const key = `w${weekId}d${dayId}`
    updateActive(s => {
      const currentDayData = s.completedDays[key] || { completed: false, checkedSteps: {}, response: '' }
      const newCheckedSteps = {
        ...currentDayData.checkedSteps,
        [stepId]: !currentDayData.checkedSteps[stepId]
      }

      // Calculate star change
      const isCheckedNow = newCheckedSteps[stepId]
      const starChange = isCheckedNow ? 1 : -1

      // Keep checkedSteps list updated
      const updatedDayData = {
        ...currentDayData,
        checkedSteps: newCheckedSteps,
      }

      const newCompletedDays = {
        ...s.completedDays,
        [key]: updatedDayData
      }

      return {
        ...s,
        completedDays: newCompletedDays,
        stars: Math.max(0, s.stars + starChange),
      }
    })
  }

  // Finalize daily devotion when all steps are ticked and kid clicks Continue in modal
  const completeDay = (weekId, dayId, response = '') => {
    const key = `w${weekId}d${dayId}`
    const today = getToday()

    updateActive(s => {
      const dayData = s.completedDays[key] || { completed: false, checkedSteps: {}, response: '' }

      // If already completed, just advance current map position if needed
      if (dayData.completed) {
        // Advance current map node if kid is revisiting past days
        return s
      }

      const newCompletedDays = {
        ...s.completedDays,
        [key]: {
          ...dayData,
          completed: true,
          date: today,
          response: response || dayData.response
        }
      }

      // Award sticker/stamp
      const newStickers = [...new Set([...s.earnedStickers, key])]
      const newStamps = [...new Set([...s.passportStamps, today])]

      // Check if all 7 days of the week are completed
      const weekCompletedDays = Array.from({ length: 7 }, (_, i) => {
        const dKey = `w${weekId}d${i + 1}`
        return dKey === key ? true : newCompletedDays[dKey]?.completed
      })
      const weekAllDone = weekCompletedDays.every(Boolean)

      const newMedals = weekAllDone
        ? [...new Set([...s.earnedMedals, weekId])]
        : s.earnedMedals

      // Advance map nodes
      let newMapWeek = s.mapCurrentWeek
      let newMapDay = s.mapCurrentDay

      if (weekId === s.mapCurrentWeek && dayId === s.mapCurrentDay) {
        if (dayId < 7) {
          newMapDay = dayId + 1
        } else if (weekId < 11) {
          newMapWeek = weekId + 1
          newMapDay = 1
        }
      }

      // Streak calculation — a purchased "congelador de racha" protects
      // the streak across exactly one fully-missed day.
      let newStreak = s.streak
      let newFreezes = s.streakFreezes
      if (s.lastActiveDate === getDaysAgo(1)) {
        newStreak = s.streak + 1
      } else if (s.lastActiveDate === getDaysAgo(2) && s.streakFreezes > 0) {
        newStreak = s.streak + 1
        newFreezes = s.streakFreezes - 1
      } else if (s.lastActiveDate !== today) {
        newStreak = 1
      }

      return {
        ...s,
        completedDays: newCompletedDays,
        earnedStickers: newStickers,
        passportStamps: newStamps,
        earnedMedals: newMedals,
        completedWeeks: weekAllDone ? [...new Set([...s.completedWeeks, weekId])] : s.completedWeeks,
        currentWeek: weekAllDone ? Math.max(s.currentWeek, weekId + 1) : s.currentWeek,
        mapCurrentWeek: newMapWeek,
        mapCurrentDay: newMapDay,
        streak: newStreak || 1,
        streakFreezes: newFreezes,
        lastActiveDate: today,
      }
    })
  }

  const saveDayResponse = (weekId, dayId, response) => {
    const key = `w${weekId}d${dayId}`
    updateActive(s => {
      const dayData = s.completedDays[key] || { completed: false, checkedSteps: {}, response: '' }
      return {
        ...s,
        completedDays: {
          ...s.completedDays,
          [key]: { ...dayData, response }
        }
      }
    })
  }

  const resetDayProgress = (weekId, dayId) => {
    const key = `w${weekId}d${dayId}`
    updateActive(s => {
      const currentDayData = s.completedDays[key]
      if (!currentDayData) return s

      // Subtract checked stars
      const checkedCount = Object.values(currentDayData.checkedSteps || {}).filter(Boolean).length
      const { [key]: _removed, ...rest } = s.completedDays

      return {
        ...s,
        completedDays: rest,
        stars: Math.max(0, s.stars - checkedCount),
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

    // Station locked logic: must complete previous week to unlock next week
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
    const total = 70 // 10 weeks * 7 days
    const done = getTotalCompletedDays()
    return { done, total, percent: Math.round((done / total) * 100) }
  }

  const getOverallProgress = () => {
    const total = 10 // 10 weeks of lessons (weeks 2-11)
    return {
      completed: state.completedWeeks.length,
      total,
      percent: Math.round((state.completedWeeks.length / total) * 100),
    }
  }

  const resetProgress = () => updateActive(() => ({ ...DEFAULT_PROFILE_STATE }))

  // ---- Shop (Tienda de Estrellas) ----

  const purchaseFrame = (frameId, cost) => {
    updateActive(s => {
      if (s.ownedFrames.includes(frameId) || s.stars < cost) return s
      return {
        ...s,
        stars: s.stars - cost,
        ownedFrames: [...s.ownedFrames, frameId],
        activeFrame: frameId,
      }
    })
  }

  const equipFrame = (frameId) => {
    updateActive(s => (s.ownedFrames.includes(frameId) ? { ...s, activeFrame: frameId } : s))
  }

  const buyStreakFreeze = (cost, maxFreezes = 3) => {
    updateActive(s => {
      if (s.stars < cost || s.streakFreezes >= maxFreezes) return s
      return { ...s, stars: s.stars - cost, streakFreezes: s.streakFreezes + 1 }
    })
  }

  // ---- Family profiles (Liga Familiar) ----

  const switchProfile = (id) => {
    setProfilesState(ps => (ps.profiles[id] ? { ...ps, activeProfileId: id } : ps))
  }

  const createProfile = (name, avatar = 'nino') => {
    const id = makeProfileId()
    setProfilesState(ps => ({
      activeProfileId: id,
      profiles: {
        ...ps.profiles,
        [id]: {
          ...DEFAULT_PROFILE_STATE,
          started: true,
          childName: name,
          childAvatar: avatar,
          startDate: getToday(),
        },
      },
    }))
    return id
  }

  const deleteProfile = (id) => {
    setProfilesState(ps => {
      const ids = Object.keys(ps.profiles)
      if (ids.length <= 1) return ps // Always keep at least one profile
      const { [id]: _removed, ...rest } = ps.profiles
      const newActive = ps.activeProfileId === id ? Object.keys(rest)[0] : ps.activeProfileId
      return { activeProfileId: newActive, profiles: rest }
    })
  }

  const getProfilesSummary = () => {
    return Object.entries(profilesState.profiles)
      .map(([id, p]) => ({
        id,
        name: p.childName || 'Sin nombre',
        avatar: p.childAvatar,
        activeFrame: p.activeFrame,
        stars: p.stars,
        streak: p.streak,
        medals: p.earnedMedals.length,
        completedDays: Object.values(p.completedDays).filter(d => d?.completed).length,
        isActive: id === profilesState.activeProfileId,
      }))
      .sort((a, b) => b.stars - a.stars)
  }

  // Evaluates standard achievements for the passport / challenges
  const getChallengeProgress = () => {
    // 1. Streak >= 3
    const streakDone = state.streak >= 3
    // 2. Pray 5 days (completed 'prayer' steps)
    let prayerCount = 0
    // 3. Answer 10 question sections ('think' steps)
    let thinkCount = 0
    // 4. Do 5 activities ('todo' steps)
    let todoCount = 0

    Object.keys(state.completedDays).forEach(key => {
      const day = state.completedDays[key]
      if (day.checkedSteps?.prayer) prayerCount++
      if (day.checkedSteps?.think) thinkCount++
      if (day.checkedSteps?.todo) todoCount++
    })

    const completedWeeksCount = state.completedWeeks.length
    const totalDaysCompleted = getTotalCompletedDays()

    return [
      {
        id: 'streak_3',
        title: '🔥 Súper Racha',
        desc: 'Tener una racha de 3 días seguidos.',
        current: state.streak,
        target: 3,
        completed: streakDone,
      },
      {
        id: 'pray_5',
        title: '🙏 Orador Fiel',
        desc: 'Hacer la oración del devocional por 5 días.',
        current: prayerCount,
        target: 5,
        completed: prayerCount >= 5,
      },
      {
        id: 'week_1',
        title: '🏅 Primer Gran Paso',
        desc: 'Completar 1 semana entera del programa.',
        current: completedWeeksCount,
        target: 1,
        completed: completedWeeksCount >= 1,
      },
      {
        id: 'think_10',
        title: '🤔 Preguntón',
        desc: 'Responder 10 secciones de preguntas Piensen.',
        current: thinkCount,
        target: 10,
        completed: thinkCount >= 10,
      },
      {
        id: 'todo_5',
        title: '🎯 Manos a la Obra',
        desc: 'Hacer 5 actividades dinámicas Para Hacer.',
        current: todoCount,
        target: 5,
        completed: todoCount >= 5,
      },
      {
        id: 'complete_all',
        title: '🏆 Gran Conquistador',
        desc: 'Completar todo el programa (70 días).',
        current: totalDaysCompleted,
        target: 70,
        completed: totalDaysCompleted >= 70,
      }
    ]
  }

  return (
    <AppContext.Provider value={{
      ...state,
      startProgram,
      setChildName,
      setChildAvatar,
      claimChest,
      toggleStepCheck,
      completeDay,
      saveDayResponse,
      resetDayProgress,
      getDayStatus,
      getWeekDayCount,
      getTotalCompletedDays,
      getMapProgress,
      getOverallProgress,
      getChallengeProgress,
      resetProgress,
      getToday,
      // Shop
      purchaseFrame,
      equipFrame,
      buyStreakFreeze,
      // Family profiles
      activeProfileId: profilesState.activeProfileId,
      switchProfile,
      createProfile,
      deleteProfile,
      getProfilesSummary,
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
