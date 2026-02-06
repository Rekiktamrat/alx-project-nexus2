import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { type Job, type JobFilters } from '@/types/job';
import api from '@/lib/api';

interface JobContextType {
  jobs: Job[];
  filteredJobs: Job[];
  filters: JobFilters;
  isLoading: boolean;
  error: string | null;
  selectedJob: Job | null;
  searchJobs: (term: string) => void;
  updateFilters: (newFilters: Partial<JobFilters>) => void;
  clearFilters: () => void;
  addJob: (job: Omit<Job, 'id' | 'postedAt'>) => void;
  setSelectedJob: (job: Job | null) => void;
}

const JobContext = createContext<JobContextType | undefined>(undefined);

export const JobProvider = ({ children }: { children: ReactNode }) => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [filters, setFilters] = useState<JobFilters>({
    search: '',
    category: null,
    location: null,
    experienceLevel: null,
    type: null,
  });

  const fetchJobs = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await api.get('/jobs/');
      const mappedJobs = response.data.map((job: any) => ({
        id: job.id.toString(),
        title: job.title,
        company: job.company,
        location: job.location,
        category: job.category?.name || 'Uncategorized',
        experienceLevel: job.experienceLevel,
        salary: {
          min: job.salary_min,
          max: job.salary_max,
          currency: job.currency || 'USD'
        },
        description: job.description,
        requirements: job.requirements ? job.requirements.split('\n') : [],
        responsibilities: [],
        benefits: [],
        type: job.type,
        postedAt: job.posted_at,
        featured: job.is_active
      }));
      setJobs(mappedJobs);
    } catch (err: any) {
      console.error("Failed to fetch jobs:", err);
      // Fallback to mock data if API fails? Or just show error.
      // For now, let's show error but maybe we can keep the mock data as backup?
      // Better to rely on API if we want "one big project".
      setError("Failed to load jobs from API.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const searchJobs = (term: string) => {
    setFilters((prev) => ({ ...prev, search: term }));
  };

  const updateFilters = (newFilters: Partial<JobFilters>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  const clearFilters = () => {
    setFilters({
      search: '',
      category: null,
      location: null,
      experienceLevel: null,
      type: null,
    });
  };

  const addJob = async (newJobData: Omit<Job, 'id' | 'postedAt'>) => {
    // Ideally this should call the API
    try {
      const response = await api.post('/jobs/', newJobData);
      setJobs((prev) => [response.data, ...prev]);
    } catch (err) {
       console.error("Failed to add job", err);
       // Fallback for demo if not admin
    }
  };

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      filters.search === '' ||
      job.title.toLowerCase().includes(filters.search.toLowerCase()) ||
      job.company.toLowerCase().includes(filters.search.toLowerCase()) ||
      job.description.toLowerCase().includes(filters.search.toLowerCase());

    const matchesCategory = filters.category === null || job.category === filters.category;
    const matchesLocation = filters.location === null || job.location === filters.location;
    const matchesExperience = filters.experienceLevel === null || job.experienceLevel === filters.experienceLevel;
    const matchesType = filters.type === null || job.type === filters.type;

    return matchesSearch && matchesCategory && matchesLocation && matchesExperience && matchesType;
  });

  return (
    <JobContext.Provider
      value={{
        jobs,
        filteredJobs,
        filters,
        isLoading,
        error,
        selectedJob,
        searchJobs,
        updateFilters,
        clearFilters,
        addJob,
        setSelectedJob,
      }}
    >
      {children}
    </JobContext.Provider>
  );
};

export const useJobs = () => {
  const context = useContext(JobContext);
  if (context === undefined) {
    throw new Error('useJobs must be used within a JobProvider');
  }
  return context;
};
