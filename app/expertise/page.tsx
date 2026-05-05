import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Box,
  Terminal,
  BarChart3,
  Code2,
} from "lucide-react";
import { Header } from "@/components/ui/header";
import { Footer } from "@/components/footer";
import CalButton from "@/components/CalButton";
import { SectionHeading, PatternBand } from "@/components/ui/section-header";
import { BentoGrid, type BentoItem } from "@/components/ui/bento-grid";
import { FadingDots } from "@/components/ui/background-snippets";

const expertise = [
  {
    title: "HR Operations & Administration",
    icon: BarChart3,
    slug: "mathematical-modeling",
    description:
      "Supporting day-to-day human resources administration, employee records, and coordination.",
    tags: [
      "Employee Records",
      "Onboarding",
      "Attendance",
      "Reporting",
      "Coordination"
    ]
  },
  {
    title: "Compensation & Benefits",
    icon: Terminal,
    slug: "ai-machine-learning",
    description:
      "Handling benefits support, payroll coordination, and policy execution with care.",
    tags: [
      "Payroll",
      "Benefits",
      "Policy",
      "Compliance",
      "Administration"
    ]
  },
  {
    title: "HR Reporting",
    icon: Code2,
    slug: "technical-documentation",
    description:
      "Producing clear documentation and internal reporting for people operations.",
    tags: [
      "Documentation",
      "Reporting",
      "Excel",
      "Records",
      "Formatting"
    ]
  },
  {
    title: "Employee Relations",
    icon: Box,
    slug: "data-science",
    description:
      "Supporting teams through communication, problem solving, and steady leadership.",
    tags: [
      "Leadership",
      "Communication",
      "Teamwork",
      "Problem Solving",
      "Adaptability"
    ]
  }
];

const stats = [
  { value: "8+", label: "YEARS EXPERIENCE" },
  { value: "3", label: "ORGANIZATIONS SERVED" },
  { value: "2", label: "DEGREES COMPLETED" },
  { value: "100%", label: "COMMITMENT" }
];

export default function ExpertisePage() {
  const expertiseBentoItems: BentoItem[] = expertise.map((item, index) => {
    let status = "Active";
    if (item.title.includes("Operations")) status = "Active";
    else if (item.title.includes("Compensation")) status = "Support";
    else if (item.title.includes("Reporting")) status = "Documentation";
    else if (item.title.includes("Employee Relations")) status = "People Ops";

    return {
      title: item.title,
      description: item.description,
      icon: <item.icon className="size-5 text-theme-accent" />,
      tags: item.tags,
      href: `/expertise/${item.slug}`,
      status: status,
      colSpan: 1,
      hasPersistentHover: false,
    };
  });

  return (
    <div className="min-h-screen bg-[#f4f4f2] text-neutral-950 dark:bg-[#0a0a0a] dark:text-neutral-100 font-sans selection:bg-orange-500/30">
      <Header currentPage="expertise" />

      <main className="pt-[88px]">
        {/* Page Header - Full Width Dotted Background */}
        <section className="relative border-b border-dashed border-neutral-300 dark:border-white/10 overflow-hidden bg-white/40 dark:bg-black/20">
          <FadingDots />
          <div className="mx-auto max-w-site px-6 py-20 relative z-10">
            <h1 className="font-serif text-3xl md:text-5xl font-bold text-theme-dark dark:text-theme-light leading-tight">
              Practical HR support <br />for growing teams<span className="text-theme-accent animate-pulse">.</span>
            </h1>
            <p className="mt-8 text-base md:text-lg font-medium text-neutral-500 dark:text-neutral-400 max-w-2xl leading-relaxed">
              I help organizations strengthen HR operations, support employees, and maintain reliable people processes.
            </p>
          </div>
        </section>


        {/* Expertise Section Label - Pattern Band */}
        <section id="expertise-list">
          <PatternBand>
            <SectionHeading title="Expertise" description="Choose what fits your needs" />
          </PatternBand>
        </section>

        {/* Global Architectural Lines */}
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 inset-x-0 mx-auto max-w-site z-20">
            <div className="absolute inset-y-0 left-0 border-l border-dashed border-neutral-400/40 dark:border-white/15" />
            <div className="absolute inset-y-0 right-0 border-r border-dashed border-neutral-400/40 dark:border-white/15" />
          </div>

          {/* Expertise Grid - EXACTLY like Home Page */}
          <section>
            <div className="mx-auto max-w-site px-4 py-8 md:px-8 md:py-14 relative z-10">
              <BentoGrid items={expertiseBentoItems} className="md:grid-cols-2" />
            </div>
          </section>
        </div>

        {/* Stats Section */}
        <section className="relative border-y border-dashed border-neutral-400/40 dark:border-white/15">
          <div className="mx-auto max-w-site px-4 py-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-0">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center px-4 py-3">
                  <div className="text-3xl md:text-4xl font-bold font-serif text-theme-accent dark:text-theme-main">
                    {stat.value}
                  </div>
                  <div className="text-xs md:text-sm text-neutral-500 dark:text-neutral-400 mt-1 uppercase tracking-wide">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="mx-auto max-w-site px-8 py-14 relative">
          <div className="overflow-hidden relative p-6 md:p-8 rounded-xl bg-[#e3fb71] border border-[#d2e861] dark:border-none text-theme-dark relative z-10">
            <div className="absolute inset-0 opacity-50 mix-blend-overlay bg-noise pointer-events-none" />
            <div className="relative z-10 flex flex-col gap-2 justify-center">
              <h3 className="font-bold text-xl md:text-2xl text-neutral-900">Need a hand? Let's get on a quick call.</h3>
              <p className="w-full font-medium text-neutral-800 max-w-[470px]">
                I'm always open to interesting work. If you're building something and think I can help, book a discovery call.
              </p>
              <CalButton className="justify-center transition-all outline-none font-semibold border no-underline hover:opacity-90 active:translate-y-[1px] px-4 py-2.5 text-sm rounded-md bg-neutral-900 border-neutral-900 text-white w-full sm:w-max mt-4" />
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="absolute z-0 h-28 w-28 sm:h-32 sm:w-32 md:h-40 md:w-40 rotate-45 text-orange-500 bottom-[-10px] right-[-24px] opacity-90 pointer-events-none">
              <path strokeLinecap="round" d="M21 12.5V10c0-2.828 0-4.243-.879-5.121C19.243 4 17.828 4 15 4H9c-2.828 0-4.243 0-5.121.879C3 5.757 3 7.172 3 10v5c0 2.828 0 4.243.879 5.121C4.757 21 6.172 21 9 21h2" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" d="M3.5 10h17M8 2v4M16 2v4" />
              <path strokeLinecap="round" d="M15.879 18.879h3m0 0h3m-3 0v3m0-3v-3" />
            </svg>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
