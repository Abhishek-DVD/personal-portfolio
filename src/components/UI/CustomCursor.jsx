import { useEffect, useState } from "react";

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isPointer, setIsPointer] = useState(false);

  useEffect(() => {
    const handleMouseMove = (event) => {
      setPosition({ x: event.clientX, y: event.clientY });
      setIsPointer(Boolean(event.target.closest("a, button, [role='button'], .cursor-reactive")));
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <>
      <div
        className="pointer-events-none fixed left-0 top-0 z-[9999] hidden h-3 w-3 rounded-full bg-cyan-300 mix-blend-screen md:block"
        style={{ transform: `translate3d(${position.x - 6}px, ${position.y - 6}px, 0)` }}
      />
      <div
        className={`pointer-events-none fixed left-0 top-0 z-[9998] hidden rounded-full border border-cyan-200/70 transition-[height,width,transform,opacity] duration-200 md:block ${
          isPointer ? "h-16 w-16 opacity-80" : "h-9 w-9 opacity-50"
        }`}
        style={{
          transform: `translate3d(${position.x - (isPointer ? 32 : 18)}px, ${position.y - (isPointer ? 32 : 18)}px, 0)`,
        }}
      />
    </>
  );
};

export default CustomCursor;
