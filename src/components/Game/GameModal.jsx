import { RiCloseLine } from "@remixicon/react";
import HighCardGame from "./HighCardGame";

const GameModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9996] flex items-center justify-center bg-black/75 px-4 py-6 backdrop-blur-md">
      <div className="relative max-h-[92vh] w-full max-w-6xl overflow-y-auto rounded-lg border border-cyan-200/20 bg-[#05070d] p-3 shadow-2xl shadow-cyan-950/40">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 z-10 rounded-full border border-white/10 bg-white/10 p-2 text-white transition-colors hover:bg-white/20"
          aria-label="Close card game"
        >
          <RiCloseLine size={22} />
        </button>
        <HighCardGame />
      </div>
    </div>
  );
};

export default GameModal;
