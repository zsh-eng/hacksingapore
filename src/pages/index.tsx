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
import { TbPigMoney } from "react-icons/tb";
import { IoIosChatboxes } from "react-icons/io";
import { FaQuestion } from "react-icons/fa";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
    return (
        <main
            className={`flex min-h-screen flex-col bg-slate-500 items-center justify-center p-24 ${inter.className}`}
        >
            <Navbar />
            <div className="flex flex-col items-center justify-center space-y-16">
                <h2 className="text-2xl text-slate-200 font-semibold ">What would you like to do today?</h2>
                <div className="flex flex-wrap gap-10 justify-center lg:grid-rows-2">
                    <DashboardCard title="Your Savings" href="/savings">
                        <TbPigMoney size={60}/>
                    </DashboardCard>
                    <DashboardCard title="Chat" href="/chat" >
                        <IoIosChatboxes size={60}/>
                    </DashboardCard>
                    <DashboardCard title="Feature 3" href="/feature_3" >
                        <FaQuestion size={60}/>
                    </DashboardCard>
                </div>
            </div>
        </main>
    );
}
