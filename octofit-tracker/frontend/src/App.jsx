import { BrowserRouter, Navigate, NavLink, Route, Routes } from 'react-router-dom'

import Activities from './components/Activities.jsx'
import Leaderboard from './components/Leaderboard.jsx'
import Teams from './components/Teams.jsx'
import Users from './components/Users.jsx'
import Workouts from './components/Workouts.jsx'
import './App.css'

const navigationItems = [
  { label: 'Activities', path: '/activities' },
  { label: 'Leaderboard', path: '/leaderboard' },
  { label: 'Teams', path: '/teams' },
  { label: 'Users', path: '/users' },
  { label: 'Workouts', path: '/workouts' },
]

function App() {
  return (
    <BrowserRouter>
      <div className="app-shell min-vh-100">
        <header className="app-hero border-bottom shadow-sm">
          <div className="container py-4 py-lg-5">
            <p className="eyebrow text-uppercase small fw-semibold mb-2">OctoFit Tracker</p>
            <h1 className="display-6 fw-bold mb-3">Team activity dashboard</h1>
            <p className="lead text-body-secondary mb-4">
              Browse activities, teams, users, workouts, and leaderboard data from the REST API.
            </p>
            <nav className="nav nav-pills flex-wrap gap-2" aria-label="Main navigation">
              {navigationItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    [
                      'nav-link',
                      'px-3',
                      'py-2',
                      'rounded-pill',
                      'fw-semibold',
                      isActive ? 'active bg-info text-dark border-0' : 'text-white border border-opacity-25',
                    ].join(' ')
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </nav>
          </div>
        </header>

        <main className="container py-4">
          <Routes>
            <Route path="/" element={<Navigate to="/activities" replace />} />
            <Route path="/activities" element={<Activities />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/teams" element={<Teams />} />
            <Route path="/users" element={<Users />} />
            <Route path="/workouts" element={<Workouts />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}

export default App
