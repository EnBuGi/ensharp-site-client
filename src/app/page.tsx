import React from 'react';
import { Navbar } from '@/shared/components/layout/Navbar';
import { Footer } from '@/shared/components/layout/Footer';
import Hero from '@/features/landing/components/Hero';
import Activities from '@/features/landing/components/Activities';
import Journey from '@/features/landing/components/Journey';
import RecruitmentInfo from '@/features/landing/components/RecruitmentInfo';

export default function Home() {
  return (
    <div className="min-h-screen w-full bg-background text-main font-sans selection:bg-primary selection:text-white">
      <Navbar />

      <main className="flex flex-col w-full">
        <Hero />
        <Activities />
        <Journey />
        <RecruitmentInfo />
      </main>

      <Footer />
    </div>
  );
}
