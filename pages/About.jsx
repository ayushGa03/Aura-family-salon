import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const aboutImages = {
  hero: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=2200&q=90",
  story:
    "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1600&q=90",
  experience:
    "https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&w=1600&q=90",
  makeup:
    "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?auto=format&fit=crop&w=1400&q=90",
  salon:
    "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?auto=format&fit=crop&w=2200&q=90",
};

const philosophy = [
  {
    number: "01",
    title: "PERSONAL",
    description:
      "Your style should feel like you. We listen first, then create.",
  },
  {
    number: "02",
    title: "CRAFT",
    description:
      "Great beauty is in the details — from the first consultation to the final touch.",
  },
  {
    number: "03",
    title: "CONFIDENCE",
    description:
      "The best result is not simply looking beautiful. It's leaving feeling more confident.",
  },
];

const experienceSteps = [
  {
    number: "01",
    title: "THE CONSULTATION",
    description:
      "We begin by understanding you — your style, your occasion and what you want to achieve.",
  },
  {
    number: "02",
    title: "THE CREATION",
    description:
      "Our artists bring together technique, creativity and attention to detail.",
  },
  {
    number: "03",
    title: "THE FINISH",
    description:
      "The final result should not just look beautiful. It should feel completely yours.",
  },
];

const craftItems = [
  "HAIR",
  "MAKEUP",
  "BRIDAL",
  "BEAUTY",
  "STYLING",
];

const teamMembers = [
  {
    name: "YOUR ARTIST",
    role: "Hair & Styling",
    image:
      "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=crop&w=1000&q=85",
  },
  {
    name: "YOUR ARTIST",
    role: "Makeup & Beauty",
    image:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1000&q=85",
  },
  {
    name: "YOUR ARTIST",
    role: "Bridal Artistry",
    image:
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=1000&q=85",
  },
];

const About = () => {
  const pageRef = useRef(null);
  const heroImageRef = useRef(null);
  const heroContentRef = useRef(null);
  const storyImageRef = useRef(null);
  const salonImageRef = useRef(null);
  const cursorRef = useRef(null);

  useEffect(() => {
    const page = pageRef.current;

    if (!page) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const ctx = gsap.context(() => {
      if (reducedMotion) {
        gsap.set(".reveal", { opacity: 1, y: 0 });
        gsap.set(".image-reveal", {
          opacity: 1,
          clipPath: "inset(0% 0% 0% 0%)",
        });
        return;
      }

      /* ================= HERO ================= */

      const heroTimeline = gsap.timeline({
        defaults: {
          ease: "power3.out",
        },
      });

      heroTimeline
        .fromTo(
          heroImageRef.current,
          {
            scale: 1.12,
          },
          {
            scale: 1,
            duration: 1.8,
            ease: "power3.out",
          }
        )
        .from(
          ".hero-label",
          {
            opacity: 0,
            y: 30,
            duration: 0.8,
          },
          "-=1.1"
        )
        .from(
          ".hero-line",
          {
            opacity: 0,
            y: 70,
            stagger: 0.12,
            duration: 1,
          },
          "-=0.5"
        )
        .from(
          ".hero-description",
          {
            opacity: 0,
            y: 30,
            duration: 0.8,
          },
          "-=0.55"
        )
        .from(
          ".hero-button",
          {
            opacity: 0,
            y: 20,
            duration: 0.7,
          },
          "-=0.4"
        );

      /* ================= GENERIC REVEALS ================= */

      gsap.utils.toArray(".reveal").forEach((element) => {
        gsap.fromTo(
          element,
          {
            opacity: 0,
            y: 45,
          },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: element,
              start: "top 84%",
              once: true,
            },
          }
        );
      });

      /* ================= IMAGE REVEALS ================= */

      gsap.utils.toArray(".image-reveal").forEach((element) => {
        gsap.fromTo(
          element,
          {
            opacity: 0,
            clipPath: "inset(12% 0% 12% 0%)",
            scale: 1.04,
          },
          {
            opacity: 1,
            clipPath: "inset(0% 0% 0% 0%)",
            scale: 1,
            duration: 1.25,
            ease: "power3.out",
            scrollTrigger: {
              trigger: element,
              start: "top 85%",
              once: true,
            },
          }
        );
      });

      /* ================= STORY PARALLAX ================= */

      if (storyImageRef.current) {
        gsap.to(storyImageRef.current, {
          yPercent: -7,
          ease: "none",
          scrollTrigger: {
            trigger: storyImageRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      }

      /* ================= SALON PARALLAX ================= */

      if (salonImageRef.current) {
        gsap.to(salonImageRef.current, {
          yPercent: -8,
          ease: "none",
          scrollTrigger: {
            trigger: salonImageRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      }

      /* ================= PHILOSOPHY ================= */

      gsap.utils.toArray(".philosophy-item").forEach((item, index) => {
        gsap.fromTo(
          item,
          {
            opacity: 0,
            y: 50,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            delay: index * 0.08,
            ease: "power3.out",
            scrollTrigger: {
              trigger: item,
              start: "top 85%",
              once: true,
            },
          }
        );
      });

      /* ================= EXPERIENCE ================= */

      gsap.utils.toArray(".experience-item").forEach((item, index) => {
        const line = item.querySelector(".experience-line");

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: item,
            start: "top 82%",
            once: true,
          },
        });

        tl.fromTo(
          item,
          {
            opacity: 0,
            x: index % 2 === 0 ? -35 : 35,
          },
          {
            opacity: 1,
            x: 0,
            duration: 0.9,
            ease: "power3.out",
          }
        );

        if (line) {
          tl.fromTo(
            line,
            {
              scaleX: 0,
              transformOrigin: "left center",
            },
            {
              scaleX: 1,
              duration: 0.7,
              ease: "power2.out",
            },
            "-=0.5"
          );
        }
      });

      /* ================= CRAFT ================= */

      gsap.utils.toArray(".craft-item").forEach((item, index) => {
        const number = item.querySelector(".craft-number");

        gsap.fromTo(
          item,
          {
            opacity: 0,
            y: 35,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: index * 0.06,
            ease: "power3.out",
            scrollTrigger: {
              trigger: item,
              start: "top 88%",
              once: true,
            },
          }
        );

        item.addEventListener("mouseenter", () => {
          gsap.to(number, {
            width: "100%",
            duration: 0.5,
            ease: "power2.out",
          });
        });

        item.addEventListener("mouseleave", () => {
          gsap.to(number, {
            width: "0%",
            duration: 0.5,
            ease: "power2.out",
          });
        });
      });

      /* ================= QUOTE ================= */

      gsap.fromTo(
        ".quote-line",
        {
          opacity: 0,
          y: 50,
        },
        {
          opacity: 1,
          y: 0,
          stagger: 0.12,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".quote-section",
            start: "top 70%",
            once: true,
          },
        }
      );

      /* ================= TEAM ================= */

      gsap.utils.toArray(".team-card").forEach((card, index) => {
        gsap.fromTo(
          card,
          {
            opacity: 0,
            y: 60,
          },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            delay: index * 0.12,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              once: true,
            },
          }
        );
      });

      /* ================= CURSOR ================= */

      const cursor = cursorRef.current;

      if (cursor && window.innerWidth > 1024) {
        const moveCursor = (event) => {
          gsap.to(cursor, {
            x: event.clientX,
            y: event.clientY,
            duration: 0.25,
            ease: "power2.out",
          });
        };

        const interactiveElements = page.querySelectorAll(
          "button, a, .magnetic, .team-card, .craft-item"
        );

        const enter = () => {
          gsap.to(cursor, {
            scale: 1.7,
            opacity: 1,
            duration: 0.3,
          });
        };

        const leave = () => {
          gsap.to(cursor, {
            scale: 1,
            opacity: 0.65,
            duration: 0.3,
          });
        };

        window.addEventListener("mousemove", moveCursor);

        interactiveElements.forEach((element) => {
          element.addEventListener("mouseenter", enter);
          element.addEventListener("mouseleave", leave);
        });

        return () => {
          window.removeEventListener("mousemove", moveCursor);

          interactiveElements.forEach((element) => {
            element.removeEventListener("mouseenter", enter);
            element.removeEventListener("mouseleave", leave);
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
      {/* ================= CUSTOM CURSOR ================= */}

      <div
        ref={cursorRef}
        className="pointer-events-none fixed left-0 top-0 z-[100] hidden h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#d5b966] opacity-60 mix-blend-difference lg:block"
      />

      {/* ================= HERO ================= */}

      <section className="relative min-h-[90vh] overflow-hidden">
        <div className="absolute inset-0">
          <img
            ref={heroImageRef}
            src={aboutImages.hero}
            alt="Aura Family Salon"
            className="h-full w-full object-cover"
          />

          <div className="absolute inset-0 bg-[#100f0e]/60" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#100f0e] via-[#100f0e]/65 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#100f0e] via-transparent to-[#100f0e]/30" />
        </div>

        <div className="relative z-10 flex min-h-[90vh] items-center px-6 pb-20 pt-32 md:px-12 lg:px-20">
          <div
            ref={heroContentRef}
            className="mx-auto w-full max-w-[1450px]"
          >
            <div className="max-w-4xl">
              <p className="hero-label location-label mb-8 uppercase">
                AURA FAMILY SALON · UNISEX SALON · HAZARIBAGH, JHARKHAND
              </p>

              <h1 className="overflow-hidden font-serif text-[62px] font-medium leading-[0.87] tracking-[-2px] text-[#f0dda3] sm:text-[75px] md:text-[96px] lg:text-[112px]">
                <span className="hero-line block">More than</span>
                <span className="hero-line block">a salon.</span>
                <span className="hero-line mt-3 block italic text-[#d5b966]">
                  A place to become
                </span>
                <span className="hero-line block italic text-[#d5b966]">
                  your most confident self.
                </span>
              </h1>

              <p className="hero-description mt-10 max-w-xl font-sans text-[15px] leading-7 text-[#c4b9a7] md:text-[17px]">
                Beauty is personal. And for us, every appointment is an
                opportunity to create something that feels uniquely yours.
              </p>

              <a
                href="#story"
                className="hero-button magnetic mt-9 inline-flex items-center gap-4 border-b border-[#c9a24a] pb-2 font-sans text-[11px] font-semibold tracking-[0.2em] text-[#ead7a1]"
              >
                DISCOVER OUR STORY
                <span>↓</span>
              </a>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-6 z-10 md:left-12 lg:left-20">
          <p className="font-sans text-[9px] tracking-[0.3em] text-[#807463]">
            SCROLL TO DISCOVER
          </p>
        </div>
      </section>

      {/* ================= STORY ================= */}

      <section
        id="story"
        className="px-6 py-28 md:px-12 md:py-36 lg:px-20"
      >
        <div className="mx-auto grid max-w-[1450px] items-center gap-16 lg:grid-cols-[0.8fr_1fr] lg:gap-24">
          <div className="reveal">
            <p className="font-sans text-[10px] font-semibold tracking-[0.35em] text-[#c9a24a]">
              OUR STORY
            </p>

            <h2 className="mt-7 font-serif text-5xl font-medium leading-[0.9] text-[#ead7a1] sm:text-6xl md:text-7xl">
              Beauty is not
              <br />
              <span className="italic">one-size-fits-all.</span>
            </h2>

            <div className="mt-9 space-y-6 font-sans text-[15px] leading-7 text-[#958978] md:text-[16px]">
              <p>
                At Aura Family Salon, we believe beauty should feel
                personal.
              </p>

              <p>
                Every face is different. Every style is different. Every
                occasion has its own story.
              </p>

              <p>
                That's why we approach every appointment with attention,
                creativity and an understanding of what makes you feel your
                best.
              </p>

              <p>
                From everyday styling to the most important moments of your
                life, our goal is simple — to help you look beautiful and feel
                confident.
              </p>
            </div>
          </div>

          <div className="image-reveal relative overflow-hidden rounded-[28px] border border-[#c9a24a]/20">
            <img
              ref={storyImageRef}
              src={aboutImages.story}
              alt="Aura Family Salon styling experience"
              className="aspect-[4/5] h-full w-full object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-[#100f0e]/60 to-transparent" />

            <div className="absolute bottom-6 left-6">
              <p className="font-sans text-[9px] font-semibold tracking-[0.3em] text-[#ead7a1]">
                THE AURA EXPERIENCE
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= PHILOSOPHY ================= */}

      <section className="border-y border-[#30271f] bg-[#151310] px-6 py-28 md:px-12 md:py-36 lg:px-20">
        <div className="mx-auto max-w-[1450px]">
          <div className="reveal mb-20">
            <p className="font-sans text-[10px] font-semibold tracking-[0.35em] text-[#c9a24a]">
              OUR PHILOSOPHY
            </p>

            <h2 className="mt-6 font-serif text-6xl leading-[0.9] text-[#ead7a1] md:text-8xl">
              What we
              <br />
              <span className="italic">believe.</span>
            </h2>
          </div>

          <div className="grid border-t border-[#3a3025] md:grid-cols-3">
            {philosophy.map((item) => (
              <article
                key={item.number}
                className="philosophy-item border-b border-[#3a3025] py-10 md:border-b-0 md:border-r md:px-8 md:first:pl-0 md:last:border-r-0"
              >
                <span className="font-sans text-[10px] tracking-[0.25em] text-[#6f6251]">
                  {item.number}
                </span>

                <h3 className="mt-10 font-serif text-3xl text-[#d9c895]">
                  {item.title}
                </h3>

                <p className="mt-5 max-w-sm font-sans text-sm leading-7 text-[#8f8271]">
                  {item.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ================= EXPERIENCE ================= */}

      <section className="px-6 py-28 md:px-12 md:py-36 lg:px-20">
        <div className="mx-auto grid max-w-[1450px] gap-20 lg:grid-cols-[0.7fr_1fr]">
          <div className="reveal">
            <p className="font-sans text-[10px] font-semibold tracking-[0.35em] text-[#c9a24a]">
              THE AURA EXPERIENCE
            </p>

            <h2 className="mt-6 font-serif text-6xl leading-[0.88] text-[#ead7a1] md:text-8xl">
              The Aura
              <br />
              <span className="italic">Experience.</span>
            </h2>

            <p className="mt-8 max-w-md font-sans text-[15px] leading-7 text-[#958978]">
              From the moment you walk through our doors, every detail is
              designed to make you feel comfortable, understood and cared for.
            </p>
          </div>

          <div className="space-y-0">
            {experienceSteps.map((item) => (
              <article
                key={item.number}
                className="experience-item border-t border-[#3a3025] py-10"
              >
                <div className="flex gap-7">
                  <span className="font-sans text-[10px] tracking-[0.25em] text-[#6f6251]">
                    {item.number}
                  </span>

                  <div className="flex-1">
                    <h3 className="font-sans text-xs font-semibold tracking-[0.22em] text-[#d4c28e]">
                      {item.title}
                    </h3>

                    <p className="mt-5 max-w-xl font-sans text-[15px] leading-7 text-[#958978]">
                      {item.description}
                    </p>

                    <div className="experience-line mt-8 h-px w-full bg-[#c9a24a]" />
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ================= CRAFT ================= */}

      <section className="border-y border-[#30271f] bg-[#151310] px-6 py-28 md:px-12 md:py-36 lg:px-20">
        <div className="mx-auto max-w-[1450px]">
          <div className="grid gap-14 lg:grid-cols-[0.8fr_1fr]">
            <div className="reveal">
              <p className="font-sans text-[10px] font-semibold tracking-[0.35em] text-[#c9a24a]">
                OUR CRAFT
              </p>

              <h2 className="mt-6 font-serif text-6xl leading-[0.88] text-[#ead7a1] md:text-8xl">
                Where technique
                <br />
                meets
                <br />
                <span className="italic">artistry.</span>
              </h2>

              <p className="mt-8 max-w-lg font-sans text-[15px] leading-7 text-[#958978]">
                From precision hair styling and colour to makeup and bridal
                artistry, our work combines professional technique with an eye
                for individuality.
              </p>
            </div>

            <div className="self-end">
              {craftItems.map((item, index) => (
                <div
                  key={item}
                  className="craft-item group relative flex items-center justify-between border-t border-[#3a3025] py-7"
                >
                  <div className="flex items-center gap-6">
                    <span className="font-sans text-[10px] tracking-[0.25em] text-[#665a4b]">
                      0{index + 1}
                    </span>

                    <span className="font-serif text-3xl text-[#d8c895] transition-transform duration-500 group-hover:translate-x-3 md:text-4xl">
                      {item}
                    </span>
                  </div>

                  <span className="text-xl text-[#c9a24a] transition-transform duration-500 group-hover:translate-x-2">
                    →
                  </span>

                  <span className="craft-number absolute bottom-0 left-0 h-px w-0 bg-[#c9a24a]" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ================= SALON ENVIRONMENT ================= */}

      <section className="relative h-[75vh] min-h-[550px] overflow-hidden">
        <img
          ref={salonImageRef}
          src={aboutImages.salon}
          alt="Aura Family Salon interior"
          className="absolute -top-[8%] left-0 h-[116%] w-full object-cover"
        />

        <div className="absolute inset-0 bg-[#100f0e]/45" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#100f0e]/80 via-transparent to-[#100f0e]/20" />

        <div className="relative z-10 flex h-full items-center px-6 md:px-12 lg:px-20">
          <div className="mx-auto w-full max-w-[1450px]">
            <div className="reveal max-w-2xl">
              <p className="font-sans text-[10px] font-semibold tracking-[0.35em] text-[#d5b966]">
                OUR SPACE
              </p>

              <h2 className="mt-7 font-serif text-6xl leading-[0.88] text-[#f0dda3] md:text-8xl">
                A space made
                <br />
                <span className="italic">for you.</span>
              </h2>

              <p className="mt-8 max-w-lg font-sans text-[15px] leading-7 text-[#d5c9b4]">
                A calm, considered space where beauty, conversation and
                creativity come together.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= TEAM ================= */}

      <section className="px-6 py-28 md:px-12 md:py-36 lg:px-20">
        <div className="mx-auto max-w-[1450px]">
          <div className="reveal mb-16">
            <p className="font-sans text-[10px] font-semibold tracking-[0.35em] text-[#c9a24a]">
              THE PEOPLE BEHIND THE LOOKS
            </p>

            <h2 className="mt-6 font-serif text-6xl leading-[0.9] text-[#ead7a1] md:text-8xl">
              Meet the
              <br />
              <span className="italic">artists.</span>
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {teamMembers.map((member) => (
              <article
                key={member.role}
                className="team-card group relative overflow-hidden rounded-[22px]"
              >
                <div className="relative aspect-[4/5] overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.role}
                    className="h-full w-full object-cover grayscale-[15%] transition-transform duration-700 group-hover:scale-[1.05]"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-[#100f0e]/90 via-transparent to-transparent opacity-80" />

                  <div className="absolute bottom-6 left-6 right-6">
                    <p className="font-serif text-2xl text-[#f0dda3]">
                      {member.name}
                    </p>

                    <p className="mt-1 font-sans text-[10px] font-semibold tracking-[0.2em] text-[#c9a24a]">
                      {member.role.toUpperCase()}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <p className="mt-8 font-sans text-[10px] tracking-[0.2em] text-[#62584b]">
            * Replace placeholder artist information with the salon's actual
            team details.
          </p>
        </div>
      </section>

      {/* ================= QUOTE ================= */}

      <section className="quote-section border-y border-[#30271f] bg-[#151310] px-6 py-32 text-center md:py-44">
        <div className="mx-auto max-w-5xl">
          <p className="mb-10 font-sans text-[10px] font-semibold tracking-[0.35em] text-[#c9a24a]">
            THE AURA PHILOSOPHY
          </p>

          <div className="mx-auto mb-12 h-px w-20 bg-[#c9a24a]" />

          <blockquote className="font-serif text-5xl leading-[0.95] text-[#ead7a1] sm:text-6xl md:text-8xl">
            <span className="quote-line inline-block">“Beauty becomes</span>
            <br />
            <span className="quote-line inline-block">powerful when it</span>
            <br />
            <span className="quote-line inline-block italic text-[#d5b966]">
              feels like you.”
            </span>
          </blockquote>
        </div>
      </section>

      {/* ================= VISIT ================= */}

      <section className="px-6 py-28 md:px-12 md:py-36 lg:px-20">
        <div className="mx-auto grid max-w-[1450px] gap-14 lg:grid-cols-2">
          <div className="reveal">
            <p className="font-sans text-[10px] font-semibold tracking-[0.35em] text-[#c9a24a]">
              VISIT US
            </p>

            <h2 className="mt-6 font-serif text-6xl leading-[0.88] text-[#ead7a1] md:text-8xl">
              Come
              <br />
              <span className="italic">visit us.</span>
            </h2>

            <p className="mt-8 max-w-md font-sans text-[15px] leading-7 text-[#958978]">
              Your next signature look is waiting. Visit Aura Family Salon
              in Hazaribagh, Jharkhand.
            </p>

            <div className="mt-10 space-y-3 font-sans text-sm text-[#b9ad9a]">
              <p>Gaya Motor campus, Guru Gobind Singh Rd, opposite Laxmi ply, NawabGanj, Hazaribagh, Jharkhand 825301</p>
              <a
                href="tel:+918102494117"
                className="block transition-colors hover:text-[#d5b966]"
              >
                8102494117
              </a>
              <a
                href="mailto:hello@aurafamilysalon.com"
                className="block transition-colors hover:text-[#d5b966]"
              >
                hello@aurafamilysalon.com
              </a>
            </div>

            <a
              href="https://www.google.com/maps/search/?api=1&query=X9W8%2BH5%20Hazaribagh%2C%20Jharkhand"
              className="magnetic mt-9 inline-block border-b border-[#c9a24a] pb-2 font-sans text-[10px] font-semibold tracking-[0.2em] text-[#d5b966]"
            >
              GET DIRECTIONS →
            </a>
          </div>

          <div className="flex min-h-[420px] items-center justify-center rounded-[28px] border border-[#3a3025] bg-[#151310]">
            <div className="text-center">
              <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full border border-[#c9a24a]/50 text-[#c9a24a]">
                +
              </div>

              <p className="font-serif text-3xl text-[#d8c895]">
                Gaya Motor campus, Guru Gobind Singh Rd
              </p>

              <p className="mt-3 font-sans text-xs tracking-[0.15em] text-[#75695a]">
                MAP LOCATION
              </p>

              <p className="mt-6 max-w-xs font-sans text-xs leading-6 text-[#655b4e]">
                X9W8+H5 Hazaribagh, Jharkhand
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FINAL CTA ================= */}

      <section className="relative overflow-hidden border-t border-[#30271f] px-6 py-32 text-center md:py-40">
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#8c6226]/10 blur-[150px]" />

        <div className="relative z-10 mx-auto max-w-5xl">
          <p className="location-label uppercase">
            AURA FAMILY SALON · UNISEX SALON · HAZARIBAGH, JHARKHAND
          </p>

          <h2 className="mt-7 font-serif text-6xl leading-[0.88] text-[#ead7a1] sm:text-7xl md:text-9xl">
            Come as you are.
            <br />
            Leave as your
            <br />
            <span className="italic text-[#d5b966]">signature self.</span>
          </h2>

          <p className="mx-auto mt-9 max-w-lg font-sans text-[15px] leading-7 text-[#958978]">
            Ready for your next look? Let's create something that feels
            completely yours.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <a
              href="/contact"
              className="magnetic rounded-full bg-[#d5b966] px-8 py-4 font-sans text-[10px] font-bold tracking-[0.16em] text-[#17130e] transition-all duration-300 hover:-translate-y-1 hover:bg-[#e5ca78]"
            >
              BOOK AN APPOINTMENT →
            </a>

            <a
              href="https://wa.me/918102494117?text=Hello%20Aura%20Family%20Salon%2C%20I%20would%20like%20to%20know%20more%20about%20your%20services."
              target="_blank"
              rel="noreferrer"
              className="magnetic rounded-full border border-[#c9a24a]/60 px-8 py-4 font-sans text-[10px] font-semibold tracking-[0.16em] text-[#d5b966] transition-all duration-300 hover:bg-[#c9a24a]/10"
            >
              WHATSAPP US
            </a>
          </div>
        </div>
      </section>

    </main>
  );
};

export default About;