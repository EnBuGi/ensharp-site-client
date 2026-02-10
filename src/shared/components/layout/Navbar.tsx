"use client";

import React, { useState, useEffect } from 'react';
import { Button } from '@/shared/components/ui/Button';

export const Navbar: React.FC = () => {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navItems = [
        { label: 'About', href: '#hero' },
        { label: 'Activities', href: '#activities' },
        { label: 'Journey', href: '#journey' },
        { label: 'FAQ', href: '#faq' },
        { label: 'Recruit', href: '#recruitment' },
    ];

    return (
        <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${scrolled ? 'bg-background/80 backdrop-blur-md border-border py-3' : 'bg-transparent border-transparent py-5'}`}>
            <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
                {/* Logo */}
                <a href="#" className="flex items-center gap-2 group">
                    <span className="font-mono font-bold text-xl tracking-tight text-white group-hover:text-brand transition-colors">En#</span>
                </a>

                {/* Nav */}
                <nav className="hidden md:flex items-center gap-8">
                    {navItems.map((item) => (
                        <a
                            key={item.label}
                            href={item.href}
                            className="text-sm font-medium text-muted hover:text-white transition-colors font-sans"
                        >
                            {item.label}
                        </a>
                    ))}
                </nav>

                {/* CTA */}
                <a href="https://forms.gle/RmzQknfjkrggFzGo9" target="_blank" rel="noopener noreferrer">
                    <Button variant="secondary" size="sm" className="font-mono uppercase tracking-wider text-xs font-bold">
                        Apply 26th
                    </Button>
                </a>
            </div>
        </header>
    );
};
