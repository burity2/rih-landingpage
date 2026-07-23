import { Link } from 'react-router';
import { IconZoomQuestion, IconBook, IconBrandSpotify, IconBook2, IconBallFootball, IconBrain, IconBrandYoutube, IconPlayerPlay, IconMail, IconBrandInstagram, IconArrowRight } from '@tabler/icons-react';
import QuizImg from '../../assets/imgs/tension.png'
import AboutUsImg from '../../assets/imgs/about-us.png'
import RefCornerImg from '../../assets/imgs/ref-corner.png'

export default function Info() {
  const upperCard = "h-full border border-border rounded-lg p-4 pb-6 bg-surface"
  const lowerCard = "h-full border border-border rounded-lg p-4 bg-surface"
  const eduHubCard = "flex w-full items-center justify-center gap-4 rounded-lg border border-border p-3 text-center sm:gap-6 xl:w-[80%] transition duration-200 ease-out hover:-translate-y-0.5 hover:text-primary hover:shadow-lg hover:bg-primary/10"
  const refCornerCard = "flex justify-center gap-2 rounded-lg border border-primary p-2 text-center transition duration-200 ease-out hover:-translate-y-0.5 hover:shadow-lg hover:text-primary hover:bg-primary/10"
  const stayConnectedIcons = "size-10 text-text sm:size-12"
  const richImgBox = "relative overflow-hidden rounded-lg border border-border bg-[radial-gradient(circle_at_50%_0%,var(--img-card-glow-1),transparent_34%),radial-gradient(circle_at_80%_15%,var(--img-card-glow-2),transparent_28%),linear-gradient(180deg,var(--img-card-top)_0%,var(--img-card-mid)_42%,var(--img-card-bottom)_100%)] shadow-[inset_0_1px_0_var(--img-card-inset-top),inset_0_-24px_40px_var(--img-card-inset-bottom)]"

  return (
    <>
      <section className="grid w-full grid-cols-1 gap-4 px-4 py-4 sm:px-6 lg:grid-cols-2 lg:px-8 xl:grid-cols-3">
        <div className={upperCard}>
          <div className='flex h-full flex-col'>
            <div className='flex gap-4 items-center pb-4' >
              <IconZoomQuestion stroke={1.5} className='size-10 text-primary' />
              <h1
              className='
              text-xl
              font-semibold
              text-text'
              >ABUSE QUIZ</h1>
            </div>
            <div className='flex flex-1 flex-col gap-4 sm:flex-row'>
              <div className={`flex w-full sm:w-42 lg:w-44 2xl:w-50 ${richImgBox}`}>
                <img className="h-full w-full object-cover" src={QuizImg} alt="" />
              </div>
              <div className='flex flex-1 flex-col justify-between gap-4'>
                <div className='flex flex-col gap-2'>
                  <p>Do you know what counts as referee abuse?</p>
                  <p>Take the quiz and see where you stand.</p>
                </div>
                <Link to="/quiz" className='flex gap-2 bg-primary text-white p-2 rounded-lg justify-between transition duration-200 ease-out hover:-translate-y-0.5 hover:bg-primary/90 hover:shadow-lg' style={{ fontWeight: 600 }}> TAKE QUIZ <IconArrowRight stroke={2} /></Link>
              </div>
            </div>
          </div>
        </div>
        <div className={upperCard}>
          <div className='h-full'>
            <div className='flex gap-4 items-center pb-4' >
              <IconBook stroke={1.5} className='size-10 text-primary' />
              <h1
              className='
              text-xl
              font-semibold
              text-text'
              >EDUCATIONAL HUB</h1>
            </div>
            <div className='flex flex-col gap-4 items-center'>
              <Link to="/education" className={`${eduHubCard} group`}>
                <IconBook2 stroke={1.5} className='size-8 text-accent transition duration-200 ease-out group-hover:text-primary' />
                <h2>LEARN THE GAME</h2>
              </Link>
              <Link to="/education" className={`${eduHubCard} group`}>
                <IconBrain stroke={1.5} className='size-8 text-danger transition duration-200 ease-out group-hover:text-primary' />
                <h2>MENTAL HEALTH</h2>
              </Link>
              <Link to="/education" className={`${eduHubCard} group`}>
                <IconPlayerPlay stroke={1.5} className='size-8 text-info transition duration-200 ease-out group-hover:text-primary' />
                <h2>ABUSE VIDEOS</h2>
              </Link>
            </div>
          </div>
        </div>
        <div className={upperCard}>
          <div>
            <div className='flex gap-4 items-center pb-4' >
              <IconBallFootball stroke={1.5} className='size-10 text-primary' />
              <h1
              className='
              text-xl
              font-semibold
              text-text'
              >REFEREE CORNER</h1>
            </div>
            <div className='flex flex-col gap-4 sm:flex-row'>
              <div className={`flex w-full sm:w-42 lg:w-44 2xl:w-50 ${richImgBox}`}>
                <img className="h-full w-full object-cover" src={RefCornerImg} alt="" />
              </div>
              <div className='flex flex-1 flex-col justify-between gap-4'>
                <div className='flex flex-col gap-2'>
                  <p>Want to join?</p>
                </div>
              <div className='flex flex-col gap-4'>
              <Link to="/ref-corner" className={refCornerCard}>
                <i></i>
                <h2>COMMUNITY</h2>
              </Link>
              <Link to="/ref-corner" className={refCornerCard}>
                <i></i>
                <h2>SALARY SURVEYS</h2>
              </Link>
              <Link to="/ref-corner" className={refCornerCard}>
                <i></i>
                <h2>ASSOCIATIONS</h2>
              </Link>
            </div>
              </div>
            </div>
          </div>
        </div>

        <div className={lowerCard}>
          <div className='flex gap-4 items-center pb-2' >
            <h1
            className='
            text-xl
            font-semibold
            text-text'
            >ABOUT US</h1>
          </div>
          <div className="flex flex-col gap-4 sm:flex-row">
            <div className={`flex aspect-[4/3] w-full sm:w-42 lg:w-44 2xl:w-50 ${richImgBox}`}>
              <img className="h-full w-full object-cover" src={AboutUsImg} alt="" />
            </div>
            <div className='flex flex-1 flex-col justify-between gap-4'>
              <p>We're protecting referees through education and AI.</p>
              <Link to="/about" className='flex gap-2 bg-primary text-white p-2 rounded-lg justify-between transition duration-200 ease-out hover:-translate-y-0.5 hover:bg-primary/90 hover:shadow-lg' style={{ fontWeight: 600 }}> MORE INFO <IconArrowRight stroke={2} /></Link>
            </div>
          </div>
        </div>
        <div className={lowerCard}>
          <div className='flex gap-4 items-center pb-2' >
            <h1
            className='
            text-xl
            font-semibold
            text-text'
            >STAY CONNECTED</h1>
          </div>
          <p>Get in touch with us on social media!</p>
          <div className='w-full grid grid-cols-4 pt-8 place-items-center'>
            <a href="" className='inline-flex transition duration-200 ease-out hover:text-primary hover:-translate-y-0.5 hover:scale-105 group'>
              <IconBrandInstagram stroke={1} className={`${stayConnectedIcons} transition duration-200 ease-out group-hover:text-primary`} />
            </a>
            <a href="" className='inline-flex transition duration-200 ease-out hover:text-primary hover:-translate-y-0.5 hover:scale-105 group'>
              <IconMail stroke={1} className={`${stayConnectedIcons} transition duration-200 ease-out group-hover:text-primary`}  />
            </a>
            <a href="" className='inline-flex transition duration-200 ease-out hover:text-primary hover:-translate-y-0.5 hover:scale-105 group'>
              <IconBrandYoutube stroke={1} className={`${stayConnectedIcons} transition duration-200 ease-out group-hover:text-primary`} />
            </a>
            <a href="" className='inline-flex transition duration-200 ease-out hover:text-primary hover:-translate-y-0.5 hover:scale-105 group'>
              <IconBrandSpotify stroke={1} className={`${stayConnectedIcons} transition duration-200 ease-out group-hover:text-primary`} />
            </a>
          </div>
        </div>
        <div className={lowerCard}>
          <div className='flex gap-4 items-center pb-2' >
            <h1
            className='
            text-xl
            font-semibold
            text-text'
            >SEND US A MESSAGE</h1>
          </div>
          <p>Have a question or a story to share? </p>
          <div className='pt-8'>
            <Link to="/contact" className='flex border border-primary p-2 rounded-lg justify-between transition duration-200 ease-out hover:-translate-y-0.5 hover:bg-primary/10 hover:shadow-lg hover:text-primary'>
                <p>SEND EMAIL</p>
                <IconArrowRight stroke={2} />
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
