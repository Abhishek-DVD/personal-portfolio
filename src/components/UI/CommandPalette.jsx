import { createElement } from "react";
import { useEffect, useMemo, useState } from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";

const actions = [
  { label: "Go to About", hint: "#About", href: "#About" },
  { label: "Go to Experience", hint: "#Experience", href: "#Experience" },
  { label: "Go to Coding Profile", hint: "#Coding", href: "#Coding" },
  { label: "Play High Card Duel", hint: "Modal", event: "open-card-game" },
  { label: "Go to Projects", hint: "#Projects", href: "#Projects" },
  { label: "Contact Me", hint: "Email", href: "#Contact", icon: MdOutlineEmail },
  { label: "Open GitHub", hint: "Profile", href: "https://github.com/Abhishek-DVD", icon: FaGithub },
  { label: "Open LinkedIn", hint: "Profile", href: "https://www.linkedin.com/in/abhishek-dwivedi-b18242221", icon: FaLinkedin },
];

const CommandPalette = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");

  const filteredActions = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term) return actions;
    return actions.filter((action) => `${action.label} ${action.hint}`.toLowerCase().includes(term));
  }, [query]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setIsOpen((value) => !value);
      }

      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleAction = (action) => {
    setIsOpen(false);
    setQuery("");

    if (action.event) {
      window.dispatchEvent(new Event(action.event));
      return;
    }

    if (action.href.startsWith("#")) {
      document.querySelector(action.href)?.scrollIntoView({ behavior: "smooth" });
      return;
    }

    window.open(action.href, "_blank", "noopener,noreferrer");
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="fixed bottom-5 right-5 z-50 hidden rounded-full border border-white/10 bg-zinc-950/70 px-4 py-2 text-sm font-semibold text-white shadow-2xl shadow-cyan-950/40 backdrop-blur md:block"
      >
        Ctrl K
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-[9997] flex items-start justify-center bg-black/60 px-4 pt-24 backdrop-blur-sm">
          <div className="w-full max-w-xl overflow-hidden rounded-lg border border-white/10 bg-[#0b1020] shadow-2xl shadow-cyan-950/40">
            <div className="border-b border-white/10 p-4">
              <input
                autoFocus
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search sections, profiles, contact..."
                className="w-full bg-transparent text-base text-white outline-none placeholder:text-gray-500"
              />
            </div>
            <div className="max-h-80 overflow-y-auto p-2">
              {filteredActions.map((action) => {
                return (
                  <button
                    key={action.label}
                    type="button"
                    onClick={() => handleAction(action)}
                    className="flex w-full items-center justify-between rounded-md px-3 py-3 text-left text-white transition-colors hover:bg-white/10"
                  >
                    <span className="flex items-center gap-3">
                      {action.icon && createElement(action.icon, { className: "text-cyan-300", size: 18 })}
                      <span>{action.label}</span>
                    </span>
                    <span className="text-xs text-gray-400">{action.hint}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CommandPalette;
