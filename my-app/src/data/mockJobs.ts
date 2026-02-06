import type { Job } from '@/types/job';

export const categories = [
  'Development',
  'Design',
  'Marketing',
  'Sales',
  'Product',
  'Customer Support'
];

export const locations = [
  'Remote',
  'New York, NY',
  'San Francisco, CA',
  'London, UK',
  'Berlin, Germany',
  'Toronto, Canada'
];

export const experienceLevels = [
  { value: 'entry', label: 'Entry Level' },
  { value: 'mid', label: 'Mid Level' },
  { value: 'senior', label: 'Senior Level' }
];

export const jobTypes = [
  'full-time',
  'part-time',
  'contract',
  'remote'
];

export const jobs: Job[] = [
  {
    id: '1',
    title: 'Senior Frontend Engineer',
    company: 'TechCorp',
    location: 'Remote',
    category: 'Development',
    experienceLevel: 'senior',
    salary: {
      min: 120000,
      max: 160000,
      currency: 'USD'
    },
    description: 'We are looking for a Senior Frontend Engineer to join our team.',
    requirements: [
      '5+ years of experience with React',
      'Strong TypeScript skills',
      'Experience with state management libraries'
    ],
    responsibilities: [
      'Develop new features',
      'Maintain existing codebase',
      'Mentor junior developers'
    ],
    benefits: [
      'Health insurance',
      'Unlimited PTO',
      'Remote work'
    ],
    type: 'full-time',
    postedAt: '2023-10-01',
    featured: true
  },
  {
    id: '2',
    title: 'Product Designer',
    company: 'DesignStudio',
    location: 'San Francisco, CA',
    category: 'Design',
    experienceLevel: 'mid',
    salary: {
      min: 90000,
      max: 130000,
      currency: 'USD'
    },
    description: 'We are seeking a creative Product Designer.',
    requirements: [
      '3+ years of experience in product design',
      'Proficiency in Figma',
      'Strong portfolio'
    ],
    responsibilities: [
      'Design user interfaces',
      'Conduct user research',
      'Collaborate with engineers'
    ],
    benefits: [
      'Health insurance',
      'Gym membership',
      'Free snacks'
    ],
    type: 'full-time',
    postedAt: '2023-10-02'
  },
  {
    id: '3',
    title: 'Marketing Manager',
    company: 'GrowthInc',
    location: 'New York, NY',
    category: 'Marketing',
    experienceLevel: 'senior',
    salary: {
      min: 100000,
      max: 140000,
      currency: 'USD'
    },
    description: 'Lead our marketing efforts.',
    requirements: [
      '5+ years of marketing experience',
      'Experience with digital marketing',
      'Strong leadership skills'
    ],
    responsibilities: [
      'Develop marketing strategies',
      'Manage marketing budget',
      'Lead marketing team'
    ],
    benefits: [
      'Health insurance',
      'Stock options',
      'Flexible hours'
    ],
    type: 'full-time',
    postedAt: '2023-10-03'
  }
];
