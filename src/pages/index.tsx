/**
 * mik:
 * i think we can just make the home page the dashboard page. quite likely the user will just
 * navigate to where they want from there, then its one less layer of hierarchy for navigation also
 */

import DashboardCard from '@/components/ui/dashboard_card';
import Navbar from '@/components/ui/navbar';
import { DollarSign, LineChart, PiggyBank } from 'lucide-react';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  return (
    <main
      className={`flex min-h-screen bg-slate-500 flex-col items-center justify-center p-24 ${inter.className}`}
    >
      <Navbar />
      <div className='flex flex-col items-center justify-start gap-y-16 h-full w-full'>
        <h1 className='text-4xl text-primary font-semibold '>
          What would you like to do today?
        </h1>
        <div className='flex flex-wrap gap-10 justify-center lg:grid-rows-2'>
          <DashboardCard title='Savings' href='/savings'>
            <PiggyBank className='h-16 w-16' />
          </DashboardCard>
          <DashboardCard title='Investments' href='/invest'>
            <LineChart className='h-16 w-16' />
          </DashboardCard>
          <DashboardCard title='Spending' href='/invest'>
            <DollarSign className='h-16 w-16' />
          </DashboardCard>
        </div>
      </div>
    </main>
  );
}
