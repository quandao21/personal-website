import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { CV_DATA } from '../constants';
import { AttioCard } from '../components/ui/AttioCard';
import { MapPin, Mail, Linkedin, Download, GraduationCap, Briefcase, Award, Users, ArrowUpRight, BookOpen, ChevronRight, FileText, X, ZoomIn } from 'lucide-react';
import { ImageModal } from '../components/ui/ImageModal';

export const Home: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { name, title, contact, summary, education, experience, projects, awards, activities } = CV_DATA;
  
  const [imgSrc, setImgSrc] = useState("../images/profile-pic.png");
  const [transcriptModal, setTranscriptModal] = useState<{ isOpen: boolean; url: string; title: string }>({
    isOpen: false,
    url: '',
    title: ''
  });
  const [selectedImage, setSelectedImage] = useState<{ isOpen: boolean; url: string; alt: string }>({
    isOpen: false,
    url: '',
    alt: ''
  });

  useEffect(() => {
    if (location.state && (location.state as any).scrollTo) {
      const id = (location.state as any).scrollTo;
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
      }
      window.history.replaceState({}, document.title);
    }
  }, [location]);

  const featuredResearch = projects.filter(p => p.id.includes('research'));
  const otherProjects = projects.filter(p => !p.id.includes('research'));

  const handleOpenTranscript = (e: React.MouseEvent, url: string, title: string) => {
    e.stopPropagation(); // Prevent card click navigation
    setTranscriptModal({ isOpen: true, url, title });
  };

  const handleZoomImage = (url: string, alt: string) => {
    setSelectedImage({ isOpen: true, url, alt });
  };

  // Consistent header style constant - updated to font-bold
  const headerStyle = "flex items-center gap-3 text-2xl font-bold tracking-tight text-slate-900";
  const headerIconStyle = "flex h-8 w-8 items-center justify-center rounded-lg ring-1 ring-inset";

  return (
    <div className="min-h-screen pb-20 pt-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Hero Section */}
        <div id="about" className="mb-12 scroll-mt-28 grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="col-span-1 lg:col-span-2">
            <h1 className="mb-2 text-5xl font-bold tracking-tight text-slate-900 sm:text-7xl">
              {name}
            </h1>
            <p className="mb-6 text-2xl font-light text-indigo-500">{title}</p>
            <p className="mb-8 max-w-3xl text-xl font-light leading-relaxed text-slate-600">
              {summary}
            </p>
            
            <div className="flex flex-wrap gap-4 text-sm font-light text-slate-500">
              <div className="flex items-center gap-2 rounded-full bg-white px-4 py-2 shadow-sm border border-slate-100">
                <MapPin size={14} className="text-indigo-400" /> {contact.location}
              </div>
              <a href={`mailto:${contact.email}`} className="flex items-center gap-2 rounded-full bg-white px-4 py-2 shadow-sm border border-slate-100 hover:text-indigo-600 transition-colors">
                <Mail size={14} className="text-indigo-400" /> {contact.email}
              </a>
              <a href={`https://${contact.linkedin}`} target="_blank" rel="noreferrer" className="flex items-center gap-2 rounded-full bg-white px-4 py-2 shadow-sm border border-slate-100 hover:text-indigo-600 transition-colors">
                <Linkedin size={14} className="text-indigo-400" /> LinkedIn
              </a>
            </div>
          </div>
          
          <div className="col-span-1 flex justify-center lg:justify-end">
             <div className="relative h-80 w-72 lg:h-[450px] lg:w-96">
                <div 
                  className="group relative h-full w-full cursor-zoom-in overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200 transition-all duration-500 hover:shadow-xl hover:shadow-indigo-500/10"
                  onClick={() => handleZoomImage(imgSrc, name)}
                >
                   <img 
                      src={imgSrc}
                      alt="Quan T. Dao" 
                      onError={() => setImgSrc("https://i.postimg.cc/hjZcH9Gg/profile-pic.png")}
                      className="h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                   />
                   <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 transition-opacity group-hover:opacity-100">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/30 backdrop-blur-md text-white">
                        <ZoomIn size={24} />
                      </div>
                   </div>
                </div>
             </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
          
          {/* Education */}
          <div id="education" className="col-span-1 scroll-mt-24 lg:col-span-4">
            <div className="mb-6 flex items-center justify-between">
              <h2 className={headerStyle}>
                <span className={`${headerIconStyle} bg-indigo-50 text-indigo-500 ring-indigo-100/50`}>
                  <GraduationCap size={18} />
                </span>
                Academic Profile
              </h2>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
                {education.map((edu) => (
                    <AttioCard 
                        key={edu.id} 
                        title={edu.degree} 
                        subtitle={edu.institution} 
                        badge={edu.period}
                        onClick={() => navigate(`/detail/education/${edu.id}`)}
                    >
                        <p className="line-clamp-2 text-slate-500 mb-6">{edu.details[0]}</p>
                        
                        <div className="flex items-center justify-between border-t border-slate-50 pt-4">
                            <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
                                <MapPin size={14} className="text-indigo-400" />
                                <span>{edu.location}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                {edu.transcriptUrl && (
                                  <button
                                    onClick={(e) => handleOpenTranscript(e, edu.transcriptUrl!, `${edu.degree} - Transcript`)}
                                    className="flex items-center gap-1.5 rounded-md border border-slate-200 bg-white px-2.5 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-600 shadow-sm transition-all hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-600"
                                  >
                                    <FileText size={12} />
                                    Transcript
                                  </button>
                                )}
                                <div className="bg-indigo-50/50 border border-indigo-100 rounded-md px-3 py-1.5 shadow-sm">
                                    <span className="text-xs font-bold text-indigo-600 whitespace-nowrap">
                                        GPA: {edu.gpa}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </AttioCard>
                ))}
            </div>
          </div>

           {/* Awards Section */}
           <div id="awards" className="col-span-1 scroll-mt-24 lg:col-span-4 mt-12">
             <div className="mb-6 flex items-center justify-between">
               <h2 className={headerStyle}>
                 <span className={`${headerIconStyle} bg-yellow-50 text-yellow-500 ring-yellow-100/50`}>
                    <Award size={18} />
                 </span>
                 Honors & Awards
               </h2>
               <button 
                onClick={() => navigate('/awards')} 
                className="group flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-indigo-500 hover:text-indigo-600 transition-colors"
              >
                View All <ChevronRight size={14} className="transition-transform group-hover:translate-x-0.5" />
              </button>
             </div>
             <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
               {awards.slice(0, 6).map((award) => (
                 <AttioCard 
                   key={award.id} 
                   className="group !p-5"
                   onClick={() => navigate(`/detail/awards/${award.id}`)}
                 >
                    <div className="flex h-full flex-col justify-between gap-6">
                        <div className="flex items-start justify-between">
                            <span className="inline-flex items-center rounded-md border border-slate-100 bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-500 transition-colors group-hover:border-indigo-100 group-hover:bg-indigo-50/30 group-hover:text-indigo-600">
                                {award.year}
                            </span>
                            <div className="flex items-center gap-1.5 rounded-full border border-slate-100 bg-slate-50/50 px-2 py-0.5 text-slate-300 transition-all duration-300 group-hover:border-indigo-100 group-hover:bg-indigo-50 group-hover:text-indigo-600">
                                <span className="text-[9px] font-bold uppercase tracking-wider ml-1">View</span>
                                <ArrowUpRight size={12} className="mr-0.5" />
                            </div>
                        </div>
                        <div>
                            <h3 className="mb-2 text-base font-bold leading-snug text-slate-900 transition-colors group-hover:text-indigo-600">
                                {award.title}
                            </h3>
                            <p className="line-clamp-2 text-xs font-light leading-relaxed text-slate-500">
                                {award.organization}
                            </p>
                        </div>
                    </div>
                 </AttioCard>
               ))}
             </div>
           </div>

           {/* Research & Publications Section */}
           {featuredResearch.length > 0 && (
             <div id="research" className="col-span-1 scroll-mt-24 lg:col-span-4 mt-12">
                <div className="mb-6 flex items-center justify-between">
                  <h2 className={headerStyle}>
                    <span className={`${headerIconStyle} bg-indigo-50 text-indigo-500 ring-indigo-100/50`}>
                        <BookOpen size={18} />
                    </span>
                    Research & Publications
                  </h2>
                </div>
                <div className="grid gap-6 md:grid-cols-2">
                  {featuredResearch.map((paper) => (
                    <div 
                      key={paper.id}
                      onClick={() => navigate(`/detail/projects/${paper.id}`)}
                      className="group relative cursor-pointer overflow-hidden rounded-2xl border border-slate-200 bg-white p-10 transition-all duration-500 hover:border-indigo-300 hover:shadow-xl hover:shadow-indigo-500/10"
                    >
                      <div className="absolute right-0 top-0 h-48 w-48 translate-x-1/2 -translate-y-1/2 rounded-full bg-slate-50/50 blur-3xl opacity-0 transition-opacity group-hover:opacity-100" />
                      <div className="relative z-10 flex flex-col h-full">
                        <div className="mb-4 flex flex-wrap gap-2">
                          <span className="rounded-full bg-slate-50 px-2.5 py-1 text-[9px] font-bold uppercase tracking-widest text-slate-500 ring-1 ring-slate-100 group-hover:bg-indigo-50 group-hover:text-indigo-600 group-hover:ring-indigo-100/50 transition-colors">Publication</span>
                          <span className="rounded-full bg-indigo-50 px-2.5 py-1 text-[9px] font-bold uppercase tracking-widest text-indigo-600 ring-1 ring-indigo-100/50">AI Research</span>
                        </div>
                        <h3 className="mb-3 text-3xl font-bold leading-snug text-slate-900 group-hover:text-indigo-600 transition-colors">
                          {paper.title}
                        </h3>
                        <p className="mb-8 line-clamp-3 text-lg font-light leading-relaxed text-slate-500">
                          {paper.description[0]}
                        </p>
                        
                        <div className="mt-auto flex items-center justify-between border-t border-slate-100 pt-6">
                           <div className="flex gap-8">
                              {paper.id === 'proj-research-qsnn' ? (
                                <>
                                  <div className="flex flex-col">
                                    <span className="text-2xl font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">10x</span>
                                    <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">Energy Efficiency</span>
                                  </div>
                                  <div className="flex flex-col">
                                    <span className="text-2xl font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">QLIF</span>
                                    <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">Neuron Type</span>
                                  </div>
                                </>
                              ) : (
                                <>
                                  <div className="flex flex-col">
                                    <span className="text-2xl font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">~90%</span>
                                    <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">Accuracy</span>
                                  </div>
                                  <div className="flex flex-col">
                                    <span className="text-2xl font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">30%</span>
                                    <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">Param Reduction</span>
                                  </div>
                                </>
                              )}
                           </div>
                           <div className="flex items-center gap-3">
                             <span className="text-[11px] font-bold uppercase tracking-widest text-slate-400 transition-colors group-hover:text-indigo-600">DETAILS</span>
                             <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-50 text-slate-400 transition-all duration-300 group-hover:scale-110 group-hover:bg-indigo-50 group-hover:text-indigo-600">
                               <ArrowUpRight size={24} />
                             </div>
                           </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
             </div>
           )}

           {/* Projects */}
           <div id="projects" className="col-span-1 scroll-mt-24 lg:col-span-4 mt-12">
             <div className="mb-6 flex items-center justify-between">
              <h2 className={headerStyle}>
                <span className={`${headerIconStyle} bg-indigo-50 text-indigo-500 ring-indigo-100/50`}>
                  <Download size={18} />
                </span>
                Highlighted Projects
              </h2>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
                {otherProjects.map((proj) => (
                    <AttioCard 
                        key={proj.id} 
                        title={proj.title} 
                        onClick={() => navigate(`/detail/projects/${proj.id}`)}
                    >
                         <div className="mb-3 flex flex-wrap gap-2">
                            {proj.techStack?.map(tech => (
                                <span key={tech} className="rounded border border-indigo-100 bg-indigo-50 px-2 py-0.5 text-[10px] text-indigo-600">
                                    {tech}
                                </span>
                            ))}
                         </div>
                         <p className="line-clamp-2 text-slate-500">{proj.description[0]}</p>
                    </AttioCard>
                ))}
            </div>
           </div>

           {/* Experience */}
           <div id="experience" className="col-span-1 scroll-mt-24 lg:col-span-4 mt-12">
             <div className="mb-6 flex items-center justify-between">
              <h2 className={headerStyle}>
                <span className={`${headerIconStyle} bg-indigo-50 text-indigo-500 ring-indigo-100/50`}>
                  <Briefcase size={18} />
                </span>
                Professional Experience
              </h2>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
                {experience.map((exp) => (
                    <AttioCard 
                        key={exp.id} 
                        title={exp.role} 
                        subtitle={exp.company} 
                        badge={exp.period}
                        onClick={() => navigate(`/detail/experience/${exp.id}`)}
                    >
                         <p className="line-clamp-3 text-slate-500">{exp.details[0]}</p>
                    </AttioCard>
                ))}
            </div>
           </div>

           {/* Extracurricular Activities */}
           <div id="extracurricular" className="col-span-1 scroll-mt-24 lg:col-span-4 mt-12">
             <div className="mb-6 flex items-center justify-between">
              <h2 className={headerStyle}>
                <span className={`${headerIconStyle} bg-indigo-50 text-indigo-500 ring-indigo-100/50`}>
                  <Users size={18} />
                </span>
                Extracurricular Activities
              </h2>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
                {activities.map((act) => (
                    <AttioCard 
                        key={act.id} 
                        title={act.role} 
                        subtitle={act.organization}
                        badge={act.period}
                        onClick={() => navigate(`/detail/activities/${act.id}`)}
                    >
                         <p className="line-clamp-2 text-slate-500">{act.details[0]}</p>
                    </AttioCard>
                ))}
            </div>
           </div>

        </div>
      </div>

      {/* Transcript Modal */}
      {transcriptModal.isOpen && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4 sm:p-8"
          onClick={() => setTranscriptModal({ ...transcriptModal, isOpen: false })}
        >
          <div 
            className="relative h-full w-full max-w-5xl overflow-hidden rounded-2xl bg-white shadow-2xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
                  <FileText size={18} />
                </div>
                <h3 className="text-lg font-bold text-slate-900">{transcriptModal.title}</h3>
              </div>
              <button 
                onClick={() => setTranscriptModal({ ...transcriptModal, isOpen: false })}
                className="flex h-8 w-8 items-center justify-center rounded-full text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            
            {/* Modal Content - PDF Iframe */}
            <div className="flex-grow bg-slate-50 relative">
              <iframe 
                src={transcriptModal.url} 
                className="h-full w-full border-none"
                title="Academic Transcript"
                allow="autoplay"
              />
              <div className="absolute inset-x-0 bottom-4 flex justify-center pointer-events-none">
                <span className="bg-white/90 backdrop-blur px-3 py-1 rounded-full text-[10px] font-medium text-slate-400 border border-slate-100 pointer-events-auto shadow-sm">
                  Transcript from Google Drive Secure Viewer
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Full Screen Image Zoom */}
      <ImageModal 
        isOpen={selectedImage.isOpen}
        onClose={() => setSelectedImage({ ...selectedImage, isOpen: false })}
        src={selectedImage.url}
        alt={selectedImage.alt}
      />
    </div>
  );
};