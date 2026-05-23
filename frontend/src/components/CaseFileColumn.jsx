import React from 'react';

function CaseFileColumn({ problem, presetCases, isSubmitting, onSelectPreset }) {
  return (
    <section className="flex flex-col border-l-2 border-r-2 border-[#8B7355] px-4 py-2 bg-[#E8DFC8]/90 paper-texture justify-between min-h-[450px] shadow-sm relative">
      <div className="w-full text-center py-2 select-none">
        <span className="text-[10px] tracking-[0.25em] text-[#8B7355] font-mono block">════════════════</span>
        <h2 className="font-playfair text-[#8B7355] uppercase font-black text-sm tracking-[0.3em] mt-1">
          CASE FILE
        </h2>
        <span className="text-[10px] tracking-[0.25em] text-[#8B7355] font-mono block">════════════════</span>
      </div>

   
      <div className="flex-1 flex flex-col justify-center items-center py-4 my-2 px-2 border-t border-b border-[#8B7355]/30">
        <div className="w-full text-center">
          <span className="font-courier text-[10px] text-[#8B2020] tracking-wider uppercase block mb-2 select-none">
            📍 LITIGATION SUBJECT
          </span>
          <div className="font-elite text-sm md:text-base text-[#1A1208] leading-relaxed typewriter-smudge bg-[#F5F0E8]/50 p-4 border border-[#8B7355]/20 shadow-inner rounded-sm select-all">
            {problem ? `"${problem}"` : "NO ACTIVE CASE SUBMITTED. DEFENSES STAND IDLE."}
          </div>
        </div>
      </div>

  
      <div className="mt-auto pt-4 border-t border-dashed border-[#8B7355]/30 w-full select-none">
        <span className="font-courier text-[9px] text-[#8B7355] tracking-wider uppercase block text-center mb-3">
          📜 PRECEDENTS / DOCKETS
        </span>
        <div className="flex flex-col gap-2">
          {presetCases.map((pc, idx) => (
            <button
              key={idx}
              onClick={() => onSelectPreset(pc)}
              disabled={isSubmitting}
              className="w-full text-left text-xs bg-[#F5F0E8] hover:bg-[#8B2020]/10 border border-[#8B7355] px-3 py-2 font-mono text-[#1A1208] hover:text-[#8B2020] transition-all duration-200 shadow-xs cursor-pointer disabled:opacity-50 flex items-center justify-between"
            >
              <span className="truncate pr-2">⚖️ {pc.title}</span>
              <span className="text-[9px] text-[#8B7355] font-bold">SELECT</span>
            </button>
          ))}
        </div>
        <p className="text-[9px] font-mono text-[#8B7355] text-center mt-3 leading-none italic uppercase">
          HIGH COURT OF AI DOCKETS
        </p>
      </div>
    </section>
  );
}

export default CaseFileColumn;
