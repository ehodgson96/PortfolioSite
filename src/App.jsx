import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar      from './components/Navbar'
import Footer      from './components/Footer'
import MainPage    from './pages/MainPage'
import ProjectPage from './pages/ProjectPage'

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/"               element={<MainPage />} />
        <Route path="/project/:slug"  element={<ProjectPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}
