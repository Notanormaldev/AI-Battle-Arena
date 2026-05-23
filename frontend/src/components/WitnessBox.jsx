import React from 'react';

function WitnessBox({ 
  boxNumber, 
  counselName, 
  text, 
  isSubmitting, 
  showScores, 
  score, 
  reasonText 
}) {
  return (
    <section className="flex flex-col border-4 border-[#4A2C17] shadow-lg rounded-xs overflow-hidden relative min-h-[450px]">
   
      <div className="brass-plate py-3 px-4 flex items-center justify-between shadow-md select-none">
        <span className="font-playfair font-extrabold tracking-widest text-[#F5F0E8] uppercase text-sm">
          ⚖️ WITNESS BOX {boxNumber === 1 ? 'I' : 'II'}
        </span>
        <span className="font-playfair text-[#1A1208] text-xs bg-[#F5F0E8] px-2 py-0.5 font-bold uppercase tracking-wider border border-[#4A2C17]">
          {counselName}
        </span>
      </div>

 
      <div className="flex-1 legal-pad-ruled legal-pad-margin p-6 pl-16 pr-8 text-[#1A1208] font-lora relative flex flex-col justify-between">
       
        <div className="text-base leading-[28px] typewriter-smudge">
          {isSubmitting && !text ? (
            <div className="italic text-stone-600 animate-pulse font-courier py-1 pl-2">
              [ {counselName} is preparing briefs... ]
            </div>
          ) : (
            <p className="whitespace-pre-line tracking-wide font-medium">{text}</p>
          )}
        </div>

        <div className="mt-8 pt-4 border-t border-dashed border-[#8B7355]/40 flex flex-col items-start gap-3 select-none">
          {showScores && score > 0 && (
            <div className="flex items-center gap-4 w-full">
            
              <div className="w-16 h-16 rounded-full bg-[#8B2020] text-[#F5F0E8] flex flex-col items-center justify-center shadow-md font-courier font-bold border-2 border-double border-[#F5F0E8] wax-seal-animate select-none">
                <span className="text-[10px] uppercase opacity-80 leading-none">VERDICT</span>
                <span className="text-base tracking-tighter mt-0.5">{score}</span>
              </div>

              <div className="flex-1">
                <span className="text-[10px] text-[#8B7355] block uppercase font-bold tracking-wider">JUDICIAL FINDING:</span>
                <p className="text-xs italic font-bold tracking-tight uppercase text-[#1A1208] font-courier">
                  "{reasonText}"
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default WitnessBox;
