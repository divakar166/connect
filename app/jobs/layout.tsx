import Footer from '@/components/homepage/footer';
import Navbar from '@/components/homepage/navbar';
import React from 'react';

const JobsLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="flex flex-col min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-50 to-slate-300 dark:from-gray-950 dark:to-gray-700">
    <Navbar />
    {children}
    <Footer />
  </div>
);

export default JobsLayout;
