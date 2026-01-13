import React from 'react';
import { X, ZoomIn } from 'lucide-react';

interface ImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  src: string;
  alt?: string;
}

export const ImageModal: React.FC<ImageModalProps> = ({ isOpen, onClose, src, alt }) => {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-[110] flex items-center justify-center bg-slate-900/90 backdrop-blur-md p-4 transition-all duration-300"
      onClick={onClose}
    >
      <button 
        onClick={onClose}
        className="absolute right-6 top-6 z-[120] flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white transition-all hover:bg-white/20 hover:scale-110 active:scale-95"
      >
        <X size={24} />
      </button>
      
      <div 
        className="relative max-h-full max-w-full overflow-hidden rounded-xl shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <img 
          src={src} 
          alt={alt || "Zoomed image"} 
          className="max-h-[90vh] max-w-full object-contain"
        />
        {alt && (
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6 pt-12">
            <p className="text-sm font-light text-white/90">{alt}</p>
          </div>
        )}
      </div>
    </div>
  );
};