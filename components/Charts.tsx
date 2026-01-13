import React from 'react';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell
} from 'recharts';

interface Skill {
  name: string;
  level: number;
}

export const SkillsRadar: React.FC<{ skills: Skill[] }> = ({ skills }) => {
  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="70%" data={skills}>
          <PolarGrid stroke="#e2e8f0" strokeWidth={0.5} />
          <PolarAngleAxis 
            dataKey="name" 
            tick={{ fill: '#64748b', fontSize: 10, fontWeight: 300 }} 
          />
          <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
          <Radar
            name="Skill Level"
            dataKey="level"
            stroke="#6366f1"
            strokeWidth={1.5}
            fill="#818cf8"
            fillOpacity={0.2}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};

export const PerformanceChart: React.FC = () => {
  const data = [
    { name: 'Undergrad GPA', value: 87.6, label: '3.48/4.0' },
    { name: 'Masters GPA', value: 100, label: '4.0/4.0' },
    { name: 'Masters Avg', value: 92.5, label: '92.5%' },
  ];

  return (
    <div className="h-[200px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          layout="vertical"
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <XAxis type="number" domain={[0, 100]} hide />
          <YAxis 
            dataKey="name" 
            type="category" 
            width={100} 
            tick={{ fill: '#64748b', fontSize: 11, fontWeight: 300 }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip 
            cursor={{fill: '#f1f5f9'}}
            contentStyle={{ 
              backgroundColor: 'rgba(255, 255, 255, 0.9)', 
              borderColor: '#e2e8f0', 
              borderRadius: '8px',
              fontSize: '12px',
              boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
            }}
          />
          <Bar dataKey="value" barSize={12} radius={[0, 4, 4, 0]}>
             {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={index === 1 ? '#06b6d4' : '#6366f1'} />
              ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
