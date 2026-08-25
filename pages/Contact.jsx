import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ======================================================
// CONFIG — Replace these with the salon's real details
// ======================================================

const CONTACT = {
  phoneDisplay: "8102494117",
  phoneLink: "+918102494117",
  email: "hello@aurafamilysalon.com",
  whatsapp: "918102494117",
  address: "Gaya Motor campus, Guru Gobind Singh Rd, opposite Laxmi ply, NawabGanj, Hazaribagh, Jharkhand 825301",
  mapUrl: "https://www.google.com/maps/search/?api=1&query=X9W8%2BH5%20Hazaribagh%2C%20Jharkhand",
};

const services = [
  "Hair",
  "Hair Colour",
  "Hair Treatments",
  "Makeup",
  "Bridal",
  "Beauty",
  "Other",
];

const openingHours = [
  { day: "Monday", time: "[9:00 AM – 9:00 PM]" },
  { day: "Tuesday", time: "[9:00 AM – 9:00 PM]" },
  { day: "Wednesday", time: "[9:00 AM – 9:00 PM]" },
  { day: "Thursday", time: "[9:00 AM – 9:00 PM]" },
  { day: "Friday", time: "[9:00 AM – 9:00 PM]" },
  { day: "Saturday", time: "[9:00 AM – 9:00 PM]" },
  { day: "Sunday", time: "[9:00 AM – 9:00 PM]" },
];

const faqs = [
  {
    question: "How do I book an appointment?",
    answer:
      "Contact us directly by phone or WhatsApp to discuss your appointment.",
  },
  {
    question: "Do I need an appointment for a consultation?",
    answer:
      "For the best experience, we recommend contacting the salon before visiting so we can guide you according to your requirement.",
  },
  {
    question: "Can I book bridal makeup in advance?",
    answer:
      "Yes. Bridal appointments are best discussed in advance so we can understand your requirements and availability.",
  },
  {
    question: "How should I prepare for my appointment?",
    answer:
      "Preparation depends on the service. Our team can guide you on what to do before your appointment.",
  },
  {
    question: "What services do you offer?",
    answer:
      "Aura Family Salon offers hair, makeup, bridal and beauty services. Visit our Services page to explore them.",
  },
  {
    question: "Can I contact the salon through WhatsApp?",
    answer:
      "Yes. WhatsApp is available for quick enquiries and appointment-related conversations.",
  },
];

const SectionLabel = ({ children, className = '' }) => (
  <p className={`font-sans text-[10px] font-semibold tracking-[0.35em] text-[#c9a24a] ${className}`}>
    {children}
  </p>
);

function InputField({ label, name, value, onChange, placeholder, type = "text", required = false, error }) {
  return (
    <div className="group">
      <label htmlFor={name} className="mb-3 block font-sans text-[9px] font-semibold tracking-[0.25em] text-[#8e806e]">
        {label}{required && <span className="ml-1 text-[#c9a24a]">*</span>}
      </label>
      <input id={name} name={name} type={type} value={value} onChange={onChange} placeholder={placeholder} className={`w-full border-b bg-transparent px-0 py-3 font-sans text-sm text-[#ead7a1] outline-none transition-all duration-300 placeholder:text-[#514a41] ${error ? "border-[#a95d5d]" : "border-[#3a3025] focus:border-[#c9a24a]"}`} />
      {error && <p className="mt-2 font-sans text-[10px] text-[#c98585]">{error}</p>}
    </div>
  );
}

function SelectField({ label, name, value, onChange, options, error }) {
  return (
    <div>
      <label htmlFor={name} className="mb-3 block font-sans text-[9px] font-semibold tracking-[0.25em] text-[#8e806e]">
        {label}<span className="ml-1 text-[#c9a24a]">*</span>
      </label>
      <select id={name} name={name} value={value} onChange={onChange} className={`w-full border-b bg-[#100f0e] px-0 py-3 font-sans text-sm outline-none transition-all duration-300 ${value ? "text-[#ead7a1]" : "text-[#514a41]"} ${error ? "border-[#a95d5d]" : "border-[#3a3025] focus:border-[#c9a24a]"}`}>
        <option value="">Select a service</option>
        {options.map((option) => <option key={option} value={option}>{option}</option>)}
      </select>
      {error && <p className="mt-2 font-sans text-[10px] text-[#c98585]">{error}</p>}
    </div>
  )
}

const Contact = () => {
  const pageRef = useRef(null);
  const cursorRef = useRef(null);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    service: "",
    date: "",
    time: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  useEffect(() => {
    const page = pageRef.current;
    if (!page) return undefined;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const ctx = gsap.context(() => {
      if (reducedMotion) {
        gsap.set(".reveal, .hero-label, .hero-line, .hero-description, .hero-meta", {
          opacity: 1,
          y: 0,
        });
        return;
      }

      const heroTimeline = gsap.timeline({ defaults: { ease: "power3.out" } });

      heroTimeline
        .from(".hero-label", { opacity: 0, y: 25, duration: 0.7 })
        .from(".hero-line", { opacity: 0, y: 55, stagger: 0.1, duration: 0.85 }, "-=0.35")
        .from(".hero-description", { opacity: 0, y: 25, duration: 0.7 }, "-=0.45")
        .from(".hero-meta", { opacity: 0, y: 20, duration: 0.6 }, "-=0.35");

      // ---------------- GENERIC REVEALS ----------------

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
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: element,
              start: "top 84%",
              once: true,
            },
          }
        );
      });

      // ---------------- CONTACT COLUMNS ----------------

      gsap.fromTo(
        ".booking-left",
        {
          opacity: 0,
          x: -40,
        },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".booking-section",
            start: "top 75%",
            once: true,
          },
        }
      );

      gsap.fromTo(
        ".booking-form",
        {
          opacity: 0,
          x: 40,
        },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          delay: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".booking-section",
            start: "top 75%",
            once: true,
          },
        }
      );

      // ---------------- CONTACT CARDS ----------------

      gsap.utils.toArray(".contact-card").forEach((card, index) => {
        gsap.fromTo(
          card,
          {
            opacity: 0,
            y: 30,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
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

      // ---------------- HOURS ----------------

      gsap.utils.toArray(".hour-row").forEach((row, index) => {
        gsap.fromTo(
          row,
          {
            opacity: 0,
            x: 25,
          },
          {
            opacity: 1,
            x: 0,
            duration: 0.6,
            delay: index * 0.05,
            ease: "power3.out",
            scrollTrigger: {
              trigger: row,
              start: "top 90%",
              once: true,
            },
          }
        );
      });

      // ---------------- FAQ ----------------

      gsap.utils.toArray(".faq-item").forEach((item, index) => {
        gsap.fromTo(
          item,
          {
            opacity: 0,
            y: 25,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.65,
            delay: index * 0.05,
            ease: "power3.out",
            scrollTrigger: {
              trigger: item,
              start: "top 90%",
              once: true,
            },
          }
        );
      });

      // ---------------- CUSTOM CURSOR ----------------

      const cursor = cursorRef.current;

      if (cursor && window.innerWidth > 1024) {
        const moveCursor = (event) => {
          gsap.to(cursor, {
            x: event.clientX,
            y: event.clientY,
            duration: 0.22,
            ease: "power2.out",
          });
        };

        const interactiveElements = page.querySelectorAll(
          "a, button, input, select, textarea"
        );

        const enter = () => {
          gsap.to(cursor, {
            scale: 2.2,
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

  // ======================================================
  // Form Handlers
  // ======================================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Please enter your name.";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Please enter your phone number.";
    } else if (formData.phone.replace(/\D/g, "").length < 10) {
      newErrors.phone = "Please enter a valid phone number.";
    }

    if (!formData.service) {
      newErrors.service = "Please select a service.";
    }

    if (!formData.date) {
      newErrors.date = "Please select a preferred date.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    // Replace this with your backend API later.
    await new Promise((resolve) => setTimeout(resolve, 700));

    setSubmitted(true);

    window.scrollTo({
      top: document.querySelector(".booking-section")?.offsetTop - 80,
      behavior: "smooth",
    });
  };

  const resetForm = () => {
    setFormData({
      name: "",
      phone: "",
      email: "",
      service: "",
      date: "",
      time: "",
      message: "",
    });

    setErrors({});
    setSubmitted(false);
  };

  const whatsappUrl = `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent("Hello Aura Family Salon, I would like to know more about your services.")}`;
  const showAppointmentForm = false;

  return (
    <main
      ref={pageRef}
      className="min-h-screen overflow-hidden bg-[#100f0e] text-[#ead7a1]"
    >
      {/* ==================================================
          CUSTOM CURSOR
      ================================================== */}

      <div
        ref={cursorRef}
        className="pointer-events-none fixed left-0 top-0 z-[100] hidden h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#d5b966] opacity-60 mix-blend-difference lg:block"
      />

      {/* ==================================================
          HERO
      ================================================== */}

      <section className="relative min-h-[72vh] overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_30%,rgba(201,162,74,0.12),transparent_35%)]" />

        <div className="absolute inset-0 bg-gradient-to-b from-[#100f0e] via-[#100f0e] to-[#100f0e]" />

        <div className="hero-overlay absolute inset-0 bg-[linear-gradient(90deg,#100f0e_0%,#100f0e_55%,rgba(16,15,14,0.65)_100%)]" />

        <div className="relative z-10 flex min-h-[72vh] items-center px-6 pb-20 pt-36 md:px-12 lg:px-20">
          <div className="mx-auto w-full max-w-[1450px]">
            <div className="max-w-5xl">
              <p className="hero-label mb-8 font-sans text-[10px] font-semibold tracking-[0.35em] text-[#c9a24a] md:text-xs">
                AURA FAMILY SALON · UNISEX SALON · HAZARIBAGH, JHARKHAND
              </p>

              <h1 className="overflow-hidden font-serif text-[60px] font-medium leading-[0.87] tracking-[-2px] text-[#f0dda3] sm:text-[74px] md:text-[94px] lg:text-[112px]">
                <span className="hero-line block">Let's create</span>

                <span className="hero-line block italic text-[#d5b966]">
                  something
                </span>

                <span className="hero-line block italic text-[#d5b966]">
                  beautiful.
                </span>
              </h1>

              <p className="hero-description mt-10 max-w-xl font-sans text-[15px] leading-7 text-[#a99c89] md:text-[17px]">
                Whether you're planning your bridal look, refreshing your
                style or simply taking some time for yourself, we'd love to
                hear from you.
              </p>

              <div className="hero-meta mt-10 flex flex-wrap gap-x-6 gap-y-3 font-sans text-[9px] font-semibold tracking-[0.25em] text-[#706454]">
                <span>APPOINTMENTS</span>
                <span className="text-[#c9a24a]">•</span>
                <span>ENQUIRIES</span>
                <span className="text-[#c9a24a]">•</span>
                <span>BRIDAL CONSULTATIONS</span>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 right-6 md:right-12 lg:right-20">
          <p className="font-sans text-[9px] tracking-[0.3em] text-[#675d50]">
            SCROLL TO BOOK
          </p>
        </div>
      </section>

      {/* ==================================================
          BOOKING
      ================================================== */}

      <section
        id="appointment"
        className="booking-section border-t border-[#30271f] px-6 py-28 md:px-12 md:py-36 lg:px-20"
      >
        <div className="mx-auto grid max-w-[1450px] gap-20 lg:grid-cols-[0.75fr_1fr] lg:gap-28">
          {/* LEFT */}
          <div className="booking-left">
            <SectionLabel>BOOK YOUR VISIT</SectionLabel>

            <h2 className="mt-6 font-serif text-6xl leading-[0.88] text-[#ead7a1] md:text-8xl">
              Your next
              <br />
              signature
              <br />
              <span className="italic">look starts here.</span>
            </h2>

            <p className="mt-8 max-w-md font-sans text-[15px] leading-7 text-[#958978]">
              Tell us a little about what you're looking for. We'll get back
              to you to confirm your appointment.
            </p>

            {/* Direct Contact */}
            <div className="mt-14 space-y-8">
              <a
                href={`tel:${CONTACT.phoneLink}`}
                className="contact-card group block border-t border-[#3a3025] pt-6"
              >
                <span className="font-sans text-[9px] font-semibold tracking-[0.25em] text-[#c9a24a]">
                  CALL US
                </span>

                <span className="mt-2 block font-serif text-2xl text-[#d8c895] transition-transform duration-300 group-hover:translate-x-2">
                  {CONTACT.phoneDisplay}
                </span>
              </a>

              <a
                href={`mailto:${CONTACT.email}`}
                className="contact-card group block border-t border-[#3a3025] pt-6"
              >
                <span className="font-sans text-[9px] font-semibold tracking-[0.25em] text-[#c9a24a]">
                  EMAIL
                </span>

                <span className="mt-2 block font-serif text-2xl text-[#d8c895] transition-transform duration-300 group-hover:translate-x-2">
                  {CONTACT.email}
                </span>
              </a>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="contact-card group block border-t border-[#3a3025] pt-6"
              >
                <span className="font-sans text-[9px] font-semibold tracking-[0.25em] text-[#c9a24a]">
                  WHATSAPP
                </span>

                <span className="mt-2 block font-serif text-2xl text-[#d8c895] transition-transform duration-300 group-hover:translate-x-2">
                  Chat with us →
                </span>
              </a>
            </div>
          </div>

          {/* RIGHT FORM */}
          <div className="booking-form">
            {showAppointmentForm && (!submitted ? (
              <form
                onSubmit={handleSubmit}
                className="border-t border-[#3a3025] pt-8"
              >
                <div className="mb-12">
                  <SectionLabel>REQUEST AN APPOINTMENT</SectionLabel>

                  <p className="mt-5 max-w-lg font-sans text-sm leading-6 text-[#716658]">
                    Share your preferences and we'll help you find the right
                    service.
                  </p>
                </div>

                <div className="grid gap-9 md:grid-cols-2">
                  <InputField
                    label="NAME"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    required
                    error={errors.name}
                  />

                  <InputField
                    label="PHONE"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="8102494117"
                    required
                    error={errors.phone}
                  />

                  <InputField
                    label="EMAIL"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    type="email"
                  />

                  <SelectField
                    label="SERVICE"
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    options={services}
                    error={errors.service}
                  />

                  <div>
                    <label
                      htmlFor="date"
                      className="mb-3 block font-sans text-[9px] font-semibold tracking-[0.25em] text-[#8e806e]"
                    >
                      PREFERRED DATE
                      <span className="ml-1 text-[#c9a24a]">*</span>
                    </label>

                    <input
                      id="date"
                      name="date"
                      type="date"
                      min={new Date().toISOString().split("T")[0]}
                      value={formData.date}
                      onChange={handleChange}
                      className={`w-full border-b bg-transparent px-0 py-3 font-sans text-sm text-[#ead7a1] outline-none transition-colors ${
                        errors.date
                          ? "border-[#a95d5d]"
                          : "border-[#3a3025] focus:border-[#c9a24a]"
                      }`}
                    />

                    {errors.date && (
                      <p className="mt-2 font-sans text-[10px] text-[#c98585]">
                        {errors.date}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="time"
                      className="mb-3 block font-sans text-[9px] font-semibold tracking-[0.25em] text-[#8e806e]"
                    >
                      PREFERRED TIME
                    </label>

                    <select
                      id="time"
                      name="time"
                      value={formData.time}
                      onChange={handleChange}
                      className={`w-full border-b border-[#3a3025] bg-[#100f0e] px-0 py-3 font-sans text-sm outline-none transition-colors focus:border-[#c9a24a] ${
                        formData.time
                          ? "text-[#ead7a1]"
                          : "text-[#514a41]"
                      }`}
                    >
                      <option value="">Select a time</option>
                      <option value="Morning">Morning</option>
                      <option value="Afternoon">Afternoon</option>
                      <option value="Evening">Evening</option>
                    </select>
                  </div>
                </div>

                <div className="mt-9">
                  <label
                    htmlFor="message"
                    className="mb-3 block font-sans text-[9px] font-semibold tracking-[0.25em] text-[#8e806e]"
                  >
                    MESSAGE
                  </label>

                  <textarea
                    id="message"
                    name="message"
                    rows="4"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us a little about what you're looking for..."
                    className="w-full resize-none border-b border-[#3a3025] bg-transparent px-0 py-3 font-sans text-sm text-[#ead7a1] outline-none transition-colors placeholder:text-[#514a41] focus:border-[#c9a24a]"
                  />
                </div>

                <button
                  type="submit"
                  className="mt-10 w-full rounded-full bg-[#d5b966] px-8 py-4 font-sans text-[10px] font-bold tracking-[0.18em] text-[#17130e] transition-all duration-300 hover:-translate-y-1 hover:bg-[#e4c979]"
                >
                  REQUEST AN APPOINTMENT →
                </button>

                <p className="mt-4 text-center font-sans text-[9px] leading-5 text-[#5f5549]">
                  Submitting this form sends an appointment request. Your
                  appointment will be confirmed separately by the salon.
                </p>
              </form>
            ) : (
              <div className="flex min-h-[620px] flex-col items-center justify-center border-t border-[#3a3025] text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full border border-[#c9a24a] text-2xl text-[#d5b966]">
                  ✓
                </div>

                <p className="mt-8">
                  <SectionLabel>REQUEST RECEIVED</SectionLabel>
                </p>

                <h3 className="mt-6 font-serif text-6xl text-[#ead7a1] md:text-7xl">
                  Thank you.
                </h3>

                <p className="mt-7 max-w-md font-sans text-sm leading-7 text-[#958978]">
                  Your appointment request has been received. We'll get in
                  touch shortly to confirm the details.
                </p>

                <div className="mt-9 flex flex-wrap justify-center gap-4">
                  <button
                    onClick={resetForm}
                    className="rounded-full border border-[#c9a24a]/50 px-7 py-4 font-sans text-[10px] font-semibold tracking-[0.16em] text-[#d5b966] transition hover:bg-[#c9a24a]/10"
                  >
                    NEW REQUEST
                  </button>

                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-full bg-[#d5b966] px-7 py-4 font-sans text-[10px] font-bold tracking-[0.16em] text-[#17130e] transition hover:-translate-y-1 hover:bg-[#e5ca78]"
                  >
                    CHAT ON WHATSAPP →
                  </a>
                </div>
              </div>
            ))}
            <div className="flex min-h-[620px] flex-col items-center justify-center border-t border-[#3a3025] text-center">
              <SectionLabel>WHATSAPP APPOINTMENTS</SectionLabel>
              <h3 className="mt-6 max-w-lg font-serif text-6xl leading-[0.88] text-[#ead7a1] md:text-7xl">
                Let&apos;s talk about your next look.
              </h3>
              <p className="mt-7 max-w-md font-sans text-sm leading-7 text-[#958978]">
                Send us a message on WhatsApp and we&apos;ll help you choose a service and confirm your visit.
              </p>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-9 rounded-full bg-[#25D366] px-8 py-4 font-sans text-[10px] font-bold tracking-[0.16em] text-[#062b16] transition hover:-translate-y-1 hover:bg-[#6bea9a]"
              >
                CHAT ON WHATSAPP →
              </a>
              <a href={`tel:${CONTACT.phoneLink}`} className="mt-6 font-serif text-2xl text-[#d8c895] transition-colors hover:text-[#f0dda3]">
                {CONTACT.phoneDisplay}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================
          CONTACT INFORMATION
      ================================================== */}

      <section className="border-y border-[#30271f] bg-[#151310] px-6 py-24 md:px-12 lg:px-20">
        <div className="mx-auto max-w-[1450px]">
          <div className="reveal mb-14">
            <SectionLabel>GET IN TOUCH</SectionLabel>

            <h2 className="mt-6 font-serif text-5xl text-[#ead7a1] md:text-7xl">
              We're just a
              <span className="italic text-[#d5b966]"> conversation away.</span>
            </h2>
          </div>

          <div className="grid border-t border-[#3a3025] md:grid-cols-3">
            <a
              href={`tel:${CONTACT.phoneLink}`}
              className="contact-card group border-b border-[#3a3025] py-9 md:border-b-0 md:border-r md:pr-10"
            >
              <SectionLabel>PHONE</SectionLabel>

              <p className="mt-5 font-serif text-2xl text-[#d8c895] transition-transform duration-300 group-hover:translate-x-2">
                {CONTACT.phoneDisplay}
              </p>

              <p className="mt-5 font-sans text-[9px] font-semibold tracking-[0.2em] text-[#716658]">
                CALL NOW →
              </p>
            </a>

            <a
              href={`mailto:${CONTACT.email}`}
              className="contact-card border-b border-[#3a3025] py-9 md:border-b-0 md:border-r md:px-10"
            >
              <SectionLabel>EMAIL</SectionLabel>

              <p className="mt-5 break-all font-serif text-2xl text-[#d8c895]">
                {CONTACT.email}
              </p>

              <p className="mt-5 font-sans text-[9px] font-semibold tracking-[0.2em] text-[#716658]">
                SEND EMAIL →
              </p>
            </a>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="contact-card py-9 md:pl-10"
            >
              <SectionLabel>WHATSAPP</SectionLabel>

              <p className="mt-5 font-serif text-2xl text-[#d8c895]">
                Chat with us
              </p>

              <p className="mt-5 font-sans text-[9px] font-semibold tracking-[0.2em] text-[#716658]">
                OPEN WHATSAPP →
              </p>
            </a>
          </div>
        </div>
      </section>

      {/* ==================================================
          LOCATION
      ================================================== */}

      <section className="px-6 py-28 md:px-12 md:py-36 lg:px-20">
        <div className="mx-auto grid max-w-[1450px] items-center gap-16 lg:grid-cols-2">
          <div className="reveal">
            <SectionLabel>VISIT THE SALON</SectionLabel>

            <h2 className="mt-6 font-serif text-6xl leading-[0.88] text-[#ead7a1] md:text-8xl">
              Come
              <br />
              <span className="italic">visit us.</span>
            </h2>

            <p className="mt-8 max-w-md font-sans text-[15px] leading-7 text-[#958978]">
              Step into a space designed around beauty, comfort and a little
              time for yourself.
            </p>

            <div className="mt-9">
              <p className="font-sans text-[9px] font-semibold tracking-[0.25em] text-[#c9a24a]">
                LOCATION
              </p>

              <p className="mt-3 font-serif text-2xl text-[#d8c895]">
                {CONTACT.address}
              </p>

            </div>

            <a
              href={CONTACT.mapUrl}
              className="mt-9 inline-block border-b border-[#c9a24a] pb-2 font-sans text-[10px] font-semibold tracking-[0.2em] text-[#d5b966]"
            >
              GET DIRECTIONS →
            </a>
          </div>

          <div className="reveal relative min-h-[450px] overflow-hidden rounded-[28px] border border-[#3a3025] bg-[#151310]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(201,162,74,0.08),transparent_55%)]" />

            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-[#c9a24a]/60 font-serif text-3xl text-[#d5b966]">
                  +
                </div>

                <p className="mt-6 font-serif text-3xl text-[#d8c895]">
                  Aura Family Salon
                </p>

                <p className="mt-2 font-sans text-[9px] font-semibold tracking-[0.25em] text-[#6c6254]">
                  HAZARIBAGH · JHARKHAND
                </p>

                <p className="mx-auto mt-6 max-w-xs font-sans text-xs leading-6 text-[#62594c]">
                  X9W8+H5 Hazaribagh, Jharkhand
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================
          OPENING HOURS
      ================================================== */}

      <section className="border-y border-[#30271f] bg-[#151310] px-6 py-28 md:px-12 md:py-36 lg:px-20">
        <div className="mx-auto grid max-w-[1450px] gap-16 lg:grid-cols-[0.65fr_1fr]">
          <div className="reveal">
            <SectionLabel>WHEN TO VISIT</SectionLabel>

            <h2 className="mt-6 font-serif text-6xl leading-[0.88] text-[#ead7a1] md:text-8xl">
              We're here
              <br />
              <span className="italic">for you.</span>
            </h2>

            <p className="mt-8 max-w-md font-sans text-[15px] leading-7 text-[#958978]">
              Choose a time that works for you. For bridal and special
              appointments, we recommend getting in touch in advance.
            </p>
          </div>

          <div>
            {openingHours.map((item) => (
              <div
                key={item.day}
                className="hour-row flex items-center justify-between border-t border-[#3a3025] py-5"
              >
                <span className="font-sans text-sm text-[#b6a994]">
                  {item.day}
                </span>

                <span className="font-sans text-xs text-[#746a5c]">
                  {item.time}
                </span>
              </div>
            ))}

            <p className="mt-6 font-sans text-[9px] leading-5 text-[#5e5549]">
              * Opening hours shown above are placeholders and should be
              replaced with the salon's actual timings.
            </p>
          </div>
        </div>
      </section>

      {/* ==================================================
          WHATSAPP
      ================================================== */}

      <section className="px-6 py-28 md:px-12 md:py-36 lg:px-20">
        <div className="reveal mx-auto max-w-[1100px] border border-[#3a3025] bg-[#151310] px-7 py-16 text-center md:px-16 md:py-20">
          <SectionLabel>QUICKER RESPONSE</SectionLabel>

          <h2 className="mt-6 font-serif text-6xl leading-[0.9] text-[#ead7a1] md:text-8xl">
            Prefer to
            <br />
            <span className="italic text-[#d5b966]">talk directly?</span>
          </h2>

          <p className="mx-auto mt-8 max-w-xl font-sans text-[15px] leading-7 text-[#958978]">
            For quick questions, availability or appointment enquiries, chat
            with us directly on WhatsApp.
          </p>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-10 inline-flex rounded-full bg-[#d5b966] px-8 py-4 font-sans text-[10px] font-bold tracking-[0.18em] text-[#17130e] transition-all duration-300 hover:-translate-y-1 hover:bg-[#e5c979]"
          >
            CHAT ON WHATSAPP →
          </a>
        </div>
      </section>

      {/* ==================================================
          FAQ
      ================================================== */}

      <section className="border-t border-[#30271f] px-6 py-28 md:px-12 md:py-36 lg:px-20">
        <div className="mx-auto grid max-w-[1450px] gap-16 lg:grid-cols-[0.65fr_1fr]">
          <div className="reveal">
            <SectionLabel>QUESTIONS</SectionLabel>

            <h2 className="mt-6 font-serif text-6xl leading-[0.88] text-[#ead7a1] md:text-8xl">
              A few
              <br />
              <span className="italic">answers.</span>
            </h2>
          </div>

          <div>
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;

              return (
                <div
                  key={faq.question}
                  className="faq-item border-t border-[#3a3025]"
                >
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() =>
                      setOpenFaq(isOpen ? null : index)
                    }
                    className="flex w-full items-center justify-between gap-6 py-7 text-left"
                  >
                    <span className="font-serif text-xl text-[#d8c895] md:text-2xl">
                      {faq.question}
                    </span>

                    <span
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#5b4c37] font-sans text-lg text-[#c9a24a] transition-transform duration-300 ${
                        isOpen ? "rotate-45" : ""
                      }`}
                    >
                      +
                    </span>
                  </button>

                  <div
                    className={`grid transition-all duration-500 ${
                      isOpen
                        ? "grid-rows-[1fr] pb-7 opacity-100"
                        : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="max-w-2xl pr-12 font-sans text-sm leading-7 text-[#817667]">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}

            <div className="border-t border-[#3a3025]" />
          </div>
        </div>
      </section>

      {/* ==================================================
          FINAL CTA
      ================================================== */}

      <section className="relative overflow-hidden border-t border-[#30271f] px-6 py-32 text-center md:py-44">
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[550px] w-[550px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#8c6226]/10 blur-[160px]" />

        <div className="relative z-10 mx-auto max-w-5xl">
            <SectionLabel className="location-label uppercase">AURA FAMILY SALON · UNISEX SALON · HAZARIBAGH, JHARKHAND</SectionLabel>

          <h2 className="mt-7 font-serif text-6xl leading-[0.88] text-[#ead7a1] sm:text-7xl md:text-9xl">
            Ready for
            <br />
            <span className="italic text-[#d5b966]">
              your next look?
            </span>
          </h2>

          <p className="mx-auto mt-9 max-w-lg font-sans text-[15px] leading-7 text-[#958978]">
            Let's create something that feels completely yours.
          </p>

          <a
            href="#appointment"
            className="mt-10 inline-flex rounded-full bg-[#d5b966] px-9 py-5 font-sans text-[10px] font-bold tracking-[0.18em] text-[#17130e] transition-all duration-300 hover:-translate-y-1 hover:bg-[#e5c979]"
          >
            BOOK AN APPOINTMENT →
          </a>
        </div>
      </section>

      {/* ==================================================
          FOOTER
      ================================================== */}

      {/* <footer className="border-t border-[#30271f] px-6 py-12 md:px-12 lg:px-20">
        <div className="mx-auto max-w-[1450px]">
          <div className="grid gap-10 md:grid-cols-3">
            <div>
              <p className="font-serif text-3xl text-[#ead7a1]">
                Aura Family
              </p>

              <p className="mt-3 max-w-xs font-sans text-xs leading-6 text-[#6f6558]">
                Hair, makeup, bridal and beauty — thoughtfully created around
                you.
              </p>
            </div>

            <div>
              <p className="mb-4 font-sans text-[9px] font-semibold tracking-[0.3em] text-[#c9a24a]">
                EXPLORE
              </p>

              <div className="grid grid-cols-2 gap-y-3">
                {[
                  "Home",
                  "Services",
                  "Bridal",
                  "Gallery",
                  "About",
                  "Contact",
                ].map((item) => (
                  <a
                    key={item}
                    href={`/${item === "Home" ? "" : item.toLowerCase()}`}
                    className="font-sans text-xs text-[#827666] transition-colors hover:text-[#d5b966]"
                  >
                    {item}
                  </a>
                ))}
              </div>
            </div>

            <div>
              <p className="mb-4 font-sans text-[9px] font-semibold tracking-[0.3em] text-[#c9a24a]">
                CONNECT
              </p>

              <div className="space-y-3 font-sans text-xs text-[#827666]">
                <p>{CONTACT.address}</p>

                <a
                  href={`tel:${CONTACT.phoneLink}`}
                  className="block hover:text-[#d5b966]"
                >
                  {CONTACT.phoneDisplay}
                </a>

                <a
                  href={`mailto:${CONTACT.email}`}
                  className="block hover:text-[#d5b966]"
                >
                  {CONTACT.email}
                </a>

                <div className="flex gap-5 pt-2">
                  <a href="#" className="hover:text-[#d5b966]">
                    Instagram
                  </a>

                  <a href="#" className="hover:text-[#d5b966]">
                    Facebook
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 flex flex-col justify-between gap-4 border-t border-[#2c251f] pt-6 font-sans text-[10px] text-[#5f5549] sm:flex-row">
            <p>© 2026 Aura Family Salon. All rights reserved.</p>
            <p>Hazaribagh · Jharkhand</p>
          </div>
        </div>
      </footer> */}
    </main>
  );
};

export default Contact;