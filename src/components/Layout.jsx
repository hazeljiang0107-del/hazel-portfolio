import { Outlet } from 'react-router-dom'
import AmbientBackground from './AmbientBackground'
import Navbar from './Navbar'
import Footer from './Footer'

export default function Layout() {
  return (
    <div className="relative z-[1] flex min-h-screen flex-col">
      <AmbientBackground />
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
