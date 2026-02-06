import { SearchBar } from './SearchBar';
import { Briefcase, Users, Building2 } from 'lucide-react';

export function HeroSection() {
  return (
    <section className="gradient-hero py-16 md:py-24">
      <div className="container">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-5xl font-bold text-primary-foreground mb-4 tracking-tight">
            Find Your Dream Job
          </h1>
          <p className="text-lg md:text-xl text-primary-foreground/80 max-w-2xl mx-auto">
            Discover thousands of opportunities from top companies. Your next career move starts here.
          </p>
        </div>

        <div className="max-w-3xl mx-auto mb-12">
          <SearchBar />
        </div>

        <div className="flex flex-wrap justify-center gap-8 md:gap-16">
          <div className="flex items-center gap-3 text-primary-foreground/90">
            <Briefcase className="h-6 w-6" />
            <div>
              <p className="text-2xl font-bold">10,000+</p>
              <p className="text-sm opacity-80">Active Jobs</p>
            </div>
          </div>
          <div className="flex items-center gap-3 text-primary-foreground/90">
            <Building2 className="h-6 w-6" />
            <div>
              <p className="text-2xl font-bold">2,500+</p>
              <p className="text-sm opacity-80">Companies</p>
            </div>
          </div>
          <div className="flex items-center gap-3 text-primary-foreground/90">
            <Users className="h-6 w-6" />
            <div>
              <p className="text-2xl font-bold">50,000+</p>
              <p className="text-sm opacity-80">Job Seekers</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
