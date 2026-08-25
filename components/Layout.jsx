import { Outlet, useLocation } from 'react-router-dom'
import Footer from './Footer'
import Navbar from './Navbar'

function Layout() {
  const location = useLocation()

  return (
    <div className="min-h-screen bg-[#121110] text-[#f3dfaa]">
      <Navbar />
      <main key={location.pathname} className="page-reveal">
        <Outlet />
      </main>
      <Footer />
      <a href="https://wa.me/918102494117?text=Hello%20Aura%20Family%20Salon%2C%20I%20would%20like%20to%20know%20more%20about%20your%20services." target="_blank" rel="noreferrer" aria-label="Chat with Aura Family Salon on WhatsApp" title="Chat on WhatsApp" className="whatsapp-float fixed bottom-5 right-5 z-[55] inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-[#ffffff] shadow-lg shadow-black/30 transition hover:-translate-y-1 hover:bg-[#6bea9a]">
        <svg aria-hidden="true" viewBox="0 0 32 32" className="h-8 w-8 fill-current">
          <path d="M16 3.2A12.8 12.8 0 0 0 5 22.6L3.5 28.5l6.1-1.6A12.8 12.8 0 1 0 16 3.2Zm0 22.9c-2.1 0-4.1-.6-5.8-1.7l-.4-.2-3.6.9 1-3.5-.2-.4A10.7 10.7 0 1 1 16 26.1Zm5.9-7.8c-.3-.2-1.8-.9-2.1-1-.3-.1-.5-.2-.7.2-.2.3-.8 1-.9 1.2-.2.2-.3.2-.6.1-1.6-.8-2.7-1.4-3.8-3.2-.3-.5.3-.5.8-1.6.1-.2.1-.4 0-.6-.1-.2-.7-1.7-1-2.3-.3-.6-.5-.5-.7-.5h-.6c-.2 0-.6.1-.9.4-.3.3-1.2 1.1-1.2 2.7s1.2 3.1 1.4 3.3c.2.2 2.4 3.7 5.8 5.2.8.3 1.4.5 1.9.7.8.2 1.5.2 2 .1.6-.1 1.8-.7 2-1.4.2-.7.2-1.3.1-1.4-.1-.2-.3-.3-.6-.4Z" />
        </svg>
      </a>
    </div>
  )
}

export default Layout