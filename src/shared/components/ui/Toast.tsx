'use client';

import React, { createContext, useContext, useCallback, useState, useRef, useEffect } from 'react';
import { Text } from '@/shared/components/ui/Text';

// --- Types ---
export type ToastType = 'success' | 'error' | 'info';
export type ToastVariant = 'code' | 'glass' | 'bento';

export interface ToastData {
    id: string;
    message: string;
    subMessage?: string;
    type: ToastType;
    variant: ToastVariant;
    duration?: number;
}

interface ToastContextType {
    toast: (props: Omit<ToastData, 'id'>) => void;
    dismiss: (id: string) => void;
}

// --- Context ---
const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = () => {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error('useToast must be used within a ToastProvider');
    }
    return context;
};

// --- Icons (SVG) ---
const Icons = {
    success: (className: string) => (
        <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
    ),
    error: (className: string) => (
        <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
    ),
    info: (className: string) => (
        <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
    ),
    close: (className: string) => (
        <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
    ),
};

// --- Component: ToastItem ---
const ToastItem = ({ data, onDismiss }: { data: ToastData; onDismiss: (id: string) => void }) => {
    const [isExiting, setIsExiting] = useState(false);
    const timerRef = useRef<NodeJS.Timeout>(null);

    const duration = data.duration || 3000;

    useEffect(() => {
        timerRef.current = setTimeout(() => {
            handleDismiss();
        }, duration);

        return () => {
            if (timerRef.current) clearTimeout(timerRef.current);
        };
    }, [duration]);

    const handleDismiss = () => {
        setIsExiting(true);
        // Wait for animation to finish before actually removing
        setTimeout(() => {
            onDismiss(data.id);
        }, 300); // match transition duration
    };

    const Icon = Icons[data.type];

    // Color Mapping based on Type
    const getColorClasses = () => {
        switch (data.type) {
            case 'success': return 'text-success border-success/50';
            case 'error': return 'text-error border-error/50';
            case 'info': return 'text-info border-info/50';
            default: return 'text-main border-border';
        }
    };

    const colorClass = getColorClasses();

    // render content based on variant
    const renderContent = () => {
        switch (data.variant) {
            case 'code':
                return (
                    <div className={`relative flex items-center gap-4 p-4 min-w-[320px] bg-surface border-l-2 shadow-lg ${colorClass} font-mono overflow-hidden`}>
                        {/* Background Pattern */}
                        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '12px 12px' }}></div>

                        <div className="flex flex-col text-xs leading-tight opacity-50 select-none">
                            <span>01</span>
                            <span>02</span>
                        </div>
                        <div className="flex-1 min-w-0 z-10">
                            <div className="flex items-center gap-2">
                                <span className="font-bold uppercase tracking-wider text-[10px] opacity-80">[{data.type}]</span>
                                <Text variant="code" className="text-main !bg-transparent !p-0 !border-0">{data.message}</Text>
                            </div>
                            {data.subMessage && <Text variant="tiny" className="text-muted block mt-1 truncate">{data.subMessage}</Text>}
                        </div>
                        <button onClick={handleDismiss} className="opacity-50 hover:opacity-100 transition-opacity z-10">
                            {Icons.close("w-4 h-4")}
                        </button>
                    </div>
                );

            case 'glass':
                return (
                    <div className="flex items-center gap-3 px-6 py-3 min-w-[300px] rounded-full bg-glass  backdrop-blur-md shadow-glow-sm">
                        <div className={`shrink-0 ${data.type === 'success' ? 'text-success' : data.type === 'error' ? 'text-error' : 'text-info'}`}>
                            {Icon("w-5 h-5")}
                        </div>
                        <div className="flex-1 min-w-0">
                            <Text variant="body" className="leading-none text-sm font-medium">{data.message}</Text>
                            {data.subMessage && <Text variant="tiny" className="block mt-1 opacity-70">{data.subMessage}</Text>}
                        </div>
                        <button onClick={handleDismiss} className="w-5 h-5 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors">
                            {Icons.close("w-3 h-3")}
                        </button>
                    </div>
                );

            case 'bento':
            default:
                return (
                    <div className="relative p-1 min-w-[340px] rounded-lg overflow-hidden group">
                        {/* Glow Border Effect */}
                        <div className={`absolute inset-0 opacity-50 bg-gradient-to-r from-transparent via-${data.type === 'success' ? 'success' : data.type === 'error' ? 'error' : 'info'} to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000`}></div>

                        <div className="relative flex flex-col gap-2 p-4 bg-surfaceHighlight rounded-[calc(0.5rem-2px)] border border-border">
                            <div className="flex items-start justify-between gap-3">
                                <div className="flex items-center gap-3">
                                    <div className={`p-1.5 rounded-md bg-${data.type === 'success' ? 'success' : data.type === 'error' ? 'error' : 'info'}/10 ${data.type === 'success' ? 'text-success' : data.type === 'error' ? 'text-error' : 'text-info'}`}>
                                        {Icon("w-5 h-5")}
                                    </div>
                                    <div>
                                        <Text variant="h4" className="!text-sm !font-bold">{data.message}</Text>
                                    </div>
                                </div>
                                <button onClick={handleDismiss} className="text-muted hover:text-main transition-colors">
                                    {Icons.close("w-4 h-4")}
                                </button>
                            </div>
                            {data.subMessage && (
                                <div className="pl-[2.75rem]">
                                    <Text variant="body" className="!text-xs text-muted">{data.subMessage}</Text>
                                </div>
                            )}
                        </div>
                    </div>
                );
        }
    };

    return (
        <div
            className={`transform transition-all duration-300 ease-out ${isExiting ? 'opacity-0 translate-y-4 scale-95' : 'opacity-100 translate-y-0 scale-100'
                } mb-3 last:mb-0`}
        >
            {renderContent()}
        </div>
    );
};

// --- Provider ---
export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
    const [toasts, setToasts] = useState<ToastData[]>([]);

    const toast = useCallback((props: Omit<ToastData, 'id'>) => {
        const id = Math.random().toString(36).substring(2, 9);
        setToasts((prev) => [...prev, { ...props, id }]);
    }, []);

    const dismiss = useCallback((id: string) => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
    }, []);

    return (
        <ToastContext.Provider value={{ toast, dismiss }}>
            {children}
            {/* Toast Container */}
            <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end pointer-events-none">
                {/* Pointer events auto used for children */}
                <div className="pointer-events-auto">
                    {toasts.map((t) => (
                        <ToastItem key={t.id} data={t} onDismiss={dismiss} />
                    ))}
                </div>
            </div>
        </ToastContext.Provider>
    );
};
