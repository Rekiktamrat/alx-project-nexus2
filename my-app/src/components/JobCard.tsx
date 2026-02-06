import { MapPin, Clock, DollarSign, Briefcase, Star } from 'lucide-react';
import type { Job } from '@/types/job';
import { Badge } from '@/components/ui/badge';
import { useJobs } from '@/context/JobContext';
import { cn } from '@/lib/utils';

interface JobCardProps {
  job: Job;
}

const experienceBadgeStyles: Record<string, string> = {
  entry: 'badge-entry',
  mid: 'badge-mid',
  senior: 'badge-senior',
};

const experienceLabels: Record<string, string> = {
  entry: 'Entry Level',
  mid: 'Mid Level',
  senior: 'Senior',
};

export function JobCard({ job }: JobCardProps) {
  const { setSelectedJob } = useJobs();

  const formatSalary = (min: number, max: number, currency: string) => {
    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency,
      maximumFractionDigits: 0,
    });
    return `${formatter.format(min)} - ${formatter.format(max)}`;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    if (diffDays === 1) return 'Today';
    if (diffDays === 2) return 'Yesterday';
    if (diffDays <= 7) return `${diffDays} days ago`;
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <article
      className={cn(
        'bg-card rounded-xl shadow-card p-5 card-interactive cursor-pointer',
        job.featured && 'ring-2 ring-primary/20'
      )}
      onClick={() => setSelectedJob(job)}
    >
      {job.featured && (
        <div className="flex items-center gap-1 text-secondary mb-3">
          <Star className="h-4 w-4 fill-current" />
          <span className="text-xs font-medium">Featured</span>
        </div>
      )}

      <div className="flex items-start justify-between gap-4 mb-4">
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-foreground mb-1 truncate">{job.title}</h3>
          <p className="text-muted-foreground font-medium">{job.company}</p>
        </div>
        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-muted shrink-0">
          <Briefcase className="h-6 w-6 text-muted-foreground" />
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        <Badge variant="secondary" className="text-xs">
          <MapPin className="h-3 w-3 mr-1" />
          {job.location}
        </Badge>
        <Badge variant="secondary" className="text-xs capitalize">
          {job.type.replace('-', ' ')}
        </Badge>
        <Badge className={cn('text-xs', experienceBadgeStyles[job.experienceLevel])}>
          {experienceLabels[job.experienceLevel]}
        </Badge>
      </div>

      <p className="text-sm text-muted-foreground line-clamp-2 mb-4">{job.description}</p>

      <div className="flex items-center justify-between pt-4 border-t border-border">
        <div className="flex items-center gap-1 text-foreground font-medium">
          <DollarSign className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm">{formatSalary(job.salary.min, job.salary.max, job.salary.currency)}</span>
        </div>
        <div className="flex items-center gap-1 text-muted-foreground">
          <Clock className="h-4 w-4" />
          <span className="text-xs">{formatDate(job.postedAt)}</span>
        </div>
      </div>
    </article>
  );
}
