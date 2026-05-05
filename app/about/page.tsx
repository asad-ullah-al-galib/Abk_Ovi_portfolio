"use client";

import { Tag } from "@/components/ui/tag";
import { Header } from "@/components/ui/header";
import { Footer } from "@/components/footer";
import { portfolioData } from "@/lib/portfolio-data";
import { Download, Calendar, Github, Linkedin, Twitter, Dribbble } from "lucide-react";
import Image from "next/image";
import Plan from "@/components/ui/agent-plan";
import { BentoGrid, type BentoItem } from "@/components/ui/bento-grid";
import { Terminal, Brain, Wrench, Trophy, Star, Search, Briefcase, GraduationCap, School, BookOpen, FlaskConical, Zap } from "lucide-react";
import RuixenCard02 from "@/components/ui/ruixen-card02";
import { SectionHeading, PatternBand } from "@/components/ui/section-header";


import { FadingDots } from "@/components/ui/background-snippets";

export default function AboutPage() {
  const skillsBentoItems: BentoItem[] = portfolioData.skillsRoadmap.map((group, idx) => ({
    title: group.title,
    description: group.description,
    icon: idx === 0 ? <Terminal className="w-4 h-4 text-emerald-500" /> : idx === 1 ? <Brain className="w-4 h-4 text-purple-500" /> : <Wrench className="w-4 h-4 text-blue-500" />,
    tags: group.tools?.slice(0, 5) || [],
    colSpan: idx === 0 ? 2 : idx === 2 ? 3 : 1,
    hasPersistentHover: idx === 0,
    status: "Active"
  }));

  const awardsBentoItems: BentoItem[] = portfolioData.awardsRoadmap.map((award, idx) => ({
    title: award.title,
    description: award.description,
    icon: idx === 0 ? <Trophy className="w-4 h-4 text-amber-500" /> : <Star className="w-4 h-4 text-yellow-500" />,
    meta: award.dateRange,
    status: award.institution,
    tags: [],
    colSpan: idx === 0 ? 2 : 1,
    hasPersistentHover: idx === 0,
  }));

  return (
    <div className="min-h-screen bg-[#f4f4f2] text-neutral-950 dark:bg-[#0a0a0a] dark:text-neutral-100">
      <Header currentPage="about" />

      <main className="pt-[88px] relative">
        <div className="relative">
          {/* Global Vertical Grid Lines - Scoped to content area */}
          <div className="pointer-events-none absolute inset-y-0 inset-x-0 mx-auto max-w-site z-20">
            <div className="absolute inset-y-0 left-0 border-l border-dashed border-theme-dark/15 dark:border-theme-main/10" />
            <div className="absolute inset-y-0 right-0 border-r border-dashed border-theme-dark/15 dark:border-theme-main/10" />
          </div>

          <div className="relative">
            {/* Section 1: Profile Card */}
            <div className="relative overflow-hidden">
              <FadingDots />
              <div className="mx-auto max-w-site">
                <div className="flex flex-col items-center justify-center h-full text-center py-8">
                  <RuixenCard02 />
                </div>
              </div>
            </div>

            {/* Section 2: Bio */}
            <div className="border-b border-dashed border-theme-dark/15 dark:border-theme-main/10">
              <div className="mx-auto max-w-site p-4 md:p-6">
                <div className="flex flex-col gap-3">
                  <div className="flex flex-col gap-3 text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed text-justify">
                    {portfolioData.bio.long.split('\n\n').map((paragraph, idx) => (
                      <p key={idx}>{paragraph}</p>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Section 3: Roadmap */}
            <div className="border-b border-dashed border-theme-dark/15 dark:border-theme-main/10">
              <PatternBand className="border-b">
                <SectionHeading title="Professional Roadmap" description="The Chronicles of Growth & Expertise" />
              </PatternBand>

              <div className="mx-auto max-w-site">
                <div className="p-4 md:p-6 max-w-4xl mx-auto">
                  <div className="flex flex-col gap-5 md:gap-8">
                    <h3 className="text-sm font-semibold uppercase tracking-widest text-theme-accent mb-6">
                      Skills & Tools
                    </h3>
                    <Plan
                      tasks={portfolioData.skillsRoadmap.map((group, idx) => ({
                        ...group,
                        icon: idx === 0 ? <Terminal className="w-4 h-4 text-emerald-500" /> : idx === 1 ? <Brain className="w-4 h-4 text-purple-500" /> : <Wrench className="w-4 h-4 text-blue-500" />
                      }))}
                      variant="skills"
                    />

                    <h3 className="text-sm font-semibold uppercase tracking-widest text-theme-accent mt-8 mb-6">
                      Professional Experience
                    </h3>
                    <Plan tasks={portfolioData.experienceRoadmap.map((item) => ({
                      ...item,
                      icon: item.title.includes("Research") ? <FlaskConical className="w-4 h-4 text-blue-500" /> : <Briefcase className="w-4 h-4 text-blue-500" />
                    }))} variant="experience" />

                    {portfolioData.roadmap.length > 0 && (
                      <>
                        <h3 className="text-sm font-semibold uppercase tracking-widest text-theme-accent mt-8 mb-6">
                          Education & Academic Roadmap
                        </h3>
                        <Plan tasks={portfolioData.roadmap.map((item) => ({
                          ...item,
                          icon: item.title.includes("B.Sc") ? <GraduationCap className="w-4 h-4 text-blue-500" /> :
                            item.title.includes("Research") ? <FlaskConical className="w-4 h-4 text-blue-500" /> :
                              item.title.includes("Higher Secondary") ? <School className="w-4 h-4 text-blue-500" /> :
                                <BookOpen className="w-4 h-4 text-blue-500" />
                        }))} variant="education" />
                      </>
                    )}

                    {portfolioData.awardsRoadmap.length > 0 && (
                      <>
                        <h3 className="text-sm font-semibold uppercase tracking-widest text-theme-accent mt-8 mb-6">
                          Awards & Recognition
                        </h3>
                        <Plan tasks={portfolioData.awardsRoadmap.map((item) => ({
                          ...item,
                          icon: <Trophy className="w-4 h-4 text-amber-500" />
                        }))} variant="awards" />
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Section 4: Stats */}
            <div className="border-b border-dashed border-theme-dark/15 dark:border-theme-main/10">
              <div className="mx-auto max-w-site px-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-0 py-8">
                  <div className="text-center px-4 py-3 flex flex-col items-center gap-2.5">
                    <FlaskConical className="size-6 text-blue-500/80 dark:text-blue-400/80" />
                    <div className="text-3xl md:text-4xl font-bold font-serif text-theme-accent dark:text-theme-main">8+</div>
                    <div className="text-xs md:text-sm text-neutral-500 dark:text-neutral-400 mt-1 uppercase tracking-wide">Years Experience</div>
                  </div>
                  <div className="text-center px-4 py-3 flex flex-col items-center gap-2.5">
                    <Trophy className="size-6 text-amber-500/80 dark:text-amber-400/80" />
                    <div className="text-3xl md:text-4xl font-bold font-serif text-theme-accent dark:text-theme-main">3</div>
                    <div className="text-xs md:text-sm text-neutral-500 dark:text-neutral-400 mt-1 uppercase tracking-wide">Organizations Served</div>
                  </div>
                  <div className="text-center px-4 py-3 flex flex-col items-center gap-2.5">
                    <BookOpen className="size-6 text-purple-500/80 dark:text-purple-400/80" />
                    <div className="text-3xl md:text-4xl font-bold font-serif text-theme-accent dark:text-theme-main">2</div>
                    <div className="text-xs md:text-sm text-neutral-500 dark:text-neutral-400 mt-1 uppercase tracking-wide">Degrees Completed</div>
                  </div>
                  <div className="text-center px-4 py-3 flex flex-col items-center gap-2.5">
                    <Zap className="size-6 text-orange-500/80 dark:text-orange-400/80" />
                    <div className="text-3xl md:text-4xl font-bold font-serif text-theme-accent dark:text-theme-main">100%</div>
                    <div className="text-xs md:text-sm text-neutral-500 dark:text-neutral-400 mt-1 uppercase tracking-wide">Professional Commitment</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 5: Connect - Matched to Reference Size */}
            <div className="border-b border-dashed border-theme-dark/15 dark:border-theme-main/10">
              <PatternBand className="text-center">
                <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-10 px-4">
                  <p className="text-xs md:text-sm font-bold text-neutral-800 dark:text-neutral-200 uppercase tracking-widest">
                    Interested in working together?
                  </p>
                </div>
              </PatternBand>
            </div>
            <div className="mx-auto max-w-site px-4 py-4 md:py-4">
              <div className="flex flex-row items-center justify-center gap-4">
                <a
                  href={portfolioData.resume}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex gap-2 items-center justify-center transition-all outline-none font-semibold border no-underline [&_svg]:w-5 [&_svg]:h-5 [&_svg]:fill-currentColor [&_path]:fill-currentColor [&_svg]:stroke-2 hover:opacity-90 active:translate-y-[1px] px-4 py-2.5 text-sm rounded-md bg-transparent border-neutral-800 text-neutral-800 dark:border-neutral-200 dark:text-neutral-200"
                >
                  <Download className="size-4" />
                  Download Resume
                </a>
                <button
                  className="inline-flex gap-2 items-center justify-center transition-all outline-none font-semibold border no-underline [&_svg]:w-5 [&_svg]:h-5 [&_svg]:fill-currentColor [&_path]:fill-currentColor [&_svg]:stroke-2 hover:opacity-90 active:translate-y-[1px] px-4 py-2.5 text-sm rounded-md bg-theme-main border-theme-main text-theme-dark"
                  data-cal-link="connectwithshuvo/30min"
                  data-cal-namespace="30min"
                  data-cal-config='{"layout":"month_view","useSlotsViewOnSmallScreen":"true"}'
                >
                  <Calendar className="size-4" />
                  Book a Call
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
