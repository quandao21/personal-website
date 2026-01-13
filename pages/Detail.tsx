import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Beaker, CheckCircle2, Image as ImageIcon, Calendar, ZoomIn } from 'lucide-react';
import { CV_DATA } from '../constants';
import { ImageModal } from '../components/ui/ImageModal';

export const Detail: React.FC = () => {
  const { type, id } = useParams<{ type: string; id: string }>();
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState<{ isOpen: boolean; url: string; alt: string }>({
    isOpen: false,
    url: '',
    alt: ''
  });

  const getItem = () => {
    switch (type) {
      case 'education': return CV_DATA.education.find(i => i.id === id);
      case 'experience': return CV_DATA.experience.find(i => i.id === id);
      case 'projects': return CV_DATA.projects.find(i => i.id === id);
      case 'activities': return CV_DATA.activities.find(i => i.id === id);
      case 'awards': return CV_DATA.awards.find(i => i.id === id);
      default: return null;
    }
  };

  const item: any = getItem();

  if (!item) return <div className="pt-24 text-center">Item not found</div>;

  const isResearch = item.id?.includes('research');
  const isQSNN = item.id === 'proj-research-qsnn';
  const hasMemories = item.memories && item.memories.length > 0;
  const isProject = type === 'projects';

  const handleZoomImage = (url: string, alt: string) => {
    setSelectedImage({ isOpen: true, url, alt });
  };

  const renderTextWithBold = (text: string) => {
    const parts = text.split(/(\*\*.*?\*\*)/);
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={i} className="font-bold text-slate-900">{part.slice(2, -2)}</strong>;
      }
      return part;
    });
  };

  const renderDescription = (desc: string, isReversed: boolean = false) => {
    if (desc.includes('•')) {
      const lines = desc.split('\n').filter(l => l.trim() !== '');
      return (
        <ul className={`space-y-6 ${isReversed ? 'lg:text-right' : ''}`}>
          {lines.map((line, lIdx) => {
            const content = line.replace(/^[•\s]+/, '');
            return (
              <li key={lIdx} className={`flex items-start gap-4 ${isReversed ? 'lg:flex-row-reverse' : ''}`}>
                <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-indigo-50 text-indigo-500 ring-1 ring-indigo-100/50">
                  <CheckCircle2 size={16} />
                </span>
                <span className="text-lg font-light leading-relaxed text-slate-600">
                  {renderTextWithBold(content)}
                </span>
              </li>
            );
          })}
        </ul>
      );
    }
    return <p className={`text-xl font-light leading-relaxed text-slate-600 whitespace-pre-line ${isReversed ? 'lg:text-right' : ''}`}>{renderTextWithBold(desc)}</p>;
  };

  return (
    <div className="min-h-screen bg-white pb-20 pt-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <button 
          onClick={() => navigate(-1)} 
          className="mb-8 flex items-center gap-2 text-sm font-medium text-slate-400 hover:text-indigo-600 transition-colors"
        >
          <ArrowLeft size={16} /> Back
        </button>

        <div className="relative border-l-2 border-indigo-100 pl-8">
            {isResearch && (
                <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-cyan-50 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-cyan-600 ring-1 ring-cyan-100">
                    <Beaker size={12} /> {isQSNN ? "Quantum Spiking Research" : "Quantum Federated Research"}
                </div>
            )}
            <h1 className="text-4xl font-light text-slate-900 sm:text-5xl">
            {item.title || item.role || item.degree}
            </h1>
            <p className="mt-2 text-2xl font-light text-indigo-500">
            {item.company || item.institution || item.organization}
            </p>
            {(item.period || item.year) && (
                <span className="mt-4 inline-block rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-slate-500">
                {item.period || item.year}
                </span>
            )}
        </div>

        <div className="mt-12 space-y-16">
           {/* Tech Stack for Projects */}
           {item.techStack && (
             <div className="rounded-xl border border-slate-100 bg-slate-50/50 p-6">
                <h3 className="mb-4 text-xs font-semibold uppercase tracking-widest text-slate-400">Core Technologies</h3>
                <div className="flex flex-wrap gap-2">
                    {item.techStack.map((tech: string) => (
                        <span key={tech} className="rounded-md bg-white border border-slate-200 px-3 py-1.5 text-sm text-slate-600 shadow-sm">
                            {tech}
                        </span>
                    ))}
                </div>
             </div>
           )}

           {/* Specialized Stats */}
           {isResearch && (
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                 {isQSNN ? (
                   <>
                    <div className="rounded-xl border border-slate-100 p-6 text-center shadow-sm bg-slate-50/30">
                        <p className="text-4xl font-medium text-cyan-600">10×</p>
                        <p className="mt-2 text-xs uppercase tracking-wider text-slate-400 font-bold">Energy Reduction</p>
                    </div>
                    <div className="rounded-xl border border-slate-100 p-6 text-center shadow-sm bg-slate-50/30">
                        <p className="text-4xl font-medium text-indigo-600">QLIF</p>
                        <p className="mt-2 text-xs uppercase tracking-wider text-slate-400 font-bold">Neuron Logic</p>
                    </div>
                    <div className="rounded-xl border border-slate-100 p-6 text-center col-span-2 sm:col-span-1 shadow-sm bg-slate-50/30">
                        <p className="text-4xl font-medium text-slate-800">90%</p>
                        <p className="mt-2 text-xs uppercase tracking-wider text-slate-400 font-bold">Target Accuracy</p>
                    </div>
                   </>
                 ) : (
                   <>
                    <div className="rounded-xl border border-slate-100 p-6 text-center shadow-sm bg-slate-50/30">
                        <p className="text-4xl font-medium text-cyan-600">89.89%</p>
                        <p className="mt-2 text-xs uppercase tracking-wider text-slate-400 font-bold">Max Accuracy</p>
                    </div>
                    <div className="rounded-xl border border-slate-100 p-6 text-center shadow-sm bg-slate-50/30">
                        <p className="text-4xl font-medium text-indigo-600">7,014</p>
                        <p className="mt-2 text-xs uppercase tracking-wider text-slate-400 font-bold">Parameters</p>
                    </div>
                    <div className="rounded-xl border border-slate-100 p-6 text-center col-span-2 sm:col-span-1 shadow-sm bg-slate-50/30">
                        <p className="text-4xl font-medium text-slate-800">6</p>
                        <p className="mt-2 text-xs uppercase tracking-wider text-slate-400 font-bold">Sensor Sites</p>
                    </div>
                   </>
                 )}
              </div>
           )}

           {/* Content */}
           {(item.details || item.description) && (
             <div>
               <h3 className="mb-6 text-xs font-semibold uppercase tracking-widest text-slate-400">
                 {isResearch ? "Research Abstract & Results" : "Details & Achievements"}
               </h3>
               <div className="prose prose-slate max-w-none prose-lg">
                 {typeof item.description === 'string' ? (
                   <p className="font-light leading-relaxed text-slate-600 whitespace-pre-line">{renderTextWithBold(item.description)}</p>
                 ) : (
                   <ul className="list-none space-y-6 pl-0">
                      {(item.details || item.description || []).map((point: string, idx: number) => (
                          <li key={idx} className="flex items-start gap-4">
                              <span className={`mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${isQSNN ? 'bg-cyan-50 text-cyan-500' : 'bg-indigo-50 text-indigo-500'}`}>
                                 <CheckCircle2 size={16} />
                              </span>
                              <span className="text-lg font-light leading-relaxed text-slate-600">{renderTextWithBold(point)}</span>
                          </li>
                      ))}
                   </ul>
                 )}
               </div>
             </div>
           )}

           {/* Memories Section */}
           {hasMemories && (
             <div className="space-y-12 pt-12 border-t border-slate-100">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-50 text-indigo-500 ring-1 ring-indigo-100/50">
                    <ImageIcon size={22} />
                  </span>
                  <h3 className="text-2xl font-light tracking-wide text-slate-900">
                    {isProject ? "Project Case Study & Memories" : "Photo Memories"}
                  </h3>
                </div>
                
                <div className="space-y-32">
                  {item.memories.map((mem: any, idx: number) => {
                    const shouldReverse = !isProject && idx % 2 === 1;

                    return (
                      <div key={idx} className="group flex flex-col gap-8">
                         {/* Header */}
                         <div className="flex flex-col gap-1 border-b border-slate-100 pb-3">
                            <div className="flex items-center gap-2 text-indigo-500">
                               <Calendar size={16} />
                               <span className="text-xs font-bold uppercase tracking-widest">{mem.date}</span>
                            </div>
                            <h4 className="mt-1 text-3xl font-bold tracking-tight text-slate-900 transition-colors group-hover:text-indigo-600">
                               {mem.title}
                            </h4>
                         </div>
                         
                         {/* Media Content */}
                         <div className="space-y-16">
                            {mem.media ? (
                               <div className="space-y-20">
                                  <div className="max-w-4xl mb-8">
                                     {renderDescription(mem.description)}
                                  </div>
                                  {mem.media.map((m: any, mIdx: number) => {
                                     const subReverse = !isProject && mIdx % 2 === 1;
                                     return (
                                       <div 
                                         key={mIdx} 
                                         className="grid grid-cols-1 gap-12 lg:grid-cols-2 items-center"
                                       >
                                          {/* Text Part */}
                                          <div className={`flex flex-col justify-center ${subReverse ? 'lg:order-last' : 'lg:order-first'}`}>
                                             {m.description && (
                                                <p className={`text-lg font-light leading-relaxed text-slate-500 italic border-l-2 border-indigo-100 pl-6 ${subReverse ? 'lg:text-right lg:border-l-0 lg:border-r-2 lg:pl-0 lg:pr-6' : ''}`}>
                                                   {renderTextWithBold(m.description)}
                                                </p>
                                             )}
                                          </div>
                                          {/* Image Part */}
                                          <div 
                                            className={`group relative cursor-zoom-in aspect-[16/9] w-full overflow-hidden rounded-2xl border border-slate-100 shadow-sm transition-all duration-500 hover:shadow-2xl ${subReverse ? 'lg:order-first' : 'lg:order-last'}`}
                                            onClick={() => handleZoomImage(m.url, m.description || mem.title)}
                                          >
                                             <img 
                                               src={m.url} 
                                               alt={`Media ${mIdx}`} 
                                               className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105" 
                                             />
                                             <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 transition-opacity group-hover:opacity-100">
                                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/30 backdrop-blur-md text-white">
                                                  <ZoomIn size={20} />
                                                </div>
                                             </div>
                                          </div>
                                       </div>
                                     );
                                  })}
                               </div>
                            ) : (
                               <div className={`grid grid-cols-1 gap-12 ${mem.imageUrl ? 'lg:grid-cols-2' : 'max-w-4xl'} items-center`}>
                                  {/* Description Part */}
                                  <div className={`flex flex-col justify-center ${shouldReverse ? 'lg:order-last' : 'lg:order-first'}`}>
                                     {renderDescription(mem.description, shouldReverse)}
                                  </div>
                                  {/* Image Part */}
                                  {mem.imageUrl && (
                                     <div 
                                       className={`group relative cursor-zoom-in aspect-[16/9] w-full overflow-hidden rounded-2xl border border-slate-100 shadow-sm transition-all duration-500 hover:shadow-2xl ${shouldReverse ? 'lg:order-first' : 'lg:order-last'}`}
                                       onClick={() => handleZoomImage(mem.imageUrl, mem.title)}
                                     >
                                        <img 
                                           src={mem.imageUrl} 
                                           alt={mem.title} 
                                           className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105" 
                                        />
                                        <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 transition-opacity group-hover:opacity-100">
                                           <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/30 backdrop-blur-md text-white">
                                             <ZoomIn size={20} />
                                           </div>
                                        </div>
                                     </div>
                                  )}
                               </div>
                            )}
                         </div>
                      </div>
                    );
                  })}
                </div>
             </div>
           )}

           {isResearch && (
               <div className={`rounded-2xl p-10 text-white ${isQSNN ? 'bg-cyan-900' : 'bg-slate-900'} shadow-xl shadow-slate-200`}>
                  <h3 className="mb-4 text-sm font-semibold uppercase tracking-widest opacity-60">Research Impact</h3>
                  <p className="text-xl font-light leading-relaxed opacity-90">
                    {isQSNN 
                      ? "This work demonstrates that quantum-inspired neuron logic can deliver massive energy efficiency gains for edge IoT devices without sacrificing the robustness of federated learning in heterogeneous environments."
                      : "By addressing the heterogeneity of human movement through a three-stage QLSTM workflow, this project bridges the gap between theoretical quantum advantages and practical, privacy-preserving healthcare IoT deployments."
                    }
                  </p>
               </div>
           )}
        </div>

      </div>

      <ImageModal 
        isOpen={selectedImage.isOpen}
        onClose={() => setSelectedImage({ ...selectedImage, isOpen: false })}
        src={selectedImage.url}
        alt={selectedImage.alt}
      />
    </div>
  );
};