"use client";

import React, { useRef, useEffect, useState } from 'react';
import { Card } from '@/shared/components/ui/card/Card';
import { Text } from '@/shared/components/ui/Text';

interface StepData {
    step: string;
    month: string;
    title: string;
    desc: string;
    color: string;
    image: string; // Add image field
}

const Journey: React.FC = () => {
    const targetRef = useRef<HTMLDivElement>(null);
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [scrollProgress, setScrollProgress] = useState(0);

    // Data
    const steps: StepData[] = [
        {
            step: "Step 01",
            month: "3월 - 6월",
            title: "Coding Study",
            desc: "Java로 객체지향의 기본을 다지고, Spring과 React로 모던 웹 개발의 핵심을 익힙니다. 단순 이론 학습이 아닌 매주 과제와 코드 리뷰를 거치며, 서비스 구현이 가능한 개발자로 성장합니다.",
            color: "text-blue-400",
            image: "/study.jpg"
        },
        {
            step: "Step 02",
            month: "7월 - 8월",
            title: "Team Building\n& Ideation",
            desc: "동기 및 멘토 기수와 팀을 구성하고 프로젝트 아이디어를 구체화합니다. Microsoft Imagine Cup 등 주요 공모전을 목표로 기획을 시작합니다.",
            color: "text-yellow-400",
            image: "/build.jpg"
        },
        {
            step: "Step 03",
            month: "9월 - 11월",
            title: "Contests\n& Hackathons",
            desc: "실제 프로젝트 개발을 진행하며 공모전과 해커톤에 참가합니다. 기획, 개발, 발표의 전 과정을 주도하며 실전 협업 경험을 쌓습니다.",
            color: "text-primary",
            image: "/channeltalk.jpg"
        },
        {
            step: "Final",
            month: "12월 ",
            title: "Mentoring\nNext Gen",
            desc: "1년간의 신입 활동 종료 후, 다음 기수의 멘토가 됩니다. 학습했던 내용을 정리하고 후배들에게 피드백을 주며 리더십을 키웁니다.",
            color: "text-purple-400",
            image: "/seminar.jpg"
        }
    ];

    useEffect(() => {
        const handleScroll = () => {
            if (!targetRef.current || !scrollContainerRef.current) return;

            const target = targetRef.current;
            const container = scrollContainerRef.current;

            const targetTop = target.offsetTop;
            const targetHeight = target.offsetHeight;
            const windowHeight = typeof window !== 'undefined' ? window.innerHeight : 0;
            const scrollTop = window.scrollY;

            const start = targetTop;
            const end = targetTop + targetHeight - windowHeight;

            let progress = (scrollTop - start) / (end - start);
            progress = Math.max(0, Math.min(1, progress));

            const totalWidth = container.scrollWidth;
            const viewportWidth = window.innerWidth;

            const maxTranslate = totalWidth - viewportWidth + (viewportWidth > 768 ? 100 : 40);

            if (maxTranslate > 0) {
                const currentTranslate = progress * maxTranslate;
                container.style.transform = `translate3d(-${currentTranslate}px, 0, 0)`;
            }

            setScrollProgress(progress);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        window.addEventListener('resize', handleScroll);
        handleScroll();

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', handleScroll);
        };
    }, []);

    const scrollToStep = (index: number) => {
        if (!targetRef.current) return;
        const targetTop = targetRef.current.offsetTop;
        const targetHeight = targetRef.current.offsetHeight;
        const windowHeight = window.innerHeight;

        const scrollableHeight = targetHeight - windowHeight;
        const stepProgress = index / (steps.length - 1);
        const targetScroll = targetTop + (stepProgress * scrollableHeight);

        window.scrollTo({
            top: targetScroll,
            behavior: 'smooth'
        });
    };

    return (
        <section
            id="journey"
            ref={targetRef}
            className="relative h-[300vh] bg-background"
        >
            <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">

                {/* Header (Sticky inside) */}
                <div className="absolute top-12 md:top-24 left-6 md:left-20 z-20 max-w-xl pointer-events-none">
                    <div className="flex items-center gap-3 mb-4">
                        <span className="h-px w-8 bg-primary"></span>
                        <Text variant="label" className="text-primary font-bold tracking-widest">En# 주요활동</Text>
                    </div>
                    <Text variant="h1" className=" md:text-6xl font-bold text-white mb-2 leading-tight">
                        From Learner<br />
                        <span className="text-zinc-600">to Mentor.</span>
                    </Text>
                    <Text variant="body" className="text-zinc-400 mt-4 text-sm md:text-base max-w-sm">
                        스터디부터 멘토링까지, En#에서의 1년 반
                    </Text>
                </div>

                {/* Progress Bar Container */}
                <div className="absolute bottom-10 left-6 md:left-20 right-6 md:right-20 z-20">
                    {/* Month Labels */}
                    <div className="flex justify-between mb-4 px-2">
                        {steps.map((step, index) => (
                            <button
                                key={index}
                                onClick={() => scrollToStep(index)}
                                className="focus:outline-none"
                            >
                                <Text
                                    variant="mono"
                                    className={`text-xs md:text-sm transition-colors duration-300 ${scrollProgress >= index / (steps.length - 1) - 0.1 && scrollProgress <= index / (steps.length - 1) + 0.1
                                        ? 'text-primary font-bold'
                                        : 'text-zinc-600 hover:text-zinc-400'
                                        }`}
                                >
                                    {step.month}
                                </Text>
                            </button>
                        ))}
                    </div>

                    {/* Bar Track */}
                    <div className="h-1 bg-zinc-800 rounded-full overflow-hidden w-full">
                        <div
                            className="h-full bg-primary transition-all duration-75 ease-out"
                            style={{ width: `${scrollProgress * 100}%` }}
                        ></div>
                    </div>
                </div>

                {/* Horizontal Scroll Content Track */}
                <div
                    ref={scrollContainerRef}
                    className="flex items-center gap-6 md:gap-8 pl-[5vw] md:pl-[45vw] w-max h-full pt-40 pb-20 md:pt-0 md:pb-0"
                    style={{ willChange: 'transform' }}
                >
                    {steps.map((step, index) => {
                        const isActive = index === Math.round(scrollProgress * (steps.length - 1));

                        return (
                            <Card
                                key={index}
                                onClick={() => scrollToStep(index)}
                                className={`
                                    flex-shrink-0 
                                    flex flex-col
                                    !bg-zinc-900/80 !backdrop-blur-xl 
                                    !border-zinc-800 
                                    group
                                    transition-all duration-500 ease-out
                                    cursor-pointer
                                    ${isActive
                                        ? 'w-[90vw] md:w-[700px] opacity-100 scale-100 z-10 !border-zinc-600'
                                        : 'w-[80vw] md:w-[350px] opacity-40 scale-95 grayscale hover:opacity-100 hover:grayscale-0 hover:scale-100'
                                    }
                                `}
                                contentClassName="h-full flex flex-col justify-between"
                                cover={
                                    <div className={`w-full relative overflow-hidden transition-all duration-500 ${isActive ? 'h-[25vh] md:h-[35vh]' : 'h-[20vh] md:h-[25vh]'}`}>
                                        {/* Image */}
                                        <div
                                            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                                            style={{ backgroundImage: `url(${step.image})` }}
                                        ></div>
                                        <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent"></div>
                                    </div>
                                }
                            >
                                {/* Content - Show details only when active or hovered (optional, but keeping it visible is safer for now, just dimmed) */}
                                <div className={`relative z-10 pointer-events-none transition-opacity duration-500 mt-4 ${isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
                                    <Text variant="small" className={`inline-block px-3 py-1 rounded-full border border-zinc-700 bg-black/50 backdrop-blur-md mb-4 font-mono font-bold leading-none ${step.color}`}>
                                        {step.step}
                                    </Text>
                                    <Text variant="h2" className={`font-bold text-white mb-4 leading-tight break-keep transition-all duration-500 ${isActive ? 'text-3xl md:text-4xl' : 'text-2xl md:text-3xl'}`}>
                                        {step.title.split('\n').map((line, i) => (
                                            <span key={i} className="block">{line}</span>
                                        ))}
                                    </Text>
                                    <Text variant="body" className={`text-zinc-400 leading-relaxed break-keep transition-all duration-500 ${isActive ? 'block' : 'hidden md:block'}`}>
                                        {step.desc}
                                    </Text>
                                </div>
                            </Card>
                        );
                    })}
                    <div className="w-[5vw] md:w-[10vw] flex-shrink-0"></div>
                </div>
            </div>
        </section>
    );
};

export default Journey;
