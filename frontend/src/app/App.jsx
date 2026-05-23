import React, { useState, useEffect, useRef } from 'react';
import LocomotiveScroll from 'locomotive-scroll';


import { PRESET_CASES } from '../constants/presets';


import JudgesBench from '../components/JudgesBench';
import CourtLedger from '../components/CourtLedger';
import WitnessBox from '../components/WitnessBox';
import CaseFileColumn from '../components/CaseFileColumn';
import Podium from '../components/Podium';

function App() {
  const [problem, setProblem] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showLedger, setShowLedger] = useState(false);

 
  const [gavelStrike, setGavelStrike] = useState(false);

 
  const [ai1Text, setAi1Text] = useState("");
  const [ai2Text, setAi2Text] = useState("");
  const [verdictText, setVerdictText] = useState("");
  const [score1, setScore1] = useState(0);
  const [score2, setScore2] = useState(0);
  const [reason1Text, setReason1Text] = useState("");
  const [reason2Text, setReason2Text] = useState("");
  

  const [showScores, setShowScores] = useState(false);

  
  const [dockets, setDockets] = useState(PRESET_CASES);

  
  const timer1Ref = useRef(null);
  const timer2Ref = useRef(null);
  const timer3Ref = useRef(null);


  useEffect(() => {
    let scroll;
    try {
      scroll = new LocomotiveScroll();
    } catch (err) {
      console.warn("Locomotive Scroll could not be initialized:", err);
    }

   
    const rawState = localStorage.getItem('ai-battle-arena-state');
    if (rawState) {
      try {
        const parsed = JSON.parse(rawState);
        if (parsed.latestCase) {
          const { problem, ai1, ai2, verdict, score1, score2, reason1, reason2 } = parsed.latestCase;
          setProblem(problem || "");
          setAi1Text(ai1 || "");
          setAi2Text(ai2 || "");
          setVerdictText(verdict || "");
          setScore1(score1 || 0);
          setScore2(score2 || 0);
          setReason1Text(reason1 || "");
          setReason2Text(reason2 || "");
          if (score1 > 0 || score2 > 0) {
            setShowScores(true);
          }
        }
        if (parsed.history && Array.isArray(parsed.history) && parsed.history.length > 0) {
          setDockets(parsed.history);
        }
      } catch (err) {
        console.warn("Failed to restore state from localStorage:", err);
      }
    }
    
    return () => {
      if (scroll) scroll.destroy();
      if (timer1Ref.current) clearInterval(timer1Ref.current);
      if (timer2Ref.current) clearInterval(timer2Ref.current);
      if (timer3Ref.current) clearInterval(timer3Ref.current);
    };
  }, []);


  const persistLitigationState = (probText, sol1, sol2, scoreVal1, scoreVal2, reas1, reas2, verd, shouldAppendHistory = false) => {
    let currentHistory = [];
    const rawState = localStorage.getItem('ai-battle-arena-state');
    if (rawState) {
      try {
        const parsed = JSON.parse(rawState);
        if (parsed.history && Array.isArray(parsed.history)) {
          currentHistory = parsed.history;
        }
      } catch (err) {
        console.warn("Error reading history from localStorage:", err);
      }
    }

    const newCase = {
      problem: probText,
      ai1: sol1,
      ai2: sol2,
      verdict: verd,
      score1: scoreVal1,
      score2: scoreVal2,
      reason1: reas1,
      reason2: reas2,
      timestamp: Date.now()
    };

    let updatedHistory = currentHistory;
    if (shouldAppendHistory) {
      const dynamicTitle = probText.length > 25 ? probText.substring(0, 22) + "..." : probText;
      const historyItem = {
        title: `⚖️ ${dynamicTitle}`,
        problem: probText,
        ai1: sol1,
        ai2: sol2,
        score1: scoreVal1,
        score2: scoreVal2,
        reason1: reas1,
        reason2: reas2,
        verdict: verd
      };
      
      
      updatedHistory = [...currentHistory, historyItem].slice(-3);
      setDockets(updatedHistory);
    }

    const newState = {
      latestCase: newCase,
      history: updatedHistory
    };

    localStorage.setItem('ai-battle-arena-state', JSON.stringify(newState));
  };

  const triggerTypewriterReveal = (sol1, sol2, scoreVal1, scoreVal2, reas1, reas2, verd) => {
   
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
   
    const runSolutions = () => {
      const maxLen1 = sol1.length;
      const maxLen2 = sol2.length;
      
      timer1Ref.current = setInterval(() => {
        if (idx1 < maxLen1) {
          setAi1Text(sol1.substring(0, idx1 + 1));
          idx1 += 2; 
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
        
        setShowScores(true);
        setTimeout(() => {
          runJudgeVerdict();
        }, 1200);
      }
    };


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

  
    persistLitigationState(
      preset.problem,
      preset.ai1,
      preset.ai2,
      preset.score1,
      preset.score2,
      preset.reason1,
      preset.reason2,
      preset.verdict,
      false
    );
  };

  const handleSubmitCustom = async (e) => {
    if (e) e.preventDefault();
    if (!problem.trim() || isSubmitting) return;

    setGavelStrike(true);
    setTimeout(() => setGavelStrike(false), 600);
    setIsSubmitting(true);

    const activeProblem = problem;


    try {
      const response = await fetch("https://ai-battle-arena-ds7b.onrender.com/invoke", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          input: activeProblem
        })
      });

      if (!response.ok) {
        throw new Error("Courtroom server offline or error returned");
      }

      const data = await response.json();
      if (data.result) {
        const { solution_1, solution_2, judge } = data.result;
        
      
        const scoreVal1 = judge.solution_1_score ?? 8.0;
        const scoreVal2 = judge.solution_2_score ?? 8.0;
        const reas1 = judge.solution_1_reason || judge.solution_1_reson || "SOUND DEFENSE ADVOCATED";
        const reas2 = judge.solution_2_reason || judge.solution_2_reson || "PRAGMATIC CONFLICT FILED";
        
        
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

        persistLitigationState(
          activeProblem,
          solution_1,
          solution_2,
          scoreVal1,
          scoreVal2,
          reas1.toUpperCase(),
          reas2.toUpperCase(),
          verdict,
          true
        );
      } else {
        throw new Error("Invalid backend format");
      }

    } catch (err) {
      console.warn("Backend error, proceeding with premium procedural simulation:", err);
      
      const randomScore1 = parseFloat((8.0 + Math.random() * 2.0).toFixed(1));
      const randomScore2 = parseFloat((8.0 + Math.random() * 2.0).toFixed(1));
      
      const sim1 = `With permission of the Court, AI-1 presents a robust, immutable framework resolving "${activeProblem}". We appeal to fundamental axioms and structural elegance. To pivot away from these foundational truths would compromise the core logic of our system. I rest my case.`;
      const sim2 = `Respectfully, Your Honor, AI-1's static principles are unable to resolve the real-world complexities of "${activeProblem}". AI-2 advocates for an adaptive, context-driven approach built upon fluid optimization. The opposing counsel's argument is elegant, yet functionally sterile. I rest my case.`;
      
      const verd = `UPON DUE CONSIDERATION of the pleadings, this Court notes that local backend services could not be reached. However, in our High Simulated Court, AI-1's foundational defense scoring ${randomScore1}/10 narrowly matches AI-2's adaptive retort of ${randomScore2}/10. The balance remains poised.`;
      
      triggerTypewriterReveal(sim1, sim2, randomScore1, randomScore2, "SOUND INTELLECTUAL CASE", "ADAPTABLE ADVOCACY", verd);

      persistLitigationState(
        activeProblem,
        sim1,
        sim2,
        randomScore1,
        randomScore2,
        "SOUND INTELLECTUAL CASE",
        "ADAPTABLE ADVOCACY",
        verd,
        true
      );
    }
  };

  return (
    <div 
      data-scroll-container
      className="min-h-screen flex flex-col justify-between paper-texture relative font-crimson overflow-hidden selection:bg-[#8B2020] selection:text-[#F5F0E8]"
    >
      <JudgesBench 
        verdictText={verdictText}
        isSubmitting={isSubmitting}
        showLedger={showLedger}
        setShowLedger={setShowLedger}
      />

      <CourtLedger showLedger={showLedger} />

      <main className="flex-1 max-w-[1400px] w-full mx-auto grid grid-cols-1 lg:grid-cols-[1fr_280px_1fr] gap-6 px-4 py-8 items-stretch relative">
        <WitnessBox 
          boxNumber={1}
          counselName="COUNSEL AI — 1"
          text={ai1Text}
          isSubmitting={isSubmitting}
          showScores={showScores}
          score={score1}
          reasonText={reason1Text}
        />

        <CaseFileColumn 
          problem={problem}
          presetCases={dockets}
          isSubmitting={isSubmitting}
          onSelectPreset={handleSelectPreset}
        />

        <WitnessBox 
          boxNumber={2}
          counselName="COUNSEL AI — 2"
          text={ai2Text}
          isSubmitting={isSubmitting}
          showScores={showScores}
          score={score2}
          reasonText={reason2Text}
        />
      </main>

      <Podium 
        problem={problem}
        setProblem={setProblem}
        isSubmitting={isSubmitting}
        onSubmit={handleSubmitCustom}
        gavelStrike={gavelStrike}
      />
    </div>
  );
}

export default App;
