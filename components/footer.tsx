import { Linkedin, Mail } from "lucide-react";
import { SkillTag } from "@/components/ui/skill-tag";
import { portfolioData } from "@/lib/portfolio-data";

export function Footer() {
  return (
    <>
      <footer className="relative border-t border-dashed border-neutral-400/40 px-6 py-12 dark:border-white/15">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(15,23,42,0.06)_1px,transparent_1px)] bg-[length:40px_40px] opacity-40" />

        <div className="relative mx-auto grid max-w-site gap-8 md:grid-cols-2 px-6">
          <div>
            <h2 className="font-display text-lg font-black text-theme-dark dark:text-theme-light">
              Say hello 👋
            </h2>
            <div className="mt-4 flex flex-col gap-2">
              {portfolioData.socials.linkedin && (
                <a href={portfolioData.socials.linkedin} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-3 text-sm font-medium text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100 transition-colors">
                  <span className="rounded-full bg-[#0077B5] p-2 text-white group-hover:opacity-90 transition">
                    <Linkedin className="size-[18px]" />
                  </span>
                  /in/abk-ovi-368403174
                </a>
              )}

              {portfolioData.socials.email && (
                <a href={`mailto:${portfolioData.socials.email}`} className="group flex items-center gap-3 text-sm font-medium text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100 transition-colors">
                  <span className="rounded-full bg-neutral-700 p-2 text-white group-hover:bg-neutral-900 transition dark:bg-neutral-800 dark:group-hover:bg-neutral-700">
                    <Mail className="size-[18px]" />
                  </span>
                  {portfolioData.socials.email}
                </a>
              )}
            </div>
          </div>
          <div className="text-sm font-medium text-neutral-500 dark:text-neutral-300">
            <p className="leading-8">
              Built with <SkillTag variant="primary" size="sm">Next.js</SkillTag>, <SkillTag variant="primary" size="sm">TypeScript</SkillTag>, and{" "}
              <SkillTag variant="primary" size="sm">Tailwind CSS</SkillTag>, deployed on <SkillTag variant="primary" size="sm">Vercel</SkillTag>.
            </p>
            <p className="mt-4">
              &copy; <span className="font-black text-theme-accent dark:text-theme-main">ABK OVI</span> 2026.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
