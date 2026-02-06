import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useJobs } from '@/context/JobContext';
import { useState } from 'react';

export function SearchBar() {
  const { searchJobs, filters } = useJobs();
  const [searchValue, setSearchValue] = useState(filters.search);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    searchJobs(searchValue);
  };

  return (
    <form onSubmit={handleSearch} className="w-full">
      <div className="flex flex-col sm:flex-row gap-3 p-4 bg-card rounded-xl shadow-card">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Job title, company, or keywords..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className="pl-10 h-12 bg-background border-border"
          />
        </div>
        <Button type="submit" variant="hero" size="xl" className="w-full sm:w-auto">
          Search Jobs
        </Button>
      </div>
    </form>
  );
}
