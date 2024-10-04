"use client";

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const Dashboard = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  useEffect(() => {
    if (status === 'loading') {
      return;
    }

    if (session?.user?.type === 'developer') {
      router.push('/dashboard/developer');
    } else if (session?.user?.type === 'recruiter') {
      router.push('/dashboard/recruiter');
    }
  }, [session, status, router]);

  return (
    <div className='flex h-screen justify-center items-center'>
      <h1 className='text-3xl'>Redirecting...</h1>
    </div>
  );
};

export default Dashboard;
