import { useEffect, useState } from "react"
import About from "./components/About/About"
import Coding from "./components/Coding/Coding"
import Experience from "./components/Experience/Experience"
import Footer from "./components/Footer/Footer"
import GameModal from "./components/Game/GameModal"
import Home from "./components/Home/Home"
import Navbar from "./components/Navbar/Navbar"
import Carousel from "./components/Projects/Carousel"
import CommandPalette from "./components/UI/CommandPalette"
import CustomCursor from "./components/UI/CustomCursor"
import SectionDivider from "./components/UI/SectionDivider"

const App = () => {
  const [isGameOpen, setIsGameOpen] = useState(false)

  useEffect(() => {
    const openGame = () => setIsGameOpen(true)
    window.addEventListener("open-card-game", openGame)
    return () => window.removeEventListener("open-card-game", openGame)
  }, [])

  return (
    //overflow-hidden will automatically hide the overflowing content
    <div className="bg-[#171d32] w-full h-auto overflow-hidden">
      <CustomCursor/>
      <CommandPalette/>
      <GameModal isOpen={isGameOpen} onClose={() => setIsGameOpen(false)}/>
      <Navbar onOpenGame={() => setIsGameOpen(true)}/>
      <Home/>
      <SectionDivider/>
      <About/>
      <SectionDivider/>
      <Experience/>
      <SectionDivider/>
      <Coding/>
      <SectionDivider/>
      <Carousel/>
      <Footer/>
    </div>
  )
}

export default App
