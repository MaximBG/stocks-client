import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ProtectedRoute from './protected-route'
import HomePage from '../pages/portfolio/portfolio'
import AuthPage from '../pages/auth/auth'

export const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<AuthPage />} />
      </Routes>
    </BrowserRouter>
  )
}
