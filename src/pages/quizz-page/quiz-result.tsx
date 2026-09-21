import type { ReactNode } from 'react';
import devastated from '../../assets/imgs/quiz-results/devastated.png';
import concerned from '../../assets/imgs/quiz-results/concerned.png';
import indifferent from '../../assets/imgs/quiz-results/indifferent.png';
import happy from '../../assets/imgs/quiz-results/happy.png';
import delighted from '../../assets/imgs/quiz-results/delighted.png';

const reactions = [
  { image: devastated, description: 'The referee is devastated, with tears and slumped shoulders.' },
  { image: concerned, description: 'The referee looks concerned.' },
  { image: indifferent, description: 'The referee gives an uncertain shrug: well, okay, I guess.' },
  { image: happy, description: 'The referee smiles and gives a thumbs up.' },
  { image: delighted, description: 'The referee beams with stars in his eyes and two thumbs up.' },
];
const colors = ['var(--danger)', '#f58a35', 'var(--accent)', '#a6cf49', 'var(--primary)'];

function point(angle: number, radius: number) {
  const radians = angle * Math.PI / 180;
  return `${180 + radius * Math.cos(radians)},${174 - radius * Math.sin(radians)}`;
}

export default function QuizResult({ score, retryButton }: { score: number; retryButton: ReactNode }) {
  const reactionIndex = Math.max(0, Math.min(4, score - 1));
  const reaction = reactions[reactionIndex];
  const needleAngle = score === 0 ? -86 : -72 + reactionIndex * 36;
  let resultMessage = '';
  switch (reactionIndex) {
    case 0:
      resultMessage = 'Oh no! You need to brush up on your rules...';
      break;
    case 1:
      resultMessage = 'Not bad, but you can do better!';
      break;
    case 2:
      resultMessage = 'Good job! You know your stuff.';
      break;
    case 3:
      resultMessage = 'Great work! You really know your rules.';
      break;
    case 4:
      resultMessage = 'Excellent! You are a rules master!';
      break;
    }
  return (
    <div className="grid w-full min-w-0 items-center gap-6 sm:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] sm:gap-8">
      <div className="w-full min-w-0 rounded-2xl border border-border/60 bg-linear-to-b from-bg-soft/60 to-bg/30 p-3 sm:p-4">
      <div className="relative mx-auto aspect-[360/235] w-full">
        <div role="meter" aria-label="Quiz score" aria-valuemin={0} aria-valuemax={5} aria-valuenow={score} aria-valuetext={`${score} out of 5 correct`} className="absolute inset-0">
          <svg viewBox="0 0 360 235" aria-hidden="true" className="w-full overflow-visible">
            {colors.map((color, index) => {
              const start = 180 - index * 36 - 1.5;
              const end = 180 - (index + 1) * 36 + 1.5;
              return <path key={color} d={`M ${point(start, 156)} A 156 156 0 0 1 ${point(end, 156)} L ${point(end, 119)} A 119 119 0 0 0 ${point(start, 119)} Z`} fill={color} />;
            })}
            <g transform={`rotate(${needleAngle} 180 174)`}>
              <path d="M 172 77 L 180 33 L 188 77 Z" fill="var(--text)" />
              <circle cx="180" cy="77" r="10" fill="var(--text)" />
              <circle cx="180" cy="77" r="4" fill="var(--surface)" />
            </g>
            <text x="24" y="194" textAnchor="middle" fill="var(--text-muted)" fontSize="13">0</text>
            <text x="336" y="194" textAnchor="middle" fill="var(--text-muted)" fontSize="13">5</text>
          </svg>
        </div>
        <img src={reaction.image} alt={reaction.description} className="pointer-events-none absolute bottom-0 left-1/2 z-10 aspect-square w-[44%] -translate-x-1/2 object-contain" />
      </div>
      </div>
      <div className="flex min-w-0 flex-col items-center justify-center gap-6 sm:gap-8">
        <h1 className='text-[1.3rem] font-bold text-center text-text-soft'>{resultMessage}</h1>
        <p className="flex flex-col items-center gap-2 text-center">
          <span className="whitespace-nowrap text-5xl font-bold sm:text-6xl"><span style={{ color: colors[reactionIndex] }}>{score}</span><span className="text-text-soft"> / 5</span></span>
          <span className="text-sm text-text-muted">correct answers</span>
        </p>
        {retryButton}
      </div>
    </div>
  );
}
