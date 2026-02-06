import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { CheckCircle } from 'lucide-react';
import type { Job } from '@/types/job';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { toast } from 'sonner';
import api from '@/lib/api';

const applicationSchema = z.object({
  fullName: z.string().trim().min(2, 'Name must be at least 2 characters').max(100, 'Name is too long'),
  email: z.string().trim().email('Please enter a valid email').max(255, 'Email is too long'),
  phone: z.string().trim().min(10, 'Please enter a valid phone number').max(20, 'Phone number is too long'),
  coverLetter: z.string().trim().min(50, 'Cover letter must be at least 50 characters').max(2000, 'Cover letter is too long'),
  linkedIn: z.string().trim().url('Please enter a valid URL').optional().or(z.literal('')),
  portfolio: z.string().trim().url('Please enter a valid URL').optional().or(z.literal('')),
});

type ApplicationFormData = z.infer<typeof applicationSchema>;

interface ApplicationFormModalProps {
  open: boolean;
  onClose: () => void;
  job: Job;
}

export function ApplicationFormModal({ open, onClose, job }: ApplicationFormModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ApplicationFormData>({
    resolver: zodResolver(applicationSchema),
  });

  const onSubmit = async (data: ApplicationFormData) => {
    console.log('Submitting application:', data);
    setIsSubmitting(true);
    
    try {
      // Map form data to backend expectations
      // We need to send 'job_id' and the extra fields
      const payload = {
        job_id: job.id,
        cover_letter: data.coverLetter,
        full_name: data.fullName,
        email: data.email,
        phone: data.phone,
        linkedin: data.linkedIn || null,
        portfolio: data.portfolio || null,
        resume_link: data.portfolio || null, // Fallback if no resume upload yet
      };

      await api.post('/applications/', payload);
      
      setIsSubmitting(false);
      setIsSuccess(true);
      toast.success('Application submitted successfully!');
      
      setTimeout(() => {
        setIsSuccess(false);
        reset();
        onClose();
      }, 2000);
    } catch (error: any) {
      console.error("Application submission failed:", error);
      setIsSubmitting(false);
      
      // Try to extract a meaningful error message
      let errorMessage = "Failed to submit application. Please try again.";
      
      if (error.response?.data) {
        const data = error.response.data;
        if (data.detail) {
            errorMessage = data.detail;
        } else if (typeof data === 'object') {
            // Extract first error from field errors
            const firstErrorKey = Object.keys(data)[0];
            const firstError = data[firstErrorKey];
            if (Array.isArray(firstError)) {
                errorMessage = `${firstErrorKey}: ${firstError[0]}`;
            } else if (typeof firstError === 'string') {
                errorMessage = `${firstErrorKey}: ${firstError}`;
            }
        }
      }
      
      toast.error(errorMessage);
    }
  };

  const handleClose = () => {
    if (!isSubmitting) {
      reset();
      setIsSuccess(false);
      onClose();
    }
  };

  if (isSuccess) {
    return (
      <Dialog open={open} onOpenChange={handleClose}>
        <DialogContent className="max-w-md">
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <div className="h-16 w-16 rounded-full bg-success/10 flex items-center justify-center mb-4">
              <CheckCircle className="h-8 w-8 text-success" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">Application Submitted!</h3>
            <p className="text-muted-foreground">
              Your application for <span className="font-medium">{job.title}</span> at{' '}
              <span className="font-medium">{job.company}</span> has been received.
            </p>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-foreground">
            Apply for {job.title}
          </DialogTitle>
          <p className="text-sm text-muted-foreground">{job.company}</p>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 mt-4">
          <div className="space-y-2">
            <Label htmlFor="fullName">Full Name *</Label>
            <Input
              id="fullName"
              placeholder="John Doe"
              {...register('fullName')}
              aria-invalid={!!errors.fullName}
            />
            {errors.fullName && (
              <p className="text-sm text-destructive">{errors.fullName.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email *</Label>
            <Input
              id="email"
              type="email"
              placeholder="john@example.com"
              {...register('email')}
              aria-invalid={!!errors.email}
            />
            {errors.email && (
              <p className="text-sm text-destructive">{errors.email.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number *</Label>
            <Input
              id="phone"
              type="tel"
              placeholder="+1 (555) 123-4567"
              {...register('phone')}
              aria-invalid={!!errors.phone}
            />
            {errors.phone && (
              <p className="text-sm text-destructive">{errors.phone.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="linkedIn">LinkedIn Profile</Label>
            <Input
              id="linkedIn"
              type="url"
              placeholder="https://linkedin.com/in/johndoe"
              {...register('linkedIn')}
              aria-invalid={!!errors.linkedIn}
            />
            {errors.linkedIn && (
              <p className="text-sm text-destructive">{errors.linkedIn.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="portfolio">Portfolio / Website</Label>
            <Input
              id="portfolio"
              type="url"
              placeholder="https://johndoe.com"
              {...register('portfolio')}
              aria-invalid={!!errors.portfolio}
            />
            {errors.portfolio && (
              <p className="text-sm text-destructive">{errors.portfolio.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="coverLetter">Cover Letter *</Label>
            <Textarea
              id="coverLetter"
              placeholder="Tell us why you're the perfect fit for this role..."
              rows={5}
              {...register('coverLetter')}
              aria-invalid={!!errors.coverLetter}
            />
            {errors.coverLetter && (
              <p className="text-sm text-destructive">{errors.coverLetter.message}</p>
            )}
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="button" variant="outline" onClick={handleClose} className="flex-1" disabled={isSubmitting}>
              Cancel
            </Button>
            <Button type="submit" variant="hero" className="flex-1" disabled={isSubmitting}>
              {isSubmitting ? 'Submitting...' : 'Submit Application'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
