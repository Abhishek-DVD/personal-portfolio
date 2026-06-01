import { Suspense, createElement, lazy } from "react"
import avatarImg from "../../assets/avatar.webp"
import { FaCloud, FaJava, FaNodeJs, FaReact } from "react-icons/fa"
import { SiPostgresql, SiSpring } from "react-icons/si"
import TextChange from "../TextChange"
import MagneticButton from "../UI/MagneticButton"

const HeroScene = lazy(() => import("./HeroScene"))

const orbitItems = [
  { icon: FaReact, className: "left-2 top-12 text-cyan-300", label: "React" },
  { icon: FaJava, className: "right-4 top-8 text-orange-300", label: "Java" },
  { icon: SiSpring, className: "bottom-16 left-4 text-green-400", label: "Spring" },
  { icon: FaCloud, className: "bottom-8 right-10 text-sky-300", label: "Azure" },
  { icon: SiPostgresql, className: "left-1/2 top-1 text-blue-300", label: "PostgreSQL" },
  { icon: FaNodeJs, className: "bottom-2 left-1/2 text-lime-300", label: "Node" },
]

const Home = () => {
  return (
    <div className="relative flex w-full flex-col items-center justify-between gap-10 overflow-hidden p-10 text-white md:flex-row md:items-start md:p-20">
        <Suspense fallback={null}>
            <HeroScene />
        </Suspense>
        <div className="relative z-10 md:w-2/4 md:pt-10">
            <h1 className="text-3xl md:text-6xl font-bold flex leading-normal tracking-tighter"><TextChange/></h1>
            <p className="text-sm mt-4 md:text-2xl leading-tight tracking-tight">I build production-ready full-stack systems: Java/Spring Boot and Node/Express backends for high-volume data platforms, and React frontends. I seek roles where I can drive data quality, optimize performance, and grow into technical leadership.</p>
            <div className="mt-5 flex flex-wrap gap-3 md:mt-10">
                <MagneticButton href="#Contact">Contact me</MagneticButton>
                <MagneticButton href="#Projects" className="bg-white/10 ring-1 ring-white/15">View projects</MagneticButton>
            </div>
            <div className="mt-6 max-w-xl rounded-lg border border-white/10 bg-zinc-950/40 p-4 font-mono text-xs text-cyan-100 shadow-2xl shadow-cyan-950/20 backdrop-blur md:text-sm">
                <p className="text-gray-500">&gt; currently_building</p>
                <p className="mt-1 text-white">Production-ready full-stack systems</p>
                <div className="mt-4 flex flex-wrap gap-2 font-sans">
                    <span className="rounded-full bg-cyan-300/10 px-3 py-1 text-cyan-100 ring-1 ring-cyan-200/20">Azure Certified</span>
                    <span className="rounded-full bg-indigo-300/10 px-3 py-1 text-indigo-100 ring-1 ring-indigo-200/20">Full Stack Developer</span>
                    <span className="rounded-full bg-emerald-300/10 px-3 py-1 text-emerald-100 ring-1 ring-emerald-200/20">Problem Solver</span>
                </div>
            </div>
        </div>
        <div className="relative z-10 flex min-h-80 w-full max-w-sm items-center justify-center md:max-w-md">
            <div className="absolute h-72 w-72 animate-[spin_18s_linear_infinite] rounded-full border border-dashed border-cyan-200/25 md:h-96 md:w-96" />
            {orbitItems.map(({ icon, className, label }) => (
                <div key={label} className={`absolute ${className} cursor-reactive rounded-full border border-white/10 bg-zinc-950/70 p-3 shadow-lg shadow-cyan-950/30 backdrop-blur`}>
                    {createElement(icon, { size: 28 })}
                </div>
            ))}
            <img className="relative z-10 w-72 drop-shadow-[0_25px_60px_rgba(34,211,238,0.24)] md:w-96" src={avatarImg} alt="Developer avatar"/>
        </div>
    </div>
  )
}

export default Home
