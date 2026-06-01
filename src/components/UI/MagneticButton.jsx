import { useRef } from "react";

const MagneticButton = ({ children, className = "", href, onClick, type = "button" }) => {
  const buttonRef = useRef(null);

  const handleMouseMove = (event) => {
    const element = buttonRef.current;
    if (!element) return;

    const rect = element.getBoundingClientRect();
    const x = event.clientX - rect.left - rect.width / 2;
    const y = event.clientY - rect.top - rect.height / 2;

    element.style.transform = `translate(${x * 0.18}px, ${y * 0.24}px) scale(1.04)`;
  };

  const handleMouseLeave = () => {
    const element = buttonRef.current;
    if (!element) return;
    element.style.transform = "translate(0, 0) scale(1)";
  };

  const sharedClasses = `magnetic-button inline-flex items-center justify-center gap-2 rounded-full bg-[#465697] px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-indigo-950/40 transition-[transform,opacity,box-shadow] duration-300 hover:opacity-90 hover:shadow-indigo-500/30 md:px-5 md:py-2.5 md:text-lg ${className}`;

  if (href) {
    return (
      <a
        ref={buttonRef}
        href={href}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={sharedClasses}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      ref={buttonRef}
      type={type}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={sharedClasses}
    >
      {children}
    </button>
  );
};

export default MagneticButton;
