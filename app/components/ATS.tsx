import React from 'react'
import { Target, CheckCircle2, AlertCircle } from 'lucide-react'

interface Suggestion {
  type: "good" | "improve";
  tip: string;
}

interface ATSProps {
  score: number;
  suggestions: Suggestion[];
}

const ATS: React.FC<ATSProps> = ({ score, suggestions }) => {
  // Determine border/glow based on score
  const scoreStyle = score > 69
    ? 'border-emerald-500/20 bg-emerald-500/5 shadow-[0_0_30px_rgba(16,185,129,0.05)]'
    : score > 49
      ? 'border-amber-500/20 bg-amber-500/5 shadow-[0_0_30px_rgba(245,158,11,0.05)]'
      : 'border-rose-500/20 bg-rose-500/5 shadow-[0_0_30px_rgba(244,63,94,0.05)]';

  // Determine subtitle based on score
  const subtitle = score > 69
    ? 'Excellent ATS Compatibility'
    : score > 49
      ? 'Moderate ATS Compatibility'
      : 'Needs ATS Optimization';

  return (
    <div className={`rounded-3xl w-full p-8 border ${scoreStyle} relative overflow-hidden group`}>
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      {/* Top section with icon and headline */}
      <div className="flex items-center gap-4 mb-8 relative z-10">
        <div className="w-14 h-14 rounded-2xl bg-[#0a0a0a] border border-white/10 flex items-center justify-center shadow-lg">
          <Target className={`w-7 h-7 ${score > 69 ? 'text-emerald-400' : score > 49 ? 'text-amber-400' : 'text-rose-400'}`} />
        </div>
        <div>
          <h2 className="text-3xl font-bold text-white tracking-tight">ATS Match: <span className={score > 69 ? 'text-emerald-400' : score > 49 ? 'text-amber-400' : 'text-rose-400'}>{score}%</span></h2>
        </div>
      </div>

      {/* Description section */}
      <div className="mb-8 relative z-10">
        <h3 className="text-xl font-semibold text-gray-200 mb-3">{subtitle}</h3>
        <p className="text-gray-400 mb-6 leading-relaxed">
          This score represents how well your resume is likely to perform in Applicant Tracking Systems used by modern employers.
        </p>

        {/* Suggestions list */}
        <div className="space-y-4 bg-[#0a0a0a]/50 p-6 rounded-2xl border border-white/5">
          {suggestions.map((suggestion, index) => (
            <div key={index} className="flex items-start gap-4">
              <div className="mt-0.5">
                {suggestion.type === "good" ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                ) : (
                  <AlertCircle className="w-5 h-5 text-amber-400" />
                )}
              </div>
              <p className={suggestion.type === "good" ? "text-gray-300" : "text-gray-300"}>
                {suggestion.tip}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Closing encouragement */}
      <p className="text-gray-500 text-sm italic relative z-10">
        Keep refining your resume to improve your chances of getting past ATS filters and into the hands of recruiters.
      </p>
    </div>
  )
}

export default ATS
