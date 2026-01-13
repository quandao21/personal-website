import React from 'react';
import { ArrowUpRight } from 'lucide-react';

interface AttioCardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  title?: string;
  subtitle?: string;
  badge?: string;
  hoverEffect?: boolean;
}

export const AttioCard: React.FC<AttioCardProps> = ({ 
  children, 
  className = "", 
  onClick,
  title,
  subtitle,
  badge,
  hoverEffect = true
}) => {
  return (
    <div 
      onClick={onClick}
      className={`
        group relative overflow-hidden rounded-xl border border-slate-200 bg-white 
        p-6 transition-all duration-300 ease-out
        ${hoverEffect ? 'hover:border-indigo-300 hover:shadow-lg hover:shadow-indigo-500/10 cursor-pointer' : ''}
        ${className}
      `}
    >
      {/* Glassmorphism gradient background accent */}
      <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-slate-50 opacity-0 transition-opacity duration-500 group-hover:opacity-100 blur-2xl" />
      
      <div className="relative z-10 flex flex-col h-full">
        {(title || subtitle || badge) && (
          <div className="mb-4 flex items-start justify-between">
            <div className="flex-grow">
              {badge && (
                <span className="mb-2 inline-block rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-slate-500">
                  {badge}
                </span>
              )}
              {title && <h3 className="text-lg font-bold text-slate-900 leading-tight pr-4">{title}</h3>}
              {subtitle && <p className="text-sm font-light text-slate-500 mt-1">{subtitle}</p>}
            </div>
            {onClick && (
              <div className="flex items-center gap-1.5 rounded-full border border-slate-100 bg-slate-50/50 px-2.5 py-1 text-slate-400 transition-all duration-300 group-hover:border-indigo-100 group-hover:bg-indigo-50 group-hover:text-indigo-600 shrink-0">
                <span className="text-[10px] font-bold uppercase tracking-wider">Details</span>
                <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
            )}
          </div>
        )}
        <div className="flex-grow text-sm font-light leading-relaxed text-slate-600">
          {children}
        </div>
      </div>
    </div>
  );
};