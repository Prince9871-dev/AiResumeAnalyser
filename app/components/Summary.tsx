import ScoreGauge from "~/components/ScoreGauge";
import ScoreBadge from "~/components/ScoreBadge";
import { Zap } from "lucide-react";

const Category = ({ title, score }: { title: string, score: number }) => {
    const textColor = score > 70 ? 'text-emerald-400'
            : score > 49
        ? 'text-amber-400' : 'text-rose-400';

    return (
        <div className="resume-summary px-6 py-2">
            <div className="category">
                <div className="flex flex-row gap-3 items-center">
                    <p className="text-lg font-medium text-gray-200">{title}</p>
                    <ScoreBadge score={score} />
                </div>
                <p className="text-xl font-bold font-mono">
                    <span className={textColor}>{score}</span><span className="text-gray-600">/100</span>
                </p>
            </div>
        </div>
    )
}

const Summary = ({ feedback }: { feedback: Feedback }) => {
    return (
        <div className="bg-[#0a0a0a] border border-white/10 rounded-3xl shadow-xl w-full overflow-hidden relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            <div className="flex flex-col sm:flex-row items-center p-6 sm:p-8 gap-8 border-b border-white/5 relative z-10">
                <div className="relative">
                    <div className="absolute inset-0 bg-indigo-500/20 blur-xl rounded-full scale-110"></div>
                    <ScoreGauge score={feedback.overallScore} />
                </div>

                <div className="flex flex-col gap-3 text-center sm:text-left">
                    <div className="inline-flex items-center gap-2 justify-center sm:justify-start">
                        <Zap className="w-5 h-5 text-indigo-400" />
                        <h2 className="text-2xl font-bold text-white tracking-tight">Intelligence Score</h2>
                    </div>
                    <p className="text-base text-gray-400 max-w-sm">
                        Calculated using advanced ATS algorithms across multiple professional vectors.
                    </p>
                </div>
            </div>

            <div className="py-4 relative z-10 bg-white/[0.02]">
                <Category title="Tone & Style" score={feedback.toneAndStyle.score} />
                <Category title="Content" score={feedback.content.score} />
                <Category title="Structure" score={feedback.structure.score} />
                <Category title="Skills" score={feedback.skills.score} />
            </div>
        </div>
    )
}
export default Summary
