
import './App.css'
import Courses from './components/Courses'
import Demo from './components/Demo'
import Home from './components/Home'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

function App() {

  return (
    <Router>
      <Routes>
          <Route path="/" element={<Demo/>} />
          <Route path="/Courses" element={<Courses />} />
      </Routes>
    </Router>
  )
}

export default App
