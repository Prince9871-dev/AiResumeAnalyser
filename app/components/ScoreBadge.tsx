interface ScoreBadgeProps {
  score: number;
}

const ScoreBadge: React.FC<ScoreBadgeProps> = ({ score }) => {
  let badgeColor = '';
  let badgeText = '';

  if (score > 70) {
    badgeColor = 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20';
    badgeText = 'Strong';
  } else if (score > 49) {
    badgeColor = 'bg-amber-500/10 text-amber-400 border border-amber-500/20';
    badgeText = 'Good Start';
  } else {
    badgeColor = 'bg-rose-500/10 text-rose-400 border border-rose-500/20';
    badgeText = 'Needs Work';
  }

  return (
    <div className={`px-3 py-1 rounded-full ${badgeColor}`}>
      <p className="text-xs font-semibold uppercase tracking-wider">{badgeText}</p>
    </div>
  );
};

export default ScoreBadge;
