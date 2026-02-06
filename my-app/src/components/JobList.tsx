import { useJobs } from '@/context/JobContext';
import { JobCard } from './JobCard';
import { SearchX } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function JobList() {
  const { filteredJobs, isLoading, error, clearFilters, filters } = useJobs();

  const hasFilters = filters.search || filters.category || filters.location || filters.experienceLevel || filters.type;

  if (error) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center py-12">
          <div className="flex justify-center mb-4">
            <div className="h-16 w-16 rounded-full bg-destructive/10 flex items-center justify-center">
              <SearchX className="h-8 w-8 text-destructive" />
            </div>
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-2">Something went wrong</h3>
          <p className="text-muted-foreground mb-4">{error}</p>
          <Button variant="outline" onClick={() => window.location.reload()}>
            Try again
          </Button>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex-1">
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-card rounded-xl shadow-card p-5 animate-pulse-soft">
              <div className="h-6 bg-muted rounded w-2/3 mb-3"></div>
              <div className="h-4 bg-muted rounded w-1/3 mb-4"></div>
              <div className="flex gap-2 mb-4">
                <div className="h-6 bg-muted rounded-full w-24"></div>
                <div className="h-6 bg-muted rounded-full w-20"></div>
              </div>
              <div className="h-4 bg-muted rounded w-full mb-2"></div>
              <div className="h-4 bg-muted rounded w-4/5"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (filteredJobs.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center py-12">
          <div className="flex justify-center mb-4">
            <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center">
              <SearchX className="h-8 w-8 text-muted-foreground" />
            </div>
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-2">No jobs found</h3>
          <p className="text-muted-foreground mb-4">
            {hasFilters
              ? "Try adjusting your filters to see more results"
              : "No job listings available at the moment"}
          </p>
          {hasFilters && (
            <Button variant="outline" onClick={clearFilters}>
              Clear all filters
            </Button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1">
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-muted-foreground">
          Showing <span className="font-medium text-foreground">{filteredJobs.length}</span> jobs
        </p>
      </div>
      <div className="space-y-4">
        {filteredJobs.map((job, index) => (
          <div
            key={job.id}
            className="animate-fade-in"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <JobCard job={job} />
          </div>
        ))}
      </div>
    </div>
  );
}
