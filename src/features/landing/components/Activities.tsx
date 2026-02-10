"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/shared/components/ui/card/Card';
import { Text } from '@/shared/components/ui/Text';
import { cn } from '@/shared/utils/cn';

// Types
type LayoutType = 'inline' | 'overlay' | 'morph' | 'sidebar' | 'panorama' | 'swipe';

interface Activity {
    id: string;
    title: string;
    description: string;
    icon: string;
    iconColor: string; // e.g., 'text-primary'
    gridClass: string; // e.g., 'col-span-2 row-span-2'
    contentClass: string; // Padding, flex, etc.
    images: string[];
    details?: React.ReactNode; // Custom content for the card (code block, logos, etc.)
}

// Mock Data
const activities: Activity[] = [
    {
        id: 'study',
        title: 'Coding Study',
        description: 'Java 개발 스터디를 매주 진행합니다. 선배 기수의 정기적인 코드 리뷰와 피드백을 통해 기초를 탄탄히 다집니다.',
        icon: 'school',
        iconColor: 'text-primary',
        gridClass: 'col-span-1 md:col-span-2 md:row-span-2',
        contentClass: 'p-8 flex flex-col justify-between h-full',
        images: ['/study/study1.jpg', '/study/study2.webp', '/study/study3.webp', '/study/study4.jpg', '/study/study5.jpg'],
        details: (
            <div className="mt-4 w-full p-4 rounded bg-zinc-950/50 border border-zinc-800 font-mono text-xs text-zinc-400">
                <div className="flex gap-2 mb-2">
                    <span className="w-3 h-3 rounded-full bg-red-500/50"></span>
                    <span className="w-3 h-3 rounded-full bg-yellow-500/50"></span>
                    <span className="w-3 h-3 rounded-full bg-green-500/50"></span>
                </div>
                <p><span className="text-purple-400">void</span> <span className="text-blue-400">Study</span>() {`{`}</p>
                <p className="pl-4">Practice(<span className="text-green-300">"C#"</span>, <span className="text-green-300">"Java"</span>);</p>
                <p className="pl-4">CodeReview(<span className="text-orange-300">true</span>);</p>
                <p>{`}`}</p>
            </div>
        )
    },
    {
        id: 'contest',
        title: 'Contests & Hackathons',
        description: 'Microsoft Imagine Cup 및 각종 개발 공모전/해커톤에 참가합니다. 기획부터 개발, 발표까지 전 과정을 주도적으로 경험합니다.',
        icon: 'trophy',
        iconColor: 'text-blue-500',
        gridClass: 'col-span-1 md:col-span-1 md:row-span-2',
        contentClass: 'p-6 flex flex-col h-full',
        images: ['/hackerton/hackerton1.jpg', '/hackerton/hackerton2.jpg', '/hackerton/hackerton3.jpg', '/hackerton/hackerton4.jpg', '/hackerton/hackerton5.jpg', '/hackerton/channeltalk_presentation.jpg'],
        details: (
            <div className="space-y-2 mt-auto">
                <div className="flex items-center justify-between text-xs font-mono text-zinc-400 bg-black/20 p-2 rounded border border-border">
                    <Text variant="tiny">Imagine Cup</Text>
                    <Text variant="tiny" className="text-yellow-500">World Final</Text>
                </div>
                <div className="flex items-center justify-between text-xs font-mono text-zinc-400 bg-black/20 p-2 rounded border border-border">
                    <Text variant="tiny">Gov Data</Text>
                    <Text variant="tiny" className="text-zinc-300">Awards</Text>
                </div>
            </div>
        )
    },
    {
        id: 'events',
        title: 'Events',
        description: '신입기수 환영회, En# Day, MT 등 선후배 간의 끈끈한 유대감을 위한 행사입니다.',
        icon: 'celebration',
        iconColor: 'text-green-500',
        gridClass: 'col-span-1',
        contentClass: 'p-6 flex flex-col justify-center gap-2 h-full',
        images: ['/events/event1.jpeg', '/events/event2.jpg', '/events/event3.webp', '/events/event4.jpg', '/events/event5.jpg', '/events/event6.jpg', '/events/event7.jpg', '/events/event8.jpg', '/events/event9.jpg']
    },
    {
        id: 'seminar',
        title: 'Seminar',
        description: 'Git, React, AWS 등 선배 기수들이 전하는 실무 노하우와 기술 세미나입니다.',
        icon: 'mic',
        iconColor: 'text-purple-500',
        gridClass: 'col-span-1',
        contentClass: 'p-6 flex flex-col justify-center gap-2 h-full',
        images: ['/seminar/seminar1.jpg', '/seminar/seminar2.jpg', '/seminar/seminar3.webp']
    }
];

const Activities: React.FC = () => {
    const [viewImage, setViewImage] = useState<string | null>(null);
    const [activeCategory, setActiveCategory] = useState<string>(activities[0].id);
    const swipeContainerRef = React.useRef<HTMLDivElement>(null);
    const isDragging = React.useRef(false);
    const startX = React.useRef(0);
    const scrollLeft = React.useRef(0);

    const handlePrev = () => {
        if (swipeContainerRef.current) {
            swipeContainerRef.current.scrollBy({ left: -swipeContainerRef.current.offsetWidth, behavior: 'smooth' });
        }
    };

    const handleNext = () => {
        if (swipeContainerRef.current) {
            swipeContainerRef.current.scrollBy({ left: swipeContainerRef.current.offsetWidth, behavior: 'smooth' });
        }
    };

    const scrollToCategory = (index: number) => {
        if (swipeContainerRef.current) {
            swipeContainerRef.current.scrollTo({
                left: index * swipeContainerRef.current.offsetWidth,
                behavior: 'smooth'
            });
            setActiveCategory(activities[index].id);
        }
    };

    const handleScroll = () => {
        if (swipeContainerRef.current) {
            const index = Math.round(swipeContainerRef.current.scrollLeft / swipeContainerRef.current.offsetWidth);
            if (activities[index] && activities[index].id !== activeCategory) {
                setActiveCategory(activities[index].id);
            }
        }
    };

    // Drag to Scroll Handlers
    const onMouseDown = (e: React.MouseEvent) => {
        if (!swipeContainerRef.current) return;
        isDragging.current = true;
        startX.current = e.pageX - swipeContainerRef.current.offsetLeft;
        scrollLeft.current = swipeContainerRef.current.scrollLeft;
        swipeContainerRef.current.style.cursor = 'grabbing';
        swipeContainerRef.current.style.scrollBehavior = 'auto'; // Disable smooth scroll while dragging
    };

    const onMouseLeave = () => {
        isDragging.current = false;
        if (swipeContainerRef.current) {
            swipeContainerRef.current.style.cursor = 'grab';
            swipeContainerRef.current.style.scrollBehavior = 'smooth';
        }
    };

    const onMouseUp = () => {
        isDragging.current = false;
        if (swipeContainerRef.current) {
            swipeContainerRef.current.style.cursor = 'grab';
            swipeContainerRef.current.style.scrollBehavior = 'smooth';
        }
    };

    const onMouseMove = (e: React.MouseEvent) => {
        if (!isDragging.current || !swipeContainerRef.current) return;
        e.preventDefault();
        const x = e.pageX - swipeContainerRef.current.offsetLeft;
        const walk = (x - startX.current) * 2; // Scroll-fast
        swipeContainerRef.current.scrollLeft = scrollLeft.current - walk;
    };

    return (
        <section id="activities" className="w-full px-4 py-20 bg-background relative z-10 min-h-screen flex flex-col justify-center">
            <style jsx global>{`
                .no-scrollbar::-webkit-scrollbar {
                    display: none;
                }
                .no-scrollbar {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            `}</style>
            <div className="max-w-7xl mx-auto w-full flex-1 flex flex-col justify-center">
                <div className="mb-8 flex flex-col items-center text-center">
                    <Text variant="h2" className="text-3xl font-bold text-white mb-2">Our Activities</Text>
                    <Text className="text-muted mb-8">En#의 4가지 주요 활동을 소개합니다.</Text>

                    {/* Category Navigation */}
                    <div className="flex flex-wrap justify-center gap-2 mb-4">
                        {activities.map((activity, idx) => (
                            <button
                                key={activity.id}
                                onClick={() => scrollToCategory(idx)}
                                className={cn(
                                    "px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 border border-transparent",
                                    activeCategory === activity.id
                                        ? "bg-white/10 text-white border-white/10"
                                        : "text-zinc-500 hover:text-zinc-300 hover:bg-white/5"
                                )}
                            >
                                {activity.title}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Revolutionary Swipe Grid Layout */}
                <div className="relative w-full h-[80vh] rounded-3xl overflow-hidden group/swipe select-none">
                    {/* Desktop Navigation Arrows */}
                    <button
                        onClick={handlePrev}
                        className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 z-20 items-center justify-center text-white opacity-50 hover:opacity-100 transition-opacity"
                    >
                        <span className="material-symbols-outlined text-6xl drop-shadow-lg">chevron_left</span>
                    </button>
                    <button
                        onClick={handleNext}
                        className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 z-20 items-center justify-center text-white opacity-50 hover:opacity-100 transition-opacity"
                    >
                        <span className="material-symbols-outlined text-6xl drop-shadow-lg">chevron_right</span>
                    </button>

                    {/* Horizontal Swipe Container */}
                    <div
                        ref={swipeContainerRef}
                        className="flex w-full h-full overflow-x-auto snap-x snap-mandatory no-scrollbar cursor-grab active:cursor-grabbing"
                        onMouseDown={onMouseDown}
                        onMouseLeave={onMouseLeave}
                        onMouseUp={onMouseUp}
                        onMouseMove={onMouseMove}
                        onScroll={handleScroll}
                    >
                        {activities.map((activity, idx) => (
                            <div key={activity.id} className="min-w-full h-full snap-center flex flex-col p-6 md:p-10 overflow-hidden">
                                {/* Header Info */}
                                <div className="mb-8 flex flex-col items-center text-center flex-shrink-0">
                                    <div className={cn("w-12 h-12 rounded-full flex items-center justify-center mb-4 bg-white/10", activity.iconColor)}>
                                        <span className="material-symbols-outlined">{activity.icon}</span>
                                    </div>
                                    <Text variant="h2" className="text-3xl font-bold text-white mb-2">{activity.title}</Text>
                                    <Text className="text-zinc-400 max-w-md text-sm md:text-base">{activity.description}</Text>
                                    <div className="mt-4 flex gap-2 justify-center">
                                        {/* Simple Dots for Page Indication */}
                                        {activities.map((_, dotIdx) => (
                                            <div key={dotIdx} className={cn("w-1.5 h-1.5 rounded-full transition-colors", dotIdx === idx ? "bg-white" : "bg-white/20")} />
                                        ))}
                                    </div>
                                </div>

                                {/* Photo Grid */}
                                <div className="grid grid-cols-3 gap-1 md:gap-4 w-full max-w-2xl mx-auto flex-1 content-start pb-20">
                                    {/* Repeat images to fill grid if needed */}
                                    {activity.images.slice(0, 9).map((img, imgIdx) => (
                                        <motion.div
                                            key={`${activity.id}-${imgIdx}`}
                                            layoutId={`img-${activity.id}-${imgIdx}`}
                                            className="aspect-square relative cursor-pointer overflow-hidden bg-zinc-800 rounded-sm"
                                            onClick={() => setViewImage(`${activity.id}-${imgIdx}`)}
                                            whileHover={{ scale: 0.98, opacity: 0.8 }}
                                            transition={{ duration: 0.2 }}
                                        >
                                            <img src={img} className="w-full h-full object-cover pointer-events-none" alt="" />
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Fullscreen View Image Overlay */}
                    <AnimatePresence>
                        {viewImage && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={() => setViewImage(null)}
                                className="absolute inset-0 z-50 bg-black flex flex-col cursor-pointer"
                            >
                                {/* Expanded Image */}
                                <div className="w-full h-full flex items-center justify-center p-0 md:p-10">
                                    {(() => {
                                        // Find the image source based on ID
                                        // viewImage format: "activityId-imgIndex"
                                        const [actId, imgIndexStr] = viewImage.split('-');
                                        const act = activities.find(a => a.id === actId);
                                        // Map index back to the repeated array logic: slice(0,9)
                                        // Actual image is just straight mapping though
                                        if (!act) return null;
                                        const realImgSrc = act.images[parseInt(imgIndexStr)];

                                        return (
                                            <motion.img
                                                layoutId={`img-${viewImage}`}
                                                src={realImgSrc}
                                                className="w-full h-full object-contain"
                                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                            />
                                        );
                                    })()}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
};

export default Activities;
