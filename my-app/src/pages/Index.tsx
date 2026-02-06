import { JobProvider } from '@/context/JobContext';
import { Header } from '@/components/Header';
import { HeroSection } from '@/components/HeroSection';
import { FilterSidebar } from '@/components/FilterSidebar';
import { JobList } from '@/components/JobList';
import { JobDetailModal } from '@/components/JobDetailModal';

const Index = () => {
  return (
    <JobProvider>
      <div className="min-h-screen bg-background">
        <Header />
        <HeroSection />
        
        <main className="container py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            <FilterSidebar />
            <JobList />
          </div>
        </main>

        <JobDetailModal />

        <footer className="border-t border-border bg-card py-8 mt-12">
          <div className="container text-center">
            <p className="text-sm text-muted-foreground">
              © 2024 ProDev Jobs. All rights reserved.
            </p>
          </div>
        </footer>
      </div>
    </JobProvider>
  );
};

export default Index;
