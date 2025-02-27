
import React from 'react';
import { BarChart, DollarSign, Users, Briefcase, TrendingUp, PieChart } from 'lucide-react';

interface CompanyMetrics {
  finances: number;
  reputation: number;
  morale: number;
  activeProjects: number;
  companySize: number;
}

interface CompanyDashboardProps {
  metrics: CompanyMetrics;
  className?: string;
}

const CompanyDashboard: React.FC<CompanyDashboardProps> = ({
  metrics,
  className = '',
}) => {
  // Helper to determine status color based on value (0-100)
  const getStatusColor = (value: number) => {
    if (value >= 70) return 'text-success';
    if (value >= 40) return 'text-warning';
    return 'text-danger';
  };
  
  // Helper to format currency
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className={`dashboard-card ${className} animate-fade-in`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-corporate-800 dark:text-corporate-100">Company Overview</h3>
        <div className="text-xs px-2 py-1 bg-corporate-100 dark:bg-corporate-800 rounded-full text-corporate-500 dark:text-corporate-400">
          Q2 2023
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="neo-inset rounded-lg p-3">
          <div className="flex items-center mb-1">
            <DollarSign className="w-4 h-4 text-primary mr-2" />
            <h4 className="text-sm font-medium text-corporate-700 dark:text-corporate-200">Finances</h4>
          </div>
          <p className="text-lg font-semibold">{formatCurrency(metrics.finances)}</p>
          <div className={`text-xs ${getStatusColor(metrics.finances > 50000 ? 100 : (metrics.finances / 500))}`}>
            {metrics.finances > 100000 ? 'Excellent' : metrics.finances > 50000 ? 'Good' : metrics.finances > 25000 ? 'Concerning' : 'Critical'}
          </div>
        </div>
        
        <div className="neo-inset rounded-lg p-3">
          <div className="flex items-center mb-1">
            <TrendingUp className="w-4 h-4 text-primary mr-2" />
            <h4 className="text-sm font-medium text-corporate-700 dark:text-corporate-200">Reputation</h4>
          </div>
          <div className="flex items-center">
            <div className="w-full bg-corporate-200 dark:bg-corporate-600 rounded-full h-2.5 mr-2">
              <div 
                className={`h-2.5 rounded-full ${getStatusColor(metrics.reputation)}`} 
                style={{ width: `${metrics.reputation}%` }}
              ></div>
            </div>
            <span className="text-sm font-medium">{metrics.reputation}%</span>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-3 gap-3">
        <div className="flex flex-col items-center justify-center p-2 bg-corporate-100 dark:bg-corporate-800 rounded-lg">
          <Users className="w-5 h-5 text-corporate-500 mb-1" />
          <p className="text-xs text-corporate-600 dark:text-corporate-300">Team Size</p>
          <p className="text-base font-semibold">{metrics.companySize}</p>
        </div>
        
        <div className="flex flex-col items-center justify-center p-2 bg-corporate-100 dark:bg-corporate-800 rounded-lg">
          <PieChart className="w-5 h-5 text-corporate-500 mb-1" />
          <p className="text-xs text-corporate-600 dark:text-corporate-300">Morale</p>
          <p className={`text-base font-semibold ${getStatusColor(metrics.morale)}`}>
            {metrics.morale}%
          </p>
        </div>
        
        <div className="flex flex-col items-center justify-center p-2 bg-corporate-100 dark:bg-corporate-800 rounded-lg">
          <Briefcase className="w-5 h-5 text-corporate-500 mb-1" />
          <p className="text-xs text-corporate-600 dark:text-corporate-300">Active Projects</p>
          <p className="text-base font-semibold">{metrics.activeProjects}</p>
        </div>
      </div>
    </div>
  );
};

export default CompanyDashboard;
