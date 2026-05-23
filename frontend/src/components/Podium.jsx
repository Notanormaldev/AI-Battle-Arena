import React from 'react';

function Podium({ problem, setProblem, isSubmitting, onSubmit, gavelStrike }) {
  return (
    <footer className="bg-[#2C1F0F] border-t-4 border-[#4A2C17] py-5 px-6 shadow-[0_-6px_20px_rgba(0,0,0,0.5)] z-20">
      <form
        onSubmit={onSubmit}
        className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center gap-4"
      >
    
        <div className="flex items-center gap-3 select-none">
          <svg
            className={`w-10 h-10 text-[#8B7355] ${gavelStrike ? "strike-gavel" : ""}`}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M14.5 2L22 9.5M11.5 5L19 12.5M2 22l6.5-6.5M7 10l5 5M12 5l-7 7M22 22l-4-4" />
          </svg>
          <div className="hidden md:block font-playfair text-[#8B7355] text-xs font-bold uppercase tracking-wider leading-none">
            THE<br />PODIUM
          </div>
        </div>

    
        <div className="flex-1 w-full">
          <input
            type="text"
            required
            disabled={isSubmitting}
            placeholder="State your litigation case here..."
            value={problem}
            onChange={(e) => setProblem(e.target.value)}
            className="w-full bg-[#F5F0E8] border-b-2 border-[#8B7355] focus:border-[#8B2020] px-4 py-3 text-sm md:text-base font-courier text-[#1A1208] placeholder-[#1A1208]/50 focus:outline-none rounded-none transition-colors duration-200 shadow-inner"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting || !problem.trim()}
          className="w-full sm:w-auto bg-[#F5F0E8] hover:bg-[#8B2020] border-2 border-[#1A1208] hover:border-[#F5F0E8] px-6 py-3 font-courier text-[#1A1208] hover:text-[#F5F0E8] text-sm font-bold uppercase tracking-widest transition-all duration-200 shadow-md cursor-pointer disabled:opacity-50 select-none"
        >
          {isSubmitting ? "LITIGATING..." : "SUBMIT BRIEF"}
        </button>
      </form>
    </footer>
  );
}

export default Podium;
