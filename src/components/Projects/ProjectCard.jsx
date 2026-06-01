import { useRef, useState } from "react";
import bannerImg from "../../assets/bannerImg.webp";
import { useEffect } from "react";
import {MICRO_API_URL} from "../../utils/constants";
import MagneticButton from "../UI/MagneticButton";

const ProjectCard = ({title,main,link, stack = []}) => {

  const [thumbnail,setThumbnail] = useState("");
  const cardRef = useRef(null);
  
  //logic for extracting our thumbnail from any website url we give from micro api
  //by this we dont have to manually provide images for project it will fetch it.
  useEffect(()=>{
      const fetchThumbnail = async () => {
        try {
          const response = await fetch(`${MICRO_API_URL}/?url=${link}&screenshot=true`);
          const data = await response.json();
          setThumbnail(data?.data?.screenshot?.url || bannerImg);
        } catch {
          setThumbnail(bannerImg);
        }
      }
      fetchThumbnail();
  },[link])

  const handleMouseMove = (event) => {
    const element = cardRef.current;
    if (!element) return;

    const rect = element.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const rotateX = ((y / rect.height) - 0.5) * -12;
    const rotateY = ((x / rect.width) - 0.5) * 12;

    element.style.setProperty("--mouse-x", `${x}px`);
    element.style.setProperty("--mouse-y", `${y}px`);
    element.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
  };

  const handleMouseLeave = () => {
    const element = cardRef.current;
    if (!element) return;
    element.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg) translateY(0)";
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="project-tilt-card cursor-reactive relative flex w-80 flex-col overflow-hidden rounded-lg border border-white/10 bg-[#0c0e19] p-3 shadow-xl shadow-slate-900 transition-transform duration-200 md:p-6"
    >
        <div className="project-glare pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300" />
        <img src={thumbnail} alt="Website Thumbnail" className="relative z-10 h-44 w-full rounded-lg object-cover"/>
        <h3 className="px-4 mt-4 text-xl md:text-2xl font-bold leading-normal">
            {title}
        </h3>
        <p className="px-4 text-sm md:text-md leading-tight py-2">{main}</p>
        <div className="mt-2 flex flex-wrap gap-2 px-4">
          {stack.map((item) => (
            <span key={item} className="rounded-full bg-white/10 px-3 py-1 text-xs text-cyan-100 ring-1 ring-white/10">{item}</span>
          ))}
        </div>
        <div className="mt-auto p-2 md:p-4 flex gap-2 md:gap-4">
            <MagneticButton href={link} className="md:mt-5 text-sm md:text-base">Demo</MagneticButton>
        </div>
    </div>
  )
}

export default ProjectCard
