import type { Metadata } from "next";
import { Header } from "@/components/ui/header";
import { Footer } from "@/components/footer";
import { Code2, FileText } from "lucide-react";
import { BentoGrid, type BentoItem } from "@/components/ui/bento-grid";
import { FadingDots } from "@/components/ui/background-snippets";

export const metadata: Metadata = {
  title: "HR Reporting | ABK OVI",
  description: "Creating clear documentation and internal reporting for people operations.",
};

export default function TechnicalDocumentationPage() {
  const docServices: BentoItem[] = ["LaTeX Typesetting", "Scientific Papers", "Course Materials", "Technical Reports", "Document Formatting", "Research Posters"].map((service) => ({
    title: service,
    description: `High-quality ${service.toLowerCase()} for HR documentation and professional reporting.`,
    icon: <FileText className="size-5 text-theme-accent" />,
    status: "Reporting",
    colSpan: 1,
  }));

  return (
    <div className="min-h-screen bg-[#f4f4f2] text-neutral-950 dark:bg-[#0a0a0a] dark:text-neutral-100">
      <Header currentPage="expertise" />

      <main className="pt-[88px]">
        {/* Page Header - Full Width Dotted Background */}
        <section className="relative border-b border-dashed border-neutral-300 dark:border-white/10 overflow-hidden bg-white/40 dark:bg-black/20">
          <FadingDots />
          <div className="mx-auto max-w-site px-6 py-20 relative z-10 flex flex-col md:flex-row items-start gap-6 md:gap-10">
            <div className="flex size-16 md:size-20 shrink-0 items-center justify-center rounded-full border border-dotted border-lime-200 bg-lime-50 text-slate-700 dark:border-lime-500/20 dark:bg-lime-500/10 dark:text-lime-200">
              <Code2 className="size-8 md:size-10" />
            </div>
            <div>
              <h1 className="font-display text-4xl font-black tracking-tight text-theme-dark dark:text-theme-light md:text-5xl">
                HR Reporting
              </h1>
              <p className="mt-4 text-lg font-medium text-neutral-600 dark:text-neutral-300 max-w-2xl leading-relaxed">
                Clear documentation and reporting that support people operations.
              </p>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="mx-auto max-w-site border-x border-dashed border-neutral-900/15 px-6 py-16 dark:border-white/10">
          <div className="space-y-12">
            <div>
              <h2 className="font-display text-2xl font-black text-theme-dark dark:text-theme-light">Services</h2>
              <div className="mt-8">
                <BentoGrid items={docServices} className="md:grid-cols-2" />
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
