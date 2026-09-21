import { useEffect, useRef, useState } from 'react';
import { IconChevronDown, IconChevronLeft, IconChevronRight, IconClipboardText, IconHelpHexagon, IconHeartHandshake } from '@tabler/icons-react';
import quizCanonical from '../../assets/quiz-canonical.json';
import QuizResult from './quiz-result';

function getRandomQuestions() {
  const questions = [...quizCanonical.questions];
  for (let i = questions.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [questions[i], questions[j]] = [questions[j], questions[i]];
  }
  return questions.slice(0, 5);
}

const sideCards = [
  { title: 'About this quiz', icon: IconClipboardText, text: 'Five everyday moments. Pick the best response, confirm your answer, then learn why it matters. Each correct answer earns one point.' },
  { title: 'Did you know?', icon: IconHelpHexagon, text: 'Players, coaches, and fans can all report referee abuse. If you see something, ask event staff or your league how to report it.' },
  { title: 'Respect starts with you', icon: IconHeartHandshake, text: 'Cheer for your team. Give refs space. A simple thank-you can help someone feel welcome at the next game.' },
];

export default function Quiz() {
  const [quizData, setQuizData] = useState(getRandomQuestions);
  const [phase, setPhase] = useState<'ready' | 'playing' | 'results'>('ready');
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [selections, setSelections] = useState<Record<number, string>>({});
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const headingRef = useRef<HTMLHeadingElement>(null);
  const currentQuestion = quizData[currentQuestionIdx];
  const totalQuestions = quizData.length;
  const selectedAnswer = selections[currentQuestionIdx];
  const isAnswered = answers[currentQuestionIdx] !== undefined;
  const answeredCount = Object.keys(answers).length;
  const isLast = currentQuestionIdx === totalQuestions - 1;
  const score = quizData.filter((question, index) => answers[index] === question.correctOption).length;
  const primaryButton = 'inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-5 py-3 font-semibold text-button-text transition hover:bg-primary/90 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary disabled:cursor-not-allowed disabled:bg-border disabled:text-text-muted';

  useEffect(() => {
    if (phase !== 'ready') headingRef.current?.focus();
  }, [phase, currentQuestionIdx]);

  function restart() {
    setQuizData(getRandomQuestions());
    setCurrentQuestionIdx(0);
    setSelections({});
    setAnswers({});
    setPhase('playing');
  }

  function confirmAnswer() {
    if (!selectedAnswer || isAnswered) return;
    setAnswers(previous => ({ ...previous, [currentQuestionIdx]: selectedAnswer }));
  }

  return (
    <section aria-label="Referee respect quiz" className="w-full px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
      <div className="flex flex-col items-start gap-4 lg:flex-row">
      {phase === 'ready' ? (
        <div className="flex w-full min-w-0 flex-1 flex-col items-start gap-5 rounded-2xl border border-primary/30 bg-surface p-6 shadow-lg sm:p-8">
          <span className="text-sm font-semibold text-text-muted">5 QUESTIONS · A FRESH START</span>
          <h2 className="text-3xl font-bold">Ready to make the call?</h2>
          <p className="max-w-xl text-text-soft">What would you do on game day? Pick an answer, then press “Answer question” to see the lesson. Get your score at the end.</p>
          <button className={primaryButton} onClick={() => setPhase('playing')}>Start quiz <IconChevronRight size={18} aria-hidden="true" /></button>
        </div>
      ) : phase === 'results' ? (
        <div className="w-full min-w-0 flex-1 rounded-2xl bg-surface p-4 sm:p-6">
          <h2 ref={headingRef} tabIndex={-1} className="sr-only">Quiz results</h2>
          <QuizResult score={score} retryButton={<button className={`${primaryButton} whitespace-nowrap`} onClick={restart}>Try again</button>} />
        </div>
      ) : (
          <div className="flex w-full min-w-0 flex-1 flex-col gap-6 rounded-2xl bg-surface p-6 sm:p-8">
            <p className="text-sm font-semibold text-text-muted">QUESTION {currentQuestionIdx + 1} OF {totalQuestions}</p>
            <h2 ref={headingRef} tabIndex={-1} className="text-2xl font-bold">{currentQuestion.title}</h2>
            <p id="quiz-scenario" className="border-l-4 border-primary pl-4 text-base leading-relaxed">{currentQuestion.scenario}</p>
            <fieldset disabled={isAnswered} aria-describedby="quiz-scenario" className="flex min-w-0 flex-col gap-3">
              <legend className="sr-only">Choose one answer</legend>
              {currentQuestion.options.map(option => {
                const selected = selectedAnswer === option.letter;
                const correct = isAnswered && option.letter === currentQuestion.correctOption;
                const incorrect = isAnswered && selected && !correct;
                return (
                  <label key={option.letter} className={`flex items-start gap-3 rounded-lg border-2 p-4 transition focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2 ${incorrect ? 'border-danger bg-danger/10' : selected || correct ? 'border-primary bg-primary/10' : 'border-border bg-surface'} ${isAnswered ? '' : 'cursor-pointer hover:border-primary'}`}>
                    <input type="radio" name={`question-${currentQuestion.id}`} value={option.letter} checked={selected} onChange={() => setSelections(previous => ({ ...previous, [currentQuestionIdx]: option.letter }))} className="sr-only" />
                    <span className={`font-bold ${incorrect ? 'text-danger' : 'text-primary'}`} aria-hidden="true">{option.letter}</span>
                    <span>{option.text}{isAnswered && (correct || selected) && <span className="sr-only">{correct ? 'Correct answer' : 'Your answer · Incorrect'}</span>}</span>
                  </label>
                );
              })}
            </fieldset>
            {isAnswered && (
              <div role="status" className="flex flex-col gap-3 rounded-xl border border-primary/30 bg-bg/50 p-5">
                <h3 className="text-xl font-bold sm:text-2xl">{currentQuestion.lesson.label}</h3>
                <p className="text-lg font-semibold">{currentQuestion.lesson.summary}</p>
                <p className="text-text-soft">{currentQuestion.reveal}</p>
                <div className="border-t border-border pt-3 text-sm text-text-muted">
                  <p className="font-semibold">{currentQuestion.lesson.reference}</p>
                  <p className="mt-2">{currentQuestion.lesson.detail}</p>
                  <a href={currentQuestion.lesson.url} target="_blank" rel="noreferrer" className="mt-2 inline-block underline underline-offset-4 hover:text-text">Read the policy details (PDF)</a>
                </div>
              </div>
            )}
            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border pt-6">
              <button onClick={() => setCurrentQuestionIdx(index => index - 1)} disabled={currentQuestionIdx === 0} className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-3 text-text-soft hover:bg-bg disabled:cursor-not-allowed disabled:opacity-40"><IconChevronLeft size={18} aria-hidden="true" />Back</button>
              {!isAnswered ? (
                <button className={primaryButton} onClick={confirmAnswer} disabled={!selectedAnswer}>Answer question</button>
              ) : (
                <button className={primaryButton} disabled={isLast && answeredCount !== totalQuestions} onClick={() => isLast ? setPhase('results') : setCurrentQuestionIdx(index => index + 1)}>{isLast ? 'Submit answers' : 'Next question'}<IconChevronRight size={18} aria-hidden="true" /></button>
              )}
            </div>
          </div>
      )}
          <aside aria-label="Quiz progress and tips" className="flex w-full shrink-0 flex-col gap-4 lg:w-72 xl:w-80">
            <div className="flex flex-col gap-3 rounded-2xl bg-surface p-5 text-sm text-text-muted">
              <div className="flex justify-between gap-2"><h3 className="font-semibold">Your progress</h3><span>{answeredCount} / {totalQuestions} answered</span></div>
              <progress aria-label="Questions answered" value={answeredCount} max={totalQuestions} className="h-2 w-full overflow-hidden rounded-full [&::-webkit-progress-bar]:bg-border [&::-webkit-progress-value]:bg-primary [&::-moz-progress-bar]:bg-primary" />
            </div>
            {sideCards.map(({ title, icon: Icon, text }) => (
              <details key={title} className="group rounded-xl border border-border/60 bg-bg-soft p-4 text-sm text-text-muted">
                <summary className="flex cursor-pointer list-none items-center gap-2 rounded focus-visible:outline-2 focus-visible:outline-primary [&::-webkit-details-marker]:hidden"><Icon size={18} className="shrink-0" aria-hidden="true" /><span className="flex-1 font-semibold">{title}</span><IconChevronDown size={18} className="shrink-0 transition-transform group-open:rotate-180" aria-hidden="true" /></summary>
                <p className="pt-3 leading-relaxed">{text}</p>
              </details>
            ))}
          </aside>
      </div>
    </section>
  );
}
