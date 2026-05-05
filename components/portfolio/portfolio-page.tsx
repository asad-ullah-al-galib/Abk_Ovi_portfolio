type ContributionDay = {
  date: string;
  contributionCount: number;
  color: string;
};

type Week = {
  firstDay: string;
  contributionDays: ContributionDay[];
};

type Repo = {
  name: string;
  html_url: string;
  description: string;
  stars: number;
  forks: number;
  language: string | null;
  tech?: string[];
};
import React, { type ComponentType, type ReactNode } from "react";
import Script from "next/script";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  BookOpen,
  Bot,
  Box,
  Calendar,
  Code2,
  ExternalLink,
  GitFork,
  Github,
  Linkedin,
  Mail,
  Quote,
  Star,
  Terminal,
  Send
} from "lucide-react";

import { DottedSurface } from "@/components/ui/dotted-surface";
import { Button } from "@/components/ui/button";
import { SkillTag } from "@/components/ui/skill-tag";
import TestimonialsEditorial from "../ui/editorial-testimonial";

const calButtonProps = {
  "data-cal-link": "connectwithshuvo/30min",
  "data-cal-namespace": "30min",
  "data-cal-config":
    '{"layout":"month_view","useSlotsViewOnSmallScreen":"true"}',
  type: "button" as const
};
import { Header } from "@/components/ui/header";
import { Footer } from "@/components/footer";
import { portfolioData } from "@/lib/portfolio-data";
import GithubHeatmap from "@/components/GithubHeatmap";
import { SectionHeading, PatternBand } from "@/components/ui/section-header";
import { BentoGrid, type BentoItem } from "@/components/ui/bento-grid";
import CalButton from "@/components/CalButton";

import { LogoCloud } from "@/components/ui/logo-cloud-3";
import FeatureSection, { FeatureCard } from "@/components/ui/feature-sections";
type Icon = ComponentType<{ className?: string }>;

const expertise: Array<{
  title: string;
  icon: Icon;
  description: string;
  tags: string[];
}> = [
    {
      title: "HR Operations",
      icon: BarChart3,
      description:
        "Supporting day-to-day HR administration, employee records, and internal coordination with consistency.",
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
      description:
        "Managing benefits support, payroll coordination, and policy execution with attention to detail.",
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
      description:
        "Creating clear, professional documentation and internal reporting for people operations.",
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
      description:
        "Supporting teams with clear communication, practical problem solving, and steady leadership.",
      tags: [
        "Leadership",
        "Communication",
        "Teamwork",
        "Problem Solving",
        "Adaptability"
      ]
    }
  ];

const logos = [
  {
    src: "https://img.shields.io/badge/MS%20Excel-217346?style=for-the-badge&logo=microsoftexcel&logoColor=white",
    alt: "Microsoft Excel",
  },
  {
    src: "https://img.shields.io/badge/MS%20Word-2B579A?style=for-the-badge&logo=microsoftword&logoColor=white",
    alt: "Microsoft Word",
  },
  {
    src: "https://img.shields.io/badge/HR%20Operations-0F766E?style=for-the-badge",
    alt: "HR Operations",
  },
  {
    src: "https://img.shields.io/badge/Compensation%20%26%20Benefits-0EA5A4?style=for-the-badge",
    alt: "Compensation and Benefits",
  },
  {
    src: "https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white",
    alt: "LinkedIn",
  },
];

const works = [
  {
    title: "HR Operations Management",
    logo: "F",
    accent: "text-blue-400",
    description:
      "Leading HR operations with a focus on employee support, service consistency, and practical coordination.",
    tags: ["HR", "Operations", "Coordination", "Leadership"],
    hero: "People Operations Leadership",
    link: "#"
  },
  {
    title: "Compensation & Benefits Coordination",
    logo: "L",
    accent: "text-theme-accent",
    description:
      "Supporting compensation and benefits administration with attention to detail and confidentiality.",
    tags: ["Payroll", "Benefits", "Policy"],
    hero: "Structured HR Support",
    link: "#",
    image: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?q=80&w=800&auto=format&fit=crop"
  }
];

const workData = [
  {
    title: "HR Operations",
    description: "Overseeing employee administration, service coordination, and people process reliability.",
    image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=800&auto=format&fit=crop",
    tags: ["HR", "Operations", "Leadership"],
    link: "#",
    accent: "text-blue-400"
  },
  {
    title: "Compensation & Benefits",
    description: "Maintaining professional accuracy in benefits support, payroll coordination, and documentation.",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=800&auto=format&fit=crop",
    tags: ["Payroll", "Benefits", "Documentation"],
    link: "#",
    accent: "text-theme-accent"
  },
  {
    title: "Leadership & Communication",
    description: "Coordinating teams and communicating clearly to support effective workplace execution.",
    image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?q=80&w=800&auto=format&fit=crop",
    tags: ["Leadership", "Communication", "Teamwork"],
    link: "#",
    accent: "text-emerald-500"
  }
];

const references = [];

import { BlogSection } from "./blog";




// Using global SectionHeading and PatternBand from @/components/ui/section-header




function WorkMockup({ title, logo, accent }: { title: string; logo: string; accent: string }) {
  return (
    <div className="rounded-[18px] border border-neutral-300 bg-white p-2 shadow-inner dark:border-white/10 dark:bg-neutral-900">
      <div className="overflow-hidden rounded-xl bg-black text-white">
        <div className="flex h-14 items-center justify-between border-b border-white/10 px-5 text-xs text-white/70">
          <div className={`text-2xl font-black ${accent}`}>{logo}</div>
          <div className="hidden gap-7 md:flex">
            <span>Products</span>
            <span>Solutions</span>
            <span>Developers</span>
            <span>Pricing</span>
          </div>
          <span className="rounded-full bg-white px-3 py-1 font-bold text-black">
            Get Started
          </span>
        </div>
        <div className="flex min-h-[260px] items-center justify-center px-8 py-12 text-center">
          <h3 className="max-w-xl text-4xl font-semibold tracking-[-0.04em] text-white md:text-5xl">
            {title}
          </h3>
        </div>
      </div>
    </div>
  );
}


export function PortfolioPage({
  weeks,
  total,
  repos = [],
  blogPosts = []
}: {
  weeks: Week[];
  total: number;
  repos?: Repo[];
  blogPosts?: any[];
}) {
  const expertiseBentoItems: BentoItem[] = expertise.map((item, index) => {
    let status = "Active";
    if (item.title.includes("Mathematical")) status = "Research";
    else if (item.title.includes("Machine Learning")) status = "Development";
    else if (item.title.includes("Documentation")) status = "Typesetting";
    else if (item.title.includes("Data Science")) status = "Analysis";

    let href = "/expertise";
    if (item.title.includes("Mathematical")) href = "/expertise/mathematical-modeling";
    else if (item.title.includes("Machine Learning")) href = "/expertise/ai-machine-learning";
    else if (item.title.includes("Documentation")) href = "/expertise/technical-documentation";
    else if (item.title.includes("Data Science")) href = "/expertise/data-science";

    return {
      title: item.title,
      description: item.description,
      icon: <item.icon className="size-5 text-theme-accent" />,
      tags: item.tags,
      status: status,
      href: href,
      colSpan: 1,
      hasPersistentHover: false,
    };
  });

  const referencesBentoItems: BentoItem[] = references.map((item, index) => ({
    title: item.name,
    description: `"${item.summary}"`,
    meta: item.title,
    icon: <Quote className="size-5 text-theme-accent" />,
    cta: "Contact Reference →",
    colSpan: 1,
    hasPersistentHover: false,
  }));

  const repoBentoItems: BentoItem[] = repos.map((repo, idx) => ({
    title: repo.name,
    description: repo.description,
    icon: <Github className="size-5 text-theme-accent" />,
    status: repo.language || "Code",
    tags: [
      <span key="stars" className="flex items-center gap-1.5">
        <Star className="size-3.5" />
        {repo.stars}
      </span>,
      <span key="forks" className="flex items-center gap-1.5">
        <GitFork className="size-3.5" />
        {repo.forks}
      </span>,
      ...(repo.tech?.map((t) => <span key={t}>{t}</span>) || [])
    ],
    href: repo.html_url,
    cta: "View Repository →",
    colSpan: 1,
    hasPersistentHover: false,
  }));

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#f4f4f2] text-neutral-950 dark:bg-[#0a0a0a] dark:text-neutral-100">
      <div className="pointer-events-none absolute inset-0 z-0 opacity-[0.03] bg-noise" />
      <Header currentPage="home" />

      <main id="home">
        <section className="relative border-b-2 border-dashed border-neutral-400/40 pt-16 dark:border-white/15">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_12px_12px,rgba(132,204,22,0.32)_1.8px,transparent_2px),linear-gradient(to_right,rgba(15,23,42,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.06)_1px,transparent_1px)] bg-[length:38px_38px,38px_38px,38px_38px]" />
          <DottedSurface className="absolute inset-0 z-0 opacity-25 mix-blend-multiply dark:opacity-20 dark:mix-blend-screen" />
          <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-slate-300/80 to-transparent dark:from-neutral-950" />
          <div className="relative mx-auto max-w-site min-h-full">
            <div className="px-6 pb-14 pt-10 relative z-10">
              <div className="flex items-center gap-4 mb-4">
                <div className="relative size-12 flex-shrink-0 overflow-hidden rounded-full border-2 border-theme-main/30 shadow-sm">
                  <Image src={portfolioData.image} alt={portfolioData.name} fill className="object-cover rounded-full" />
                </div>
                <p className="font-display text-sm font-bold leading-tight text-neutral-500 dark:text-neutral-300">
                  {portfolioData.name}
                </p>
              </div>
                <h1 className="font-display mt-1.5 max-w-3xl text-2xl md:text-3xl font-black leading-[1.1] tracking-tighter text-neutral-950 dark:text-neutral-50 text-balance">
                  Human resources leadership built on operational discipline and people-first execution
              </h1>
              <p className="mt-2 max-w-4xl text-sm font-medium leading-relaxed text-neutral-500 dark:text-neutral-300">
                Assistant Manager - Human Resources at{" "}
                <span className="rounded-md bg-blue-500 px-2 py-0.5 font-display font-black text-black">
                  Standard MH Group
                </span>
                . Experience across HR operations, compensation and benefits, and team leadership.
              </p>
              <div className="mt-5 flex flex-wrap items-center gap-4">
                <CalButton className="inline-flex items-center justify-center transition-all outline-none font-semibold border no-underline [&_svg]:w-5 [&_svg]:h-5 [&_svg]:fill-currentColor [&_path]:fill-currentColor [&_svg]:stroke-2 hover:opacity-90 active:translate-y-[1px] px-4 py-2 gap-2 text-sm rounded-md bg-theme-main border-theme-main text-theme-dark" />
                <Link
                  className="inline-flex gap-2 items-center justify-center transition-all outline-none font-semibold border border-transparent no-underline [&_svg]:w-5 [&_svg]:h-5 [&_svg]:fill-currentColor [&_path]:fill-currentColor [&_svg]:stroke-2 hover:opacity-90 active:translate-y-[1px] !focus:outline-none text-theme-accent px-4 py-2 text-sm rounded-md"
                  href="#works"
                >
                  See works <ArrowRight className="size-5 stroke-2" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        <div className="relative">
          {/* Global Vertical Grid Lines */}
          <div className="pointer-events-none absolute inset-y-0 inset-x-0 mx-auto max-w-site z-20">
            <div className="absolute inset-y-0 left-0 border-l border-dashed border-neutral-400/40 dark:border-white/15" />
            <div className="absolute inset-y-0 right-0 border-r border-dashed border-neutral-400/40 dark:border-white/15" />
          </div>

          <section id="expertise" className="border-b border-dashed border-neutral-400/40 dark:border-white/15">
            <PatternBand>
              <SectionHeading title="Expertise" description="What I can help you with" />
            </PatternBand>
            <div className="mx-auto max-w-site px-4 sm:px-6 pt-6 pb-8 relative z-10">
              <BentoGrid items={expertiseBentoItems} className="md:grid-cols-2" rounded={false} />
            </div>
            <PatternBand className="text-center">
              <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-10 px-4">
                <p className="text-xs md:text-sm font-bold text-neutral-800 dark:text-neutral-200 uppercase tracking-widest">
                  Want to explore more of my skills?
                </p>
                <Link
                  href="/expertise"
                  className="inline-flex gap-2 items-center justify-center transition-all outline-none font-semibold border no-underline hover:opacity-90 active:translate-y-[1px] px-4 py-2 text-sm rounded-xl bg-theme-main border-theme-main text-theme-dark whitespace-nowrap shadow-sm"
                >
                  View all expertise <ArrowRight className="size-4" />
                </Link>
              </div>
            </PatternBand>
          </section>

          <section className="relative border-b border-dashed border-neutral-400/40 dark:border-white/15">
            <div className="mx-auto max-w-site px-4 sm:px-6 pt-12 sm:pt-14 pb-16 relative">

              <div className="relative z-10">
                <h2 className="mb-5 text-center font-medium text-foreground text-xl tracking-tight md:text-3xl">
                  <span className="text-muted-foreground dark:text-neutral-400">Trusted by experts.</span>
                  <br />
                  <span className="font-semibold text-theme-dark dark:text-theme-light">Used by the leaders.</span>
                </h2>
                <div className="mx-auto my-5 h-px max-w-sm bg-neutral-200 dark:bg-white/10 [mask-image:linear-gradient(to_right,transparent,black,transparent)]" />

                <LogoCloud logos={logos} />

                <div className="mt-5 h-px bg-neutral-200 dark:bg-white/10 [mask-image:linear-gradient(to_right,transparent,black,transparent)]" />
              </div>
            </div>
          </section>

          <section id="works">
            <PatternBand>
              <SectionHeading title="Works" description="Bringing ideas to life" />
            </PatternBand>
            <div className="mx-auto max-w-site relative">

              <div className="px-2 md:px-4 pt-4 pb-8 relative z-10">
                <FeatureSection>
                  {workData.map((work) => (
                    <FeatureCard
                      key={work.title}
                      title={work.title}
                      description={work.description}
                      image={work.image}
                      tags={work.tags}
                      link={work.link}
                      accent={work.accent}
                    />
                  ))}
                </FeatureSection>
              </div>
            </div>
          </section>

          {references.length > 0 && (
            <>
              <section id="references">
                <PatternBand>
                  <SectionHeading title="Professional References" description="Available upon request" />
                </PatternBand>
                <div className="mx-auto max-w-site px-4 sm:px-6 pt-2 pb-10 relative z-10">
                  <TestimonialsEditorial
                    testimonials={references.map((ref, idx) => ({
                      id: idx,
                      quote: ref.summary,
                      author: ref.name,
                      role: ref.title,
                      image: idx === 0
                        ? "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop"
                        : "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop"
                    }))}
                  />
                </div>
              </section>

              <PatternBand className="text-center">
                <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-10 px-4">
                  <p className="text-xs md:text-sm font-bold text-neutral-800 dark:text-neutral-200 uppercase tracking-widest">
                    Professional references available on request
                  </p>
                  <Link
                    href="#contact"
                    className="inline-flex gap-2 items-center justify-center transition-all outline-none font-semibold border no-underline hover:opacity-90 active:translate-y-[1px] px-4 py-2 text-sm rounded-xl bg-theme-main border-theme-main text-theme-dark whitespace-nowrap shadow-sm"
                  >
                    Get in touch <ExternalLink className="size-4" />
                  </Link>
                </div>
              </PatternBand>
            </>
          )}

          <section id="contact" className="mx-auto max-w-site px-4 sm:px-6 pt-12 sm:pt-14 pb-16 relative">
            <div className="overflow-hidden relative p-6 md:p-8 rounded-xl bg-[#e3fb71] border border-[#d2e861] dark:border-none text-theme-dark relative z-10">
              <div className="absolute inset-0 opacity-50 mix-blend-overlay bg-noise pointer-events-none" />
              <div className="relative z-10 flex flex-col gap-2 justify-center">
                <h3 className="font-bold text-xl md:text-2xl">Need a hand? Let's get on a quick call.</h3>
                <p className="w-full font-medium text-neutral-800 max-w-[470px]">
                  I'm always open to interesting work. If you're building something and think I can help, book a discovery call.
                </p>
                <CalButton className="w-fit transition-all outline-none font-semibold border no-underline hover:opacity-90 active:translate-y-[1px] px-6 py-3 text-sm rounded-xl bg-neutral-900 border-neutral-900 text-white mt-4 whitespace-nowrap" />
              </div>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="absolute z-0 h-28 w-28 sm:h-32 sm:w-32 md:h-40 md:w-40 rotate-45 text-orange-500 bottom-[-10px] right-[-24px] opacity-90 pointer-events-none">
                <path strokeLinecap="round" d="M21 12.5V10c0-2.828 0-4.243-.879-5.121C19.243 4 17.828 4 15 4H9c-2.828 0-4.243 0-5.121.879C3 5.757 3 7.172 3 10v5c0 2.828 0 4.243.879 5.121C4.757 21 6.172 21 9 21h2" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" d="M3.5 10h17M8 2v4M16 2v4" />
                <path strokeLinecap="round" d="M15.879 18.879h3m0 0h3m-3 0v3m0-3v-3" />
              </svg>
            </div>
          </section>

          <section id="blogs">
            <PatternBand>
              <SectionHeading title="Blogs" description="Words breathe life into ideas" />
            </PatternBand>
            <div className="mx-auto max-w-site relative px-4 sm:px-6 py-4">
              <BlogSection posts={blogPosts} />
            </div>
            <PatternBand className="text-center">
              <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-10 px-4">
                <p className="text-xs md:text-sm font-bold text-neutral-800 dark:text-neutral-200 uppercase tracking-widest">
                  Deep dives and technical insights
                </p>
                <Link
                  href="/blogs"
                  className="inline-flex gap-2 items-center justify-center transition-all outline-none font-semibold border no-underline hover:opacity-90 active:translate-y-[1px] px-4 py-2 text-sm rounded-xl bg-theme-main border-theme-main text-theme-dark whitespace-nowrap shadow-sm"
                >
                  Read more on the blog <ArrowRight className="size-4" />
                </Link>
              </div>
            </PatternBand>
          </section>



          <section id="newsletter" className="py-6 md:py-10 border-y border-dashed border-neutral-400/20 dark:border-white/10">
            <div className="w-full max-w-site mx-auto px-4 sm:px-6">
              <div className="overflow-hidden relative p-6 md:p-10 rounded-xl bg-[#e3fb71] border border-[#d2e861] dark:border-none text-theme-dark relative z-10 flex flex-col items-start justify-center gap-6 md:gap-8">
                <div className="absolute inset-0 opacity-50 mix-blend-overlay bg-noise pointer-events-none" />
                <div className="relative z-10 min-w-0 text-left">
                  <h3 className="text-xl md:text-2xl font-black uppercase tracking-tight whitespace-nowrap">
                    Let's stay in the Loop?
                  </h3>
                  <p className="mt-2 text-sm md:text-base font-bold opacity-80 whitespace-nowrap">
                    I'll send you updates on new blogs only. No spam!
                  </p>
                </div>
                <form className="relative z-10 flex flex-col sm:flex-row w-full sm:w-auto shrink-0 gap-3">
                  <input
                    aria-label="Email"
                    className="min-w-0 w-full sm:w-64 rounded-xl border border-black/10 bg-white/40 px-4 py-3 text-sm outline-none text-neutral-900 placeholder:text-neutral-600 backdrop-blur-sm focus:bg-white/60 transition-all"
                    placeholder="Enter your email"
                  />
                  <Button className="h-auto rounded-xl bg-neutral-900 px-6 py-3 text-sm font-bold text-white hover:bg-neutral-800 shadow-lg transition-all active:scale-[0.98] flex items-center gap-2">
                    Subscribe <Send className="size-4" />
                  </Button>
                </form>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="absolute z-0 h-24 w-24 sm:h-32 sm:w-32 md:h-40 md:w-40 rotate-12 text-orange-500 bottom-[-20px] right-[-20px] opacity-90 pointer-events-none">
                  <path strokeLinecap="round" d="M22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="m22 6-10 7L2 6" />
                </svg>
              </div>
            </div>
          </section>

          <section id="contributions">
            <PatternBand>
              <SectionHeading title="Contributions" description="Open source and community" />
            </PatternBand>
            <div className="mx-auto max-w-site relative">
              <div className="px-4 sm:px-6 pt-12 sm:pt-14 pb-16 relative z-10">
                {weeks.length === 0 ? (
                  <p className="text-neutral-500 dark:text-neutral-300">GitHub contributions are currently unavailable. Check your token or try again later.</p>
                ) : (
                  <div className="px-4 sm:px-6">
                    <GithubHeatmap weeks={weeks} total={total} />
                  </div>
                )}
                <div className="mt-16">
                  {repos.length === 0 ? (
                    <p className="text-neutral-500 dark:text-neutral-300">No repositories available.</p>
                  ) : (
                    <BentoGrid items={repoBentoItems} className="md:grid-cols-2" rounded={true} />
                  )}
                </div>
              </div>
            </div>
          </section>

          <PatternBand className="text-center">
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-10 px-4">
              <p className="text-xs md:text-sm font-bold text-neutral-800 dark:text-neutral-200 uppercase tracking-widest">
                Have a project in mind?
              </p>
              <CalButton className="inline-flex items-center justify-center transition-all outline-none font-semibold border no-underline [&_svg]:w-5 [&_svg]:h-5 [&_svg]:fill-currentColor [&_path]:fill-currentColor [&_svg]:stroke-2 hover:opacity-90 active:translate-y-[1px] px-4 py-2 gap-2 text-sm rounded-md bg-theme-main border-theme-main text-theme-dark whitespace-nowrap shadow-sm" />
            </div>
          </PatternBand>
        </div>
      </main>

      <Script id="cal-30min-element-click" strategy="afterInteractive">
        {`
          (function (C, A, L) { let p = function (a, ar) { a.q.push(ar); }; let d = C.document; C.Cal = C.Cal || function () { let cal = C.Cal; let ar = arguments; if (!cal.loaded) { cal.ns = {}; cal.q = cal.q || []; d.head.appendChild(d.createElement("script")).src = A; cal.loaded = true; } if (ar[0] === L) { const api = function () { p(api, arguments); }; const namespace = ar[1]; api.q = api.q || []; if(typeof namespace === "string"){cal.ns[namespace] = cal.ns[namespace] || api;p(cal.ns[namespace], ar);p(cal, ["initNamespace", namespace]);} else p(cal, ar); return;} p(cal, ar); }; })(window, "https://app.cal.com/embed/embed.js", "init");
Cal("init", "30min", {origin:"https://app.cal.com"});

          
          // Important: Please add the following attributes to the element that should trigger the calendar to open upon clicking.
          // data-cal-link="connectwithshuvo/30min"
          // data-cal-namespace="30min"
          // data-cal-config='{"layout":"month_view","useSlotsViewOnSmallScreen":"true"}'

          Cal.ns["30min"]("ui", {"hideEventTypeDetails":false,"layout":"month_view"});
        `}
      </Script>

      <Footer />
    </div>
  );
}
