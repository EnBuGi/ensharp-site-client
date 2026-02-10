"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Text } from '@/shared/components/ui/Text';
import { cn } from '@/shared/utils/cn';

interface FAQItemProps {
    question: string;
    answer: string;
    isOpen: boolean;
    onClick: () => void;
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer, isOpen, onClick }) => {
    return (
        <div className="border-b border-white/10 last:border-none">
            <button
                onClick={onClick}
                className="w-full py-6 flex items-center justify-between text-left group"
            >
                <Text variant="h3" className="text-lg md:text-xl font-medium text-zinc-200 group-hover:text-white transition-colors">
                    {question}
                </Text>
                <span className={cn(
                    "material-symbols-outlined text-zinc-500 transition-transform duration-300 group-hover:text-white",
                    isOpen ? "rotate-45" : "rotate-0"
                )}>
                    add
                </span>
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                    >
                        <div className="pb-6 text-zinc-400 leading-relaxed">
                            {answer}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

const FAQ: React.FC = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const faqs = [
        {
            question: "코딩을 잘 못해도 지원할 수 있나요?",
            answer: "네, 물론입니다! En#은 현재의 실력보다 성장에 대한 열정을 가장 중요하게 생각합니다. 신입 부원을 위한 기초 스터디와 멘토링 프로그램이 준비되어 있어, 기초부터 탄탄하게 배울 수 있습니다."
        },
        {
            question: "개인 노트북이 필요한가요?",
            answer: "네, 모든 세션과 활동은 실습 위주로 진행되므로 개인 노트북 지참이 필수입니다. VS Code 등 개발 도구를 구동할 수 있는 사양이면 충분합니다."
        },
        {
            question: "면접은 어떻게 진행되나요?",
            answer: "면접은 기술적인 지식을 검증하기보다는 지원자의 열정과 동아리 활동에 임하는 자세를 확인하는 자리입니다. 편안한 분위기에서 진행되니 너무 부담 갖지 않으셔도 됩니다."
        },
        {
            question: "활동 기간은 어떻게 되나요?",
            answer: "신입 기수는 선발 후 1년 6개월간 활동하게 됩니다. 1학기에는 기초 스터디와 팀 빌딩, 여름방학에는 공모전 준비, 2학기에는 프로젝트 고도화 및 학술제 준비가 진행됩니다. 이후 6개월간 다음 기수의 멘토로 활동합니다."
        }
    ];

    return (
        <section id="faq" className="w-full px-4 py-32 bg-background relative border-t border-border">
            <div className="max-w-3xl mx-auto">
                <div className="text-center mb-16">
                    <Text variant="h1" className="mb-2">FAQ</Text>
                    <Text className="text-zinc-400">자주 묻는 질문들을 모았습니다.</Text>
                </div>

                <div className="bg-zinc-900/30 border border-white/5 rounded-2xl p-6 md:p-8 backdrop-blur-sm">
                    {faqs.map((faq, index) => (
                        <FAQItem
                            key={index}
                            question={faq.question}
                            answer={faq.answer}
                            isOpen={openIndex === index}
                            onClick={() => setOpenIndex(openIndex === index ? null : index)}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FAQ;
