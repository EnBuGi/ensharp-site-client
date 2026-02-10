import React from 'react';

export const Footer: React.FC = () => {
    return (
        <footer className="w-full py-12 bg-background border-t border-border">
            <div className="max-w-7xl w-full mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="flex flex-col items-center md:items-start gap-2">
                    <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-white text-lg tracking-tight">En#</span>
                        <span className="text-zinc-600 text-sm font-mono">© 2025 En# SW Dev Club.</span>
                    </div>
                    <p className="text-zinc-500 text-xs">세종대학교 학생회관 530호</p>
                </div>

                <div className="flex gap-6 text-sm font-mono text-zinc-500">
                    <a href="https://www.instagram.com/ensharp_sejong/" target="_blank" rel="noopener noreferrer" className="hover:text-brand transition-colors">Instagram</a>
                    <a href="mailto:99doldol@naver.com" className="hover:text-brand transition-colors">Email</a>
                    <a href="http://pf.kakao.com/_bGcaG/chat" target="_blank" rel="noopener noreferrer" className="hover:text-brand transition-colors">KakaoTalk</a>
                </div>
            </div>
        </footer>
    );
};
