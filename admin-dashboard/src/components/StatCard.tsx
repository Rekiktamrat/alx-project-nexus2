import type { LucideIcon } from 'lucide-react';
import { cn } from '../lib/utils';

interface StatCardProps {
  label: string;
  value: string;
  change: string;
  trend: 'up' | 'down';
  icon: LucideIcon;
  iconColor: string;
  iconBg: string;
}

export function StatCard({ label, value, change, trend, icon: Icon, iconColor, iconBg }: StatCardProps) {
  return (
    <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="text-sm font-medium text-gray-500 mb-1">{label}</p>
          <h3 className="text-2xl font-bold text-gray-900">{value}</h3>
        </div>
        <div className={cn("p-3 rounded-lg", iconBg)}>
          <Icon className={cn("w-6 h-6", iconColor)} />
        </div>
      </div>
      <p className={cn(
        "text-sm font-medium flex items-center gap-1",
        trend === 'up' ? "text-green-600" : "text-red-600"
      )}>
        {trend === 'up' ? '↑' : '↓'} {change}
        <span className="text-gray-400 font-normal ml-1">from last month</span>
      </p>
    </div>
  );
}
