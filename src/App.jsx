import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Dashboard from './Dashboard'
import UserInterface from './UserInterface'

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/userinterface" element={<UserInterface />} />
      </Routes>
    </Router>
  )
}