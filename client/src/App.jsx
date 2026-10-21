import { Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import SettingsPage from './pages/SettingsPage'
import SearchPage from './pages/SearchPage'
import ComparePage from './pages/ComparePage'
import BudgetAdvisorPage from './pages/BudgetAdvisorPage'
import PriceHistoryPage from './pages/PriceHistoryPage'
import FavoritesPage from './pages/FavoritesPage'
import './App.css'

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="search" element={<SearchPage />} />
        <Route path="compare" element={<ComparePage />} />
        <Route path="budget" element={<BudgetAdvisorPage />} />
        <Route path="price-history" element={<PriceHistoryPage />} />
        <Route path="favorites" element={<FavoritesPage />} />
        <Route path="settings" element={<SettingsPage />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App
