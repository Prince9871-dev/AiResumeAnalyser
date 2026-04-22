import { cn } from "~/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionHeader,
  AccordionItem,
} from "./Accordion";
import { CheckCircle2, AlertCircle } from "lucide-react";

const ScoreBadge = ({ score }: { score: number }) => {
  return (
      <div
          className={cn(
              "flex flex-row gap-1.5 items-center px-3 py-1 rounded-full border",
              score > 69
                  ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
                  : score > 39
                      ? "bg-amber-500/10 border-amber-500/20 text-amber-400"
                      : "bg-rose-500/10 border-rose-500/20 text-rose-400"
          )}
      >
        {score > 69 ? (
            <CheckCircle2 className="w-4 h-4" />
        ) : (
            <AlertCircle className="w-4 h-4" />
        )}
        <p className="text-sm font-bold tracking-wide">
          {score}/100
        </p>
      </div>
  );
};

const CategoryHeader = ({
                          title,
                          categoryScore,
                        }: {
  title: string;
  categoryScore: number;
}) => {
  return (
      <div className="flex flex-row gap-4 items-center py-3">
        <p className="text-2xl font-bold text-gray-200 tracking-tight">{title}</p>
        <ScoreBadge score={categoryScore} />
      </div>
  );
};

const CategoryContent = ({
                           tips,
                         }: {
  tips: { type: "good" | "improve"; tip: string; explanation: string }[];
}) => {
  return (
      <div className="flex flex-col gap-6 items-center w-full">
        <div className="bg-[#0a0a0a] border border-white/5 w-full rounded-2xl p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          {tips.map((tip, index) => (
              <div className="flex flex-row gap-3 items-start" key={index}>
                <div className="mt-0.5 flex-shrink-0">
                    {tip.type === "good" ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                    ) : (
                        <AlertCircle className="w-5 h-5 text-amber-400" />
                    )}
                </div>
                <p className="text-lg text-gray-400 leading-snug">{tip.tip}</p>
              </div>
          ))}
        </div>
        <div className="flex flex-col gap-4 w-full">
          {tips.map((tip, index) => (
              <div
                  key={index + tip.tip}
                  className={cn(
                      "flex flex-col gap-3 rounded-2xl p-5 border relative overflow-hidden group",
                      tip.type === "good"
                          ? "bg-emerald-500/5 border-emerald-500/20 text-emerald-200"
                          : "bg-amber-500/5 border-amber-500/20 text-amber-200"
                  )}
              >
                <div className={cn(
                    "absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500",
                    tip.type === "good" ? "bg-emerald-500/5" : "bg-amber-500/5"
                )}></div>
                <div className="flex flex-row gap-3 items-center relative z-10">
                  {tip.type === "good" ? (
                      <CheckCircle2 className={cn("w-6 h-6", tip.type === "good" ? "text-emerald-400" : "text-amber-400")} />
                  ) : (
                      <AlertCircle className={cn("w-6 h-6", tip.type === "good" ? "text-emerald-400" : "text-amber-400")} />
                  )}
                  <p className="text-xl font-semibold tracking-tight">{tip.tip}</p>
                </div>
                <p className={cn(
                    "text-base leading-relaxed relative z-10",
                    tip.type === "good" ? "text-emerald-200/80" : "text-amber-200/80"
                )}>{tip.explanation}</p>
              </div>
          ))}
        </div>
      </div>
  );
};

const Details = ({ feedback }: { feedback: Feedback }) => {
  return (
      <div className="flex flex-col gap-4 w-full glass-panel rounded-3xl p-4 sm:p-8">
        <Accordion>
          <AccordionItem id="tone-style">
            <AccordionHeader itemId="tone-style">
              <CategoryHeader
                  title="Tone & Style"
                  categoryScore={feedback.toneAndStyle.score}
              />
            </AccordionHeader>
            <AccordionContent itemId="tone-style">
              <CategoryContent tips={feedback.toneAndStyle.tips} />
            </AccordionContent>
          </AccordionItem>
          <AccordionItem id="content">
            <AccordionHeader itemId="content">
              <CategoryHeader
                  title="Content"
                  categoryScore={feedback.content.score}
              />
            </AccordionHeader>
            <AccordionContent itemId="content">
              <CategoryContent tips={feedback.content.tips} />
            </AccordionContent>
          </AccordionItem>
          <AccordionItem id="structure">
            <AccordionHeader itemId="structure">
              <CategoryHeader
                  title="Structure"
                  categoryScore={feedback.structure.score}
              />
            </AccordionHeader>
            <AccordionContent itemId="structure">
              <CategoryContent tips={feedback.structure.tips} />
            </AccordionContent>
          </AccordionItem>
          <AccordionItem id="skills">
            <AccordionHeader itemId="skills">
              <CategoryHeader
                  title="Skills"
                  categoryScore={feedback.skills.score}
              />
            </AccordionHeader>
            <AccordionContent itemId="skills">
              <CategoryContent tips={feedback.skills.tips} />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
  );
};

export default Details;
