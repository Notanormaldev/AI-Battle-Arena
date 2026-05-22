import React from 'react';

function JudgesBench({ verdictText, isSubmitting, showLedger, setShowLedger }) {
  return (
    <header className="bg-[#2C1F0F] relative pt-6 pb-6 px-8 border-b-4 border-[#4A2C17] shadow-[0_6px_20px_rgba(0,0,0,0.5)] z-20">
      {/* Engraved header with subtle metallic shimmer style */}
      <div className="text-center mb-4">
        <h1 className="font-playfair text-3xl tracking-[0.25em] text-[#8B7355] font-extrabold uppercase drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)] select-none">
          ═════ THE BENCH ═════
        </h1>
        <p className="font-courier text-xs tracking-wider text-[#8B7355] opacity-80 uppercase mt-1">
          High Court of Artificial Intelligence — Session Anno Domini 2026
        </p>
      </div>

      {/* The Verdict Box (double border) */}
      <div className="max-w-4xl mx-auto mt-2 min-h-[90px] flex items-center justify-center bg-[#1A1208] border-double-court px-6 py-4 rounded-xs shadow-inner">
        {verdictText ? (
          <p className="font-courier text-[#F5F0E8] text-center text-sm md:text-base typewriter-cursor typewriter-smudge leading-relaxed">
            {verdictText}
          </p>
        ) : (
          <p className="font-courier text-[#8B7355] opacity-60 text-center italic text-sm">
            {isSubmitting ? "• THE HONORABLE COURT IS DELIBERATING THE BRIEF •" : "• AWAITING PLEADINGS AND TESTIMONY •"}
          </p>
        )}
      </div>

      {/* Ledger Drawer Toggle on the right corner */}
      <button
        onClick={() => setShowLedger(!showLedger)}
        className="absolute right-4 top-1/2 -translate-y-1/2 font-courier text-[10px] md:text-xs uppercase bg-[#8B7355] hover:bg-[#8B2020] text-[#1A1208] hover:text-[#F5F0E8] px-3 py-1.5 font-bold tracking-wider transition-colors duration-200 shadow-md flex items-center gap-1.5 border border-[#4A2C17] select-none"
      >
        📜 Court Ledger {showLedger ? "▲" : "▼"}
      </button>
    </header>
  );
}

export default JudgesBench;
