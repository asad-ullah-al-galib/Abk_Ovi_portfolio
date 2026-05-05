import { Calendar, Code2, ExternalLink, Share2, Download, Github, Linkedin, Mail } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { portfolioData } from "@/lib/portfolio-data";

interface Skill {
    name: string;
    level: number;
}

interface RuixenCard02Props {
    name?: string;
    role?: string;
    image?: string;
    status?: string;
    skills?: Skill[];
    portfolio?: string;
}

const profileInfo = {
    name: portfolioData.name,
    role: portfolioData.title,
    image: portfolioData.image,
    status: "Available for Remote Projects",
    skills: [
        { name: "HR Operations", level: 5 },
        { name: "Compensation & Benefits", level: 4 },
        { name: "Leadership", level: 5 },
    ],
    portfolio: "#",
    resume: portfolioData.resume,
} satisfies Required<RuixenCard02Props & { resume: string }>;

export default function RuixenCard02({
    name = profileInfo.name,
    role = profileInfo.role,
    image = profileInfo.image,
    status = profileInfo.status,
    skills = profileInfo.skills,
    portfolio = profileInfo.portfolio,
}: RuixenCard02Props = profileInfo) {
    return (
        <div className="relative w-full max-w-sm mx-auto rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-white/60 dark:bg-zinc-900/60 backdrop-blur-md shadow-lg hover:shadow-xl hover:border-emerald-500/20 transition-all duration-300 group/card">
            {/* Banner */}
            <div className="relative h-28 bg-neutral-50 dark:bg-zinc-900/50 border-b border-zinc-100 dark:border-zinc-800 overflow-hidden">
                <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]" style={{ backgroundImage: 'radial-gradient(#000 0.5px, transparent 0.5px)', backgroundSize: '10px 10px' }} />
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent" />
            </div>

            {/* Profile Image */}
            <div className="relative z-10 flex justify-center -mt-10">
                <div className="w-20 h-20 flex-shrink-0 rounded-full border-4 border-white dark:border-zinc-900 shadow-md overflow-hidden bg-neutral-100 dark:bg-neutral-800">
                    <Image src={image} alt={name} width={80} height={80} className="object-cover rounded-full" />
                </div>
            </div>

            {/* Info */}
            <div className="text-center mt-2 px-5 pb-8">
                <h1 className="text-lg font-display font-black text-zinc-900 dark:text-white tracking-tight">{name}</h1>
                <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">{role}</p>
                <div className="mt-3 inline-flex items-center gap-2 text-[10px] sm:text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 bg-emerald-500/10 dark:bg-emerald-500/20 px-3 py-1 rounded-full border border-dashed border-emerald-500/30 dark:border-emerald-500/40 shadow-[0_0_15px_rgba(16,185,129,0.1)]">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                    {status}
                </div>
            </div>

            {/* Skills */}
            <div className="px-5 space-y-3 pb-6">
                {skills.map((skill) => (
                    <div key={skill.name}>
                        <div className="flex justify-between text-sm text-zinc-700 dark:text-zinc-300 mb-1">
                            <span>{skill.name}</span>
                            <span className="text-xs text-zinc-500 dark:text-zinc-400">{skill.level}/5</span>
                        </div>
                        <div className="w-full h-1.5 bg-zinc-200 dark:bg-zinc-700 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-zinc-900 dark:bg-zinc-100"
                                style={{ width: `${(skill.level / 5) * 100}%` }}
                            />
                        </div>
                    </div>
                ))}
            </div>

            {/* Actions */}
            <div className="mx-auto w-24 h-px bg-neutral-300 dark:bg-white/10" />
            <div className="px-5 pb-8 pt-6 flex flex-row items-center justify-center gap-3">
                <a
                    href={portfolioData.resume}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex gap-2 items-center justify-center transition-all outline-none font-semibold border no-underline [&_svg]:w-5 [&_svg]:h-5 [&_svg]:fill-currentColor [&_path]:fill-currentColor [&_svg]:stroke-2 hover:opacity-90 active:translate-y-[1px] bg-neutral-300 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-100 px-4 py-2 text-sm rounded-xl border-dashed border-neutral-300 dark:border-neutral-700 whitespace-nowrap"
                >
                    <Download className="size-4" />
                    Resume
                </a>
                <div className="flex items-center gap-2">
                    {portfolioData.socials.github && (
                        <a href={portfolioData.socials.github} target="_blank" rel="noopener noreferrer" className="rounded-full bg-neutral-700 p-2 text-white hover:bg-neutral-900 transition dark:bg-neutral-800 dark:hover:bg-neutral-600">
                            <Github className="size-[18px]" />
                        </a>
                    )}
                    {portfolioData.socials.linkedin && (
                        <a href={portfolioData.socials.linkedin} target="_blank" rel="noopener noreferrer" className="rounded-full bg-[#0077B5] p-2 text-white hover:opacity-90 transition">
                            <Linkedin className="size-[18px]" />
                        </a>
                    )}
                    {portfolioData.socials.email && (
                        <a href={`mailto:${portfolioData.socials.email}`} className="rounded-full bg-neutral-800 p-2 text-white hover:bg-black transition dark:bg-neutral-800 dark:hover:bg-neutral-600">
                            <Mail className="size-[18px]" />
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
}
