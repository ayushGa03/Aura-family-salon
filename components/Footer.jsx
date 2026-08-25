import { Link } from 'react-router-dom'

const footerLinks = [
  { label: 'Home', to: '/' },
  { label: 'Services', to: '/services' },
  { label: 'Bridal', to: '/bridal' },
  { label: 'Gallery', to: '/gallery' },
  { label: 'About', to: '/about-us' },
  { label: 'Contact', to: '/contact' },
]

function InstagramMark() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-[18px] w-[18px]">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  )
}

function FacebookMark() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor" className="h-[18px] w-[18px]">
      <path d="M13.5 21v-8h2.7l.4-3h-3.1V8.1c0-.9.3-1.6 1.7-1.6h1.8V3.8c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3V10H7.5v3h2.8v8h3.2Z" />
    </svg>
  )
}

function Footer() {
  return (
    <footer className="border-t border-[#30271f] bg-[#100f0e] px-6 py-12 md:px-12 lg:px-20">
      <div className="mx-auto max-w-[1440px]">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <Link to="/" className="font-serif text-3xl text-[#ead7a1]">Aura Family Salon</Link>
            <p className="mt-3 max-w-xs text-xs leading-6 text-[#6f6558]">A unisex salon for hair, makeup, bridal and beauty, thoughtfully created around you.</p>
          </div>

          <div>
            <p className="mb-4 text-[9px] font-semibold tracking-[0.3em] text-[#c9a24a]">EXPLORE</p>
            <div className="grid grid-cols-2 gap-y-3">
              {footerLinks.map((link) => <Link key={link.to} to={link.to} className="text-xs text-[#827666] transition-colors hover:text-[#d5b966]">{link.label}</Link>)}
            </div>
          </div>

          <div>
            <p className="mb-4 text-[9px] font-semibold tracking-[0.3em] text-[#c9a24a]">CONNECT</p>
            <div className="space-y-3 text-xs text-[#827666]">
              <p className="max-w-xs leading-6">Gaya Motor campus, Guru Gobind Singh Rd, opposite Laxmi ply, NawabGanj, Hazaribagh, Jharkhand 825301</p>
              <a href="tel:+918102494117" className="block transition-colors hover:text-[#d5b966]">8102494117</a>
              <a href="mailto:hello@aurafamilysalon.com" className="block transition-colors hover:text-[#d5b966]">hello@aurafamilysalon.com</a>
              <div className="flex gap-4 pt-2">
                <a href="https://instagram.com/AURAFAMILYSALON" aria-label="Aura Family Salon on Instagram" className="text-[#b9ae99] transition-colors hover:text-[#f0dda3]"><InstagramMark /></a>
                <a href="https://facebook.com/AURAFAMILYSALON" aria-label="Aura Family Salon on Facebook" className="text-[#b9ae99] transition-colors hover:text-[#f0dda3]"><FacebookMark /></a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col justify-between gap-4 border-t border-[#2c251f] pt-6 text-[10px] text-[#5f5549] sm:flex-row">
          <p>© 2026 Aura Family Salon. All rights reserved.</p>
          <p>Hazaribagh · Jharkhand</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
