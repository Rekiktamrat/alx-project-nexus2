import { useEffect, useState } from 'react';
import { Briefcase, FileText, Users, TrendingUp } from 'lucide-react';
import { StatCard } from '../components/StatCard';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import api from '../lib/api';

const data = [
  { name: 'Jan', applications: 120 },
  { name: 'Feb', applications: 180 },
  { name: 'Mar', applications: 250 },
  { name: 'Apr', applications: 310 },
  { name: 'May', applications: 290 },
  { name: 'Jun', applications: 400 },
  { name: 'Jul', applications: 380 },
];

const categories = [
  { name: 'Software Development', count: 156, percentage: 80 },
  { name: 'Design & Creative', count: 98, percentage: 60 },
  { name: 'Marketing', count: 78, percentage: 45 },
  { name: 'Data Science', count: 64, percentage: 35 },
  { name: 'Product Management', count: 45, percentage: 25 },
];

export function Dashboard() {
  const [stats, setStats] = useState({
    jobs: 0,
    applications: 0,
    users: 0
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const statsRes = await api.get('/stats/');
        setStats(statsRes.data);
      } catch (error) {
        console.error("Failed to fetch dashboard stats", error);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-500">Welcome back! Here's what's happening with your job board.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          label="Total Jobs"
          value={stats.jobs.toString()}
          change="+12%"
          trend="up"
          icon={Briefcase}
          iconColor="text-blue-600"
          iconBg="bg-blue-50"
        />
        <StatCard
          label="Applications"
          value={stats.applications.toLocaleString()}
          change="+23%"
          trend="up"
          icon={FileText}
          iconColor="text-green-600"
          iconBg="bg-green-50"
        />
        <StatCard
          label="Active Users"
          value={stats.users.toLocaleString()}
          change="+8%"
          trend="up"
          icon={Users}
          iconColor="text-sky-600"
          iconBg="bg-sky-50"
        />
        <StatCard
          label="Conversion Rate"
          value="24.8%"
          change="-2%"
          trend="down"
          icon={TrendingUp}
          iconColor="text-orange-600"
          iconBg="bg-orange-50"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
          <div className="mb-6">
            <h3 className="text-lg font-bold text-gray-900">Applications Overview</h3>
            <p className="text-sm text-gray-500">Monthly applications and job postings</p>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorApps" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563EB" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#2563EB" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#9CA3AF', fontSize: 12 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#9CA3AF', fontSize: 12 }} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  itemStyle={{ color: '#2563EB' }}
                />
                <Area type="monotone" dataKey="applications" stroke="#2563EB" strokeWidth={2} fillOpacity={1} fill="url(#colorApps)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
          <div className="mb-6">
            <h3 className="text-lg font-bold text-gray-900">Top Job Categories</h3>
          </div>
          <div className="space-y-6">
            {categories.map((category) => (
              <div key={category.name}>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-700">{category.name}</span>
                  <span className="text-sm text-gray-500">{category.count} jobs</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-primary rounded-full"
                    style={{ width: `${category.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
