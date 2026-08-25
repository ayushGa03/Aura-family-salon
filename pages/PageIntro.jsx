function PageIntro({ eyebrow, title, description }) {
  return (
    <section className="mx-auto max-w-7xl px-6 pb-20 pt-24 lg:px-10 lg:pt-32">
      <p className="animate-[rise-in_600ms_ease-out_both] text-sm font-semibold uppercase tracking-[0.25em] text-[#d3a84f]">{eyebrow}</p>
      <h1 className="mt-5 max-w-3xl animate-[rise-in_700ms_100ms_ease-out_both] font-serif text-5xl leading-[0.95] text-[#f3dfaa] md:text-7xl">{title}</h1>
      <p className="mt-8 max-w-xl animate-[rise-in_700ms_200ms_ease-out_both] text-lg leading-8 text-[#c4b6a0]">{description}</p>
    </section>
  )
}

export default PageIntro