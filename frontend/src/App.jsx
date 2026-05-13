
import './App.css'
import Courses from './components/Courses'
import Home from './components/Home'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

function App() {

  return (
    <Router>
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Courses" element={<Courses />} />
      </Routes>
    </Router>
  )
}

export default App
