import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useJobs } from '@/context/JobContext';
import { categories, locations, experienceLevels, jobTypes } from '@/data/mockJobs';
import type { ExperienceLevel } from '@/types/job';

export function FilterSidebar() {
  const { filters, updateFilters, clearFilters } = useJobs();

  const hasActiveFilters = filters.category || filters.location || filters.experienceLevel || filters.type;

  return (
    <aside className="w-full lg:w-72 shrink-0">
      <div className="bg-card rounded-xl shadow-card p-5 sticky top-24">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-foreground">Filters</h2>
          {hasActiveFilters && (
            <Button variant="ghost" size="sm" onClick={clearFilters} className="text-muted-foreground">
              <X className="h-4 w-4 mr-1" />
              Clear
            </Button>
          )}
        </div>

        {/* Category Filter */}
        <div className="mb-6">
          <h3 className="text-sm font-medium text-foreground mb-3">Category</h3>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={filters.category === category ? 'filterActive' : 'filter'}
                size="sm"
                onClick={() => updateFilters({ category: filters.category === category ? null : category })}
                className="rounded-full"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Location Filter */}
        <div className="mb-6">
          <h3 className="text-sm font-medium text-foreground mb-3">Location</h3>
          <div className="flex flex-wrap gap-2">
            {locations.map((location) => (
              <Button
                key={location}
                variant={filters.location === location ? 'filterActive' : 'filter'}
                size="sm"
                onClick={() => updateFilters({ location: filters.location === location ? null : location })}
                className="rounded-full text-xs"
              >
                {location}
              </Button>
            ))}
          </div>
        </div>

        {/* Experience Level Filter */}
        <div className="mb-6">
          <h3 className="text-sm font-medium text-foreground mb-3">Experience Level</h3>
          <div className="flex flex-wrap gap-2">
            {experienceLevels.map((level) => (
              <Button
                key={level.value}
                variant={filters.experienceLevel === level.value ? 'filterActive' : 'filter'}
                size="sm"
                onClick={() =>
                  updateFilters({
                    experienceLevel: filters.experienceLevel === level.value ? null : (level.value as ExperienceLevel),
                  })
                }
                className="rounded-full"
              >
                {level.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Job Type Filter */}
        <div>
          <h3 className="text-sm font-medium text-foreground mb-3">Job Type</h3>
          <div className="flex flex-wrap gap-2">
            {jobTypes.map((type) => (
              <Button
                key={type}
                variant={filters.type === type ? 'filterActive' : 'filter'}
                size="sm"
                onClick={() => updateFilters({ type: filters.type === type ? null : type })}
                className="rounded-full capitalize"
              >
                {type.replace('-', ' ')}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}
