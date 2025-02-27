
import React, { ReactNode } from 'react';
import { Bell, Settings, HelpCircle } from 'lucide-react';

interface LayoutProps {
  children: ReactNode;
  title?: string;
  subtitle?: string;
}

const Layout: React.FC<LayoutProps> = ({
  children,
  title = 'Pitch, Please',
  subtitle = 'Corporate Project Management Simulator',
}) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-corporate-100 to-corporate-200 dark:from-corporate-800 dark:to-corporate-900">
      <header className="bg-white dark:bg-corporate-700 border-b border-corporate-200 dark:border-corporate-600 shadow-sm">
        <div className="container max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center">
            <div className="bg-primary p-2 rounded-md mr-3">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="3" y="3" width="7" height="7" rx="1" fill="white" />
                <rect x="3" y="14" width="7" height="7" rx="1" fill="white" />
                <rect x="14" y="3" width="7" height="7" rx="1" fill="white" />
                <rect x="14" y="14" width="7" height="7" rx="1" fill="white" opacity="0.5" />
              </svg>
            </div>
            <div>
              <h1 className="text-xl font-semibold text-corporate-800 dark:text-corporate-100">{title}</h1>
              <p className="text-xs text-corporate-500">{subtitle}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <button className="p-2 rounded-full hover:bg-corporate-100 dark:hover:bg-corporate-600 transition-colors">
              <HelpCircle className="w-5 h-5 text-corporate-600 dark:text-corporate-300" />
            </button>
            <button className="p-2 rounded-full hover:bg-corporate-100 dark:hover:bg-corporate-600 transition-colors">
              <Bell className="w-5 h-5 text-corporate-600 dark:text-corporate-300" />
            </button>
            <button className="p-2 rounded-full hover:bg-corporate-100 dark:hover:bg-corporate-600 transition-colors">
              <Settings className="w-5 h-5 text-corporate-600 dark:text-corporate-300" />
            </button>
            <div className="w-8 h-8 rounded-full bg-corporate-200 dark:bg-corporate-600 flex items-center justify-center">
              <span className="text-sm font-medium text-corporate-600 dark:text-corporate-300">JD</span>
            </div>
          </div>
        </div>
      </header>
      
      <main className="container max-w-6xl mx-auto px-4 py-6">
        {children}
      </main>
      
      <footer className="bg-white dark:bg-corporate-700 border-t border-corporate-200 dark:border-corporate-600 py-3">
        <div className="container max-w-6xl mx-auto px-4 text-center text-xs text-corporate-500">
          <p>Pitch, Please &copy; 2023 | Corporate Project Management Simulator</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
