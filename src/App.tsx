import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import { Signin } from './pages/Signin'
import { Signup } from './pages/Signup'
import { Share } from './pages/Share'
import { Me } from './pages/Me'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Redirect root to /me */}
        <Route path="/" element={<Navigate to="/me" replace />} />
        
        {/* Auth check route */}
        <Route path="/me" element={<Me />} />
        
        {/* Other routes */}
        <Route path='/signup' element={<Signup />} />
        <Route path='/signin' element={<Signin />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/share' element={<Share />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
