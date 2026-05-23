import React from 'react';

function CourtLedger({ showLedger }) {
  if (!showLedger) return null;

  return (
    <div className="bg-[#E8DFC8] border-b-4 border-[#8B7355] px-6 py-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 z-30 shadow-lg font-courier text-xs text-[#1A1208] border-t border-[#4A2C17] relative">
      <div className="space-y-2 w-full md:w-2/3">
        <h4 className="font-playfair text-[#8B2020] uppercase font-bold text-sm tracking-wider">COURT CLERK'S RECORD</h4>
        <p className="font-crimson text-sm text-[#2C1F0F]">
       This courtroom is powered by a multi-agent 
LangGraph network hosted on Render.
        </p>
      </div>

      <div className="w-full md:w-1/3 flex flex-col gap-1 border-l border-[#8B7355]/40 pl-4 font-mono text-[10px] text-[#2C1F0F]">
        <span className="font-bold text-[#8B2020] uppercase">COURT CONSTITUENTS:</span>
        <div>• WITNESS BOX I: Mistral AI (Defense)</div>
        <div>• WITNESS BOX II: Cohere AI (Prosecution)</div>
        <div>• THE BENCH: Google Gemini AI (Presiding Judge)</div>
      </div>
    </div>
  );
}

export default CourtLedger;
