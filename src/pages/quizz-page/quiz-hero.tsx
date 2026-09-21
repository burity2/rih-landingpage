import refQuizImg from '../../assets/imgs/ref-quiz-hue.png'

export default function Hero() {
  return (
    <>
      <section className="flex w-full flex-col bg-surface lg:min-h-50 lg:flex-row ">
        <div className='flex flex-col justify-around gap-4 px-4 py-8 sm:px-6 sm:py-10 lg:w-[48%] lg:px-8 xl:w-[43%]'>
          <h1 className='font-(family-name:--font-heading) text-[2.8rem] text-text font-bold leading-[0.95] sm:text-[3rem] lg:text-[3.6rem]'
          >
            ABUSE <span className="text-primary">QUIZ</span> <br />
          </h1>
          <p className='max-w-xl text-base sm:text-[1.2rem]'
          >
            Five game-day moments. Learn how to respect and protect the referee.
          </p>
        </div>
        <div className="relative min-h-80 flex-1 overflow-hidden bg-(image:--bg-img) bg-cover bg-center bg-no-repeat sm:min-h-105 lg:min-h-0 lg:bg-right lg:[--fade-amount:40%] lg:mask-[linear-gradient(to_right,transparent,black_var(--fade-amount),black_100%)]">
          <img
            src={refQuizImg}
            alt="Referee on a football stadium" className="absolute -bottom-11 left-[72%] h-60 w-auto max-w-[90%] -translate-x-1/2 object-contain"/>
        </div>
      </section>
    </>
  )
}
