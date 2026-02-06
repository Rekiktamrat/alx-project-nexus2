import { MapPin, DollarSign, CheckCircle2, Building2 } from 'lucide-react';
import { useJobs } from '@/context/JobContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useState } from 'react';
import { ApplicationFormModal } from './ApplicationFormModal';
import { cn } from '@/lib/utils';

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

export function JobDetailModal() {
  const { selectedJob, setSelectedJob } = useJobs();
  const [showApplicationForm, setShowApplicationForm] = useState(false);

  if (!selectedJob) return null;

  const formatSalary = (min: number, max: number, currency: string) => {
    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency,
      maximumFractionDigits: 0,
    });
    return `${formatter.format(min)} - ${formatter.format(max)}`;
  };

  return (
    <>
      <Dialog open={!!selectedJob} onOpenChange={(open) => !open && setSelectedJob(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] p-0 overflow-hidden">
          <DialogHeader className="p-6 pb-0">
            <div className="flex items-start gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-muted shrink-0">
                <Building2 className="h-7 w-7 text-muted-foreground" />
              </div>
              <div className="flex-1 min-w-0">
                <DialogTitle className="text-xl font-bold text-foreground mb-1">
                  {selectedJob.title}
                </DialogTitle>
                <p className="text-muted-foreground font-medium">{selectedJob.company}</p>
              </div>
            </div>
          </DialogHeader>

          <ScrollArea className="max-h-[60vh]">
            <div className="p-6 pt-4 space-y-6">
              {/* Quick Info */}
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary" className="text-xs">
                  <MapPin className="h-3 w-3 mr-1" />
                  {selectedJob.location}
                </Badge>
                <Badge variant="secondary" className="text-xs capitalize">
                  {selectedJob.type.replace('-', ' ')}
                </Badge>
                <Badge className={cn('text-xs', experienceBadgeStyles[selectedJob.experienceLevel])}>
                  {experienceLabels[selectedJob.experienceLevel]}
                </Badge>
              </div>

              {/* Salary */}
              <div className="flex items-center gap-2 p-4 bg-muted rounded-lg">
                <DollarSign className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Salary Range</p>
                  <p className="font-semibold text-foreground">
                    {formatSalary(selectedJob.salary.min, selectedJob.salary.max, selectedJob.salary.currency)}
                  </p>
                </div>
              </div>

              {/* Description */}
              <div>
                <h3 className="text-sm font-semibold text-foreground mb-2">About the Role</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{selectedJob.description}</p>
              </div>

              {/* Requirements */}
              <div>
                <h3 className="text-sm font-semibold text-foreground mb-3">Requirements</h3>
                <ul className="space-y-2">
                  {selectedJob.requirements.map((req, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Responsibilities */}
              <div>
                <h3 className="text-sm font-semibold text-foreground mb-3">Responsibilities</h3>
                <ul className="space-y-2">
                  {selectedJob.responsibilities.map((resp, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <CheckCircle2 className="h-4 w-4 text-secondary mt-0.5 shrink-0" />
                      <span>{resp}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Benefits */}
              <div>
                <h3 className="text-sm font-semibold text-foreground mb-3">Benefits</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedJob.benefits.map((benefit, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {benefit}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </ScrollArea>

          <div className="p-6 pt-4 border-t border-border bg-card">
            <Button variant="hero" size="lg" className="w-full" onClick={() => setShowApplicationForm(true)}>
              Apply for this Position
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <ApplicationFormModal
        open={showApplicationForm}
        onClose={() => setShowApplicationForm(false)}
        job={selectedJob}
      />
    </>
  );
}
