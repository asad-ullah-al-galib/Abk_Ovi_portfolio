"use client"

import { useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface Testimonial {
  id: number | string;
  quote: string;
  author: string;
  role: string;
  company?: string;
  image?: string;
}

interface TestimonialsEditorialProps {
  testimonials: Testimonial[];
}

export default function TestimonialsEditorial({ testimonials }: TestimonialsEditorialProps) {
  const [active, setActive] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)

  if (!testimonials || testimonials.length === 0) return null;

  const handleChange = (index: number) => {
    if (index === active || isTransitioning) return
    setIsTransitioning(true)
    setTimeout(() => {
      setActive(index)
      setTimeout(() => setIsTransitioning(false), 50)
    }, 300)
  }

  const handlePrev = () => {
    const newIndex = active === 0 ? testimonials.length - 1 : active - 1
    handleChange(newIndex)
  }

  const handleNext = () => {
    const newIndex = active === testimonials.length - 1 ? 0 : active + 1
    handleChange(newIndex)
  }

  const current = testimonials[active]

  return (
    <div className="w-full max-w-4xl mx-auto px-6 py-12">
      {/* Large index number */}
      <div className="flex flex-col md:flex-row items-start gap-8 md:gap-12">
        <span
          className="text-[80px] md:text-[120px] font-light leading-none text-foreground/10 select-none transition-all duration-500"
          style={{ fontFeatureSettings: '"tnum"' }}
        >
          {String(active + 1).padStart(2, "0")}
        </span>

        <div className="flex-1 pt-2 md:pt-6">
          {/* Quote */}
          <blockquote
            className={`text-xl md:text-3xl font-light leading-relaxed text-foreground tracking-tight transition-all duration-300 ${
              isTransitioning ? "opacity-0 translate-x-4" : "opacity-100 translate-x-0"
            }`}
          >
            "{current.quote}"
          </blockquote>

          {/* Author info with hover reveal */}
          <div
            className={`mt-8 md:mt-12 group cursor-default transition-all duration-300 delay-100 ${
              isTransitioning ? "opacity-0" : "opacity-100"
            }`}
          >
            <div className="flex items-center gap-4">
              <div className="relative w-12 h-12 md:w-16 md:h-16 flex-shrink-0 rounded-full overflow-hidden ring-2 ring-foreground/10 group-hover:ring-foreground/30 transition-all duration-300">
                <Image
                  src={current.image || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop"}
                  alt={current.author}
                  fill
                  className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500 rounded-full"
                />
              </div>
              <div>
                <p className="font-bold text-base md:text-lg text-foreground">{current.author}</p>
                <p className="text-sm text-muted-foreground font-medium">
                  {current.role}
                  {current.company && (
                    <>
                      <span className="mx-2 text-foreground/20">/</span>
                      <span className="group-hover:text-foreground transition-colors duration-300">{current.company}</span>
                    </>
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation - vertical line selector */}
      <div className="mt-12 md:mt-16 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3">
            {testimonials.map((_, index) => (
              <button key={index} onClick={() => handleChange(index)} className="group relative py-4">
                <span
                  className={`block h-px transition-all duration-500 ease-out ${
                    index === active
                      ? "w-12 bg-theme-accent"
                      : "w-6 bg-foreground/20 group-hover:w-8 group-hover:bg-foreground/40"
                  }`}
                />
              </button>
            ))}
          </div>
          <span className="text-[10px] md:text-xs text-muted-foreground tracking-widest uppercase font-bold">
            {String(active + 1).padStart(2, "0")} / {String(testimonials.length).padStart(2, "0")}
          </span>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={handlePrev}
            className="p-2 rounded-full text-foreground/40 hover:text-foreground hover:bg-foreground/5 transition-all duration-300"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={handleNext}
            className="p-2 rounded-full text-foreground/40 hover:text-foreground hover:bg-foreground/5 transition-all duration-300"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  )
}
