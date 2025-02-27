
'use client';

import Link from "next/link";
import Layout from "@/components/Layout";

export default function NotFound() {
  return (
    <Layout title="404 Not Found" subtitle="Page does not exist">
      <div className="flex flex-col items-center justify-center py-12">
        <div className="w-24 h-24 mb-6 relative">
          <div className="absolute inset-0 bg-primary rounded-lg opacity-10 animate-pulse"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <svg className="w-16 h-16 text-primary" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 15V17M12 7V13M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
        
        <h1 className="text-4xl font-bold text-corporate-800 dark:text-corporate-100 mb-4 animate-fade-in">404</h1>
        <p className="text-lg text-corporate-600 dark:text-corporate-300 mb-8 animate-fade-in">Oops! This project proposal doesn't exist.</p>
        
        <Link href="/" className="btn btn-primary animate-fade-in">
          Return to Dashboard
        </Link>
      </div>
    </Layout>
  );
}
