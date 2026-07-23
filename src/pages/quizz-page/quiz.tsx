export default function Quiz() {
  const triviaBox = "flex flex-col gap-4 p-4";
  let currentQuestion = 0;
  let totalQuestions = 5;

  return (
    <div className="flex flex-col gap-4 px-4 py-8 sm:px-6 sm:py-10 lg:px-8 w-full">
      <div className="flex gap-4">
        <div>quiz</div>
        <div className="flex flex-col gap-4 w-[20rem]">
          <div className="flex flex-col">
            <div className="flex justify-between">
              <h3>YOUR PROGRESS</h3>
              <h3>{currentQuestion} / 5</h3>
            </div>
            <div className="flex gap-2">
              progress bar
            </div>
          </div>
          <div>
            <div>trivia 1</div>
            <div>trivia 2</div>
            <div>trivia 3</div>
          </div>
        </div>
      </div>
    </div>
  )
}
