
export interface MemoryMedia {
  url: string;
  description?: string;
}

export interface Memory {
  title: string;
  date: string;
  description: string;
  imageUrl?: string;
  media?: MemoryMedia[];
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  location: string;
  period: string;
  gpa?: string;
  details: string[];
  memories?: Memory[];
  transcriptUrl?: string;
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  location?: string;
  period: string;
  details: string[];
  memories?: Memory[];
}

export interface Project {
  id: string;
  title: string;
  techStack?: string[];
  description: string[];
  memories?: Memory[];
}

export interface Activity {
  id: string;
  role: string;
  organization: string;
  period: string;
  details: string[];
  memories?: Memory[];
}

export interface Award {
  id: string;
  title: string;
  organization: string;
  year: string;
  description?: string;
}

export interface ProfileData {
  name: string;
  title: string;
  contact: {
    location: string;
    phone: string;
    email: string;
    linkedin: string;
  };
  summary: string;
  education: Education[];
  experience: Experience[];
  projects: Project[];
  activities: Activity[];
  awards: Award[];
  skills: { name: string; level: number }[];
}