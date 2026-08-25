import { Link } from 'react-router-dom'
import salonInterior from '../assets/main sallon page.png'

function Home() {
  return (
    <section className="hero-shell relative mx-auto grid min-h-[calc(100vh-76px)] max-w-[1440px] items-center gap-14 overflow-hidden px-6 py-14 lg:grid-cols-[48%_40%] lg:justify-between lg:gap-0 lg:px-16 lg:py-16 xl:px-24">
      <div className="hero-copy">
        <p className="hero-eyebrow location-label uppercase">AURA FAMILY SALON · UNISEX SALON · HAZARIBAGH, JHARKHAND</p>
        <h1 className="hero-heading mt-7 max-w-xl font-serif text-[3.65rem] font-medium leading-[0.92] tracking-[-1.5px] text-[#f0dda3] sm:text-6xl lg:text-[84px] lg:tracking-[-2.5px]">Your look,<br />our signature.</h1>
        <p className="hero-description mt-8 max-w-[500px] text-[15px] leading-[1.65] text-[#b9ae99] sm:text-[17px]">From everyday elegance to your most unforgettable moments — personalised hair, makeup and bridal artistry, made for you.</p>
        <div className="hero-actions mt-9 flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:gap-8">
          <Link to="/contact" className="inline-flex min-h-[50px] items-center rounded-full bg-[#d5a94f] px-7 text-[13px] font-semibold text-[#100f0e] transition duration-300 hover:-translate-y-1 hover:bg-[#f0dda3]">Book an Appointment</Link>
          <Link to="/services" className="group relative text-[13px] font-medium text-[#f0dda3] after:absolute after:-bottom-1 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-35 after:bg-[#c9a24a] after:transition-transform after:duration-300 hover:after:scale-x-100">Explore Services <span className="ml-1 inline-block transition-transform duration-300 group-hover:translate-x-1">→</span></Link>
        </div>
        <div className="hero-contact mt-9 flex flex-col gap-2.5 text-[11px] font-medium tracking-wide text-[#b9ae99] sm:flex-row sm:items-center sm:gap-4 sm:text-[13px]">
          <a href="tel:+918102494117" className="inline-flex items-center gap-2 text-[#f0dda3] transition-colors hover:text-white"><span className="text-[15px] leading-none text-[#c9a24a]" aria-hidden="true">☎</span>8102494117</a>
          <span className="hidden h-4 w-px bg-[#c9a24a]/45 sm:block" aria-hidden="true" />
          <a href="mailto:hello@aurafamilysalon.com" className="transition-colors hover:text-[#f0dda3]">hello@aurafamilysalon.com</a>
        </div>
      </div>
      <div className="hero-image-card relative mx-auto w-full max-w-[30rem] lg:mr-2">
        <div className="rounded-[1.75rem] border border-[#c9a24a]/45 bg-[#211d18] p-2 shadow-2xl shadow-black/35 transition-colors duration-600 hover:border-[#f0dda3]/70">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[1.35rem] border border-[#c9a24a]/25">
            <img src={salonInterior} alt="Interior of Aura Family Salon" className="h-full w-full object-cover object-center" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#100f0e]/90 via-[#100f0e]/10 to-transparent" />
            <p className="absolute left-6 top-6 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#f0dda3]">The Aura Signature</p>
            <p className="absolute bottom-7 left-6 max-w-[13rem] font-serif text-[27px] font-medium leading-[1.05] text-[#f0dda3] sm:text-[34px]">A little more confidence,<br />every time.</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Home