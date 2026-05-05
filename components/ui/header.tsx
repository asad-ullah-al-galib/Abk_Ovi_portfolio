'use client';
import React from 'react';
import Link from 'next/link';
import { Command, Box, Terminal, BarChart3, Code2, ArrowRight, Calendar, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { MenuToggleIcon } from '@/components/ui/menu-toggle-icon';
import { useScroll } from '@/components/ui/use-scroll';
import { buttonVariants } from '@/components/ui/button';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuIndicator,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import { BentoGrid, type BentoItem } from "@/components/ui/bento-grid";

interface HeaderProps {
  currentPage?: 'home' | 'blogs' | 'about' | 'expertise';
}

const EXPERTISE_ITEMS = [
  {
    title: 'HR Operations',
    description: 'Supporting day-to-day human resources administration and coordination.',
    slug: 'mathematical-modeling',
    icon: BarChart3,
  },
  {
    title: 'Compensation & Benefits',
    description: 'Managing benefits support, payroll coordination, and policy execution.',
    slug: 'ai-machine-learning',
    icon: Terminal,
  },
  {
    title: 'HR Reporting',
    description: 'Preparing clear documentation, tracking, and internal reporting.',
    slug: 'technical-documentation',
    icon: Code2,
  },
  {
    title: 'Employee Relations',
    description: 'Helping teams stay aligned with professional communication and support.',
    slug: 'data-science',
    icon: Box,
  },
];

export function Header({ currentPage = 'home' }: HeaderProps) {
  const [open, setOpen] = React.useState(false);
  const scrolled = useScroll(10);

  const headerBentoItems: BentoItem[] = EXPERTISE_ITEMS.map((item) => {
    let status = "Active";
    if (item.title.includes("Mathematical")) status = "Research";
    else if (item.title.includes("Machine Learning")) status = "Development";
    else if (item.title.includes("Documentation")) status = "Typesetting";
    else if (item.title.includes("Data Science")) status = "Analysis";

    return {
      title: item.title,
      description: item.description,
      icon: <item.icon className="size-5 text-theme-accent" />,
      href: `/expertise/${item.slug}`,
      status: status,
      colSpan: 1,
      hasPersistentHover: false,
    };
  });

  const getNavStyles = (isActive: boolean) =>
    cn(
      navigationMenuTriggerStyle(),
      'bg-transparent hover:bg-black/5 dark:hover:bg-white/10 data-[state=open]:bg-black/5 dark:data-[state=open]:bg-white/10 data-[active]:bg-black/5 dark:data-[active]:bg-white/10',
      'text-sm font-semibold transition-colors cursor-pointer px-2 tracking-tighter',
      isActive
        ? 'text-theme-dark dark:text-theme-light'
        : 'text-neutral-500 dark:text-neutral-300 hover:text-theme-dark dark:hover:text-theme-light',
    );

  React.useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 mx-auto w-full max-w-site border-b border-transparent md:rounded-b-2xl md:transition-all md:ease-out',
        {
          'bg-white/60 dark:bg-black/60 supports-[backdrop-filter]:bg-white/40 dark:supports-[backdrop-filter]:bg-black/40 border-neutral-200/50 dark:border-white/10 backdrop-blur-xl md:top-4 md:max-w-site md:shadow-lg md:rounded-full md:border':
            scrolled && !open,
          'bg-[#f4f4f2]/90 dark:bg-[#0a0a0a]/90': open,
          'bg-transparent': !scrolled && !open
        },
      )}
    >
      <nav
        className={cn(
          'flex h-[88px] w-full items-center justify-between px-6 md:transition-all md:ease-out',
          {
            'md:h-16 md:px-5': scrolled,
          },
        )}
      >
        {/* Left Group: Logo + Nav */}
        <div className="flex items-center gap-2">
          {/* Logo */}
          <Link href="/" aria-label="home" className="flex-shrink-0">
            <span className={cn("relative inline-flex items-center justify-start font-display font-black leading-none text-theme-dark dark:text-theme-light transition-all", scrolled ? "size-7 text-2xl" : "size-7.5 text-2xl sm:size-10 sm:text-4xl")}>
              A
              <span className={cn("absolute rounded-full bg-gradient-to-tr from-orange-600 via-orange-400 to-orange-300 shadow-sm transition-all", scrolled ? "right-[10px] bottom-0 size-1.5" : "right-[11px] bottom-0 size-1.5 sm:right-[14px] sm:bottom-1 sm:size-2")} />
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <NavigationMenu>
              <NavigationMenuList className="flex items-center gap-1 transition-all">
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link href="/" className={getNavStyles(currentPage === 'home')}>
                      Home
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>

                {/* Expertise dropdown */}
                <NavigationMenuItem>
                  <NavigationMenuTrigger className={getNavStyles(currentPage === 'expertise')}>
                    Expertise
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="w-[720px] overflow-hidden bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-white/10 rounded-xl shadow-xl p-3">
                      <BentoGrid items={headerBentoItems} size="xs" hideExtras={true} rounded={true} className="md:grid-cols-2" />
                      <div className="mt-6 flex justify-center border-t border-neutral-200 dark:border-neutral-700 pt-6 pb-2">
                        <NavigationMenuLink asChild>
                          <Link
                            href="/expertise"
                            className="group flex items-center gap-2 text-sm font-normal text-neutral-900 dark:text-neutral-100 hover:text-orange-500 dark:hover:text-orange-400 transition-colors"
                          >
                            View all expertise
                            <span className="inline-flex items-center justify-center size-6 rounded-md bg-neutral-900 dark:bg-white group-hover:bg-orange-500 dark:group-hover:bg-orange-500 transition-colors">
                              <ArrowRight className="size-3 text-white dark:text-neutral-900 group-hover:text-white dark:group-hover:text-white" />
                            </span>
                          </Link>
                        </NavigationMenuLink>
                      </div>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link href="/#works" className={getNavStyles(false)}>
                      Works
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link href="/blogs" className={getNavStyles(currentPage === 'blogs')}>
                      Blogs
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link href="/about" className={getNavStyles(currentPage === 'about')}>
                      ✨About
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>

                <NavigationMenuIndicator />
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        </div>

        {/* Right Group: Actions + Hamburger */}
        <div className="flex items-center gap-1.5 sm:gap-3">
          {/* Available for Work - Reference Size */}
          <div className="group relative flex h-8 sm:h-11 items-center gap-2 sm:gap-2 rounded-full bg-neutral-200/80 px-3 sm:px-5 font-bold text-theme-dark dark:bg-white/10 dark:text-theme-light cursor-default transition-all shadow-sm border border-neutral-300/30 dark:border-white/5">
            <div className="relative flex h-3.5 sm:h-5 w-3.5 sm:w-5 items-center justify-center">
              {/* Concentric dashed rings */}
              <div className="absolute w-[120%] h-[120%] rounded-full border border-dashed border-lime-500/40 animate-[spin_10s_linear_infinite]" />
              <div className="absolute w-[85%] h-[85%] rounded-full border border-dashed border-lime-500/60 animate-[spin_6s_linear_infinite_reverse]" />

              <span className="relative flex h-1 sm:h-2 w-1 sm:w-2">
                {/* Intensive Ripple Pulse */}
                <span className="animate-ping absolute -inset-3 inline-flex rounded-full bg-lime-400/60" />
                <span className="relative inline-flex h-1 sm:h-2 w-1 sm:w-2 rounded-full bg-lime-500 shadow-[0_0_12px_rgba(163,230,53,0.9)]" />
              </span>
            </div>
            <span className="text-[10px] sm:text-[14px] transition-all whitespace-nowrap">
              Available for Work
            </span>
          </div>

          {/* Call Button - Matched Height */}
          <button
            className="group relative flex size-8 sm:size-11 items-center justify-center rounded-full bg-neutral-200/80 text-theme-dark dark:bg-white/10 dark:text-theme-light hover:bg-neutral-300 dark:hover:bg-white/20 transition-all border border-neutral-400/20 dark:border-white/10 shadow-sm"
            data-cal-link="connectwithshuvo/30min"
            data-cal-namespace="30min"
            data-cal-config='{"layout":"month_view","useSlotsViewOnSmallScreen":"true"}'
            title="Book a Call"
          >
            {/* Intensive Ripple Effect - Scaled for mobile */}
            <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
              <div className="hidden sm:block absolute inset-[-4px] rounded-full border border-dashed border-lime-500/60 animate-[spin_10s_linear_infinite]" />
              <div className="absolute inset-[-2px] rounded-full bg-lime-400/20 sm:bg-lime-400/40 animate-ping" />
            </div>
            <Calendar className="relative z-10 size-4 sm:size-5 group-hover:text-lime-500 transition-colors duration-300" />
          </button>

          {/* Theme Toggle - Matched Height */}
          <ThemeToggle className={cn("transition-all", scrolled ? "size-8 sm:size-11 [&_svg]:size-4 sm:[&_svg]:size-5" : "size-8 sm:size-11 [&_svg]:size-4 sm:[&_svg]:size-5")} />

          {/* Mobile Hamburger - Matched Height */}
          <button
            onClick={() => setOpen(!open)}
            className={cn(
              "flex md:hidden size-8 sm:size-11 items-center justify-center rounded-full bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-white/10 shadow-sm transition-all hover:bg-neutral-50 dark:hover:bg-neutral-800",
              open && "bg-neutral-100 dark:bg-neutral-800"
            )}
            aria-label="Toggle menu"
          >
            <div className="flex flex-col gap-0.5 items-end pr-0.5">
              <div className={cn("h-0.5 bg-neutral-900 dark:bg-white transition-all", open ? "w-3.5 translate-y-1 rotate-45" : "w-3.5")} />
              <div className={cn("h-0.5 bg-neutral-900 dark:bg-white transition-all", open ? "w-3.5 -translate-y-0.5 rotate-[135deg]" : "w-2")} />
            </div>
          </button>
        </div>
      </nav>

      {/* Mobile Menu overlay */}
      <div
        className={cn(
          'fixed inset-0 z-40 bg-white/70 dark:bg-black/70 backdrop-blur-md transition-all duration-300 ease-in-out md:hidden',
          open ? 'opacity-100' : 'pointer-events-none opacity-0',
        )}
        onClick={() => setOpen(false)}
      >
        <div
          className={cn(
            'absolute inset-x-0 top-0 flex flex-col transition-all duration-500 ease-out h-[calc(100vh)]',
            open ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0',
          )}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button Inside Overlay */}
          <div className="flex justify-end p-6">
            <button
              onClick={() => setOpen(false)}
              className="size-11 flex items-center justify-center rounded-full bg-neutral-200/50 dark:bg-white/10 backdrop-blur-sm border border-neutral-300/30 dark:border-white/10 shadow-sm"
              aria-label="Close menu"
            >
              <X className="size-6" />
            </button>
          </div>

          <div className="flex flex-col p-10 sm:p-14 gap-6 mt-6 sm:mt-10">
            {[
              { label: 'Home', href: '/' },
              { label: 'Expertise', href: '/expertise' },
              { label: 'Works', href: '/#works' },
              { label: 'Blogs', href: '/blogs' },
              { label: 'About', href: '/about' },
            ].map((link, i) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setOpen(false)}
                className={cn(
                  'text-xl sm:text-2xl font-bold tracking-tight transition-all hover:translate-x-2',
                  currentPage === link.label.toLowerCase()
                    ? 'text-neutral-900 dark:text-white'
                    : 'text-neutral-500/80 dark:text-neutral-400/80 hover:text-neutral-900 dark:hover:text-white',
                )}
                style={{
                  transitionDelay: `${i * 30}ms`,
                }}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
