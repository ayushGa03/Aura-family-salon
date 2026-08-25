import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-32 lg:px-10">
      <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#d3a84f]">404</p>
      <h1 className="mt-5 font-serif text-6xl text-[#f3dfaa]">This page wandered off.</h1>
      <Link to="/" className="mt-8 inline-block text-sm font-semibold text-[#d3a84f] underline underline-offset-4">Back home</Link>
    </section>
  )
}

export default NotFound