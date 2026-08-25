// src/pages/Services.jsx

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    title: "HAIR SMOOTHING",
    subtitle: "SHORT TO MID LENGTH",
    description:
      "Smooth frizz, add shine and make your hair easier to manage.",
    price: "2,999",
    icon: "✦",
  },
  {
    title: "HAIR SMOOTHING",
    subtitle: "LONG LENGTH",
    description:
      "Perfect for long hair to achieve a sleek, smooth and shiny finish.",
    price: "3,499",
    icon: "✧",
  },
  {
    title: "KERATIN",
    subtitle: "ANY LENGTH",
    description:
      "Strengthen your hair, reduce frizz and bring back a natural shine.",
    price: "3,999",
    icon: "∞",
  },
  {
    title: "KERA SMOOTH",
    subtitle: "ANY LENGTH",
    description:
      "An advanced smoothing treatment for long-lasting silky hair.",
    price: "3,999",
    icon: "◇",
  },
];

const benefits = [
  {
    icon: "✦",
    title: "PREMIUM PRODUCTS",
    description: "Professional products selected for your hair.",
  },
  {
    icon: "✧",
    title: "LONG LASTING",
    description: "Smooth, manageable and beautifully finished hair.",
  },
  {
    icon: "♢",
    title: "EXPERT CARE",
    description: "Treatments performed by trained professionals.",
  },
  {
    icon: "◉",
    title: "PERSONALIZED",
    description: "Your treatment is selected according to your hair.",
  },
];

const Services = () => {
  const pageRef = useRef(null);
  const heroImageRef = useRef(null);
  const cursorRef = useRef(null);

  useEffect(() => {
    const page = pageRef.current;

    if (!page) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const ctx = gsap.context(() => {
      if (reducedMotion) {
        gsap.set(".reveal", {
          opacity: 1,
          y: 0,
          x: 0,
        });

        return;
      }

      // ============================================
      // HERO
      // ============================================

      const hero = gsap.timeline({
        defaults: {
          ease: "power3.out",
        },
      });

      hero
        .fromTo(
          heroImageRef.current,
          {
            scale: 1.12,
          },
          {
            scale: 1,
            duration: 1.8,
          }
        )
        .from(
          ".hero-label",
          {
            opacity: 0,
            y: 30,
            duration: 0.7,
          },
          "-=1"
        )
        .from(
          ".hero-title-line",
          {
            opacity: 0,
            y: 70,
            stagger: 0.12,
            duration: 0.9,
          },
          "-=0.4"
        )
        .from(
          ".hero-description",
          {
            opacity: 0,
            y: 25,
            duration: 0.7,
          },
          "-=0.4"
        )
        .from(
          ".hero-button",
          {
            opacity: 0,
            y: 20,
            duration: 0.6,
          },
          "-=0.3"
        );

      // ============================================
      // GENERIC REVEALS
      // ============================================

      gsap.utils.toArray(".reveal").forEach((element) => {
        gsap.fromTo(
          element,
          {
            opacity: 0,
            y: 50,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: element,
              start: "top 85%",
              once: true,
            },
          }
        );
      });

      // ============================================
      // SERVICE CARDS
      // ============================================

      gsap.utils.toArray(".service-card").forEach((card, index) => {
        gsap.fromTo(
          card,
          {
            opacity: 0,
            x: 40,
          },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            delay: index * 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 88%",
              once: true,
            },
          }
        );
      });

      // ============================================
      // BENEFITS
      // ============================================

      gsap.utils.toArray(".benefit").forEach((item, index) => {
        gsap.fromTo(
          item,
          {
            opacity: 0,
            y: 25,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            delay: index * 0.08,
            ease: "power3.out",
            scrollTrigger: {
              trigger: item,
              start: "top 90%",
              once: true,
            },
          }
        );
      });

      // ============================================
      // CUSTOM CURSOR
      // ============================================

      const cursor = cursorRef.current;

      if (cursor && window.innerWidth > 1024) {
        const moveCursor = (e) => {
          gsap.to(cursor, {
            x: e.clientX,
            y: e.clientY,
            duration: 0.2,
            ease: "power2.out",
          });
        };

        const interactive = page.querySelectorAll(
          "a, button, .service-card"
        );

        const enter = () => {
          gsap.to(cursor, {
            scale: 2,
            duration: 0.3,
          });
        };

        const leave = () => {
          gsap.to(cursor, {
            scale: 1,
            duration: 0.3,
          });
        };

        window.addEventListener("mousemove", moveCursor);

        interactive.forEach((item) => {
          item.addEventListener("mouseenter", enter);
          item.addEventListener("mouseleave", leave);
        });

        return () => {
          window.removeEventListener("mousemove", moveCursor);

          interactive.forEach((item) => {
            item.removeEventListener("mouseenter", enter);
            item.removeEventListener("mouseleave", leave);
          });
        };
      }
    }, page);

    return () => ctx.revert();
  }, []);

  return (
    <main
      ref={pageRef}
      className="min-h-screen overflow-hidden bg-[#100f0e] text-[#ead7a1]"
    >
      {/* ============================================
          CUSTOM CURSOR
      ============================================ */}

      <div
        ref={cursorRef}
        className="pointer-events-none fixed left-0 top-0 z-[100] hidden h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#d5b966] opacity-60 mix-blend-difference lg:block"
      />

      {/* ============================================
          HERO
      ============================================ */}

      <section className="relative min-h-screen overflow-hidden">
        {/* Replace this with your actual salon/hair image */}
        <img
          ref={heroImageRef}
          src="/images/services-hero.jpg"
          alt="Hair treatment at Aura Family Salon"
          className="absolute inset-0 h-full w-full object-cover"
        />

        {/* overlays */}
        <div className="absolute inset-0 bg-[#100f0e]/55" />

        <div className="absolute inset-0 bg-gradient-to-r from-[#100f0e] via-[#100f0e]/75 to-transparent" />

        <div className="absolute inset-0 bg-gradient-to-t from-[#100f0e] via-transparent to-[#100f0e]/30" />

        <div className="relative z-10 flex min-h-screen items-center px-6 pb-20 pt-36 md:px-12 lg:px-20">
          <div className="mx-auto w-full max-w-[1450px]">
            <div className="max-w-3xl">
              <p className="hero-label mb-7 font-sans text-[10px] font-semibold tracking-[0.35em] text-[#c9a24a] md:text-xs">
                OUR SERVICES
              </p>

              <h1 className="overflow-hidden font-serif text-[58px] font-medium leading-[0.88] tracking-[-2px] text-[#f0dda3] sm:text-[70px] md:text-[92px] lg:text-[105px]">
                <span className="hero-title-line block">
                  Beauty,
                </span>

                <span className="hero-title-line block">
                  thoughtfully
                </span>

                <span className="hero-title-line block italic text-[#d5b966]">
                  created.
                </span>
              </h1>

              <p className="hero-description mt-9 max-w-xl font-sans text-[15px] leading-7 text-[#b8aa96] md:text-[17px]">
                From everyday styling to transformative treatments, every
                service is designed around your hair, your features and your
                personal style.
              </p>

              <a
                href="#services"
                className="hero-button mt-9 inline-flex items-center gap-4 rounded-full bg-[#d5b966] px-7 py-4 font-sans text-[10px] font-bold tracking-[0.18em] text-[#17130e] transition hover:-translate-y-1 hover:bg-[#e5ca78]"
              >
                EXPLORE SERVICES
                <span>↓</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================
          INTRO
      ============================================ */}

      <section
        id="services"
        className="px-6 py-28 md:px-12 md:py-36 lg:px-20"
      >
        <div className="mx-auto max-w-[1450px]">
          <div className="reveal grid items-end gap-10 lg:grid-cols-[1fr_0.7fr]">
            <div>
              <p className="font-sans text-[10px] font-semibold tracking-[0.35em] text-[#c9a24a]">
                AURA FAMILY SALON · UNISEX MENU
              </p>

              <h2 className="mt-6 font-serif text-6xl leading-[0.88] text-[#ead7a1] md:text-8xl">
                Your hair,
                <br />
                <span className="italic text-[#d5b966]">
                  our craft.
                </span>
              </h2>
            </div>

            <p className="max-w-lg font-sans text-[15px] leading-7 text-[#958978]">
              Every service begins with understanding what you want and ends
              with attention to the smallest detail. Explore some of our most
              requested treatments below.
            </p>
          </div>
        </div>
      </section>

      {/* ============================================
          SERVICE CARDS
      ============================================ */}

      <section className="px-6 pb-28 md:px-12 md:pb-36 lg:px-20">
        <div className="mx-auto max-w-[1200px] space-y-4">
          {services.map((service, index) => (
            <article
              key={`${service.title}-${index}`}
              className="service-card group relative overflow-hidden rounded-[20px] border border-[#5a4728] bg-[#141210] transition-all duration-500 hover:border-[#c9a24a]"
            >
              {/* subtle hover glow */}
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_50%,rgba(201,162,74,0.10),transparent_40%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

              <div className="relative grid min-h-[150px] items-center gap-7 p-5 md:grid-cols-[90px_1fr_165px] md:p-7">
                {/* Icon */}
                <div className="flex h-16 w-16 items-center justify-center rounded-full border border-[#c9a24a] font-serif text-3xl text-[#d5b966] transition-transform duration-500 group-hover:rotate-12 group-hover:scale-110">
                  {service.icon}
                </div>

                {/* Content */}
                <div>
                  <h3 className="font-sans text-xl font-semibold tracking-wide text-[#f0dda3] md:text-2xl">
                    {service.title}
                  </h3>

                  <p className="mt-1 font-sans text-[10px] font-semibold tracking-[0.18em] text-[#c9a24a]">
                    {service.subtitle}
                  </p>

                  <p className="mt-3 max-w-xl font-sans text-sm leading-6 text-[#827666]">
                    {service.description}
                  </p>
                </div>

                {/* Price */}
                <div className="flex items-center justify-between gap-5 md:block">
                  <div className="rounded-[14px] bg-[#d5b966] px-6 py-4 text-center text-[#17130e] shadow-[0_0_30px_rgba(201,162,74,0.12)] transition-transform duration-500 group-hover:scale-105">
                    <p className="font-serif text-4xl font-medium leading-none md:text-5xl">
                      ₹{service.price}
                    </p>

                    <p className="mt-2 font-sans text-[8px] font-bold tracking-[0.16em]">
                      STARTING FROM
                    </p>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        <p className="mx-auto mt-7 max-w-[1200px] font-sans text-[9px] leading-5 text-[#5f5549]">
          * Prices shown are sample starting prices. Replace them with the
          salon's actual pricing before publishing.
        </p>
      </section>

      {/* ============================================
          BENEFITS
      ============================================ */}

      <section className="border-y border-[#3a3025] bg-[#151310] px-6 py-16 md:px-12 lg:px-20">
        <div className="mx-auto grid max-w-[1400px] md:grid-cols-2 lg:grid-cols-4">
          {benefits.map((benefit, index) => (
            <div
              key={benefit.title}
              className={`benefit border-b border-[#3a3025] px-5 py-8 md:border-r md:last:border-r-0 lg:border-b-0 ${
                index >= 2 ? "md:border-b-0" : ""
              }`}
            >
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[#c9a24a] font-serif text-xl text-[#d5b966]">
                  {benefit.icon}
                </div>

                <div>
                  <h3 className="font-sans text-[10px] font-semibold tracking-[0.16em] text-[#d5b966]">
                    {benefit.title}
                  </h3>

                  <p className="mt-2 font-sans text-xs leading-5 text-[#776c5d]">
                    {benefit.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ============================================
          OTHER SERVICES
      ============================================ */}

      <section className="px-6 py-28 md:px-12 md:py-36 lg:px-20">
        <div className="mx-auto max-w-[1450px]">
          <div className="reveal mb-14">
            <p className="font-sans text-[10px] font-semibold tracking-[0.35em] text-[#c9a24a]">
              EXPLORE MORE
            </p>

            <h2 className="mt-6 font-serif text-6xl leading-[0.9] text-[#ead7a1] md:text-8xl">
              More ways to
              <br />
              <span className="italic">feel beautiful.</span>
            </h2>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "HAIR CUT & STYLE",
                text: "Precision cuts and styling designed around you.",
              },
              {
                title: "HAIR COLOUR",
                text: "From subtle dimension to complete transformations.",
              },
              {
                title: "HAIR SPA",
                text: "Relax, restore and bring life back to your hair.",
              },
              {
                title: "BRIDAL MAKEUP",
                text: "Beautifully considered looks for your most important day.",
              },
              {
                title: "PARTY MAKEUP",
                text: "Polished, elegant makeup for every special occasion.",
              },
              {
                title: "BEAUTY SERVICES",
                text: "Thoughtful beauty treatments for your everyday self-care.",
              },
            ].map((item) => (
              <a
                key={item.title}
                href="/contact"
                className="group relative min-h-[220px] overflow-hidden rounded-[20px] border border-[#3a3025] bg-[#151310] p-7 transition-all duration-500 hover:-translate-y-1 hover:border-[#c9a24a]"
              >
                <span className="font-sans text-[9px] font-semibold tracking-[0.25em] text-[#c9a24a]">
                  AURA FAMILY SALON · UNISEX SALON
                </span>

                <h3 className="mt-12 font-serif text-3xl text-[#d8c895] transition-transform duration-500 group-hover:translate-x-2">
                  {item.title}
                </h3>

                <p className="mt-3 max-w-sm font-sans text-xs leading-6 text-[#716658]">
                  {item.text}
                </p>

                <span className="absolute bottom-7 right-7 text-[#c9a24a] transition-transform duration-500 group-hover:translate-x-2">
                  →
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================
          CTA
      ============================================ */}

      <section className="border-t border-[#30271f] px-6 py-32 text-center md:py-44">
        <div className="reveal mx-auto max-w-5xl">
          <p className="font-sans text-[10px] font-semibold tracking-[0.35em] text-[#c9a24a]">
            READY FOR A CHANGE?
          </p>

          <h2 className="mt-7 font-serif text-6xl leading-[0.88] text-[#ead7a1] sm:text-7xl md:text-9xl">
            Let's create
            <br />
            <span className="italic text-[#d5b966]">
              your next look.
            </span>
          </h2>

          <p className="mx-auto mt-9 max-w-lg font-sans text-[15px] leading-7 text-[#958978]">
            Tell us what you're looking for and we'll help you find the right
            service.
          </p>

          <a
            href="/contact"
            className="mt-10 inline-flex rounded-full bg-[#d5b966] px-9 py-5 font-sans text-[10px] font-bold tracking-[0.18em] text-[#17130e] transition-all duration-300 hover:-translate-y-1 hover:bg-[#e5ca78]"
          >
            BOOK AN APPOINTMENT →
          </a>
        </div>
      </section>

    </main>
  );
};

export default Services;