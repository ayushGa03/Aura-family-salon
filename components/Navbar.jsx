import { Link, useLocation } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import logo from '../assets/aura logo.jpg'

const links = [
  { label: 'Services', to: '/services' },
  { label: 'Gallery', to: '/gallery' },
  { label: 'About', to: '/about-us' },
  { label: 'Contact', to: '/contact' },
]

function Navbar() {
  const location = useLocation()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 12)
    window.addEventListener('scroll', handleScroll)
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const closeMenuOnOutsideTouch = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) setMenuOpen(false)
    }
    document.addEventListener('pointerdown', closeMenuOnOutsideTouch)
    return () => document.removeEventListener('pointerdown', closeMenuOnOutsideTouch)
  }, [])

  useEffect(() => setMenuOpen(false), [location.pathname])

  return (
    <header className={`luxury-nav sticky top-0 z-50 border-b backdrop-blur-md ${scrolled ? 'scrolled' : ''}`}>
      <nav className="mx-auto flex h-[76px] max-w-[1440px] items-center justify-between px-6 lg:px-12" aria-label="Main navigation">
        <a href="/" className="group flex items-center gap-3" aria-label="Aura Family Salon Unisex Salon home">
          <span className="h-12 w-12 overflow-hidden rounded-full bg-white transition-transform duration-300 group-hover:scale-105">
            <img src={logo} alt="Aura Family Salon Unisex Salon" className="h-full w-full object-cover" />
          </span>
          <span className="hidden text-[10px] font-semibold uppercase tracking-[0.18em] text-[#f0dda3] sm:inline">Aura Family Salon · Unisex Salon</span>
        </a>

        <div className="hidden items-center gap-7 lg:flex">
          <a href="/" className={`nav-link relative py-2 text-[11px] font-semibold uppercase tracking-[0.17em] transition-colors hover:text-[#f0dda3] ${location.pathname === '/' ? 'active text-[#f0dda3]' : 'text-[#b9ae99]'}`}>Home</a>
          {links.map((link) => {
            const isActive = location.pathname === link.to
            return (
              <Link
                key={link.to}
                to={link.to}
                className={`nav-link relative py-2 text-[11px] font-semibold uppercase tracking-[0.17em] transition-colors hover:text-[#f0dda3] ${isActive ? 'active text-[#f0dda3]' : 'text-[#b9ae99]'}`}
              >
                {link.label}
              </Link>
            )
          })}
          <Link to="/contact" className="rounded-full border border-[#c9a24a]/55 px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.17em] text-[#f0dda3] transition-colors hover:bg-[#d5a94f] hover:text-[#100f0e]">Book now</Link>
        </div>

        <div ref={menuRef} className="relative lg:hidden">
          <button type="button" onClick={() => setMenuOpen((open) => !open)} aria-expanded={menuOpen} aria-controls="mobile-navigation" aria-label={menuOpen ? 'Close menu' : 'Open menu'} className="menu-toggle cursor-pointer rounded-full border border-[#c9a24a]/45 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#f0dda3]">
            <span className={`menu-icon ${menuOpen ? 'is-open' : ''}`} aria-hidden="true"><span /><span /><span /></span>
            <span>{menuOpen ? 'Close' : 'Menu'}</span>
          </button>
          <div id="mobile-navigation" aria-hidden={!menuOpen} inert={!menuOpen} className={`menu-panel absolute right-0 top-12 flex min-w-44 flex-col gap-1 border border-[#c9a24a]/25 bg-[#211d18] p-3 shadow-xl ${menuOpen ? 'is-open' : ''}`}>
            <a href="/" className="px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#b9ae99] hover:text-[#f0dda3]">Home</a>
            {links.map((link) => (
              <Link key={link.to} to={link.to} className="px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#b9ae99] hover:text-[#f0dda3]">{link.label}</Link>
            ))}
            <Link to="/contact" className="mt-2 border-t border-[#c9a24a]/20 px-3 pt-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#f0dda3]">Book now</Link>
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Navbar