const SectionDivider = () => {
  return (
    <div className="relative mx-auto h-16 w-full overflow-hidden">
      <div className="absolute left-1/2 top-1/2 h-px w-4/5 -translate-x-1/2 bg-gradient-to-r from-transparent via-cyan-300/40 to-transparent" />
      <div className="absolute left-1/2 top-1/2 h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-300/20 bg-[#171d32]" />
    </div>
  );
};

export default SectionDivider;
