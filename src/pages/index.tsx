/**
 * mik:
 * i think we can just make the home page the dashboard page. quite likely the user will just
 * navigate to where they want from there, then its one less layer of hierarchy for navigation also
 * 
 * feature_X will be replaced with the actual feature names later
 */

import { Inter } from "next/font/google";
import DashboardCard from "@/components/ui/dashboard_card";
import Navbar from "@/components/ui/navbar";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
    return (
        <main
            className={`flex min-h-screen flex-col bg-slate-500 items-center justify-center p-24 ${inter.className}`}
        >
            <Navbar />
            <div className="flex flex-wrap gap-10 justify-center lg:grid-rows-2">
              <DashboardCard title="Feature 1" href="/feature_1"/>
              <DashboardCard title="Feature 2" href="/feature_2"/>
              <DashboardCard title="Feature 3" href="/feature_3"/>
            </div>
        </main>
    );
}
