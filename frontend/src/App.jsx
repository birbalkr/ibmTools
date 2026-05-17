
import './App.css'
import { useState } from 'react'
import Home from './components/Home'
import CoursePage from './pages/Course'

function App() {
  const [view, setView] = useState('home') // 'home' or 'course'
  const [selectedCourse, setSelectedCourse] = useState(null)

  const handleViewCourse = (course) => {
    // support both course object (old Home) and courseKey string (new Home)
    if (typeof course === 'string') {
      setSelectedCourse({ name: course });
    } else {
      setSelectedCourse(course);
    }
    setView('course')
  }

  return (
    <>
      <main>
        {view === 'home' && <Home onNavigate={handleViewCourse} />}
        {view === 'course' && <CoursePage initialCourse={selectedCourse?.name} />}
      </main>
    </>
  )
}

export default App
