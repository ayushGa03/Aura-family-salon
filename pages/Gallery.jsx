import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// =====================================================
// GALLERY DATA
// =====================================================

const galleryItems = [
  {
    id: 1,
    category: 'bridal',
    title: 'The Royal Bride',
    image:
      'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=85',
  },
  {
    id: 2,
    category: 'hair',
    title: 'Signature Styling',
    image:
      'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1000&q=85',
  },
  {
    id: 3,
    category: 'makeup',
    title: 'Soft Focus',
    image:
      'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?auto=format&fit=crop&w=1200&q=85',
  },
  {
    id: 4,
    category: 'beauty',
    title: 'The Glow Ritual',
    image:
      'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=1200&q=85',
  },
  {
    id: 5,
    category: 'bridal',
    title: 'Golden Hour',
    image:
      'https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=1200&q=85',
  },
  {
    id: 6,
    category: 'salon',
    title: 'In The Chair',
    image:
      'https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&w=1200&q=85',
  },
  {
    id: 7,
    category: 'hair',
    title: 'Movement & Light',
    image:
      'https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?auto=format&fit=crop&w=1200&q=85',
  },
  {
    id: 8,
    category: 'makeup',
    title: 'A Quiet Statement',
    image:
      'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=1200&q=85',
  },
  {
    id: 9,
    category: 'beauty',
    title: 'Barely There',
    image:
      'https://images.unsplash.com/photo-1552693673-1bf958298935?auto=format&fit=crop&w=1200&q=85',
  },
  {
    id: 10,
    category: 'salon',
    title: 'The Finishing Touch',
    image:
      'https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=1200&q=85',
  },
  {
    id: 11,
    category: 'bridal',
    title: 'Before The Vows',
    image:
      'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=85',
  },
  {
    id: 12,
    category: 'hair',
    title: 'The New Length',
    image:
      'https://images.unsplash.com/photo-1519699047748-de8e457a634e?auto=format&fit=crop&w=1200&q=85',
  },
]

// =====================================================
// BEFORE / AFTER IMAGES
//
// Put your own images here:
//
// public/transformation-before.jpg
// public/transformation-after.jpg
//
// BEFORE:
// Woman with natural / frizzy / unstyled hair
//
// AFTER:
// Same or similar woman with polished salon hair
// =====================================================

const transformation = {
  before: '/transformation-before.jpg',
  after: '/transformation-after.jpg',
}

// =====================================================
// CATEGORIES
// =====================================================

const categories = [
  'all',
  'bridal',
  'makeup',
  'hair',
  'beauty',
  'salon',
]

// =====================================================
// GALLERY CARD
// =====================================================

function GalleryCard({
  item,
  index,
  onOpen,
  onCursor,
}) {
  const wide = index % 5 === 2

  return (
    <button
      type="button"
      onClick={() => onOpen(item)}
      onMouseEnter={() => onCursor(true)}
      onMouseLeave={() => onCursor(false)}
      className={`
        gallery-card
        group
        relative
        w-full
        overflow-hidden
        rounded-[22px]
        border
        border-[#3a3025]
        text-left
        transition-colors
        duration-500
        hover:border-[#c9a24a]

        ${index % 5 === 0 ? 'md:row-span-2' : ''}
        ${wide ? 'md:col-span-2' : ''}
      `}
    >
      <img
        src={item.image}
        alt={item.title}
        loading="lazy"
        className={`
          h-full
          min-h-[300px]
          w-full
          object-cover
          transition
          duration-700
          group-hover:scale-[1.06]
          group-hover:brightness-110

          ${
            wide
              ? 'aspect-[16/8]'
              : index % 5 === 0
                ? 'aspect-[4/7]'
                : 'aspect-[4/5]'
          }
        `}
      />

      <span className="absolute inset-0 bg-gradient-to-t from-[#100f0e]/90 via-transparent to-transparent transition duration-500 group-hover:from-[#100f0e]/95" />

      <span className="absolute bottom-6 left-6 right-6 translate-y-3 opacity-0 transition duration-500 group-hover:translate-y-0 group-hover:opacity-100">
        <span className="block text-[10px] font-semibold uppercase tracking-[0.24em] text-[#c9a24a]">
          {item.category}
        </span>

        <span className="mt-2 block font-serif text-3xl font-medium text-[#f0dda3]">
          {item.title}{' '}
          <span className="text-xl">
            →
          </span>
        </span>
      </span>
    </button>
  )
}

// =====================================================
// GALLERY
// =====================================================

function Gallery() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [selectedItem, setSelectedItem] = useState(null)
  const [cursorActive, setCursorActive] = useState(false)

  // Before / After slider
  const [sliderValue, setSliderValue] = useState(50)

  const pageRef = useRef(null)
  const cursorRef = useRef(null)
  const gridRef = useRef(null)
  const sequenceRef = useRef(null)

  // ===================================================
  // FILTER
  // ===================================================

  const filteredItems =
    activeCategory === 'all'
      ? galleryItems
      : galleryItems.filter(
          (item) => item.category === activeCategory
        )

  // ===================================================
  // GSAP ANIMATIONS
  // ===================================================

  useEffect(() => {
    const refreshTriggers = () => ScrollTrigger.refresh()
    const context = gsap.context(() => {
      const reducedMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)'
      ).matches

      if (reducedMotion) return

      // HERO

      gsap.from(
        '.gallery-hero-copy > *, .gallery-hero-image',
        {
          opacity: 0,
          y: 24,
          duration: 1,
          stagger: 0.12,
          ease: 'power3.out',
        }
      )

      // GENERAL REVEALS

      gsap.utils.toArray('.gallery-reveal').forEach((element) => {
        gsap.from(element, {
          opacity: 0,
          y: 50,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: element,
            start: 'top 82%',
            once: true,
          },
        })
      })

      // BEFORE AFTER SECTION

      gsap.from('.transformation-copy', {
        opacity: 0,
        x: -50,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.transformation-section',
          start: 'top 75%',
        },
      })

      gsap.from('.transformation-image', {
        opacity: 0,
        x: 50,
        scale: 0.96,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.transformation-section',
          start: 'top 75%',
        },
      })

      // HORIZONTAL SEQUENCE

      if (window.innerWidth >= 768 && sequenceRef.current) {
        const sequence = sequenceRef.current
        const distance = Math.max(
          0,
          sequence.scrollWidth - window.innerWidth
        )

        gsap.to(sequenceRef.current, {
          x: -distance,
          ease: 'none',
          scrollTrigger: {
            trigger: sequence.parentElement,
            start: 'top top',
            end: `+=${Math.max(window.innerHeight, distance * 1.15)}`,
            scrub: true,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        })
      }

      window.addEventListener('load', refreshTriggers)
      setTimeout(refreshTriggers, 300)
    }, pageRef)

    return () => {
      window.removeEventListener('load', refreshTriggers)
      context.revert()
    }
  }, [])

  // ===================================================
  // LIGHTBOX KEYBOARD
  // ===================================================

  useEffect(() => {
    if (!selectedItem) return undefined

    const handleKey = (event) => {
      const currentIndex =
        galleryItems.findIndex(
          (item) => item.id === selectedItem.id
        )

      if (event.key === 'Escape') {
        setSelectedItem(null)
      }

      if (event.key === 'ArrowRight') {
        setSelectedItem(
          galleryItems[
            (currentIndex + 1) %
              galleryItems.length
          ]
        )
      }

      if (event.key === 'ArrowLeft') {
        setSelectedItem(
          galleryItems[
            (currentIndex -
              1 +
              galleryItems.length) %
              galleryItems.length
          ]
        )
      }
    }

    document.body.style.overflow = 'hidden'

    window.addEventListener(
      'keydown',
      handleKey
    )

    return () => {
      document.body.style.overflow = ''

      window.removeEventListener(
        'keydown',
        handleKey
      )
    }
  }, [selectedItem])

  // ===================================================
  // CUSTOM CURSOR
  // ===================================================

  useEffect(() => {
    const moveCursor = (event) => {
      if (cursorRef.current) {
        gsap.to(cursorRef.current, {
          x: event.clientX,
          y: event.clientY,
          duration: 0.35,
          ease: 'power2.out',
        })
      }
    }

    window.addEventListener(
      'mousemove',
      moveCursor
    )

    return () =>
      window.removeEventListener(
        'mousemove',
        moveCursor
      )
  }, [])

  // ===================================================
  // CATEGORY
  // ===================================================

  const changeCategory = (category) => {
    setActiveCategory(category)

    if (gridRef.current) {
      gsap.fromTo(
        gridRef.current.children,
        {
          opacity: 0,
          y: 20,
          scale: 0.98,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.55,
          stagger: 0.05,
          ease: 'power3.out',
        }
      )
    }
  }

  // ===================================================
  // LIGHTBOX
  // ===================================================

  const moveLightbox = (direction) => {
    const currentIndex =
      galleryItems.findIndex(
        (item) => item.id === selectedItem.id
      )

    setSelectedItem(
      galleryItems[
        (currentIndex +
          direction +
          galleryItems.length) %
          galleryItems.length
      ]
    )
  }

  // ===================================================
  // RENDER
  // ===================================================

  return (
    <main
      ref={pageRef}
      className="min-h-screen overflow-hidden bg-[#100f0e] text-[#f0dda3]"
    >
      {/* =================================================
          HERO
      ================================================= */}

      <section className="mx-auto grid min-h-[calc(90vh-76px)] max-w-[1440px] items-center gap-14 px-6 py-16 md:px-12 lg:grid-cols-[0.9fr_0.8fr] lg:gap-24 lg:px-20 lg:py-20">

        <div className="gallery-hero-copy max-w-2xl">

          <p className="location-label uppercase">
            AURA FAMILY SALON · HAZARIBAGH,
            JHARKHAND
          </p>

          <h1 className="mt-7 font-serif text-[4rem] font-medium leading-[0.9] tracking-[-1.5px] sm:text-7xl lg:text-[98px] lg:tracking-[-2px]">

            A collection
            <br />

            of moments
            <br />

            <span className="italic">
              made beautiful.
            </span>

          </h1>

          <p className="mt-8 max-w-lg text-[15px] leading-[1.65] text-[#b9ae99] sm:text-[17px]">
            A glimpse into our world of
            bridal artistry, beauty, hair
            and transformations — captured
            one signature look at a time.
          </p>

          <a
            href="#lookbook"
            className="mt-9 inline-flex border-b border-[#c9a24a] pb-2 text-[12px] font-semibold uppercase tracking-[0.2em] text-[#f0dda3]"
          >
            View the lookbook
            <span className="ml-3">
              ↓
            </span>
          </a>

        </div>

        <div className="gallery-hero-image relative mx-auto w-full max-w-[470px] overflow-hidden rounded-[28px] border border-[#c9a24a]/55 p-2">

          <div className="overflow-hidden rounded-[21px]">

            <img
              src={galleryItems[0].image}
              alt="Indian bridal beauty editorial"
              className="aspect-[4/5] h-full w-full object-cover transition-transform duration-700 hover:scale-[1.03]"
            />

          </div>

          <p className="absolute bottom-7 left-8 text-[10px] font-semibold uppercase tracking-[0.25em] text-[#f0dda3]">
            01 — The Aura Signature
          </p>

        </div>

      </section>

      {/* =================================================
          FILTER
      ================================================= */}

      <section
        id="lookbook"
        className="sticky top-[76px] z-20 border-y border-[#3a3025] bg-[#100f0e]/90 px-6 py-5 backdrop-blur-xl md:px-12"
      >

        <div className="mx-auto flex max-w-[1440px] gap-7 overflow-x-auto md:gap-10">

          {categories.map((category) => (

            <button
              type="button"
              key={category}
              onClick={() =>
                changeCategory(category)
              }
              className={`
                whitespace-nowrap
                text-[11px]
                font-semibold
                uppercase
                tracking-[0.22em]
                transition-colors

                ${
                  activeCategory === category
                    ? 'border-b border-[#c9a24a] pb-2 text-[#f0dda3]'
                    : 'text-[#958978] hover:text-[#f0dda3]'
                }
              `}
            >
              {category}
            </button>

          ))}

        </div>

      </section>

      {/* =================================================
          LOOKBOOK
      ================================================= */}

      <section className="px-6 py-24 md:px-12 lg:px-20 lg:py-32">

        <div className="mx-auto max-w-[1440px]">

          <div className="gallery-reveal mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end">

            <div>

              <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#c9a24a]">
                The lookbook
              </p>

              <h2 className="mt-5 font-serif text-5xl leading-[0.9] sm:text-6xl">
                A mood,
                <br />
                <span className="italic">
                  in motion.
                </span>
              </h2>

            </div>

            <p className="max-w-sm text-[14px] leading-7 text-[#958978]">
              Every image holds a little of the
              Aura Family point of view:
              considered, personal and made
              to last beyond the moment.
            </p>

          </div>

          <div
            ref={gridRef}
            className="grid auto-rows-[minmax(220px,auto)] gap-5 md:grid-cols-3 md:grid-rows-[260px_260px_260px]"
          >

            {filteredItems.map(
              (item, index) => (

                <GalleryCard
                  key={item.id}
                  item={item}
                  index={index}
                  onOpen={setSelectedItem}
                  onCursor={setCursorActive}
                />

              )
            )}

          </div>

        </div>

      </section>

      {/* =================================================
          BRIDAL FEATURE
      ================================================= */}

      <section className="gallery-reveal relative min-h-[80vh] overflow-hidden border-y border-[#3a3025]">

        <img
          src={galleryItems[10].image}
          alt="Bridal editorial portrait"
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-[#100f0e]/95 via-[#100f0e]/45 to-[#100f0e]/20" />

        <div className="relative mx-auto flex min-h-[80vh] max-w-[1440px] items-center px-6 py-24 md:px-12 lg:px-20">

          <div className="max-w-2xl">

            <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#c9a24a]">
              The bridal edit
            </p>

            <h2 className="mt-7 font-serif text-6xl leading-[0.88] sm:text-8xl">

              For the moments
              <br />

              that deserve
              <br />

              <span className="italic">
                to be remembered.
              </span>

            </h2>

            <p className="mt-8 max-w-lg text-[15px] leading-7 text-[#ded2bd]">
              From the first brush stroke to
              the final detail, every bridal look
              is created with intention,
              personality and elegance.
            </p>

            <Link
              to="/bridal"
              className="mt-9 inline-block border-b border-[#c9a24a] pb-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#f0dda3]"
            >
              Explore bridal →
            </Link>

          </div>

        </div>

      </section>

      {/* =================================================
          BEFORE / AFTER TRANSFORMATION
      ================================================= */}

      <section
        className="
          transformation-section
          border-b
          border-[#3a3025]
          px-6
          py-28
          md:px-12
          lg:px-20
          lg:py-36
        "
      >

        <div className="mx-auto grid max-w-[1200px] items-center gap-14 lg:grid-cols-[0.75fr_1.25fr]">

          {/* LEFT CONTENT */}

          <div className="transformation-copy">

            <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#c9a24a]">
              The transformation
            </p>

            <h2 className="mt-6 font-serif text-6xl leading-[0.9] sm:text-7xl lg:text-8xl">

              Before
              <br />

              <span className="italic text-[#d5b966]">
                & after.
              </span>

            </h2>

            <p className="mt-8 max-w-sm text-[15px] leading-7 text-[#958978]">
              Sometimes all it takes is the
              right cut, colour and care to
              reveal a completely different
              version of your style.
            </p>

            <div className="mt-10 flex items-center gap-4">

              <div className="h-px w-12 bg-[#c9a24a]" />

              <p className="text-[9px] font-semibold uppercase tracking-[0.25em] text-[#706454]">
                DRAG TO TRANSFORM
              </p>

            </div>

          </div>

          {/* BEFORE AFTER IMAGE */}

          <div className="transformation-image">

            <div className="relative aspect-[4/5] overflow-hidden rounded-[24px] border border-[#c9a24a]/40 bg-[#151310] md:aspect-[16/10]">

              {/* ========================================
                   AFTER IMAGE
              ======================================== */}

              <img
                src={transformation.after}
                alt="After salon transformation"
                className="absolute inset-0 h-full w-full object-cover"
              />

              {/* ========================================
                   BEFORE IMAGE
              ======================================== */}

              <div
                className="absolute inset-y-0 left-0 overflow-hidden"
                style={{
                  width: `${sliderValue}%`,
                }}
              >

                <img
                  src={transformation.before}
                  alt="Before salon transformation"
                  className="h-full w-full max-w-none object-cover"
                />

              </div>

              {/* ========================================
                   DARK GRADIENT
              ======================================== */}

              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#100f0e]/50 via-transparent to-transparent" />

              {/* ========================================
                   SLIDER DIVIDER
              ======================================== */}

              <div
                className="pointer-events-none absolute inset-y-0 z-10 border-l border-[#f0dda3]"
                style={{
                  left: `${sliderValue}%`,
                }}
              >

                <span className="absolute left-1/2 top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-[#f0dda3] bg-[#100f0e]/85 text-lg text-[#f0dda3] shadow-[0_0_30px_rgba(0,0,0,0.5)]">

                  ↔

                </span>

              </div>

              {/* ========================================
                   BEFORE LABEL
              ======================================== */}

              <div className="absolute left-5 top-5 z-20">

                <span className="rounded-full border border-[#f0dda3]/50 bg-[#100f0e]/60 px-4 py-2 text-[9px] font-semibold uppercase tracking-[0.2em] text-[#f0dda3] backdrop-blur-md">
                  BEFORE
                </span>

              </div>

              {/* ========================================
                   AFTER LABEL
              ======================================== */}

              <div className="absolute right-5 top-5 z-20">

                <span className="rounded-full border border-[#f0dda3]/50 bg-[#100f0e]/60 px-4 py-2 text-[9px] font-semibold uppercase tracking-[0.2em] text-[#f0dda3] backdrop-blur-md">
                  AFTER
                </span>

              </div>

              {/* ========================================
                   BEFORE / AFTER RANGE
              ======================================== */}

              <input
                aria-label="Compare before and after"
                type="range"
                min="0"
                max="100"
                value={sliderValue}
                onChange={(event) =>
                  setSliderValue(
                    event.target.value
                  )
                }
                className="
                  absolute
                  inset-0
                  z-30
                  h-full
                  w-full
                  cursor-ew-resize
                  opacity-0
                "
              />

            </div>

            {/* SMALL CAPTIONS */}

            <div className="mt-5 flex justify-between text-[9px] font-semibold uppercase tracking-[0.22em]">

              <span className="text-[#766b5c]">
                Natural / Before
              </span>

              <span className="text-[#c9a24a]">
                Aura Family Finish
              </span>

            </div>

          </div>

        </div>

      </section>

      {/* =================================================
          HORIZONTAL IMAGE SEQUENCE
      ================================================= */}

      <section className="gallery-sequence overflow-hidden border-y border-[#3a3025] bg-[#151310]">

        <div
          ref={sequenceRef}
          className="flex min-h-[70vh] w-full flex-col md:h-[70vh] md:w-[180%] md:flex-row"
        >

          {[galleryItems[0], galleryItems[1], galleryItems[3]].map(
            (item, index) => (

              <div
                key={item.id}
                className="relative h-[55vh] w-full shrink-0 overflow-hidden border-b border-[#3a3025] md:h-[70vh] md:w-1/3 md:border-b-0 md:border-r"
              >

                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition duration-700 hover:scale-[1.03]"
                />

                <div className="absolute inset-0 bg-[#100f0e]/20" />

                <p className="absolute bottom-8 left-6 text-[10px] font-semibold uppercase tracking-[0.25em] text-[#f0dda3] md:left-12">
                  0{index + 1} — {item.category}
                </p>

              </div>

            )
          )}

        </div>

      </section>

      {/* =================================================
          INSTAGRAM / MORE LOOKS
      ================================================= */}

      <section className="gallery-reveal px-6 py-24 md:px-12 lg:px-20 lg:py-32">

        <div className="mx-auto max-w-[1440px]">

          <div className="flex flex-col justify-between gap-6 border-b border-[#3a3025] pb-10 md:flex-row md:items-end">

            <div>

              <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#c9a24a]">
                Follow the transformation.
              </p>

              <h2 className="mt-5 font-serif text-6xl leading-[0.9]">

                More looks,
                <br />

                <span className="italic">
                  more moments.
                </span>

              </h2>

            </div>

            <p className="max-w-xs text-[14px] leading-7 text-[#958978]">
              More looks, more moments,
              more Aura.
            </p>

          </div>

          <div className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-3">

            {galleryItems
              .slice(2, 8)
              .map((item) => (

                <img
                  key={item.id}
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  className="aspect-square w-full object-cover transition duration-700 hover:scale-[1.02]"
                />

              ))}

          </div>

          <a
            href="https://instagram.com/AURAFAMILYSALON"
            target="_blank"
            rel="noreferrer"
            className="mt-10 inline-block border-b border-[#c9a24a] pb-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#f0dda3]"
          >
            Follow @AURAFAMILYSALON →
          </a>

        </div>

      </section>

      {/* =================================================
          FINAL CTA
      ================================================= */}

      <section className="border-t border-[#3a3025] px-6 py-28 text-center md:px-12 lg:py-36">

        <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#c9a24a]">
          Your next look starts here
        </p>

        <h2 className="mx-auto mt-7 max-w-4xl font-serif text-6xl leading-[0.88] sm:text-8xl">

          Ready to create
          <br />

          <span className="italic">
            your signature look?
          </span>

        </h2>

        <Link
          to="/contact"
          className="mt-12 inline-flex rounded-full bg-[#d5a94f] px-8 py-4 text-[12px] font-semibold uppercase tracking-[0.14em] text-[#100f0e] transition hover:-translate-y-1 hover:bg-[#f0dda3]"
        >
          Book an appointment →
        </Link>

        <p className="mt-8 text-[12px] tracking-wide text-[#958978]">
          8102494117

          <span className="mx-3 text-[#3a3025]">
            |
          </span>

          hello@aurafamilysalon.com
        </p>

      </section>

      {/* =================================================
          CUSTOM CURSOR
      ================================================= */}

      <div
        ref={cursorRef}
        className={`
          pointer-events-none
          fixed
          left-0
          top-0
          z-[60]
          hidden
          h-16
          w-16
          -translate-x-1/2
          -translate-y-1/2
          items-center
          justify-center
          rounded-full
          border
          border-[#f0dda3]
          text-[9px]
          font-semibold
          uppercase
          tracking-[0.15em]
          transition-colors
          duration-300
          md:flex

          ${
            cursorActive
              ? 'bg-[#f0dda3] text-[#100f0e]'
              : 'text-[#f0dda3]'
          }
        `}
      >
        View
      </div>

      {/* =================================================
          LIGHTBOX
      ================================================= */}

      {selectedItem && (

        <div
          className="fixed inset-0 z-[70] flex items-center justify-center bg-[#0a0807]/[.96] p-5 md:p-12"
          onClick={() =>
            setSelectedItem(null)
          }
        >

          <button
            type="button"
            onClick={() =>
              setSelectedItem(null)
            }
            aria-label="Close gallery image"
            className="absolute right-4 top-4 z-10 flex h-12 w-12 items-center justify-center rounded-full border border-[#c9a24a]/60 bg-[#100f0e] text-3xl font-light leading-none text-[#f0dda3] transition hover:text-white"
          >
            ×
          </button>

          <div
            className="relative flex h-full w-full max-w-6xl flex-col items-center justify-center"
            onClick={(event) =>
              event.stopPropagation()
            }
          >

            <img
              src={selectedItem.image}
              alt={selectedItem.title}
              className="max-h-[76vh] max-w-full object-contain"
            />

            <div className="mt-5 flex w-full flex-col justify-between gap-5 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#b9ae99] sm:flex-row">

              <p>

                <span className="text-[#c9a24a]">
                  {String(
                    selectedItem.id
                  ).padStart(2, '0')}{' '}
                  / 12
                </span>

                <br />

                <span className="mt-2 inline-block text-[#f0dda3]">
                  {selectedItem.title}
                </span>

                {' · '}

                {selectedItem.category}

              </p>

              <div className="flex gap-5">

                <button
                  type="button"
                  onClick={() =>
                    moveLightbox(-1)
                  }
                  className="hover:text-[#f0dda3]"
                >
                  ← Previous
                </button>

                <button
                  type="button"
                  onClick={() =>
                    moveLightbox(1)
                  }
                  className="hover:text-[#f0dda3]"
                >
                  Next →
                </button>

              </div>

            </div>

          </div>

        </div>

      )}

    </main>
  )
}

export default Gallery