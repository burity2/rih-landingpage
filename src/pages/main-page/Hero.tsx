import { Link } from 'react-router'
import refImg from '../../assets/imgs/logo-transparent.png'
// import { IconArrowRight } from '@tabler/icons-react';

export default function Hero() {
  return (
    <>
      <section className="flex w-full flex-col bg-surface lg:min-h-95 lg:flex-row ">
        <div className='flex flex-col justify-between gap-4 px-4 py-8 sm:px-6 sm:py-10 lg:w-[48%] lg:px-8 xl:w-[43%]'>
          <h1 className='font-(family-name:--font-heading) text-[2.8rem] font-bold leading-[0.95] sm:text-[3rem] lg:text-[3.6rem]'
          >
            RESPECT REFEREES <br />
            <span className='text-primary'>RESPECT FOOTBALL</span>
          </h1>
          <p className='max-w-xl text-base sm:text-[1.2rem]'
          >
            We support referees. <br /> We fight abuse. <br /> We protect the game.
          </p>
          <div className='flex flex-col gap-3 font-medium text-[1.1rem] sm:flex-row sm:text-[1.2rem] lg:text-[1.3rem]'>
            <Link to="/quiz" className='flex w-full items-center justify-center rounded-lg border border-primary bg-primary px-5 py-3 text-surface sm:w-52 lg:w-56 transition duration-200 ease-out hover:-translate-y-0.5 hover:bg-primary/90 hover:shadow-lg'>TAKE QUIZ</Link>
            <Link to="/about" className='flex w-full items-center justify-center rounded-lg border border-primary bg-primary/0 px-5 py-3 text-text sm:w-52 lg:w-56 transition duration-200 ease-out hover:-translate-y-0.5 hover:bg-bg/90 hover:border-primary hover:text-primary hover:shadow-lg'>ABOUT US</Link>
          </div>
        </div>
        <div className="relative min-h-80 flex-1 overflow-hidden bg-(image:--bg-img) bg-cover bg-center bg-no-repeat sm:min-h-105 lg:min-h-0 lg:bg-right lg:[--fade-amount:40%] lg:mask-[linear-gradient(to_right,transparent,black_var(--fade-amount),black_100%)]">
          <img src={refImg} alt="Referee on a football stadium" className="absolute bottom-0 left-1/2 size-72 -translate-x-1/2 sm:size-75 lg:left-auto lg:right-[8%] lg:size-85 lg:translate-x-0" />
        </div>
      </section>
    </>
  )
}
