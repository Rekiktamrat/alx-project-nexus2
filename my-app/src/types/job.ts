export type ExperienceLevel = 'entry' | 'mid' | 'senior';

export interface Job {
  id: string;
  title: string;
  company: string;
  companyLogo?: string;
  location: string;
  category: string;
  experienceLevel: ExperienceLevel;
  salary: {
    min: number;
    max: number;
    currency: string;
  };
  description: string;
  requirements: string[];
  responsibilities: string[];
  benefits: string[];
  type: 'full-time' | 'part-time' | 'contract' | 'remote';
  postedAt: string;
  featured?: boolean;
}

export interface JobFilters {
  search: string;
  category: string | null;
  location: string | null;
  experienceLevel: ExperienceLevel | null;
  type: string | null;
}

export interface ApplicationForm {
  fullName: string;
  email: string;
  phone: string;
  resume: File | null;
  coverLetter: string;
  linkedIn?: string;
  portfolio?: string;
}
