"use client";

import React, { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, ArrowRight, Play, Menu, X } from 'lucide-react';

interface NavLink {
    label: string;
    href: string;
    isActive?: boolean;
}

interface Partner {
    logoUrl: string;
    href: string;
}

interface ResponsiveHeroBannerProps {
    logoUrl?: string;
    backgroundImageUrl?: string;
    navLinks?: NavLink[];
    ctaButtonText?: string;
    ctaButtonHref?: string;
    badgeText?: string;
    badgeLabel?: string;
    title?: string;
    titleLine2?: string;
    description?: string;
    primaryButtonText?: string;
    primaryButtonHref?: string;
    secondaryButtonText?: string;
    secondaryButtonHref?: string;
    partnersTitle?: string;
    partners?: Partner[];
}

// A dark, premium Unsplash backdrop (verified to exist).
const DEFAULT_BG =
    "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=2400&q=80";

const ResponsiveHeroBanner: React.FC<ResponsiveHeroBannerProps> = ({
    logoUrl = "/image/Trackpay.jpg",
    backgroundImageUrl = DEFAULT_BG,
    navLinks = [
        { label: "Home", href: "/", isActive: true },
        { label: "Team", href: "/team" },
        { label: "Vision", href: "/vision" },
        { label: "Survey", href: "/survey" },
    ],
    ctaButtonText = "Join Waitlist",
    ctaButtonHref = "/",
    badgeLabel = "New",
    badgeText = "Now pre-incubated at Nirmaan, IIT Madras",
    title = "Track the flow",
    titleLine2 = "of your money.",
    description = "TrackPay is the payment app with a financial intelligence layer for India. Track, analyze, and automate every rupee across all your accounts in real-time.",
    primaryButtonText = "Join the Waitlist",
    primaryButtonHref = "/",
    secondaryButtonText = "Watch the Demo",
    secondaryButtonHref = "/survey",
    partnersTitle = "Built for India: NPCI & UPI compliant, secured with AES-256",
    partners = [
        { logoUrl: "/image/Nirmaan.png", href: "#" },
    ],
}) => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const bgRef = useRef<HTMLImageElement>(null);

    // Subtle mouse-driven parallax on the background image.
    useEffect(() => {
        const el = bgRef.current;
        if (!el) return;
        let raf = 0;
        const onMove = (e: MouseEvent) => {
            cancelAnimationFrame(raf);
            raf = requestAnimationFrame(() => {
                const x = e.clientX / window.innerWidth - 0.5;
                const y = e.clientY / window.innerHeight - 0.5;
                el.style.transform = `scale(1.12) translate(${x * -24}px, ${y * -24}px)`;
            });
        };
        window.addEventListener("mousemove", onMove);
        return () => {
            window.removeEventListener("mousemove", onMove);
            cancelAnimationFrame(raf);
        };
    }, []);

    return (
        <section className="w-full isolate min-h-screen overflow-hidden relative bg-neutral-950">
            <img
                ref={bgRef}
                src={backgroundImageUrl}
                alt=""
                aria-hidden="true"
                className="w-full h-full object-cover absolute inset-0 opacity-60 will-change-transform"
                style={{ transform: "scale(1.12)" }}
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-neutral-950/40 via-neutral-950/60 to-neutral-950" />
            <div className="pointer-events-none absolute inset-0 ring-1 ring-black/30" />

            <header className="z-10 xl:top-4 relative">
                <div className="mx-6">
                    <div className="flex items-center justify-between pt-4">
                        <a href="/" className="inline-flex items-center gap-2.5">
                            <img src={logoUrl} alt="TrackPay" className="h-9 w-9 rounded-xl object-cover ring-1 ring-white/15" />
                            <span className="text-white font-semibold tracking-tight text-lg">TrackPay</span>
                        </a>

                        <nav className="hidden md:flex items-center gap-2">
                            <div className="flex items-center gap-1 rounded-full bg-white/5 px-1 py-1 ring-1 ring-white/10 backdrop-blur">
                                {navLinks.map((link, index) => (
                                    <a
                                        key={index}
                                        href={link.href}
                                        className={`px-3 py-2 text-sm font-medium hover:text-white font-sans transition-colors ${link.isActive ? 'text-white' : 'text-white/70'}`}
                                    >
                                        {link.label}
                                    </a>
                                ))}
                                <a
                                    href={ctaButtonHref}
                                    className="ml-1 inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-2 text-sm font-medium text-neutral-900 hover:bg-white/90 font-sans transition-colors"
                                >
                                    {ctaButtonText}
                                    <ArrowUpRight className="h-4 w-4" />
                                </a>
                            </div>
                        </nav>

                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 ring-1 ring-white/15 backdrop-blur text-white/90"
                            aria-expanded={mobileMenuOpen}
                            aria-label="Toggle menu"
                        >
                            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                        </button>
                    </div>

                    {/* Mobile dropdown */}
                    {mobileMenuOpen && (
                        <div className="md:hidden mt-3 rounded-2xl bg-white/5 p-2 ring-1 ring-white/10 backdrop-blur-xl">
                            {navLinks.map((link, index) => (
                                <a
                                    key={index}
                                    href={link.href}
                                    className={`block rounded-xl px-4 py-3 text-sm font-medium font-sans transition-colors ${link.isActive ? 'text-white bg-white/5' : 'text-white/75 hover:text-white'}`}
                                >
                                    {link.label}
                                </a>
                            ))}
                            <a
                                href={ctaButtonHref}
                                className="mt-1 flex items-center justify-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-medium text-neutral-900 font-sans"
                            >
                                {ctaButtonText}
                                <ArrowUpRight className="h-4 w-4" />
                            </a>
                        </div>
                    )}
                </div>
            </header>

            <div className="z-10 relative">
                <div className="sm:pt-28 md:pt-32 lg:pt-40 max-w-7xl mx-auto pt-28 px-6 pb-16">
                    <div className="mx-auto max-w-3xl text-center">
                        <div className="mb-6 inline-flex items-center gap-3 rounded-full bg-white/10 px-2.5 py-2 ring-1 ring-white/15 backdrop-blur animate-fade-slide-in-1">
                            <span className="inline-flex items-center text-xs font-medium text-neutral-900 bg-white/90 rounded-full py-0.5 px-2 font-sans">
                                {badgeLabel}
                            </span>
                            <span className="text-sm font-medium text-white/90 font-sans">
                                {badgeText}
                            </span>
                        </div>

                        <h1 className="sm:text-5xl md:text-6xl lg:text-7xl leading-tight text-4xl text-white tracking-tight font-instrument-serif font-normal animate-fade-slide-in-2">
                            {title}
                            <br className="hidden sm:block" />
                            {titleLine2}
                        </h1>

                        <p className="sm:text-lg animate-fade-slide-in-3 text-base text-white/80 max-w-2xl mt-6 mx-auto">
                            {description}
                        </p>

                        <div className="flex flex-col sm:flex-row sm:gap-4 mt-10 gap-3 items-center justify-center animate-fade-slide-in-4">
                            <a
                                href={primaryButtonHref}
                                className="inline-flex items-center gap-2 hover:bg-white/15 text-sm font-medium text-white bg-white/10 ring-white/15 ring-1 rounded-full py-3 px-5 font-sans transition-colors"
                            >
                                {primaryButtonText}
                                <ArrowRight className="h-4 w-4" />
                            </a>
                            <a
                                href={secondaryButtonHref}
                                className="inline-flex items-center gap-2 rounded-full bg-transparent px-5 py-3 text-sm font-medium text-white/90 hover:text-white font-sans transition-colors"
                            >
                                {secondaryButtonText}
                                <Play className="h-4 w-4" />
                            </a>
                        </div>
                    </div>

                    <div className="mx-auto mt-20 max-w-5xl">
                        <p className="animate-fade-slide-in-1 text-sm text-white/70 text-center">
                            {partnersTitle}
                        </p>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 animate-fade-slide-in-2 text-white/70 mt-6 items-center justify-items-center gap-4">
                            {partners.map((partner, index) => (
                                <a
                                    key={index}
                                    href={partner.href}
                                    className="inline-flex items-center justify-center bg-center bg-contain bg-no-repeat w-[120px] h-[36px] rounded-full opacity-80 hover:opacity-100 transition-opacity"
                                    style={{ backgroundImage: `url(${partner.logoUrl})` }}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ResponsiveHeroBanner;
