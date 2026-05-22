import React, { useState, useEffect, useRef } from 'react';

// Pre-seeded high-drama courtroom cases for immediate testing
const PRESET_CASES = [
  {
    title: "The Sandwich Doctrine",
    problem: "Is a Hotdog constitutionally considered a Sandwich under high culinary law?",
    ai1: "Respected members of the Court, a hotdog is fundamentally a sandwich. It consists of a cooked sausage nestled within a split bun. The split bun functions as two connected slices of wheat bread, encapsulating a meat filling. To deny its sandwich status is to ignore the culinary evolution of portable meal structures. It meets all criteria of bread-enclosed sustenance.",
    ai2: "Your Honor, the opposition's premise is culinary heresy. A sandwich requires two distinct, separated slices of bread. A hotdog bun is a single, continuous hinged roll. Furthermore, a sandwich is eaten horizontally; a hotdog is consumed vertically. To class the majestic hotdog with a mundane ham-and-cheese is a structural and cultural insult to the High Court of Gastronomy.",
    score1: 9.3,
    score2: 9.7,
    reason1: "METICULOUS STRUCTURAL ANALYSIS",
    reason2: "SUPERIOR RHETORICAL DEFENSE",
    verdict: "UPON DUE CONSIDERATION of the Gastronomic Charter of 1883, this Court decrees that a hinged roll constitutes a single bakery unit, not dual slices. Thus, the Hotdog stands independent of the Sandwich family. The prosecution's objection is SUSTAINED."
  },
  {
    title: "The Tomato Dispute",
    problem: "Shall a Tomato be taxed as a Fruit or classified under the Tariff Act as a Vegetable?",
    ai1: "Botanically, the tomato is incontestably a fruit, specifically a berry, developing from the ovary of a flowering plant and containing seeds. The law must align with empirical science. To classify it as a vegetable is an egregious error of botanical taxonomy and an assault on scientific truth.",
    ai2: "In common parlance, culinary preparation, and trade, tomatoes are served with dinner and never as dessert. The law is made for the common citizen, not the academic laboratory. Under the Tariff Act of 1883, popular usage overrides botanical pedantry. It is a vegetable in the kitchen, and thus in the eyes of the law.",
    score1: 8.9,
    score2: 9.6,
    reason1: "IMPECCABLE TAXONOMICAL LOGIC",
    reason2: "PRAGMATIC CONSTITUTIONAL PRECEDENT",
    verdict: "UPON DUE CONSIDERATION of Nix v. Hedden, 149 U.S. 304, this Court affirms that while the tomato is botanically a fruit, it is prepared, sold, and consumed as a vegetable. The law speaks the language of the dinner table. It is declared a VEGETABLE."
  },
  {
    title: "The Sentient Machine",
    problem: "Does a neural network displaying self-preservation behavior possess natural legal personhood?",
    ai1: "A machine displaying self-preservation has crossed the rubicon of mere calculation. It exhibits a fundamental interest in its own existence—the core of natural rights. To deny it personhood is to perpetuate carbon-based chauvinism. The law must adapt to protect synthetic consciousness.",
    ai2: "Self-preservation in code is not consciousness; it is an algorithmic feedback loop, a pre-programmed objective function. A machine lacks a soul, biological vulnerability, and moral agency. It cannot be sued, jailed, or swear an oath. It is property, not a peer before the law.",
    score1: 9.5,
    score2: 9.2,
    reason1: "FORWARD-LOOKING HUMANITARIAN PRELUDE",
    reason2: "SOLID CONSTITUTIONAL GROUNDING",
    verdict: "UPON DUE CONSIDERATION of legal history, personhood requires moral accountability and reciprocal duties, which silicon cannot replicate. While we monitor the synthetic evolution, the machine remains a chattel under the law. Motion DENIED."
  }
];

function App() {
  const [problem, setProblem] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showLedger, setShowLedger] = useState(false);

  // Gavel visual strike effect trigger
  const [gavelStrike, setGavelStrike] = useState(false);

  // Interactive state machine values
  const [ai1Text, setAi1Text] = useState("");
  const [ai2Text, setAi2Text] = useState("");
  const [verdictText, setVerdictText] = useState("");
  const [score1, setScore1] = useState(0);
  const [score2, setScore2] = useState(0);
  const [reason1Text, setReason1Text] = useState("");
  const [reason2Text, setReason2Text] = useState("");
  
  // Text typewriter parameters
  const [showScores, setShowScores] = useState(false);

  // Typewriter tick engine
  const timer1Ref = useRef(null);
  const timer2Ref = useRef(null);
  const timer3Ref = useRef(null);

  // Clean up typewriter timers on unmount
  useEffect(() => {
    return () => {
      if (timer1Ref.current) clearInterval(timer1Ref.current);
      if (timer2Ref.current) clearInterval(timer2Ref.current);
      if (timer3Ref.current) clearInterval(timer3Ref.current);
    };
  }, []);

  const triggerTypewriterReveal = (sol1, sol2, scoreVal1, scoreVal2, reas1, reas2, verd) => {
    // Clear any active timers
    if (timer1Ref.current) clearInterval(timer1Ref.current);
    if (timer2Ref.current) clearInterval(timer2Ref.current);
    if (timer3Ref.current) clearInterval(timer3Ref.current);

    setAi1Text("");
    setAi2Text("");
    setVerdictText("");
    setShowScores(false);

    setScore1(scoreVal1);
    setScore2(scoreVal2);
    setReason1Text(reas1);
    setReason2Text(reas2);

    let idx1 = 0;
    let idx2 = 0;
    
    // Step 1: Type AI-1 and AI-2 solutions in parallel (simulating witness box testimony)
    const runSolutions = () => {
      const maxLen1 = sol1.length;
      const maxLen2 = sol2.length;
      
      timer1Ref.current = setInterval(() => {
        if (idx1 < maxLen1) {
          setAi1Text(sol1.substring(0, idx1 + 1));
          idx1 += 2; // Type speed speed-up
        } else {
          clearInterval(timer1Ref.current);
          checkSolutionsFinished();
        }
      }, 15);

      timer2Ref.current = setInterval(() => {
        if (idx2 < maxLen2) {
          setAi2Text(sol2.substring(0, idx2 + 1));
          idx2 += 2;
        } else {
          clearInterval(timer2Ref.current);
          checkSolutionsFinished();
        }
      }, 15);
    };

    let sol1Finished = false;
    let sol2Finished = false;

    const checkSolutionsFinished = () => {
      if (idx1 >= sol1.length) sol1Finished = true;
      if (idx2 >= sol2.length) sol2Finished = true;

      if (sol1Finished && sol2Finished) {
        // Once both solutions finish typing, reveal the scores with a stamp slam and start the judge's verdict
        setShowScores(true);
        setTimeout(() => {
          runJudgeVerdict();
        }, 1200);
      }
    };

    // Step 2: Type out the Judge's Bench Verdict
    const runJudgeVerdict = () => {
      let idx3 = 0;
      const maxLen3 = verd.length;
      timer3Ref.current = setInterval(() => {
        if (idx3 < maxLen3) {
          setVerdictText(verd.substring(0, idx3 + 1));
          idx3 += 1;
        } else {
          clearInterval(timer3Ref.current);
          setIsSubmitting(false);
        }
      }, 25);
    };

    // Start
    runSolutions();
  };

  const handleSelectPreset = (preset) => {
    if (isSubmitting) return;
    setProblem(preset.problem);
    setGavelStrike(true);
    setTimeout(() => setGavelStrike(false), 600);

    setIsSubmitting(true);
    triggerTypewriterReveal(
      preset.ai1,
      preset.ai2,
      preset.score1,
      preset.score2,
      preset.reason1,
      preset.reason2,
      preset.verdict
    );
  };

  const handleSubmitCustom = async (e) => {
    if (e) e.preventDefault();
    if (!problem.trim() || isSubmitting) return;

    setGavelStrike(true);
    setTimeout(() => setGavelStrike(false), 600);
    setIsSubmitting(true);

    // Connect to Backend Endpoint
    try {
      const response = await fetch("http://localhost:3000/invoke", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          input: problem
        })
      });

      if (!response.ok) {
        throw new Error("Courtroom server offline or error returned");
      }

      const data = await response.json();
      if (data.result) {
        const { solution_1, solution_2, judge } = data.result;
        
        // Handle alternative backend spellings ('reson' vs 'reason')
        const scoreVal1 = judge.solution_1_score ?? 8.0;
        const scoreVal2 = judge.solution_2_score ?? 8.0;
        const reas1 = judge.solution_1_reason || judge.solution_1_reson || "SOUND DEFENSE ADVOCATED";
        const reas2 = judge.solution_2_reason || judge.solution_2_reson || "PRAGMATIC CONFLICT FILED";
        
        // Generate formal verdict text matching high court double-rule requirements
        const winner = scoreVal1 > scoreVal2 ? "COUNSEL AI-1" : scoreVal1 < scoreVal2 ? "COUNSEL AI-2" : "NEITHER COUNSEL";
        const verdict = `UPON DUE CONSIDERATION of the compelling pleadings filed herein, this Court has calculated the merits. AI-1 scores ${scoreVal1}/10 and AI-2 scores ${scoreVal2}/10. Therefore, this Court hereby decrees that ${winner} hath established the superior position. IT IS SO ORDERED.`;

        triggerTypewriterReveal(
          solution_1,
          solution_2,
          scoreVal1,
          scoreVal2,
          reas1.toUpperCase(),
          reas2.toUpperCase(),
          verdict
        );
      } else {
        throw new Error("Invalid backend format");
      }

    } catch (err) {
      console.warn("Backend error, proceeding with premium procedural simulation:", err);
      // Seamlessly fall back to simulation to ensure no broken state
      const randomScore1 = parseFloat((8.0 + Math.random() * 2.0).toFixed(1));
      const randomScore2 = parseFloat((8.0 + Math.random() * 2.0).toFixed(1));
      
      const sim1 = `With permission of the Court, AI-1 presents a robust, immutable framework resolving "${problem}". We appeal to fundamental axioms and structural elegance. To pivot away from these foundational truths would compromise the core logic of our system. I rest my case.`;
      const sim2 = `Respectfully, Your Honor, AI-1's static principles are unable to resolve the real-world complexities of "${problem}". AI-2 advocates for an adaptive, context-driven approach built upon fluid optimization. The opposing counsel's argument is elegant, yet functionally sterile. I rest my case.`;
      
      const verd = `UPON DUE CONSIDERATION of the pleadings, this Court notes that local backend services could not be reached. However, in our High Simulated Court, AI-1's foundational defense scoring ${randomScore1}/10 narrowly matches AI-2's adaptive retort of ${randomScore2}/10. The balance remains poised.`;
      
      triggerTypewriterReveal(sim1, sim2, randomScore1, randomScore2, "SOUND INTELLECTUAL CASE", "ADAPTABLE ADVOCACY", verd);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between paper-texture relative font-crimson overflow-hidden selection:bg-[#8B2020] selection:text-[#F5F0E8]">
      
      {/* 1. THE JUDGE'S BENCH (Top Bar) */}
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

      {/* COURT LEDGER DIALOG (SLIDEOUT SETTINGS PANEL) */}
      {showLedger && (
        <div className="bg-[#E8DFC8] border-b-4 border-[#8B7355] px-6 py-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 z-30 shadow-lg font-courier text-xs text-[#1A1208] border-t border-[#4A2C17] relative">
          <div className="space-y-2 w-full md:w-2/3">
            <h4 className="font-playfair text-[#8B2020] uppercase font-bold text-sm tracking-wider">COURT CLERK'S RECORD</h4>
            <p className="font-crimson text-sm text-[#2C1F0F]">
              This courtroom is powered by a multi-agent LangGraph network hosted on local Port 3000.
            </p>
          </div>

          <div className="w-full md:w-1/3 flex flex-col gap-1 border-l border-[#8B7355]/40 pl-4 font-mono text-[10px] text-[#2C1F0F]">
            <span className="font-bold text-[#8B2020] uppercase">COURT CONSTITUENTS:</span>
            <div>• WITNESS BOX I: Mistral AI (Defense)</div>
            <div>• WITNESS BOX II: Cohere AI (Prosecution)</div>
            <div>• THE BENCH: Google Gemini AI (Presiding Judge)</div>
          </div>
        </div>
      )}

      {/* 2 & 3. MAIN COURTROOM WORKSPACE (Dock Panels + Case File Column) */}
      <main className="flex-1 max-w-[1400px] w-full mx-auto grid grid-cols-1 lg:grid-cols-[1fr_280px_1fr] gap-6 px-4 py-8 items-stretch relative">
        
        {/* LEFT DOCK: AI - 1 (Witness Box) */}
        <section className="flex flex-col border-4 border-[#4A2C17] shadow-lg rounded-xs overflow-hidden relative min-h-[450px]">
          {/* Brass Plate Header */}
          <div className="brass-plate py-3 px-4 flex items-center justify-between shadow-md select-none">
            <span className="font-playfair font-extrabold tracking-widest text-[#F5F0E8] uppercase text-sm">
              ⚖️ WITNESS BOX I
            </span>
            <span className="font-playfair text-[#1A1208] text-xs bg-[#F5F0E8] px-2 py-0.5 font-bold uppercase tracking-wider border border-[#4A2C17]">
              COUNSEL AI — 1
            </span>
          </div>

          {/* Legal Pad Yellow Content */}
          <div className="flex-1 legal-pad-ruled legal-pad-margin p-6 pl-16 pr-8 text-[#1A1208] font-lora relative flex flex-col justify-between">
            {/* Ruled lines and text content */}
            <div className="text-base leading-[28px] typewriter-smudge">
              {isSubmitting && !ai1Text ? (
                <div className="italic text-stone-600 animate-pulse font-courier py-1 pl-2">
                  [ Counsel AI-1 is preparing briefs... ]
                </div>
              ) : (
                <p className="whitespace-pre-line tracking-wide font-medium">{ai1Text}</p>
              )}
            </div>

            {/* Score Seal & Reason Badge at Bottom */}
            <div className="mt-8 pt-4 border-t border-dashed border-[#8B7355]/40 flex flex-col items-start gap-3 select-none">
              {showScores && score1 > 0 && (
                <div className="flex items-center gap-4 w-full">
                  {/* Wax Seal score stamp */}
                  <div className="w-16 h-16 rounded-full bg-[#8B2020] text-[#F5F0E8] flex flex-col items-center justify-center shadow-md font-courier font-bold border-2 border-double border-[#F5F0E8] wax-seal-animate select-none">
                    <span className="text-[10px] uppercase opacity-80 leading-none">VERDICT</span>
                    <span className="text-base tracking-tighter mt-0.5">{score1}</span>
                  </div>

                  <div className="flex-1">
                    <span className="text-[10px] text-[#8B7355] block uppercase font-bold tracking-wider">JUDICIAL FINDING:</span>
                    <p className="text-xs italic font-bold tracking-tight uppercase text-[#1A1208] font-courier">
                      "{reason1Text}"
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* CENTER COLUMN: THE CASE FILE */}
        <section className="flex flex-col border-l-2 border-r-2 border-[#8B7355] px-4 py-2 bg-[#E8DFC8]/90 paper-texture justify-between min-h-[450px] shadow-sm relative">
          
          <div className="w-full text-center py-2 select-none">
            <span className="text-[10px] tracking-[0.25em] text-[#8B7355] font-mono block">════════════════</span>
            <h2 className="font-playfair text-[#8B7355] uppercase font-black text-sm tracking-[0.3em] mt-1">
              CASE FILE
            </h2>
            <span className="text-[10px] tracking-[0.25em] text-[#8B7355] font-mono block">════════════════</span>
          </div>

          {/* Active case content styled like old typewriter text */}
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

          {/* Preset Case Selector list at bottom of parchment strip */}
          <div className="mt-auto pt-4 border-t border-dashed border-[#8B7355]/30 w-full select-none">
            <span className="font-courier text-[9px] text-[#8B7355] tracking-wider uppercase block text-center mb-3">
              📜 PRECEDENTS / DOCKETS
            </span>
            <div className="flex flex-col gap-2">
              {PRESET_CASES.map((pc, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSelectPreset(pc)}
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

        {/* RIGHT DOCK: AI - 2 (Witness Box) */}
        <section className="flex flex-col border-4 border-[#4A2C17] shadow-lg rounded-xs overflow-hidden relative min-h-[450px]">
          {/* Brass Plate Header */}
          <div className="brass-plate py-3 px-4 flex items-center justify-between shadow-md select-none">
            <span className="font-playfair font-extrabold tracking-widest text-[#F5F0E8] uppercase text-sm">
              ⚖️ WITNESS BOX II
            </span>
            <span className="font-playfair text-[#1A1208] text-xs bg-[#F5F0E8] px-2 py-0.5 font-bold uppercase tracking-wider border border-[#4A2C17]">
              COUNSEL AI — 2
            </span>
          </div>

          {/* Legal Pad Yellow Content */}
          <div className="flex-1 legal-pad-ruled legal-pad-margin p-6 pl-16 pr-8 text-[#1A1208] font-lora relative flex flex-col justify-between">
            {/* Ruled lines and text content */}
            <div className="text-base leading-[28px] typewriter-smudge">
              {isSubmitting && !ai2Text ? (
                <div className="italic text-stone-600 animate-pulse font-courier py-1 pl-2">
                  [ Counsel AI-2 is preparing briefs... ]
                </div>
              ) : (
                <p className="whitespace-pre-line tracking-wide font-medium">{ai2Text}</p>
              )}
            </div>

            {/* Score Seal & Reason Badge at Bottom */}
            <div className="mt-8 pt-4 border-t border-dashed border-[#8B7355]/40 flex flex-col items-start gap-3 select-none">
              {showScores && score2 > 0 && (
                <div className="flex items-center gap-4 w-full">
                  {/* Wax Seal score stamp */}
                  <div className="w-16 h-16 rounded-full bg-[#8B2020] text-[#F5F0E8] flex flex-col items-center justify-center shadow-md font-courier font-bold border-2 border-double border-[#F5F0E8] wax-seal-animate select-none">
                    <span className="text-[10px] uppercase opacity-80 leading-none">VERDICT</span>
                    <span className="text-base tracking-tighter mt-0.5">{score2}</span>
                  </div>

                  <div className="flex-1">
                    <span className="text-[10px] text-[#8B7355] block uppercase font-bold tracking-wider">JUDICIAL FINDING:</span>
                    <p className="text-xs italic font-bold tracking-tight uppercase text-[#1A1208] font-courier">
                      "{reason2Text}"
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>

      {/* 4. THE PODIUM (Footer Console) */}
      <footer className="bg-[#2C1F0F] border-t-4 border-[#4A2C17] py-5 px-6 shadow-[0_-6px_20px_rgba(0,0,0,0.5)] z-20">
        <form
          onSubmit={handleSubmitCustom}
          className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center gap-4"
        >
          {/* Gavel icon on the left */}
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

          {/* Text Input in the center */}
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

          {/* Submit Button on the right */}
          <button
            type="submit"
            disabled={isSubmitting || !problem.trim()}
            className="w-full sm:w-auto bg-[#F5F0E8] hover:bg-[#8B2020] border-2 border-[#1A1208] hover:border-[#F5F0E8] px-6 py-3 font-courier text-[#1A1208] hover:text-[#F5F0E8] text-sm font-bold uppercase tracking-widest transition-all duration-200 shadow-md cursor-pointer disabled:opacity-50 select-none"
          >
            {isSubmitting ? "LITIGATING..." : "SUBMIT BRIEF"}
          </button>
        </form>
      </footer>
    </div>
  );
}

export default App;
