import { HashRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AppProvider } from './context/AppContext'
import Layout from './components/Layout'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import DailyRoutine from './pages/DailyRoutine'
import WeeklyPlan from './pages/WeeklyPlan'
import WeekDetail from './pages/WeekDetail'
import DailyChecklist from './pages/DailyChecklist'
import Passport from './pages/Passport'
import Challenges from './pages/Challenges'
import Parents from './pages/Parents'
import Closing from './pages/Closing'
import PathMap from './pages/PathMap'
import DailyExperience from './pages/DailyExperience'
import MyProgress from './pages/MyProgress'

export default function App() {
  return (
    <AppProvider>
      <HashRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route element={<Layout />}>
            {/* New gamified routes */}
            <Route path="/mapa" element={<PathMap />} />
            <Route path="/dia/:weekId/:dayId" element={<DailyExperience />} />
            <Route path="/mi-avance" element={<MyProgress />} />
            {/* Legacy routes (preserved) */}
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/rutina" element={<DailyRoutine />} />
            <Route path="/semanas" element={<WeeklyPlan />} />
            <Route path="/semana/:id" element={<WeekDetail />} />
            <Route path="/hoy" element={<DailyChecklist />} />
            <Route path="/pasaporte" element={<Passport />} />
            <Route path="/desafios" element={<Challenges />} />
            <Route path="/padres" element={<Parents />} />
            <Route path="/cierre" element={<Closing />} />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </HashRouter>
    </AppProvider>
  )
}
