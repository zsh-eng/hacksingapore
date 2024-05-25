/**
 * mik:
 * i think we can just make the home page the dashboard page. quite likely the user will just
 * navigate to where they want from there, then its one less layer of hierarchy for navigation also
 * 
 * feature_X will be replaced with the actual feature names later
 */

import { Inter } from "next/font/google";
import DashboardCard from "@/components/ui/dashboard_card";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
    return (
        <main
            className={`flex min-h-screen flex-col items-center justify-center p-24 ${inter.className}`}
        >
            <div className="flex gap-10">
              <DashboardCard title="Feature 1" href="/feature_1"/>
              <DashboardCard title="Feature 2" href="/feature_2"/>
              <DashboardCard title="Feature 3" href="/feature_3"/>
            </div>
        </main>
    );
}
