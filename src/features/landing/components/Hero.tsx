"use client";

import React, { useState, useEffect } from 'react';
import { Button } from '@/shared/components/ui/Button';
import { Text } from '@/shared/components/ui/Text';

const Hero: React.FC = () => {
    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
    const [isClosed, setIsClosed] = useState(false);

    useEffect(() => {
        const deadline = new Date('2026-03-12T00:00:00');

        const updateTimer = () => {
            const now = new Date().getTime();
            const distance = deadline.getTime() - now;

            if (distance < 0) {
                setIsClosed(true);
                return;
            }

            setTimeLeft({
                days: Math.floor(distance / (1000 * 60 * 60 * 24)),
                hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
                seconds: Math.floor((distance % (1000 * 60)) / 1000)
            });
        };

        updateTimer(); // Initial call
        const timer = setInterval(updateTimer, 1000);

        return () => clearInterval(timer);
    }, []);

    const formatTime = (num: number) => num.toString().padStart(2, '0');

    return (
        <section id="hero" className="relative min-h-[80vh] flex flex-col items-center justify-center px-4 overflow-hidden pt-20">

            {/* Background Image with Overlay */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-black/70 z-10"></div>
                <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40 mix-blend-overlay"
                    style={{ backgroundImage: "url('/ensharp_photo.jpg')" }}
                ></div>
                {/* Fallback pattern if image fails or for texture */}
                <div className="absolute inset-0 bg-grid opacity-[0.05]"></div>
            </div>

            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/20 blur-[100px] rounded-full pointer-events-none z-0"></div>

            <div className="relative z-10 text-center max-w-4xl mx-auto animate-fade-in-up">

                <div className="mb-6 inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-black/40 backdrop-blur-md">
                    <span className={`w-1.5 h-1.5 rounded-full ${isClosed ? 'bg-zinc-500' : 'bg-primary animate-pulse'}`}></span>
                    <Text variant="label" className="text-xs font-mono text-muted uppercase tracking-widest">
                        {isClosed ? 'Recruitment Closed' : 'Now Recruiting 26th'}
                    </Text>
                </div>

                <h1 className="text-5xl md:text-8xl font-display font-bold tracking-tighter text-white mb-6 leading-tight">
                    Enjoy Learning!<br />
                    <span className="text-zinc-500">Learn with </span>
                    En<span className="text-primary">#</span>
                </h1>

                <Text variant="body" className="text-lg md:text-xl text-muted max-w-xl mx-auto leading-relaxed mb-10 font-sans break-keep">
                    함께 공부하고, 함께 성장합니다.<br />
                    25년 역사의 세종대학교 프로그래밍 학술 동아리 En#입니다.
                </Text>

                {/* Countdown Timer - Only show if not closed */}
                {!isClosed && (
                    <div className="mb-12 animate-fade-in-up [animation-delay:600ms]">
                        <Text variant="h2" className="text-3xl md:text-5xl font-mono font-bold text-white tabular-nums tracking-widest">
                            D-{String(timeLeft.days).padStart(2, '0')} <span className="text-zinc-500 mx-1">:</span> {String(timeLeft.hours).padStart(2, '0')} <span className="text-zinc-500 mx-1">:</span> {String(timeLeft.minutes).padStart(2, '0')} <span className="text-zinc-500 mx-1">:</span> {String(timeLeft.seconds).padStart(2, '0')}
                        </Text>
                    </div>
                )}

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <a href={isClosed ? undefined : "#recruitment"} className={`group ${isClosed ? 'pointer-events-none' : ''}`}>
                        <Button
                            size="lg"
                            disabled={isClosed}
                            className="h-16 px-10 text-lg shadow-xl shadow-primary/10 hover:shadow-primary/20 flex flex-col items-center justify-center gap-1 disabled:opacity-50 disabled:shadow-none"
                        >
                            <div className="flex items-center justify-center">
                                <span>{isClosed ? '모집 마감' : '26기 지원하기'}</span>
                            </div>
                        </Button>
                    </a>
                </div>
            </div>

        </section>
    );
};

export default Hero;
