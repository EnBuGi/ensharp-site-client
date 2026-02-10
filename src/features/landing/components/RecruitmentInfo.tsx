"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/shared/components/ui/Button';
import { Text } from '@/shared/components/ui/Text';

// Typing effect component
const TypingCommand = ({ text, onComplete, delay = 0, instant = false }: { text: string, onComplete?: () => void, delay?: number, instant?: boolean }) => {
    // ... existing stats ...
    const [displayedText, setDisplayedText] = useState(instant ? text : '');
    const [showCursor, setShowCursor] = useState(!instant);
    const [hasStarted, setHasStarted] = useState(instant);

    const onCompleteRef = useRef(onComplete);

    useEffect(() => {
        onCompleteRef.current = onComplete;
    }, [onComplete]);

    useEffect(() => {
        if (instant) return;
        const startTimer = setTimeout(() => {
            setHasStarted(true);
        }, delay);
        return () => clearTimeout(startTimer);
    }, [delay, instant]);

    useEffect(() => {
        if (instant || !hasStarted) return;

        let index = 0;
        const interval = setInterval(() => {
            if (index < text.length) {
                setDisplayedText(text.substring(0, index + 1));
                index++;
            } else {
                clearInterval(interval);
                // Ensure full text is shown just in case
                setDisplayedText(text);
                if (onCompleteRef.current) onCompleteRef.current();
            }
        }, 50 + Math.random() * 30); // Random typing speed for realism

        return () => clearInterval(interval);
    }, [hasStarted, text, instant]); // Removed onComplete to prevent re-runs

    // Blinking cursor effect
    useEffect(() => {
        if (instant) return;
        const cursorInterval = setInterval(() => {
            setShowCursor((prev) => !prev);
        }, 500);
        return () => clearInterval(cursorInterval);
    }, [instant]);

    return (
        <Text variant="mono" as="span">
            {displayedText}
            {/* Show cursor only if typing is not done and not instant */}
            {(showCursor && !instant && displayedText !== text) && <span className="text-zinc-500 inline-block w-2.5 h-4 align-middle ml-1 bg-zinc-500"></span>}
        </Text>
    );
};

// ... TerminalLine component ...
const TerminalLine = ({ user = "root", children }: { user?: string, children?: React.ReactNode }) => (
    <div className="mb-2 font-mono text-sm min-h-[1.5em] flex items-center">
        <div className="flex gap-2 text-white items-center mr-2 shrink-0">
            <span className="text-green-500">➜</span>
            <span className="text-blue-400">~/{user}</span>
            <span className="text-zinc-400">$</span>
        </div>
        <div className="text-zinc-200">
            {children}
        </div>
    </div>
);

// Module-level variable to track animation state per page load (refresh)
let hasRecruitmentAnimRun = false;

const RecruitmentInfo: React.FC = () => {
    const [step, setStep] = useState(0); // 0: Idle, 1: Type Cmd1, 2: Show Out1, 3: Type Cmd2, 4: Show Out2
    const sectionRef = useRef<HTMLElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    // Initialize instant state based on the module variable
    const [isInstant, setIsInstant] = useState(hasRecruitmentAnimRun);

    // Initial effect to set step if already run (for hydration/re-renders)
    useEffect(() => {
        if (hasRecruitmentAnimRun) {
            setStep(4);
        }
    }, []);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect(); // Trigger only once
                }
            },
            { threshold: 0.3 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (isVisible && step === 0 && !isInstant) {
            setStep(1); // Start sequence
            hasRecruitmentAnimRun = true;
        }
    }, [isVisible, step, isInstant]);

    useEffect(() => {
        if (step === 2 && !isInstant) {
            // Wait 1.5s after showing JSON before typing next command
            const timer = setTimeout(() => setStep(3), 1500);
            return () => clearTimeout(timer);
        }
    }, [step, isInstant]);

    return (
        <section id="recruitment" ref={sectionRef} className="w-full px-4 py-32 bg-background border-t border-border">
            <div className="max-w-4xl w-full mx-auto">
                <div className="text-center mb-10">
                    <Text variant="display-xl" className="font-bold text-white mb-4">Join the Team</Text>
                    <Text variant="body" className="text-zinc-500">열정 있는 예비 엔지니어의 지원을 기다립니다.</Text>
                </div>

                <div className="w-full rounded-xl bg-[#0C0C0E] border border-border shadow-2xl overflow-hidden min-h-[480px] flex flex-col">
                    {/* Terminal Header */}
                    <div className="flex items-center px-4 py-3 bg-[#18181B] border-b border-border">
                        <div className="flex gap-2">
                            <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                            <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                            <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                        </div>
                        <div className="ml-4 text-xs font-mono text-zinc-500">bash — applicant@en#: ~</div>
                    </div>

                    {/* Terminal Body */}
                    <div className="p-6 md:p-8 flex-1 font-mono text-sm overflow-y-auto">

                        {/* Step 1: Type Command */}
                        {step >= 1 && (
                            <TerminalLine user="applicant">
                                <TypingCommand
                                    text="cat recruitment_info.json"
                                    onComplete={() => !isInstant && setStep(2)}
                                    delay={isInstant ? 0 : 500}
                                    instant={isInstant}
                                />
                            </TerminalLine>
                        )}

                        {/* Step 2: Show JSON Output */}
                        {step >= 2 && (
                            <div className="mb-6 mt-2 text-zinc-400 pl-4 border-l border-zinc-700 ml-1 animate-fade-in-up origin-top">
                                <div className="space-y-1 font-mono text-sm">
                                    <p>{`{`}</p>
                                    <p className="pl-4"><span className="text-primary">"기수"</span>: <span className="text-yellow-300">"26th"</span>,</p>
                                    <p className="pl-4"><span className="text-primary">"모집 대상"</span>: <span className="text-green-300">"세종대학교 학부생 (전공 무관)"</span>,</p>
                                    <p className="pl-4"><span className="text-primary">"모집 기간"</span>: <span className="text-green-300">"2026.02.11 ~ 2026.03.10"</span>,</p>
                                    <p className="pl-4"><span className="text-primary">"면접 기간"</span>: <span className="text-green-300">"2026.03.13 ~ 2026.03.15"</span>,</p>
                                    <p className="pl-4"><span className="text-primary">"활동비"</span>: <span className="text-blue-300">0</span>,</p>
                                    <p className="pl-4"><span className="text-primary">"동아리방"</span>: <span className="text-zinc-400">"학생회관 530호"</span></p>
                                    <p>{`}`}</p>
                                </div>
                            </div>
                        )}

                        {/* Step 3: Type Next Command */}
                        {step >= 3 && (
                            <TerminalLine user="applicant">
                                <TypingCommand
                                    text="./apply.sh"
                                    onComplete={() => !isInstant && setStep(4)}
                                    instant={isInstant}
                                />
                            </TerminalLine>
                        )}

                        {/* Step 4: Show Button Output */}
                        {step >= 4 && (
                            <div className="py-4 animate-fade-in-up">
                                <p className="mb-4 text-zinc-300 font-mono text-sm">
                                    <span className="text-green-500">✔</span> Application form ready.<br />
                                    <span className="text-zinc-500">Initiating external link...</span>
                                </p>
                                <a href="https://forms.gle/RmzQknfjkrggFzGo9" target="_blank" rel="noopener noreferrer">
                                    <Button size="lg" className="hover:scale-105 transition-transform" rightIcon={<span className="material-symbols-outlined text-sm">arrow_forward</span>}>
                                        26기 지원서 작성하기
                                    </Button>
                                </a>
                            </div>
                        )}

                    </div>
                </div>
            </div>
        </section>
    );
};

export default RecruitmentInfo;
