import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CV_DATA } from '../constants';
import { AttioCard } from '../components/ui/AttioCard';
import { MapPin } from 'lucide-react';

export const ListView: React.FC = () => {
  const { category } = useParams<{ category: string }>();
  const navigate = useNavigate();

  const getCategoryData = () => {
    switch (category) {
      case 'education': return { title: 'Education', data: CV_DATA.education, type: 'education' };
      case 'experience': return { title: 'Professional Experience', data: CV_DATA.experience, type: 'experience' };
      case 'projects': return { title: 'Highlighted Projects', data: CV_DATA.projects, type: 'projects' };
      case 'extracurricular': return { title: 'Extracurricular Activities', data: CV_DATA.activities, type: 'activities' };
      case 'awards': return { title: 'Honors & Awards', data: CV_DATA.awards, type: 'awards' };
      default: return null;
    }
  };

  const info = getCategoryData();

  if (!info) return <div className="pt-24 text-center">Category not found</div>;

  return (
    <div className="min-h-screen pb-20 pt-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h1 className="mb-8 text-4xl font-light text-slate-900">{info.title}</h1>
        <div className="grid gap-6 md:grid-cols-2">
          {info.data.map((item: any) => (
            <AttioCard
              key={item.id}
              title={item.title || item.role || item.degree}
              subtitle={item.company || item.institution || item.organization}
              badge={item.period || item.year}
              onClick={() => navigate(`/detail/${info.type}/${item.id}`)}
            >
               <div className="mt-2 text-slate-500">
                  {item.description ? (
                      <p className="line-clamp-2 mb-3">{typeof item.description === 'string' ? item.description : item.description[0]}</p>
                  ) : item.details ? (
                      <p className="line-clamp-2 mb-3">{item.details[0]}</p>
                  ) : null}

                  {item.location && (
                    <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium mt-auto">
                        <MapPin size={12} className="text-slate-300" />
                        <span>{item.location}</span>
                    </div>
                  )}
               </div>
            </AttioCard>
          ))}
        </div>
      </div>
    </div>
  );
};