"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/shared/components/ui/card/Card';
import { Text } from '@/shared/components/ui/Text';
import { cn } from '@/shared/utils/cn';

// Types
type LayoutType = 'inline' | 'overlay' | 'morph' | 'sidebar' | 'panorama';

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
        description: 'C#, Java, JavaScript를 활용한 프로그래밍 설계 및 개발 스터디를 매주 진행합니다. 선배 기수의 정기적인 코드 리뷰와 피드백을 통해 기초를 탄탄히 다집니다.',
        icon: 'school',
        iconColor: 'text-primary',
        gridClass: 'col-span-1 md:col-span-2 md:row-span-2',
        contentClass: 'p-8 flex flex-col justify-between h-full',
        images: ['/study.jpg', 'https://images.unsplash.com/photo-1580894732444-8ecded7900cd?w=800&q=80', 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=800&q=80'],
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
        images: ['/channeltalk.jpg', 'https://images.unsplash.com/photo-1504384308090-c54be3855833?w=800&q=80', 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=800&q=80'],
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
        description: '신입기수 환영회, En# Day, MT 등 선후배 간의 끈끈한 유대감을 위한 공식 행사.',
        icon: 'celebration',
        iconColor: 'text-green-500',
        gridClass: 'col-span-1',
        contentClass: 'p-6 flex flex-col justify-center gap-2 h-full',
        images: ['https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=800&q=80', 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=800&q=80']
    },
    {
        id: 'seminar',
        title: 'Seminar',
        description: 'Git, React, AWS 등 선배 기수들이 전하는 실무 노하우와 기술 세미나.',
        icon: 'mic',
        iconColor: 'text-purple-500',
        gridClass: 'col-span-1',
        contentClass: 'p-6 flex flex-col justify-center gap-2 h-full',
        images: ['/seminar.jpg', 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=800&q=80']
    },
    {
        id: 'mentoring',
        title: 'Mentoring System',
        description: '1년간의 활동 후에는 멘토가 되어 후배들을 이끌어줍니다. 지식을 나누며 한번 더 성장하는 En#만의 선순환 구조입니다. 또한 졸업한 현직자 선배들의 멘토링과 활발한 교류가 이어집니다.',
        icon: 'diversity_3',
        iconColor: 'text-white', // Primary/White for contrast
        gridClass: 'col-span-1 md:col-span-4',
        contentClass: 'p-8 flex flex-col md:flex-row items-center justify-between gap-6 h-full',
        images: ['/seminar.jpg', 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80'],
        details: (
            <div className="flex flex-wrap items-center justify-end gap-6 opacity-60 grayscale transition-all duration-500 md:w-1/3">
                <span className="text-lg font-bold font-display text-white">NAVER</span>
                <span className="text-lg font-bold font-display text-yellow-400">kakao</span>
                <span className="text-lg font-bold font-display text-green-500">LINE</span>
                <span className="text-lg font-bold font-display text-blue-400">Coupang</span>
            </div>
        )
    }
];

const Activities: React.FC = () => {
    const [layout, setLayout] = useState<LayoutType>('inline');
    const [selectedId, setSelectedId] = useState<string | null>(null);

    // Initialize selection for sidebar mode
    React.useEffect(() => {
        if (layout === 'sidebar' && !selectedId) {
            setSelectedId(activities[0].id);
        }
    }, [layout, selectedId]);

    return (
        <section id="activities" className="w-full px-4 py-20 bg-background relative z-10 min-h-screen flex flex-col">
            <div className="max-w-7xl mx-auto w-full flex-1 flex flex-col">
                <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div>
                        <Text variant="h2" className="text-3xl font-bold text-white mb-2">Our Activities</Text>
                        <Text className="text-muted">En#의 5가지 주요 활동을 소개합니다.</Text>
                    </div>

                    {/* Layout Switcher */}
                    <div className="bg-zinc-900/50 p-1 rounded-lg border border-zinc-800 flex gap-1 overflow-x-auto max-w-full">
                        {(['inline', 'overlay', 'morph', 'sidebar', 'panorama'] as const).map((mode) => (
                            <button
                                key={mode}
                                onClick={() => { setLayout(mode); if (mode !== 'sidebar') setSelectedId(null); }}
                                className={`px-4 py-2 rounded-md text-xs font-mono transition-all whitespace-nowrap ${layout === mode
                                    ? 'bg-primary text-white shadow-lg'
                                    : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
                                    }`}
                            >
                                {mode.toUpperCase()}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Panorama Layout */}
                {layout === 'panorama' ? (
                    <div className="flex gap-4 md:gap-8 overflow-x-auto h-[600px] md:h-[70vh] items-center px-4 md:px-[5vw] snap-x snap-mandatory scrollbar-hide py-10 -mx-4 md:-mx-[calc((100vw-80rem)/2)] w-screen md:w-[100vw] relative left-1/2 -translate-x-1/2">
                        {activities.map((activity) => {
                            const isSelected = selectedId === activity.id;
                            return (
                                <motion.div
                                    key={activity.id}
                                    onClick={() => setSelectedId(isSelected ? null : activity.id)}
                                    layoutId={`panorama-${activity.id}`}
                                    className={cn(
                                        "relative h-full rounded-2xl overflow-hidden snap-center flex-shrink-0 cursor-pointer transition-all duration-500 group border border-white/5",
                                        isSelected ? "min-w-[85vw] md:min-w-[60vw]" : "min-w-[85vw] md:min-w-[25vw] opacity-80 hover:opacity-100"
                                    )}
                                >
                                    {/* Background Image */}
                                    <img src={activity.images[0]} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt={activity.title} />
                                    <div className={cn("absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent transition-opacity duration-300", isSelected ? "opacity-90" : "opacity-60 group-hover:opacity-80")} />

                                    {/* Content */}
                                    <div className="relative h-full flex flex-col justify-end p-6 md:p-10">
                                        <div className={cn("transform transition-all duration-500", isSelected ? "translate-y-0" : "translate-y-0")}>
                                            <div className={cn("inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/10 mb-4", activity.iconColor)}>
                                                <span className="material-symbols-outlined text-sm">{activity.icon}</span>
                                                <span className="text-xs font-bold uppercase tracking-wider text-white">0{activities.indexOf(activity) + 1}</span>
                                            </div>

                                            <Text variant="h2" className={cn("font-bold text-white mb-2 leading-tight transition-all duration-300", isSelected ? "text-4xl md:text-5xl" : "text-3xl")}>
                                                {activity.title}
                                            </Text>

                                            <div className={cn("overflow-hidden transition-all duration-500", isSelected ? "max-h-[500px] opacity-100 mt-4" : "max-h-0 opacity-0")}>
                                                <Text className="text-lg text-zinc-300 mb-8 max-w-2xl">
                                                    {activity.description}
                                                </Text>

                                                {/* Horizontal Gallery Strip in Panorama */}
                                                <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
                                                    {activity.images.slice(1).map((img, idx) => (
                                                        <div key={idx} className="h-32 aspect-video rounded-lg overflow-hidden flex-shrink-0 border border-white/10">
                                                            <img src={img} className="w-full h-full object-cover" alt="" />
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>

                                            {!isSelected && (
                                                <Text variant="small" className="text-zinc-400 mt-2 group-hover:text-white transition-colors">
                                                    Tap to explore
                                                </Text>
                                            )}
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                ) : layout === 'sidebar' ? (
                    <div className="flex flex-col md:flex-row gap-6 h-[800px] md:h-[600px]">
                        {/* Sidebar Navigation */}
                        <div className="w-full md:w-72 flex-shrink-0 flex md:flex-col gap-4 overflow-x-auto md:overflow-visible pb-4 md:pb-0 px-2 md:px-0">
                            {activities.map((activity) => {
                                const isSelected = selectedId === activity.id;
                                return (
                                    <button
                                        key={activity.id}
                                        onClick={() => setSelectedId(activity.id)}
                                        className="relative group text-left min-w-[200px] md:min-w-0 pt-8 transition-transform hover:-translate-y-1 duration-300"
                                    >
                                        {/* Folder Tab */}
                                        <div className={cn(
                                            "absolute top-0 left-0 w-1/2 h-8 rounded-t-xl transition-all duration-300 border-t border-l border-zinc-700/50",
                                            isSelected ? "bg-zinc-800 border-zinc-600 z-10" : "bg-zinc-900/50 border-zinc-800 z-0 group-hover:bg-zinc-800/50"
                                        )}></div>

                                        {/* Folder Body */}
                                        <div className={cn(
                                            "relative p-5 rounded-b-xl rounded-tr-xl border transition-all duration-300 flex items-center gap-4 z-10",
                                            isSelected
                                                ? "bg-zinc-800 border-zinc-600 shadow-xl scale-[1.02]"
                                                : "bg-zinc-900/50 border-zinc-800 group-hover:bg-zinc-800/50 group-hover:border-zinc-700"
                                        )}>
                                            <div className={cn(
                                                "w-10 h-10 rounded-lg flex items-center justify-center transition-colors",
                                                isSelected ? "bg-black/40" : "bg-black/20"
                                            )}>
                                                <span className={cn("material-symbols-outlined",
                                                    isSelected ? activity.iconColor : "text-zinc-600"
                                                )}>
                                                    {activity.icon}
                                                </span>
                                            </div>
                                            <div className="flex flex-col">
                                                <span className={cn("font-bold transition-colors", isSelected ? "text-white" : "text-zinc-500")}>
                                                    {activity.title}
                                                </span>
                                                <span className="text-[10px] text-zinc-500 font-mono hidden md:block uppercase tracking-wider">
                                                    Folder 0{activities.indexOf(activity) + 1}
                                                </span>
                                            </div>
                                        </div>
                                    </button>
                                );
                            })}
                        </div>

                        {/* Content Area */}
                        <div className="flex-1 bg-zinc-900/50 border border-zinc-800 rounded-2xl overflow-hidden flex flex-col relative group">
                            <AnimatePresence mode="wait">
                                {activities.map((activity) => {
                                    if (activity.id !== selectedId) return null;
                                    return (
                                        <motion.div
                                            key={activity.id}
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -20 }}
                                            transition={{ duration: 0.3 }}
                                            className="absolute inset-0 flex flex-col"
                                        >
                                            {/* Hero Image */}
                                            <div className="h-48 md:h-64 relative flex-shrink-0">
                                                <img src={activity.images[0]} className="w-full h-full object-cover" alt={activity.title} />
                                                <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/50 to-transparent" />
                                                <div className="absolute bottom-6 left-8">
                                                    <div className={cn("inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/50 backdrop-blur-md border border-white/10 mb-2", activity.iconColor)}>
                                                        <span className="material-symbols-outlined text-sm">{activity.icon}</span>
                                                        <span className="text-xs font-bold uppercase tracking-wider text-white">Folder Open</span>
                                                    </div>
                                                    <Text variant="h2" className="text-3xl md:text-4xl font-bold text-white">{activity.title}</Text>
                                                </div>
                                            </div>

                                            {/* Scrollable Content */}
                                            <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
                                                <Text className="text-zinc-400 text-lg leading-relaxed mb-8 max-w-3xl">
                                                    {activity.description}
                                                </Text>

                                                {activity.details && (
                                                    <div className="mb-8">
                                                        {activity.details}
                                                    </div>
                                                )}

                                                <Text variant="h4" className="text-white mb-4 font-bold flex items-center gap-2 px-4 md:px-0">
                                                    <span className="material-symbols-outlined">collections</span>
                                                    Gallery
                                                </Text>

                                                {/* Reels-style Gallery for Mobile */}
                                                <div className="flex md:grid md:grid-cols-3 overflow-x-auto md:overflow-visible gap-0 md:gap-4 pb-0 md:pb-8 snap-x snap-mandatory no-scrollbar -mx-8 md:mx-0 w-[calc(100%+4rem)] md:w-full">
                                                    {activity.images.map((img, idx) => (
                                                        <div key={idx} className="min-w-full md:min-w-0 snap-center flex-shrink-0 aspect-[4/5] md:aspect-video relative overflow-hidden bg-zinc-900 border-x border-zinc-900 md:border md:rounded-xl md:border-zinc-700/50 md:hover:border-zinc-500 transition-colors group/img">
                                                            <img src={img} className="w-full h-full object-cover" alt={`Gallery ${idx}`} />

                                                            {/* Mobile Index Indicator */}
                                                            <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-md px-3 py-1 rounded-full text-xs font-mono text-white md:hidden">
                                                                {idx + 1} / {activity.images.length}
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </motion.div>
                                    );
                                })}
                            </AnimatePresence>
                        </div>
                    </div>
                ) : (
                    // Grid Layouts (Inline, Overlay, Morph)
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[minmax(180px,auto)] relative">
                        {activities.map((activity) => (
                            <React.Fragment key={activity.id}>
                                <motion.div
                                    layoutId={layout === 'morph' ? `card-${activity.id}` : undefined}
                                    className={cn(activity.gridClass, "relative group")}
                                    onClick={() => setSelectedId(selectedId === activity.id ? null : activity.id)}
                                >
                                    <Card
                                        className={cn("h-full cursor-pointer transition-all duration-300",
                                            selectedId === activity.id && layout === 'inline' ? 'ring-2 ring-primary bg-zinc-900' : ''
                                        )}
                                        contentClassName={activity.contentClass}
                                        hover={layout !== 'morph' || selectedId !== activity.id} // Disable hover effect when morph active
                                    >
                                        {/* Icon & Title */}
                                        <div className={cn("w-full", activity.id === 'mentoring' ? 'md:w-2/3' : '')}>
                                            <div className="flex items-center gap-3 mb-4">
                                                <div className={cn("w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center", activity.iconColor)}>
                                                    <span className="material-symbols-outlined">{activity.icon}</span>
                                                </div>
                                                {activity.id !== 'coding' && activity.id !== 'contest' && ( // Inline title for smaller cards
                                                    <Text variant="h3" className="text-xl font-bold text-white">{activity.title}</Text>
                                                )}
                                            </div>

                                            {(activity.id === 'study' || activity.id === 'contest' || activity.id === 'mentoring') && (
                                                <Text variant="h3" className={cn("text-2xl font-bold text-white mb-2", activity.id === 'mentoring' ? 'hidden' : 'block')}>{activity.title}</Text>
                                            )}

                                            <Text variant="small" className="text-zinc-400 leading-relaxed break-keep">
                                                {activity.description}
                                            </Text>
                                        </div>

                                        {/* Custom Details */}
                                        {activity.details}
                                    </Card>
                                </motion.div>

                                {/* Inline Layout Expansion */}
                                {layout === 'inline' && selectedId === activity.id && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                        className="col-span-1 md:col-span-4 bg-zinc-900/50 border border-zinc-800 rounded-xl overflow-hidden mb-4"
                                    >
                                        <div className="p-6">
                                            <Text variant="h4" className="text-white mb-4">Gallery</Text>
                                            <div className="flex md:grid md:grid-cols-3 overflow-x-auto md:overflow-visible gap-0 md:gap-4 pb-0 md:pb-8 snap-x snap-mandatory no-scrollbar -mx-6 md:mx-0 w-[calc(100%+3rem)] md:w-full">
                                                {activity.images.map((img, idx) => (
                                                    <div key={idx} className="min-w-full md:min-w-0 snap-center flex-shrink-0 aspect-[4/5] md:aspect-video relative overflow-hidden bg-zinc-900 border-x border-zinc-900 md:border md:rounded-lg md:border-zinc-700/50 relative">
                                                        <img src={img} alt="" className="object-cover w-full h-full" />
                                                        <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-md px-3 py-1 rounded-full text-xs font-mono text-white md:hidden">
                                                            {idx + 1} / {activity.images.length}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </React.Fragment>
                        ))}
                    </div>
                )}

                {/* Overlay Layout */}
                <AnimatePresence>
                    {layout === 'overlay' && selectedId && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
                            onClick={() => setSelectedId(null)}
                        >
                            <motion.div
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.9, opacity: 0 }}
                                className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <div className="flex justify-between items-center mb-6">
                                    <Text variant="h2" className="text-2xl font-bold text-white">
                                        {activities.find(a => a.id === selectedId)?.title}
                                    </Text>
                                    <button onClick={() => setSelectedId(null)} className="p-2 hover:bg-white/10 rounded-full">
                                        <span className="material-symbols-outlined text-white">close</span>
                                    </button>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {activities.find(a => a.id === selectedId)?.images.map((img, idx) => (
                                        <div key={idx} className="aspect-video rounded-xl overflow-hidden bg-zinc-800">
                                            <img src={img} alt="" className="object-cover w-full h-full" />
                                        </div>
                                    ))}
                                </div>
                                <Text className="mt-6 text-zinc-400">
                                    {activities.find(a => a.id === selectedId)?.description}
                                </Text>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Morph Layout */}
                <AnimatePresence>
                    {layout === 'morph' && selectedId && (
                        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                                onClick={() => setSelectedId(null)}
                            />
                            <motion.div
                                layoutId={`card-${selectedId}`}
                                className="relative bg-zinc-900 border border-zinc-700 rounded-3xl w-full max-w-5xl h-[80vh] overflow-hidden shadow-2xl z-10 flex flex-col"
                            >
                                {/* Expanded Content */}
                                {activities.map(a => {
                                    if (a.id !== selectedId) return null;
                                    return (
                                        <div key={a.id} className="h-full flex flex-col">
                                            {/* Hero Image Area */}
                                            <div className="h-[40%] relative">
                                                <img src={a.images[0]} className="w-full h-full object-cover" />
                                                <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent" />
                                                <button
                                                    onClick={(e) => { e.stopPropagation(); setSelectedId(null); }}
                                                    className="absolute top-4 right-4 w-10 h-10 bg-black/50 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors"
                                                >
                                                    <span className="material-symbols-outlined">close</span>
                                                </button>
                                                <div className="absolute bottom-6 left-6 md:left-10">
                                                    <div className={cn("inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/50 backdrop-blur-md border border-white/10 mb-2", a.iconColor)}>
                                                        <span className="material-symbols-outlined text-sm">{a.icon}</span>
                                                        <span className="text-xs font-bold uppercase tracking-wider text-white">Activity</span>
                                                    </div>
                                                    <motion.h2 className="text-4xl md:text-5xl font-bold text-white">{a.title}</motion.h2>
                                                </div>
                                            </div>

                                            {/* Scrollable Body */}
                                            <div className="flex-1 overflow-y-auto p-6 md:p-10 bg-zinc-950">
                                                <Text className="text-lg text-zinc-300 mb-8 leading-relaxed max-w-3xl">
                                                    {a.description}
                                                </Text>

                                                <Text variant="h4" className="text-white mb-4">Gallery</Text>
                                                <div className="flex md:grid md:grid-cols-3 overflow-x-auto md:overflow-visible gap-0 md:gap-4 pb-0 md:pb-0 snap-x snap-mandatory no-scrollbar -mx-6 md:mx-0 w-[calc(100%+3rem)] md:w-full">
                                                    {a.images.map((img, idx) => (
                                                        <div key={idx} className="min-w-full md:min-w-0 snap-center flex-shrink-0 aspect-[4/5] md:aspect-video relative overflow-hidden bg-zinc-900 border-x border-zinc-900 md:border md:rounded-xl md:border-zinc-800 md:hover:border-zinc-600 transition-colors">
                                                            <img src={img} className="w-full h-full object-cover" />
                                                            <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-md px-3 py-1 rounded-full text-xs font-mono text-white md:hidden">
                                                                {idx + 1} / {a.images.length}
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}
                            </motion.div>
                        </div>
                    )}
                </AnimatePresence>

            </div>
        </section>
    );
};

export default Activities;
